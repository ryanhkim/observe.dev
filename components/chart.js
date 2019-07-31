import React from "react";
import * as d3 from "d3";

/**
 * d3.js scatterplot component to visualize annotations
 */
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /**
     * numberFormatter: function to style single digits number with a preceding 0
     *
     * @param {*} num : number to style
     */

    let vidLengthArray = this.props.vidLength.split(":");
    let vidLengthHour = Number(vidLengthArray[0]);
    let vidLengthMinute = Number(vidLengthArray[1]);
    let vidLengthSecond = Number(vidLengthArray[2]);
    let randomColor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);

    let videoStart = 0;
    let videoLength =
      vidLengthHour * 60 * 60 + vidLengthMinute * 60 + vidLengthSecond;

    var numberFormatter = num => {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    };

    let timeData = this.props.annotations.map(x => ({
      start:
        Number(x.Duration.start.hours) * 60 * 60 +
        Number(x.Duration.start.minutes) * 60 +
        Number(x.Duration.start.seconds),
      end:
        Number(x.Duration.end.hours) * 60 * 60 +
        Number(x.Duration.end.minutes) * 60 +
        Number(x.Duration.end.seconds),
      tag: x.Tags.join(", ")
    }));
    console.log(timeData);

    timeData = timeData.map(x => ({
      ...x,
      scale: d3
        .scaleLinear()
        .domain([x.start, x.end])
        .range([0, videoLength])
    }));
    console.log(timeData);

    // restructuring to an array [each annotation] with an array [with time start and time end dates as only values]

    // Tooltip
    var tooltip = d3
      .select("#ann-tooltip")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var mouseover = function(d) {
      tooltip.style("opacity", 1);
    };

    var mousemove = function(d) {
      tooltip
        .html(
          "Detailed Annotation: " +
            numberFormatter(d.values.start.getHours()) +
            ":" +
            numberFormatter(d.values.start.getMinutes()) +
            ":" +
            numberFormatter(d.values.start.getSeconds()) +
            " until " +
            numberFormatter(d.values.end.getHours()) +
            ":" +
            numberFormatter(d.values.end.getMinutes()) +
            ":" +
            numberFormatter(d.values.end.getSeconds()) +
            " - " +
            d.values.tag
        )
        .style("left", "37%")
        .style("top", "75%");
    };

    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var mouseleave = function(d) {
      tooltip
        .transition()
        .duration(1000)
        .style("opacity", 0);
    };

    var mouseclick = d => {
      const totalStartSec =
        Number(d.values.start.getHours() * 60 * 60) +
        Number(d.values.start.getMinutes() * 60) +
        Number(d.values.start.getSeconds());
      this.props.passedSeek(totalStartSec);
    };

    var m = [20, 15, 15, 120], //top right bottom left
      w = 960 - m[1] - m[3],
      h = 500 - m[0] - m[2],
      miniHeight = 12 + 50,
      mainHeight = h - miniHeight - 50;

    var chart = d3
      .select("#ann-visual")
      .append("svg")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
      .attr("class", "chart");

    var mini = chart
      .append("g")
      .attr("transform", "translate(" + m[3] + "," + (mainHeight + m[0]) + ")")
      .attr("width", w)
      .attr("height", miniHeight)
      .attr("class", "mini");

    //mini item rects
    mini
      .append("g")
      .selectAll("dot")

      .data(timeData)
      .enter()
      .append("rect")
      .attr("class", function(d) {
        console.log(d);
        return "miniItem" + d.tag;
      })
      .attr("x", function(d) {
        return d.scale(d.start);
      })
      .attr("width", function(d) {
        console.log(d);
        return d.scale(d.end - d.start);
      })
      .attr("height", 10);
  }

  render() {
    return <div />;
  }
}
