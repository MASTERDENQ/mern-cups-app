import React, { Component } from "react";
// import '../css/CustomerMenuStyle.css'
import {} from "react-router-dom";
import ReviewOrder from "./ReviewOrder";

class CustomerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      orderedItems: [],
      review: false,
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  changeView() {
    this.setState({
      review: !this.state.review,
    });
  }

  changeHandler = (id, name, value) => {
    let res = this.state.orderedItems.find((item) => item.id === id);

    if (res === undefined) {
      let obj = {
        name,
        id,
        value,
      };

      this.setState({
        orderedItems: [...this.state.orderedItems, obj],
      });
    } else {
      let obj = this.state.orderedItems.splice(
        this.state.orderedItems.findIndex((item) => item.id === id),
        1
      );

      obj[0].value = value;

      let temp = this.state.orderedItems;
      temp.push(...obj);

      this.setState({
        orderedItems: temp,
      });
    }
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <h1>Loading Menu</h1>
        </div>
      );
    } else {
      return this.state.review === false ? (
        <div id="MainBody">
          {this.state.items.map((item) => (
            <div key={item.id} className="MenuItem">
              <input
                name="quantity"
                id={item.id}
                placeholder="0"
                type="number"
                min="0"
                onChange={() => {
                  this.changeHandler(
                    item.id,
                    item.name,
                    document.getElementById(item.id).value
                  );
                }}
              />
              {item.name}
              {item.website}
            </div>
          ))}

          <button
            onClick={() => {
              this.changeView();
            }}
          >
            Review Order
          </button>
        </div>
      ) : (
        <ReviewOrder
          orderedItems={this.state.orderedItems}
          changeView={() => this.changeView()}
        />
      );
    }
  }
}

export default CustomerMenu;
