import DonutChart from '../../components/donutchart/DonutChart';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="base-card">
                <h1>Filter</h1>
            </div>
            <div className="base-card home-card">
                <div className="home-content">
                    <h1>R$ 746.484,00</h1>
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