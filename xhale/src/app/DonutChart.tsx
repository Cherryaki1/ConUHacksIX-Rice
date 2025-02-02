"use client";
import React, { useEffect, useRef } from 'react';

interface DonutChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
  animationDuration?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  animationDuration = 1000,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const circumference = size * Math.PI * 0.4;

  useEffect(() => {
    if (!svgRef.current) return;

    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    let offset = 0;
    data.forEach((item, index) => {
      const percentage = (item.value / total) * 100;
      const dashOffset = circumference * (1 - percentage / 100);
      const circle = svgRef.current!.children[index] as SVGCircleElement;

      circle.style.strokeDashoffset = String(circumference);
      circle.style.transition = `stroke-dashoffset ${animationDuration}ms ease-in-out`;

      setTimeout(() => {
        circle.style.strokeDashoffset = String(dashOffset);
      }, 10);

      offset += percentage;
    });
  }, [data, circumference, animationDuration]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} ref={svgRef}>
      {data.map((item, index) => {
        const total = data.reduce((acc, curr) => acc + curr.value, 0);
        const percentage = (item.value / total) * 100;
        const radius = size * 0.4;
        const strokeWidth = size * 0.2;
        const circumference = radius * 2 * Math.PI;
        const dashArray = circumference;
        const dashOffset = circumference * (1 - percentage / 100);
        let offset = 0;
        for (let i = 0; i < index; i++) {
          offset += (data[i].value / total) * 100;
        }
        const startAngle = (offset / 100) * 360;
        return (
          <circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={circumference}
            transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        );
      })}
    </svg>
  );
};

export default DonutChart;
