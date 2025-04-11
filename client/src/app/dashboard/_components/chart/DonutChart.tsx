import React from "react";

import ReactECharts from "echarts-for-react";

import { UserTypeSchema } from "@/types/user";

import { itemStyleMap, radiusMap } from "./map";

interface DonutChartProps {
  title: string;
  distribution: UserTypeSchema[];
}

export function DonutChart({ title, distribution }: DonutChartProps) {
  const gapColor = "#5F5F5F";

  const seriesData = distribution.map((item) => ({
    name: item.type,
    type: "pie",
    value: item.percentage,
    radius: radiusMap[item.type],
    label: { show: false },
    data: [
      {
        value: item.percentage,
        name: item.type,
        itemStyle: { color: itemStyleMap[item.type] },
      },
      {
        value: 100 - item.percentage,
        name: "",
        itemStyle: { color: gapColor },
      },
    ],
  }));

  const option = {
    title: {
      text: title,
      left: "center",
      top: "center",
      textStyle: {
        color: "#FCFCFC",
        fontSize: "2rem",
        fontWeight: "bold",
        lineHeight: 30,
        align: "center",
      },
    },
    series: seriesData,

    // This way of implementing the legends
    // is part of the component's implementation,
    // but I couldn't find a way within its setup
    // that stays faithful to the Figma design.

    // legend: {
    //   orient: "vertical",
    //   right: 0,
    //   top: "middle",
    //   textStyle: {
    //     color: "#FCFCFC",
    //     fontSize: 14,
    //     fontFamily: "Inter",
    //     letterSpacing: "1rem",
    //   },
    //   formatter: (name: string) => {
    //     const item = distribution.find((d) => d.type === name);
    //     if (!item) return name;
    //     const total = distribution.reduce((acc, cur) => acc + cur.percentage, 0);
    //     const percent = ((item.percentage / total) * 100).toFixed(0);
    //     return `${name} (${percent}%)`;
    //   },
    //   icon: "circle",
    //   data: distribution.map((d) => `${d.type}`),
    // },
  };

  return <ReactECharts option={option} style={{ height: "20rem" }} />;
}
