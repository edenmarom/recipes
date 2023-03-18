import React, { Component } from "react";
import CanvasJSReact from "../utils/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dataPoints = [];
const GraphHeder = "Number Of Recipes Per User";

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

  async componentDidMount() {
    // TODO Get DATA FROM SERVER fetch - > (serverAddress + "/graph")
    var chart = this.chart;
    try {
      let result = await fetch(
        "https://canvasjs.com/data/gallery/react/nifty-stock-price.json"
      );
      //TODO result = result.data
      result = await result.json();
      for (var i = 0; i < result.length; i++) {
        dataPoints.push({
          //TODO result[i].x ->  result[i]._id result[i].y ->  result[i].count
          //TODO result[i].y ->  result[i].count
          x: result[i].x,
          y: result[i].y,
        });
      }
      chart.render();
    } catch (err) {
      console.log("Could not fetch graph data.");
      console.log("Error: " + err);
    }
  }
}

export default Graph;
