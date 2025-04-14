import { useState, useEffect } from "react";
import { Switch } from "antd";
import { getAllData } from "../../api/api";

const Settings = () => {

    // const [data, setData] = useState([]);
    // const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     if(loading) getAllData({ page }).then(res => {
    //         console.log(res)
    //         setLoading(false)   
    //     })
    // },[loading])

    return (
        <div className='h-full flex flex-col'>
            <p className='text-4xl text-cyan-950 font-bold'>Settings</p>
            <div className='h-full center self-center flex flex-row items-center gap-28'>
                <Switch/>
                <Switch/>
                
            </div>
        </div>
    )
}

export default Settings