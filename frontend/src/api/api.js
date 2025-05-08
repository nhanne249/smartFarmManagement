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

export const controlFan = (value) => {
    return axios.patch(`/control/fan?data=${value}`,);
}

export const controlPump = (value) => {
    return axios.patch(`/control/pump?data=${value}`,);
}

export const assistant = (input, context) => {
    return axios.post(`/agent`, JSON.stringify({ message: { input: input, context: context } }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}