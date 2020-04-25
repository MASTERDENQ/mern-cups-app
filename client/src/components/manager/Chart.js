import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Container } from "reactstrap";
import axios from "axios";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Population",
            data: [],
            backgroundColor: "",
            borderWidth: "",
            borderColor: "",
            hoverBorderWidth: "",
            hoverBorderColor: "",
          },
        ],
      },
      items: [],
      name: [],
      stock: [],
      cost: [],
    };
  }

  componentDidMount() {
    console.log();
    //Request Items
    axios
      .get("/list_items")
      .then((res) => {
        console.log(res);
        this.setState({ items: res.data });
        console.log(this.state.items[0].item_name);
      })
      .catch((err) => {
        console.log(err);
      });
    // ************* TRYING MAP ********************** i failed
    // let stock = this.state.items.map((items) => {
    //   console.log(items.stock);
    // });

    // let cost = this.state.items.map((items) => {
    //   console.log(items.cost);
    // });

    // let name = this.state.items.map((items) => {
    //   console.log(items.item_name);
    // });

    //**************** */ TRYINF FOR LOOP ******************** i failed
    // for (let i = 0; i < 2; i++) {
    //   this.setState({ name: this.state.items[i].item_name });
    //   this.setState({ cost: this.state.items[i].item_cost });
    // }

    this.setState({
      chartData: {
        labels:
          // this.state.name,
          // [name],
          [
            "Boston",
            "Worcester",
            "Springfield",
            "Lowell",
            "Cambridge",
            "New Bedford",
          ],
        datasets: [
          {
            label: "Population",
            data:
              // this.state.cost,
              // [cost],
              [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: "green",
            // backgroundColor: [
            //   "rgba(255, 99, 132, 0.6)",
            //   "rgba(54, 162, 235, 0.6)",
            //   "rgba(255, 206, 86, 0.6)",
            //   "rgba(75, 192, 192, 0.6)",
            //   "rgba(153, 102, 255, 0.6)",
            //   "rgba(255, 159, 64, 0.6)",
            //   "rgba(255, 99, 132, 0.6)",
            // ],
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000",
          },
        ],
      },
    });
  }

  render() {
    return (
      <Container>
        <div className="chart">
          <Bar
            data={this.state.chartData}
            // width={100}
            // height={50}
            options={{
              title: {
                display: true,
                text: "Title String",
                fontSize: 25,
              },
              legend: {
                display: true,
                position: "right",
                labels: {
                  fontColor: "#000",
                },
              },
              layout: {
                padding: {
                  left: 50,
                  right: 0,
                  bottom: 0,
                  top: 0,
                },
              },
              tooltips: {
                enabled: true,
              },
            }}
          />
        </div>
      </Container>
    );
  }
}

export default Chart;
