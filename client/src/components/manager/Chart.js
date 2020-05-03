import React, { Component } from "react";
import {
  Bar,
  // Line,
  // Pie
} from "react-chartjs-2";
import { Container, Card, Row, Col, Button, Alert } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

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
      quantity_sold: [],
      total_sales: [],
    };
  }

  populateCostChart = () => {
    console.log("populateChart", this.state.items);
    console.log("ARRAY LENGTH", this.state.items.length);

    let size = this.state.items.length;
    for (let i = 0; i < size; i++) {
      this.setState({
        name: [...this.state.name, this.state.items[i].item_name],
        total_sales: [
          ...this.state.total_sales,
          this.state.items[i].total_sales,
        ],
      });
    }

    console.log("NAMES: ", this.state.name);
    console.log("TOTAL SALES: ", this.state.total_sales);

    this.setState({
      costChartData: {
        labels: this.state.name,

        datasets: [
          {
            label: "Total Sales in dollars($)",
            data: this.state.total_sales,
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
        quantity_sold: [
          ...this.state.quantity_sold,
          this.state.items[i].quantity_sold,
        ],
      });
    }
    console.log("QUANTITY SOLD: ", this.state.quantity_sold);

    this.setState({
      stockChartData: {
        labels: this.state.name,

        datasets: [
          {
            label: "Total Amount Sold",
            data: this.state.quantity_sold,
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
      .get("/item_orders")
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
    const pass = this.props.loggedInStatus;

    if (pass === "NOT _LOGGED_IN") {
      return (
        <div>
          <h1>
            YOU ARE NOT LOGGED IN. PLEASE <Link to="/">LOGIN</Link>
          </h1>
        </div>
      );
    } else {
      return (
        <Container>
          <h1>
            <Alert color="dark">CUPS APPLICATION CHARTS</Alert>
          </h1>

          <Row>
            <Col>
              <Link to="/list">
                <Button className="mt-4 mb-3" color="dark" block>
                  VIEW/EDIT ITEMS
                </Button>
              </Link>
            </Col>
            <Col>
              <Link to="/add">
                <Button className="mt-4 mb-3" color="dark" block>
                  ADD ITEM
                </Button>
              </Link>
            </Col>
          </Row>

          <Card
            style={{ marginTop: "1rem", marginBottom: "3rem" }}
            body
            outline
            color="primary"
          >
            <Bar
              data={this.state.costChartData}
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
            style={{ marginTop: "3rem", marginBottom: "3rem" }}
            body
            outline
            color="info"
          >
            <Bar
              data={this.state.stockChartData}
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

          <Link to="/control">
            <Button color="dark" block>
              MANAGER CONTROL CENTER
            </Button>
          </Link>
        </Container>
      );
    }
  }
}

export default Chart;
