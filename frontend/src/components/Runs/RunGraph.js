import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

function RunGraph({ runningData }) {
  const svgRef = useRef();

  // useEffect(() => {
  //   const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  //   const width = 600 - margin.left - margin.right;
  //   const height = 400 - margin.top - margin.bottom;

  //   const svg = d3.select(svgRef.current)
  //     .attr('width', width + margin.left + margin.right)
  //     .attr('height', height + margin.top + margin.bottom)
  //     .append('g')
  //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //   const xScale = d3.scaleLinear()
  //     .domain([0, runningData.length])
  //     .range([0, width]);

  //   const yScale = d3.scaleLinear()
  //     .domain([0, d3.max(runningData, d => d.time)])
  //     .range([height, 0]);

  //   const line = d3.line()
  //     .x((d, i) => xScale(i))
  //     .y(d => yScale(d.time));

  //   svg.append('path')
  //     .datum(runningData)
  //     .attr('class', 'line')
  //     .attr('d', line)
  //     .attr('fill', 'none')
  //     .attr('stroke', 'steelblue');

  //   svg.append('g')
  //     .attr('transform', 'translate(0,' + height + ')')
  //     .call(d3.axisBottom(xScale));

  //   svg.append('g')
  //     .call(d3.axisLeft(yScale));
  // }, [runningData]);

  return <svg ref={svgRef} />;
}

export default RunGraph;
