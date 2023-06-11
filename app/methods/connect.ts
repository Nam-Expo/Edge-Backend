import axios, { AxiosRequestConfig } from "axios";

export const connect = (config: AxiosRequestConfig) => {
	return axios.request(config);
};
