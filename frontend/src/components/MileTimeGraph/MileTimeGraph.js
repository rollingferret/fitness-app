import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function MileTimeGraph({ runs }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!Array.isArray(runs) || runs.length === 0) {
      return;
    }

    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleTime()
      .domain(d3.extent(runs, d => new Date(d.createdAt)))
      .range([0, width]);

    const mileTimes = runs.map(run => {
      const totalMinutes = run.hours * 60 + run.minutes + run.seconds / 60;
      return { createdAt: run.createdAt, mileTime: totalMinutes / (run.distance / 1.60934) }; // Convert km to miles
    });

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(mileTimes, d => d.mileTime)])
      .range([height, 0]);

    const line = d3.line()
      .x(d => xScale(new Date(d.createdAt)))
      .y(d => yScale(d.mileTime));

    svg.append('path')
      .datum(mileTimes)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'orange');

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale));

    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('x', width)
      .attr('y', height + margin.bottom - 10)
      .text('Date');

    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20)
      .attr('x', -margin.top)
      .text('Mile Time (min/mile)');
  }, [runs]);

  return <svg ref={svgRef}></svg>;
}

export default MileTimeGraph;
