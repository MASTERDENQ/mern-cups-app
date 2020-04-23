# MERN Application Setup:

The application has local mongodb connection string already in place. However, if you wish to
connect to your desired database change connection string in server/config/keys.js file.

## Install dependency:

```bash
$ cd server; npm install
$ cd ..
$ cd client; yarn install
```

## Run Application

```bash
$ cd server; npm start
$ cd client; yarn start
```

# Group Members

| Members ID | Members Names   | Major Roles      |
| ---------- | --------------- | ---------------- |
| 1706903    | Tyrone Wallace  | Integration Lead |
| 1801488    | Dimitri Russell | Project Lead     |
| 1803640    | Reinaldo Pino   | UI Lead          |

# Links of Project Design:

- [Wireframes/ UI](https://gitlab.com/MASTERQ9/ap-cups/-/tree/development/Design)
- [ERD](https://gitlab.com/MASTERQ9/ap-cups/-/tree/development/Design)

# Project Tools/Languages/Libraries/Frameworks:

```
Nodejs
Reactjs
Expressjs
MongoDB
HTML
CSS/SCSS/SASS
Reactstap
Javascript
```

# Project Description

This project is an Advance Programming Project called 'C.U.P.S'.

The requirements of each component and overall system requirements have been included below using SCRUM user stories:

1. As a store manager, I should be able to add a new menu item to be ordered by customers. Each menu item has a name,
   category (beverage, snack, daily surprise), stock quantity, cost, system generated id, photo, photo of the
   American Sign Language (ASL) representation and audio recording of the item name in English.
   (See testing samples for coffee, tea and hamburger : http://bit.ly/38xYmgz )
2. As a store manager,I should be able to access a list of all menu items and access all media (photos and audio).
3. As a store manager, I should be able to update the stock quantity of a menu item.
4. As a store manager, I should be able to update the cost of a menu item.
5. As a store manager, I should be able to remove an existing menu item from the system.
6. As a customer, I should be able to create a self service account using my first name,
   last name and digital id. Each account is awarded \$500 by default. A digital id may be:
   a. A password
   b. An image capture of the individual doing a signature move (think #usainbolt : http://bit.ly/2RHCNnd ) (minimum: upload image and match)
   c. A voice recording (minimum: upload mp3 and match)
7. As a customer, I should be able to search for a menu item using:
   a. Text input (minimum: user should be able to type)
   b. Image/Video Input (minimum: upload photo of American Sign Language)
   c.Speech/Audio Input (minimum: upload mp3 of audio recording)
8. As a customer, I should be able to make an order for several items. Each order should have my first name and quantity of each item chosen.
9. As a customer, I should be able to access the details (quantity of each item, unit cost of each item and total cost) of my order for confirmation
   10.As a customer, I should be able to cancel my order.
   11.As a customer, I should be able to confirm my order by providing my digital id. A customer should have three (3) chances to
   provide their correct digital id before the order is cancelled.
   12.As a store manager, I should be able to view a chart showing the total sales (in dollars) for each menu item.

## General System Requirements:\*

1. System Name: C.U.P.S (1 mark)
2. Client side and server side logging (3 marks)
3. Client/Server Architecture \*\*
4. Database (any database vendor or ORM may be used)\*\*
5. Appropriate exception handling ( 5 marks)
6. User Friendly (7 marks)
7. Appropriate input validation (3 marks)

Each member should contribute equally to the completion of the project (i.e. implementation in code).
Otherwise the individual grade assigned will be prorated based on the contributions.

A project that does not implement a client server architecture. It must
have only the server communicating with the database
use a database cannot attain more than 50% of the overall grade.

Using an online/cloud database may impede your final presentation if you experience network issues.

## Research Concepts:

Each group will be tasked to choose ANY language/framework/tools to document and demonstrate
(at least once throughout the project) the following research concepts:

- the use of S.O.L.I.D. principles
- the use of the Repository Pattern
- the use of the Model-View-Controller Pattern
- the use of the Singleton Pattern
- the use of the Factory Pattern
- the use of a Code Documentation Generation Tool
- the use of a Code Generation/Scaffolding Tool
- the use of Source Control Management Tool
- the use of a Package Management Tool
- the inclusion of unit testing and test automation
- the inclusion of Continuous Integration using a Continuous Integration Server

NB. At least one instance throughout the project should incorporate the research concept.

The project may be a web, mobile or desktop application. Feel free to utilize existing frameworks and develop portfolio ready projects.

## Popular Frameworks (See stackoverflow developer survey 2019) include:

Angular,
React JS/Native
Backbone
SparkJava
SpringBoot
Django
Laravel
ASP.NET MVC/Web API
Express.Js
Flutter
TreeFrog C++ Framework
Ruby on Rails
NB, these are optional.

## Research Project Deliverables:

- Git Repository (A private repository is recommended until you are ready to make your project public,
  multiple repositories may be created) with the following folders containing all deliverables.

- src - this folder should contain the project code. If there are multiple sub projects, you are encouraged to create multiple folders within this folder.

- build - this folder should contain the final software artefact(s) (eg. exe/jar/html/css)

- Design - this folder will store any design documents generated automatically from the project using a code documentation generation tool. It will also include your ERD Diagram, Wireframes and APA formatted project report

- Demonstration Youtube Video

- Provides a working demo of the application

- Demonstrate how to run/start the application

- Code Review Youtube Video

- Explaining how each research concept was incorporated in the project

* APA formatted project report

* Lists programming languages/frameworks/tools and versions used.

* Defines and details how each research concept was incorporated in the project

* Citations and references should be included

## Final Deliverables:

- Source Code

- Executable application (eg. executable jars/exe/html/css)

- Youtube Video Demonstrating App

- Youtube Video demonstrating research concepts

Assessment Pieces:

- Source Code | Executables | Videos | Presentation | Interview | APA formatted Written Report

Bonus Components:

Incorporating Image/Video/Speech Recognition

Continuous Deployment

User manual (using [IEEE 1063 standard](https://nciphub.org/collections/post/478/download/IEEE_Standard1063.pdf) )

# END OF FILE :)
