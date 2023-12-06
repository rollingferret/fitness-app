
---

# Run Tracker App

## Table of Contents
1. [Introduction](#introduction)
2. [Live Demo](#live-demo)
3. [Technologies Used](#technologies-used)
4. [Key Features](#key-features)
    - [4.1 Run Data Management](#41-run-data-management)
    - [4.2 Data Visualization with D3.js](#42-data-visualization-with-d3js)
5. [Code Snippets](#code-snippets)
6. [Future Directions](#future-directions)

## Introduction
The Run Tracker App is a MERN-based web application designed that enables runners to track and analyze their running sessions. Users can log their runs, update previous runs, see other User's runs, view detailed statistics, and visualize their progress over time. 

## Live Demo
[Click here to view the app](#) ([])

## Technologies Used
- **MongoDB:** NoSQL database used for storing user and run data.
- **Express.js:** Web application framework for Node.js, used for building the API.
- **React:** Front-end JavaScript library used for building the user interface.
- **Node.js:** JavaScript runtime for executing server-side JavaScript.
- **D3.js:** JavaScript library for producing dynamic, interactive data visualizations.

## Key Features

### 4.1 Run Data Management
Users can create, view, update, and delete run entries. Each run entry includes details such as distance and run time. In an attempt to efficiently handle CRUD operations and ensure data integrity, we used Mongoose for MongoDB object modeling and Express routes to manage API requests and responses.

#### Code Snippet
```javascript
// Run creation in Express
router.post('/', requireUser, validateRunInput, async (req, res, next) => {
  // ...
  const newRun = new Run({
    author: req.user._id,
    distance,
    hours,
    minutes,
    seconds
  });
  // ...
});
```

### 4.2 Data Visualization with D3.js
A key feature of our app is the visualization of run data using D3.js. D3 enabled us to create dynamic, interactive graphs that automatically update with new run data.

#### Code Snippet
```javascript
// Mile Time Graph Component using D3.js
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
        return { mileTime: totalMinutes / (run.distance / 1.60934) }; // Converts km to miles
      });

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(mileTimes, d => d.mileTime)])
        .range([height, 0]);

      const line = d3.line()
        .x((_, i) => xScale(i)) // Uses the index for the x value
        .y(d => yScale(d.mileTime));

        svg.append('path')
        .datum(mileTimes)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 2) // Initial stroke width
        .transition()
        .duration(2000);

      svg.select('path') // Selects the path that was appended
        .attr('stroke-width', 5); // Final stroke width

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

```

## Future Directions
- Integration with external APIs (ex. Google Maps) for run tracking and workout construction.
- Social features to connect with other runners.
- Advanced analytics for more in-depth insights into run patterns and progress.

## Team Members
- **Naoko Sugawara:** Name and Background / Picture
- **Neel Kachalia:** Name and Background / Picture
- **Akash Pulluru:** Front-end JavaScript library used for building the user interface.



---


