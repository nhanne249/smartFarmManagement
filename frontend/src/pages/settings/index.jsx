import { useState, useEffect } from "react";
import { Switch, Spin } from "antd";
import { getFanStatus, getPumpStatus,controlFan, controlPump } from "../../api/api";
import { LoadingOutlined } from '@ant-design/icons';

const Settings = () => {

    const [fanStatus, setFanStatus] = useState(true);
    const [pumpStatus, setPumpStatus] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) Promise.all([getFanStatus(), getPumpStatus()]).then(([res1, res2]) => {
            console.log(res1)
            setFanStatus(res1.value == 1 ? true : false)
            setPumpStatus(res2.value == 1 ? true : false)
            setLoading(false)  
        })
    }, [loading])
    
    const handleFanChange = (checked) => {
        controlFan(checked).then(() => {
            setFanStatus(checked)
        })
     }
    const handlePumpChange = (checked) => {
        controlPump(checked).then(() => {
            setPumpStatus(checked)
        })
     }


    return (
        <div className='h-full flex flex-col'>
            <p className='text-4xl text-cyan-950 font-bold'>Settings</p>
            
            {loading ? <div className="flex-grow flex justify-center items-center">
                <Spin className="self-center justify-self-center" indicator={<LoadingOutlined className="text-6xl" spin />} />
            </div>
                : <div className='h-full w-full center self-center flex flex-row items-center justify-around'>
                    <div className="flex flex-col items-center justify-center gap-5">
                        <p className="text-2xl font-bold text-blue-600">Fan</p>
                        <Switch onChange={handleFanChange}  checked= {fanStatus}/>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5">
                        <p className="text-2xl font-bold text-blue-600">Pump</p>
                        <Switch onChange={handlePumpChange}  checked= {pumpStatus}/>
                    </div>
            </div>}
        </div>
    )
}

export default Settings