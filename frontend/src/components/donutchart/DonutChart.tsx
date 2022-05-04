import React from 'react';
import Chart from 'react-apexcharts';

type ChartProps = {
    labels: string[];
    series: number[];
}

const DonutChart = (props: ChartProps) => {
    const options = {
        legend: {
            show: true,
        }
    }

    return (
        <Chart 
            options={{...options, labels: props.labels, legend: { position: 'bottom' }}}
            series={props.series}
            type="donut"
            height="350"
            width="350"
        />

    );
}

export default DonutChart;