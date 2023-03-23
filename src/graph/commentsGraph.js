import React, { Component } from "react";
import CanvasJSReact from "../utils/canvasjs.react";
import { serverAddress } from "../utils/http-communication";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dataPoints = [];
const GraphHeder = "Number Of Comments Per Recipe";

class CommentsGraph extends Component {
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
      let result = await fetch(serverAddress + "/comment-count");
      result = await result.json();
      dataPoints.splice(0, dataPoints.length);
      for (var i = 0; i < result.data.length; i++) {
        dataPoints.push({
          x: result.data[i].id,
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

export default CommentsGraph;
