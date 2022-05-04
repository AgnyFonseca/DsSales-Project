import { useEffect, useMemo, useState } from 'react';
import DonutChart from '../../components/donutchart/DonutChart';
import Filter, { StoreFilterData } from '../../components/filter/Filter';
import { SalesByGender, SalesSummary } from '../../types/types';
import { makeRequest } from '../../utils/requests';
import './Home.css';

const initialSummary = {
    avg: 0,
    count: 0,
    max: 0,
    min: 0
  };

  type ChartData = {
    labels: string[];
    series: number[];
}

const Home = () => {
    const [summary, setSummary] = useState<SalesSummary>(initialSummary);
    const [filterData, setFilterData] = useState<StoreFilterData>();
    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    const params = useMemo(() => (filterData), [filterData]);

    useEffect(() => {
        makeRequest
            .get<SalesSummary>('/sales/summary', {params})
            .then((response) => {
                setSummary(response.data);
            })
    }, [params]);

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

    const onFilterChange = (filter: StoreFilterData) => {
        setFilterData(filter);
      };

    return (
        <div className="home-container">
            <div className="base-card filter-card">
                <Filter onSubmitFilter={onFilterChange} />
            </div>
            <div className="base-card home-card">
                <div className="home-content">
                    <h1>R$ {summary.sum}</h1>
                    <h1>{filterData?.name?.id}</h1>
                    <p>Total de vendas</p>
                </div>
                <div className="home-chart">
                    <DonutChart labels={chartData.labels} series={chartData.series} />
                </div>
            </div>
        </div>
    );
}

export default Home;