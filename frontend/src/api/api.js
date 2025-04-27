import axios from '../configs/axios';

export const getAllData = ({ page = 1, items = 10, from, to }) => {
    return axios.get(`/analyst?page=${page}&items=${items}` + (from && to ? `&from=${from}&to=${to}` : ''));
}

export const getFanStatus = () => {
    return axios.get('/equipment-status?value=fan');
}

export const getPumpStatus = () => {
    return axios.get('/equipment-status?value=pump');
}

export const controlFan = (status) => {
    return axios.patch(`/control/fan?data=${status}`,);
}

export const controlPump = (status) => {
    return axios.patch(`/control/pump?data=${status}`,);
}

export const assistant = (input) => {
    return axios.post(`/agent`, JSON.stringify({ message: { text: input } }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}