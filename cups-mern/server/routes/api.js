const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const path = require('path');
const crypto = require('crypto');
const mongo = require('mongodb');
//const fc = require('filecompare');

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const methodOverride = require('method-override');
const bodyParser = require('body-parser');

//database URI
const mongoURI = require('../config/keys.js').mongoURI;

//schema models
const managerModel = require('../models/manager.js');
const customerModel = require('../models/customer.js');
const menuItemModel = require('../models/menu_item.js');
const order = require('../models/order.js');


//Middleware
router.use(bodyParser.json());
router.use(methodOverride('_method'));


//connection to mongoDB
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


//initialize gridFS 
let gfs;

conn.once('open', () => {
    //initialize stream

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});


// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

/*****TEST CONNECTION******/
router.get('/', (req, res) => {
    res.send('Connected....');
});


/*****RETURN REQUESTS ******/

router.get('/list_items', (req, res) => {
    var exclude = { item_photo: 0, asl_photo: 0, item_audio: 0, __v: 0 };
    menuItemModel.find({}, exclude, (err, item) => {
        if (err) {
            res.status(500).send('Unexpected server error');
        }
        else if (!item) {
            res.status(404).send('No items found');
        }
        else {
            res.status(200).json(item);
        }

    });
});

router.get('/:filename', (req, res) => {
    var fileId = new mongo.ObjectID(req.params.filename);
    gfs.files.findOne({ _id: fileId }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // If File exists this will get executed
        const readstream = gfs.createReadStream(file.filename);
        return readstream.pipe(res);
    });
});


/*****ADD REQUESTS ******/

//manager registration
router.post('/add_manager', (req, res) => {
    let newManager = new managerModel();
    newManager.username = req.body.username;
    newManager.password = req.body.password;

    newManager.save((err) => {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.status(201).json(newManager);
        }
    });
});

//customer registration
router.post('/add_customer', upload.single('file'), (req, res) => {
    let newCustomer = new customerModel();

    newCustomer.email_address = req.body.email_address;
    newCustomer.first_name = req.body.first_name;
    newCustomer.last_name = req.body.last_name;

    if (!req.file) {
        newCustomer.password = req.body.password;
    }
    else {
        newCustomer.digital_id = req.file.id;
    }

    newCustomer.save((err) => {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.status(201).send('Customer successfully created...');
        }
    });
});

//menu_item upload
var menuItemUpload = upload.fields([{ name: 'item_image', maxCount: 1 }, { name: 'sign_language', maxCount: 1 },
{ name: 'item_audio', maxCount: 1 }]);

router.post('/add_menu_item', menuItemUpload, (req, res) => {
    let newMenuItem = new menuItemModel();

    newMenuItem.item_name = req.body.item_name;
    newMenuItem.category = req.body.category;
    newMenuItem.stock = req.body.stock;
    newMenuItem.cost = req.body.cost;
    newMenuItem.item_photo = req.files['item_image'][0].id;
    newMenuItem.asl_photo = req.files['sign_language'][0].id;
    newMenuItem.item_audio = req.files['item_audio'][0].id;

    newMenuItem.save((err) => {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.status(201).send('Menu item successfully added...');
        }
    });
});

/*****VALIDATION REQUESTS ******/

router.post('/login_manager', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let query = { username: username, password: password };

    managerModel.findOne(query, (err, manager) => {
        if (err) {
            res.status(500).send('Unexpected error');
        }
        else if (!manager) {
            res.status(404).send('Incorrect login credentials');
        }
        else
            res.status(200).send('welcome!!');
    });
});

router.post('/login_customer', upload.single('file'), (req, res, next) => {
    let email = req.body.email_address;

    if (!req.file) {
        var password = req.body.password;
        var query = { email_address: email, password: password };
    }
    else {
        var query = { email_address: email };
    }

    customerModel.findOne(query, (err, customer) => {
        if (err) {
            res.status(500).send('Unexpected error');
        }
        else if (!customer) {
            res.status(404).send('Incorrect login credentials');
        }
        else if (!customer.password) {
            let searchFor = new mongo.ObjectID(customer.digital_id);
            gfs.files.findOne({ _id: searchFor }, (err, file) => {
                if (err) {
                    res.status(500).send('Unexpected server error');
                }
                else if (!file || file.length === 0) {
                    res.status(404).send('No file exists');
                }
                // If File exists this will get executed
                else if (file === req.file) {
                    res.status(200).json(customer);
                }
                else {
                    res.status(404).send('Account not found');
                }
            });
        }
        else {
            customer.password = null;
            res.status(200).json(customer);
        }
    });
});

/*****EDITING REQUESTS ******/
router.post('/edit_item/:field', (req, res) => {
    let field = req.params.field;

    if (field == 'stock' || field == 'cost') {
        let newValue = req.body.new_value;
        let itemId = req.body.id

        menuItemModel.findByIdAndUpdate({ _id: itemId }, { $set: { [field]: newValue } }, { useFindAndModify: false }, (err, item) => {
            if (err) {
                res.status(500).send('Unexpected server error');
            }
            else if (!item) {
                res.status(404).send('Item not found');
            }
            else {
                res.status(200).send('Field successfully updated');
            }
        });
    }

    res.status(404);
});

router.post('/edit_item_cost', (req, res) => {
    let newValue = req.body.stock;
    let itemId = req.body.id

    menuItemModel.findByIdAndUpdate({ _id: itemId }, { cost: newValue }, { useFindAndModify: false }, (err, item) => {
        if (err) {
            res.status(500).send('Unexpected server error');
        }
        else if (!item) {
            res.status(404).send('Item not found');
        }
        else {
            res.status(200).send('Field successfully updated');
        }
    });
});

/*****DELETION REQUESTS ******/

//deletes manager db record
router.post('/delete_manager', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    let query = { username: username, password: password };

    managerModel.findOneAndDelete(query, function (err, manager) {
        if (err) {
            res.status(500).send();
        }
        else if (!manager) {
            res.status(404).send('Record not found');
        }
        else {
            res.status(200).send('Manager deleted');
        }
    });
});


module.exports = router;