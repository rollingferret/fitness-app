import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function RunGraph({ runs }) {
  const svgRef = useRef();

 useEffect(() => {
    if (!Array.isArray(runs) || runs.length === 0) {
      return;
    }

    const margin = { top: 20, right: 20, bottom: 60, left: 60 }; // Adjusted margins for labels
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear existing SVG to avoid duplications
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

      const xScale = d3.scaleLinear()
      .domain([0, runs.length - 1]) // Range from 0 to the number of runs minus 1
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(runs, d => d.distance)])
      .range([height, 0]);

      const line = d3.line()
      .x((d, i) => xScale(i)) // Use the index 'i' for the x value
      .y(d => yScale(d.distance));

    svg.append('path')
      .datum(runs)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue');

    // X-axis
    svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(runs.length).tickFormat(i => `Run ${i + 1}`));


    // Y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // X-axis label
    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('x', width)
      .attr('y', height + margin.bottom - 10)
      .text('Run Number');

    // Y-axis label
    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20)
      .attr('x', -margin.top)
      .text('Distance (km)');
  }, [runs]);

  return <svg ref={svgRef}></svg>;
}

export default RunGraph;