import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { jsonData, jsonTwitterData } from "./data/data";

const EngagementChart = ({ platform }) => {
  const [data, setData] = useState(jsonData); // Initial data, replace with fetched data as needed

  useEffect(() => {
    // Fetch data if needed
    // Example: Fetch data and update state
    /*
    fetch("your_data_api_url")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    */
  }, []); // Empty dependency array ensures this effect runs once

  // Choose data based on platform
  if (platform === "twitter") {
    setData(jsonTwitterData);
  }

  // Extracting necessary data for the chart
  const currentData = data.data.series.current;
  const prevData = data.data.series.prev;

  const chartData = currentData.map((item, index) => ({
    date: item.date, // Assuming 'date' field is available in your data
    currentER: item.er,
    prevER: prevData[index].er,
    currentInteractions: item.deltaInteractions,
    prevInteractions: prevData[index].deltaInteractions,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 12 }}
          label={{
            value: "Engagement Rate",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fontSize: 14, fill: "#666" },
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 12 }}
          label={{
            value: "Interactions",
            angle: 90,
            position: "insideRight",
            style: { textAnchor: "middle", fontSize: 14, fill: "#666" },
          }}
        />

        <Tooltip contentStyle={{ fontSize: 14 }} />
        <Legend
          align="center"
          verticalAlign="top"
          iconType="circle"
          wrapperStyle={{ paddingBottom: 20 }}
        />

        <Line
          type="monotone"
          dataKey="currentER"
          stroke="#8884d8"
          yAxisId="left"
          dot={false} // Remove dots on the line if not needed
        />
        <Line
          type="monotone"
          dataKey="prevER"
          stroke="#82ca9d"
          yAxisId="left"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="currentInteractions"
          stroke="#ffc658"
          yAxisId="right"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="prevInteractions"
          stroke="#ff7300"
          yAxisId="right"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EngagementChart;
