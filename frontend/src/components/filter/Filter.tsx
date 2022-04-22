import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Store } from '../../types/types';
import { makeRequest } from '../../utils/requests';
import './Filter.css';

export type StoreFilterData = {
    name: Store | null;
}

type Props = {
    onSubmitFilter: (data: StoreFilterData) => void;
};

const Filter = ({ onSubmitFilter }: Props) => {
    const [selectStore, setSelectStore] = useState<Store[]>([]);

    const { handleSubmit, setValue, getValues, control } =
        useForm<StoreFilterData>();

    useEffect(() => {
        makeRequest
            .get<Store[]>('/stores')
            .then((response) => {
                setSelectStore(response.data);
            });
    }, []);

    const onSubmit = (formData: StoreFilterData) => {
        onSubmitFilter(formData);
    };

    const handleChangeGenre = (value: Store) => {
        setValue('name', value);
        const obj: StoreFilterData = {
            name: getValues('name'),
        };

        onSubmitFilter(obj);
    };


    return (
        <div className="store-list-select-container base-card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={selectStore}
                            classNamePrefix="store-list-select"
                            isClearable
                            placeholder="Store"
                            onChange={(value) => handleChangeGenre(value as Store)}
                            getOptionLabel={(store: Store) => store.name}
                            getOptionValue={(store: Store) => String(store.id)}
                        />
                    )}
                />
            </form>
        </div>
    );
};

export default Filter;