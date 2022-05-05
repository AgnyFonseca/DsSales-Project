import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Store } from '../../types/types';
import { makeRequest } from '../../utils/requests';
import './Filter.css';

type Props = {
  onSubmitFilter: (data: Store) => void;
};

const Filter = ({ onSubmitFilter }: Props) => {
  const [selectStore, setSelectStore] = useState<Store[]>([]);

  const handleChangeStore = (value: Store) => {
    onSubmitFilter(value);
  };

  useEffect(() => {
    makeRequest.get<Store[]>('/stores').then((response) => {
      setSelectStore(response.data);
    });
  }, []);

  return (
    <div className="store-list-select-container base-card">
      <Select
        options={selectStore}
        classNamePrefix="store-list-select"
        isClearable
        placeholder="Store"
        onChange={(value) => handleChangeStore(value as Store)}
        getOptionLabel={(store: Store) => store.name}
        getOptionValue={(store: Store) => String(store.id)}
      />
    </div>
  );
};

export default Filter;
