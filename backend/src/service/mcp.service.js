import axios from 'axios';

const equipment = [process.env.BBC_FAN, process.env.BBC_PUMP];
export const getEquipmentLatestStatus = async () => {
    const response = {};
    for (const item of equipment) {
        const res = await axios.get(`https://io.adafruit.com/api/v2/${item}/data/last`, {
            headers: {
                'X-AIO-Key': process.env.ADAFRUIT_IO_KEY
            }
        });
        if (item.includes("fan")) {
            response.fan = res.data;
        } else if (item.includes("pump")) {
            response.pump = res.data;
        }
    }
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(response),
            },
        ],
    };
}

export const getWeatherInfo = async () => {
    const response = await axios.get(`https://www.meteosource.com/api/v1/free/point?place_id=ho-chi-minh-city&sections=current%2Chourly&timezone=Asia%2FHo_Chi_Minh&language=en&units=auto&key=${process.env.WEATHER_API_KEY}`).then((res) => res.data);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(response),
            },
        ],
    };
}