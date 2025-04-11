import axios from '../configs/axios';

export const getAllData = ({ page = 1, items = 10, from, to }) => {
    return axios.get(`/analyst?page=${page}&items=${items}` + (from && to ? `&from=${from}&to=${to}` : ''));
}

export const turnFanOnOff = (status) => {
    return axios.patch(`/send/fan?data=${status}`,);
}

export const turnPumpOnOff = (status) => {
    return axios.patch(`/send/pump?data=${status}`,);
}