import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Box } from '@mui/material';

const dataset = [
  { x: '2024-05-10 12:58:24', pressure: 101.23, humidity: 60, temperature: 32 },
  { x: '2024-05-10 14:15:00', pressure: 101.35, humidity: 65, temperature: 22 },
];

export default function Charts() {
  return (
    <Box sx={{ width: '60%', minWidth: '560px' }}>
      <LineChart
        sx={{
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.line}`]: {
              stroke: 'white'
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: 'white'
            },
          },
        }}
        height={300}
        dataset={dataset}
        series={[
          { dataKey: 'pressure', label: 'Pressure x10 [hPa]' },
          { dataKey: 'humidity', label: 'Humidity [%]' },
          { dataKey: 'temperature', label: 'Temperature [°C]' }
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: dataset.map(item => item.x),
            labelStyle: { fill: 'white' } 
          },
        ]}
        yAxis={[
          {
            
            labelStyle: { fill: 'white' }
          },
        ]}
        margin={{ top: 10, right: 60, bottom: 30, left: 60 }}
        slotProps={{
          legend: {
            labelStyle: {
              fill: 'white'
            }
          }
        }}
      />
    </Box>
  );
}