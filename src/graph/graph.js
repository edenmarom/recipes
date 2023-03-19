import React, { Component } from "react";
import CanvasJSReact from "../utils/canvasjs.react";
import { serverAddress } from "../utils/http-communication";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dataPoints = [];
let UserCounter = 0;
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
    var chart = this.chart;
    try {
      let result = await fetch(serverAddress + "/graph");
      result = await result.json();
      UserCounter = 0;
      dataPoints.splice(0, dataPoints.length);
      for (var i = 0; i < result.data.length; i++) {
        UserCounter++;
        dataPoints.push({
          x: UserCounter,
          y: result.data[i].count,
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
