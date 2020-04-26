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

  populateChart = () => {
    console.log(this.state.items);

    for (let i = 0; i < 2; i++) {
      // console.log(this.state.items[i]);
      this.setState({
        name: [...this.state.name, this.state.items[i].item_name],
        cost: [...this.state.cost, this.state.items[i].cost],
        stock: [...this.state.stock, this.state.items[i].stock],
      });
    }

    console.log("NAMES: ", this.state.name);
    console.log("COST: ", this.state.cost);
    console.log("STOCK: ", this.state.stock);

    this.setState({
      chartData: {
        labels: this.state.name,

        datasets: [
          {
            label: "Population",
            data: this.state.stock,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000",
          },
        ],
      },
    });
  };

  componentDidMount() {
    console.log();
    //Request Items
    axios
      .get("/list_items")
      .then((res) => {
        console.log(res);
        this.setState({ items: res.data });
        this.populateChart();
      })
      .catch((err) => {
        console.log(err);
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
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </Container>
    );
  }
}

export default Chart;
