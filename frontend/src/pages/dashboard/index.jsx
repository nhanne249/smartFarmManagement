import React, { useEffect, useState } from 'react';
import { Statistic, Spin } from 'antd';
import mqtt from 'mqtt';

const Dashboard = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

    useEffect(() => {
        const MQTT_BROKER = `mqtts://${import.meta.env.VITE_ADAFRUIT_IO_USERNAME}:${import.meta.env.VITE_ADAFRUIT_IO_KEY}@io.adafruit.com`;

        const client = mqtt.connect(MQTT_BROKER);

        client.on('connect', () => {
            client.subscribe(import.meta.env.VITE_BBC_TEMP);
            client.subscribe(import.meta.env.VITE_BBC_HUMI);
        });

        client.on('message', (topic, message) => {
            console.log(topic)
            console.log(message)
            const data = JSON.parse(message.toString());
            if (topic === import.meta.env.VITE_BBC_TEMP) {
                setTemperature(data);
            } else if (topic === import.meta.env.VITE_BBC_HUMI) {
                setHumidity(data);
            }
        });
        return () => {
            client.end();
        };
    }, []);

    return (
        <div className='h-full flex flex-col'>
            <p className='text-4xl text-cyan-950 font-bold'>Dashboard</p>
            <div className='h-full center self-center flex flex-row items-center gap-28'>
                <Statistic className='h-fit' title="Temperture" value={temperature !== null ? `${temperature} °C` : 'Loading...'} />
                <Statistic className='h-fit' title="Humidity" value={humidity !== null ? `${humidity} %` : 'Loading...'} />
            </div>
        </div>
    );
};

export default Dashboard;