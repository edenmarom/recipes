import React, { Component } from "react";
import CanvasJSReact from "../utils/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dataPoints = [];
const GraphHeder = "Recipes Per User";

class Graph extends Component {
  render() {
    const options = {
      theme: "light2",
      title: {
        text: GraphHeder,
      },
      animationEnabled: true,
      exportEnabled: true,
      data: [
        {
          type: "column",
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "#,##0.00",
          dataPoints: dataPoints,
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }

  componentDidMount() {
    // TODO Get DATA FROM SERVER
    var chart = this.chart;
    fetch("https://canvasjs.com/data/gallery/react/nifty-stock-price.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < data.length; i++) {
          dataPoints.push({
            x: new Date(data[i].x),
            y: data[i].y,
          });
        }
        chart.render();
      });
  }
}

export default Graph;
