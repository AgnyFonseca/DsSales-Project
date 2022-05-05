import { useState } from 'react';
import Filter from '../../components/filter/Filter';
import SalesSummaryComponent from '../../components/sales-summary/SalesSummaryComponent';
import { Store } from '../../types/types';
import './Home.css';

const Home = () => {
  const [filterData, setFilterData] = useState<Store>();

  const onFilterChange = (filter: Store) => {
    setFilterData(filter);
  };

  return (
    <div className="home-container">
      <div className="base-card filter-card">
        <Filter onSubmitFilter={onFilterChange} />
      </div>
      <SalesSummaryComponent store={filterData} />
    </div>
  );
};

export default Home;
