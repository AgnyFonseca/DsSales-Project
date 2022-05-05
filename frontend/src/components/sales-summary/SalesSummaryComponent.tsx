import { useEffect, useMemo, useState } from 'react';
import { SalesByGender, SalesSummary, Store } from '../../types/types';
import { buildFilterParams, makeRequest } from '../../utils/requests';
import DonutChart from '../donutchart/DonutChart';
import './SalesSummaryComponent.css';

type ChartData = {
  labels: string[];
  series: number[];
};

type Props = {
  store?: Store;
};

const SalesSummaryComponent = ({ store }: Props) => {
  const [summary, setSummary] = useState<SalesSummary>();
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    series: [],
  });

  const params = useMemo(() => buildFilterParams(store), [store]);

  useEffect(() => {
    makeRequest
      .get<SalesSummary>('/sales/summary', { params })
      .then((response) => {
        setSummary(response.data);
      });
  }, [params]);

  useEffect(() => {
    makeRequest
      .get<SalesByGender[]>('/sales/by-gender', { params })
      .then((response) => {
        const data = response.data as SalesByGender[];
        const myLabels = data.map((x) => x.gender);
        const mySeries = data.map((x) => x.sum);

        setChartData({ labels: myLabels, series: mySeries });
      });
  }, [params]);

  return (
    <div className="base-card sales-summary-card">
      <div className="sales-summary-content">
        <h1>R$ {summary?.sum}</h1>
        <p>Total de vendas</p>
      </div>
      <div className="sales-summary-chart">
        <DonutChart labels={chartData.labels} series={chartData.series} />
      </div>
    </div>
  );
};

export default SalesSummaryComponent;
