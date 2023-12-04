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
  
      // Update xScale to be linear based on the run index
      const xScale = d3.scaleLinear()
        .domain([0, runs.length - 1])
        .range([0, width]);
  
      const mileTimes = runs.map(run => {
        const totalMinutes = run.hours * 60 + run.minutes + run.seconds / 60;
        return { mileTime: totalMinutes / (run.distance / 1.60934) }; // Convert km to miles
      });
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(mileTimes, d => d.mileTime)])
        .range([height, 0]);
  
      const line = d3.line()
        .x((_, i) => xScale(i)) // Use the index for the x value
        .y(d => yScale(d.mileTime));
  
      svg.append('path')
        .datum(mileTimes)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'orange');
  
      // X-axis for the run numbers
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
        .attr('fill', 'white')
        .text('Run Number');
  
      // Y-axis label
      svg.append('text')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 20)
        .attr('x', -margin.top)
        .attr('fill', 'white')
        .text('Mile Time (min/mile)');
    }, [runs]);
  
    return <svg ref={svgRef}></svg>;
  }  

export default MileTimeGraph;
