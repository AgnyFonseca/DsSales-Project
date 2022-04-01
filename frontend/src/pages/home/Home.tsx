import { useEffect, useState } from 'react';
import DonutChart from '../../components/donutchart/DonutChart';
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


    useEffect(() => {
        makeRequest
            .get<SalesSummary>('/sales/summary')
            .then((response) => {
                setSummary(response.data);
            })
    }, []);



    return (
        <div className="home-container">
            <div className="base-card">
                <h1>Filter</h1>
            </div>
            <div className="base-card home-card">
                <div className="home-content">
                    <h1>R$ {summary?.sum}</h1>
                    <p>Total de vendas</p>
                </div>
                <div className="home-chart">
                    <h1>Chart</h1>
                    <DonutChart />
                </div>
            </div>
        </div>
    );
}

export default Home;