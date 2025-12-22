import React from 'react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

// Radial Chart Component
const RadialChart = ({ value, label, description } : any) => {
    const chartData = [{ value, fill: "#3b82f6" }];

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-44 h-44">
                <RadialBarChart
                    width={176}
                    height={176}
                    innerRadius="70%"
                    outerRadius="90%"
                    data={chartData}
                    startAngle={90}
                    endAngle={90 + (360 * value) / 100}
                >
                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                        <Label
                            content={({ viewBox } : any) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-[#1e40af] text-4xl font-bold"
                                            >
                                                {value}%
                                            </tspan>
                                        </text>
                                    );
                                }
                            }}
                        />
                    </PolarRadiusAxis>
                    <RadialBar
                        dataKey="value"
                        stackId="a"
                        cornerRadius={10}
                        fill="#3b82f6"
                        className="stroke-transparent stroke-2"
                        background={{ fill: "#d1d5db" }}
                    />
                </RadialBarChart>
            </div>

            <div className="text-center max-w-[200px]">
                <p className="text-sm text-gray-600 mb-1">{description}</p>
                <h3 className="text-base font-semibold text-[#1e40af]">{label}</h3>
            </div>
        </div>
    );
};

// Main Statistics Section Component
const RadialStatsSection = ({ title, stats } : any) => {
    return (
        <div className="w-full py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {title && (
                    <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">
                        {title}
                    </h2>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {stats.map((stat : any, index : number) => (
                        <RadialChart
                            key={index}
                            value={stat.value}
                            label={stat.label}
                            description={stat.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RadialStatsSection