import React from 'react';
import Chart from 'react-apexcharts';

type ChartData = {
    labels: string[];
    series: number[];
}

type Props = {
    labels?: string[];
    name: string;
    series?: number[];
  };

const DonutChart = () => {
    // const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    // useEffect(() => {
    //     axios.get(`${BASE_URL}/sales/amount-by-seller`)
    //         .then(response => {
    //             const data = response.data as SaleSum[];
    //             const myLabels = data.map(x => x.sellerName);
    //             const mySeries = data.map(x => x.sum);

    //             setChartData({ labels: myLabels, series: mySeries });
    //         });
    // }, []);

   
    // const options = {
    //     legend: {
    //         show: true
    //     }
    // }

    const mockData = {
        series: [477138, 499928, 444867, 220426, 473088],
        labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    }

    const options = {
        legend: {
            show: true,
        }
    }

    return (
        <Chart 
            options={{...options, labels: mockData.labels}}
            series={mockData.series}
            type="donut"
            height="400"
            width="400"
        />

    );
}

export default DonutChart;