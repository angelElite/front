import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react';

const CustomBarChart = ({ metrajeI, metrajeF, idCarrete }) => {
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: metrajeI, label: "metraje", id: "metrajeId" },
        { data: metrajeF, label: "metraje usado", id: "metrajeUsadoId" },
      ]}
      xAxis={[{ data: idCarrete, scaleType: "carretes" }]}
    />
  );
};

export default CustomBarChart;
