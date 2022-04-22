import { useEffect, useMemo, useState } from 'react';
import DonutChart from '../../components/donutchart/DonutChart';
import Filter, { StoreFilterData } from '../../components/filter/Filter';
import { SalesSummary } from '../../types/types';
import { makeRequest } from '../../utils/requests';
import './Home.css';

const initialSummary = {
    avg: 0,
    count: 0,
    max: 0,
    min: 0
  };

const Home = () => {
    const [summary, setSummary] = useState<SalesSummary>(initialSummary);
    const [filterData, setFilterData] = useState<StoreFilterData>();

    const params = useMemo(() => (filterData), [filterData]);

    useEffect(() => {
        makeRequest
            .get<SalesSummary>('/sales/summary', {params})
            .then((response) => {
                setSummary(response.data);
            })
    }, [params]);

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
                    <DonutChart />
                </div>
            </div>
        </div>
    );
}

export default Home;