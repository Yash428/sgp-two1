import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DonutChart = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius*0.5);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const arcs = g.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label));

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(d => d.data.label);
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default DonutChart;