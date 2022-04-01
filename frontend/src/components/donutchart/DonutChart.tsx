import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SalesByGender } from '../../types/types';
import { makeRequest } from '../../utils/requests';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {
    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    

    useEffect(() => {
        makeRequest
            .get<SalesByGender[]>('/sales/by-gender')
            .then((response) => {
                const data = response.data as SalesByGender[];
                const myLabels = data.map(x => x.gender);
                const mySeries = data.map(x => x.sum);

                setChartData({ labels: myLabels, series: mySeries });
            })
    }, []);

    const options = {
        legend: {
            show: true,
        }
    }

    return (
        <Chart 
            options={{...options, labels: chartData.labels}}
            series={chartData.series}
            type="donut"
            height="400"
            width="400"
        />

    );
}

export default DonutChart;