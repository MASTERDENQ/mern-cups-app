// import React, { Component } from "react";
// import { Bar } from "react-chartjs-2";

// class BarGraph extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       isLoaded: false
//     };

//     this.xLabels = [];
//     this.barData = [];
//   }

//   setChartData = (xLabels, barData) => {
//     this.setState = {
//       chartData: {
//         labels: xLabels,
//         datasets: [
//           {
//             label: "Items Total Sales (Test)",
//             data: barData
//           }
//         ]
//       }
//     };
//   };

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then(res => {
//         console.log("Trigger 1");
//         res.json();
//       })
//       .then(json => {
//         // this.se
//         this.setState({
//           isLoaded: !this.state.isLoaded,
//           items: json
//         });
//         console.log("Trigger 2");
//       });

//     this.state.items.map(item => this.xLabels.push(item.username));

//     this.state.items.map(item => this.barData.push(item.id));

//     this.setChartData(this.xLabels, this.barData);
//   }

//   render() {
//     if (!this.state.isLoaded) {
//       return (
//         <div>
//           <h1>Loading Graph</h1>
//         </div>
//       );
//     } else {
//       return (
//         <div className="MainBody">
//           <Bar
//             data={this.state.chartData}
//             options={{
//               maintainAspectRatio: false
//             }}
//           />
//         </div>
//       );
//     }
//   }
// }

// export default BarGraph;
