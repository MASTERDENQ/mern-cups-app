import React, { Component } from "react";
import {
  Bar,
  // Line,
  // Pie
} from "react-chartjs-2";
import { Container, Card } from "reactstrap";
import axios from "axios";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      costChartData: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: "",
            borderWidth: "",
            borderColor: "",
            hoverBorderWidth: "",
            hoverBorderColor: "",
          },
        ],
      },
      stockChartData: {
        labels: [],
        datasets: [
          {
            label: "",
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
      // type: "Bar",
    };
  }

  populateCostChart = () => {
    console.log("populateChart", this.state.items);
    console.log("ARRAY LENGTH", this.state.items.length);

    let size = this.state.items.length;
    for (let i = 0; i < size; i++) {
      this.setState({
        name: [...this.state.name, this.state.items[i].item_name],
        cost: [...this.state.cost, this.state.items[i].cost],
      });
    }

    console.log("NAMES: ", this.state.name);
    console.log("COST: ", this.state.cost);

    this.setState({
      costChartData: {
        labels: this.state.name,

        datasets: [
          {
            label: "Total Sales in dollars($)",
            data: this.state.cost,
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

  populateStockChart = () => {
    let size = this.state.items.length;
    for (let i = 0; i < size; i++) {
      this.setState({
        stock: [...this.state.stock, this.state.items[i].stock],
      });
    }
    console.log("STOCK: ", this.state.stock);

    this.setState({
      stockChartData: {
        labels: this.state.name,

        datasets: [
          {
            label: "Total Amount Sold",
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

  // onChangeHandler = (e) =>
  //   useCallback(() => {
  //     this.setState({ type: e.target.value });
  //     console.log(this.state.type);
  //   }, [this.state.type]);
  // this.setState({ type: e.target.value });
  // console.log(this.state.type);
  // };

  componentDidMount() {
    console.log();
    //Request Items
    axios
      .get("/list_items")
      .then((res) => {
        console.log(res);
        this.setState({ items: res.data });
        this.populateCostChart();
        this.populateStockChart();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Container>
        <h1 style={{ textAlign: "center" }}>CUPS APPLICATION CHARTS</h1>

        <Card
          style={{ marginTop: "3rem", marginBottom: "3rem" }}
          body
          outline
          color="primary"
        >
          <Bar
            data={this.state.costChartData}
            // width={100}
            // height={50}
            options={{
              title: {
                display: true,
                text:
                  "Chart showing the total sales (in dollars) for each menu item",
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
        </Card>

        <Card
          style={{ marginTop: "3rem", marginBottom: "6rem" }}
          body
          outline
          color="info"
        >
          <Bar
            data={this.state.stockChartData}
            // width={100}
            // height={50}
            options={{
              title: {
                display: true,
                text:
                  "Chart showing the total sales (i.e.count of items) for each menu item",
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
        </Card>
      </Container>
    );
  }
}

export default Chart;
