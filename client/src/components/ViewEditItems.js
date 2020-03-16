import React, { Component } from "react";
import { Link } from "react-router-dom";

//import modal
import DeleteModal from "../reusableComponents/deleteModal";
import EditModal from "../reusableComponents/editModal";

class ViewEditItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      deleteModalVisible: false,
      editModalVisible: false,
      itemId: null
    };
  }

  changeDeleteModalState = () => {
    this.setState({ deleteModalVisible: !this.state.deleteModalVisible });
  };

  changeEditModalState = () => {
    this.setState({ editModalVisible: !this.state.editModalVisible });
  };

  /**
   *
   * @param {String} id
   */
  getId = id => {
    this.setState({ itemId: id });
  };

  deleteItem = () => {
    let temp = this.state.items;

    temp.splice(
      temp.findIndex(item => item.id === this.state.itemId),
      1
    );

    this.setState({ items: temp });
  };

  editItem = (cost, quantity) => {
    let temp = this.state.items;

    let toEdit = temp.splice(
      temp.findIndex(item => item.id === this.state.itemId),
      1
    );

    toEdit.name = cost;
    toEdit.website = quantity;

    temp.push(toEdit);

    this.setState({ items: temp });
  };

  componentDidMount() {
    fetch("/testdb/list_items")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <h1>Loading Menu</h1>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.items.map(item => (
            <div key={item.id}>
              <button
                onClick={() => {
                  this.getId(item.id);
                  this.changeEditModalState();
                }}
              >
                Edit
              </button>

              <button
                onClick={() => {
                  this.getId(item.id);
                  this.changeDeleteModalState();
                }}
              >
                Delete
              </button>
              {item.name}
              {item.website}
            </div>
          ))}
          ;
          {this.state.deleteModalVisible === true ? (
            <DeleteModal
              closeModal={this.changeDeleteModalState}
              idToDelete={this.state.itemId}
              deleteItem={this.deleteItem}
            />
          ) : null}
          {this.state.editModalVisible === true ? (
            <EditModal
              closeModal={this.changeEditModalState}
              idToDelete={this.state.itemId}
              editItem={this.editItem}
            />
          ) : null}
          <Link to="/control">
            <button>Return to Control Center</button>
          </Link>
        </div>
      );
    }
  }
}

export default ViewEditItems;
