import axios from "axios";
import { Store } from "../types/types";

const baseURL = 'http://localhost:8080';

export const makeRequest = axios.create({
    baseURL
});

export const buildFilterParams = (store?: Store) => {
    return {
       storeId: store?.id
    };
 };