import { useState, useEffect, useRef, useContext } from "react";
import { InputNumber, Spin, Slider } from "antd";
import { getFanStatus, getPumpStatus, controlFan, controlPump } from "../../api/api";
import { LoadingOutlined } from '@ant-design/icons';

import { MyContext } from "../../context/MyContext";

const Settings = () => {

    const { api } = useContext(MyContext);

    const [fanStatus, setFanStatus] = useState(0);
    const [pumpStatus, setPumpStatus] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) Promise.all([getFanStatus(), getPumpStatus()]).then(([res1, res2]) => {
            console.log(res1)
            setFanStatus(res1.value)
            setPumpStatus(res2.value)
            setLoading(false)  
        })
    }, [loading])
    
    const fanTimeout = useRef();
    const pumpTimeout = useRef();

    const handleFanChange = (value) => {
        setFanStatus(value);
        if (fanTimeout.current) {
            clearTimeout(fanTimeout.current);
        }
        fanTimeout.current = setTimeout(() => {
            controlFan(value).then(() => {
                api.success({
                    message: 'Fan Control',
                    description: `Fan value changed to ${value}`,
                });
            });
        }, 2000);
    };

    const handlePumpChange = (value) => {
        setPumpStatus(value);
        if (pumpTimeout.current) {
            clearTimeout(pumpTimeout.current);
        }
        pumpTimeout.current = setTimeout(() => {
            controlPump(value).then(() => {
                api.success({
                    message: 'Pump Control',
                    description: `Pump value changed to ${value}`,
                });
            });
        }, 2000);
    };

    return (
        <div className='h-full flex flex-col'>
            <p className='text-4xl text-cyan-950 font-bold'>Settings</p>
            {loading ? <div className="flex-grow flex justify-center items-center">
                <Spin className="self-center justify-self-center" indicator={<LoadingOutlined className="text-6xl" spin />} />
            </div>
                : <div className='h-full w-full center self-center flex flex-col items-center justify-around'>
                    <div className="flex w-full flex-col items-center justify-center gap-5">
                        <p className="text-2xl font-bold text-blue-600">Fan</p>
                        <Slider
                            marks={{
                                0: '0°C',
                                100: {
                                    style: { color: '#f50' },
                                    label: <strong>100</strong>,
                                },
                            }}
                            onChange={handleFanChange}
                            value={fanStatus}
                            classNames={{
                                root: 'w-80'
                            }}
                        />
                        <InputNumber
                            min={0}
                            max={100}
                            value={fanStatus}
                            onChange={handleFanChange}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5">
                        <p className="text-2xl font-bold text-blue-600">Pump</p>
                        <Slider
                            marks={{
                                0: '0°C',
                                100: {
                                    style: { color: '#f50' },
                                    label: <strong>100</strong>,
                                },
                            }}
                            onChange={handlePumpChange}
                            value={pumpStatus}
                            classNames={{
                                root: 'w-80'
                            }}
                        />
                        <InputNumber
                            min={0}
                            max={100}
                            value={pumpStatus}
                            onChange={handlePumpChange}
                        />
                    </div>
            </div>}
        </div>
    )
}

export default Settings