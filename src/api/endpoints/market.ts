import type { AxiosRequestConfig } from 'axios';
import type { IListResult, IMarketInfo } from '../types';
import { axiosInstance } from '../axios';

type ID = string | number;

interface IGetOrdersParams {
  marketId: ID;
  type: 'buy' | 'sell';
}

interface IGetTransactionsParams {
  marketId: ID;
}

export const getMarkets = (config?: AxiosRequestConfig) => {
  return axiosInstance.get<IListResult<IMarketInfo>>('/v1/mkt/markets/', config);
};

export const getMarketOrders = ({ marketId, type }: IGetOrdersParams, config?: AxiosRequestConfig) => {
  return axiosInstance.get(`/v2/mth/actives/${marketId}/?type=${type}`, config);
};

export const getMarketTransactions = ({ marketId }: IGetTransactionsParams, config?: AxiosRequestConfig) => {
  return axiosInstance.get(`/v1/mth/matches/${marketId}/`, config);
};
