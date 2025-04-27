import dotenv from 'dotenv';
dotenv.config();
import mqtt from 'mqtt';

const ADAFRUIT_IO_USERNAME = process.env.ADAFRUIT_IO_USERNAME;
const ADAFRUIT_IO_KEY = process.env.ADAFRUIT_IO_KEY;
const bbc_temp = process.env.BBC_TEMP;
const bbc_humi = process.env.BBC_HUMI;
const MQTT_BROKER = `mqtts://${ADAFRUIT_IO_USERNAME}:${ADAFRUIT_IO_KEY}@io.adafruit.com`;
const client = mqtt.connect(MQTT_BROKER);

client.on('connect', () => {
    client.subscribe(bbc_temp);
    client.subscribe(bbc_humi);
});

client.on('message', (topic, message) => {
    const data = JSON.parse(message);
    if (topic == bbc_temp) {
        console.log(`tu feed nhiet do: ${data}`);
    } else if (topic == bbc_humi) {
        console.log(`tu feed do am: ${data}`);
    }
});

export function publishMessage(topic, message) {
    if (client.connected) {
        client.publish(topic, message);
    } else {
        console.log('MQTT Client chưa kết nối, thử lại sau.');
    }
}

export default client;