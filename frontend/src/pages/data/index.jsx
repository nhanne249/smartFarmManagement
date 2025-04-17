import React, {useState, useEffect} from 'react'
import { getAllData } from '../../api/api'
import { Spin, Table, Pagination, Tag } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const DataPage = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [items, setItems] = useState(10)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (loading) {
            getAllData({ page, items }).then(res => {
                setData(res.data)
                setTotal(res.totalItems)
                setLoading(false)
            }).catch(err => {
                console.error(err)
                setLoading(false)
            })
        }
    },[loading])

    const columns = [
        {
            title: 'Day',
            dataIndex: 'day',
            key: 'day',
            render: (data) => {
                const formattedDate = new Date(data).toLocaleDateString('en-GB');
                return <div className='text-md text-cyan-400'>{ formattedDate}</div>;
            },
            width:'20%',
        },
        {
            title: 'Temperture',
            dataIndex: 'data',
            key: 'temperture',
            render: (data) => {
                return data && data.length > 0 
                    ? (data.reduce((sum, item) => sum + item.temperature, 0) / data.length).toFixed(2) 
                    : <Tag color="red">No data</Tag>;
            },
            width:'40%',
        },
        {
            title: 'Humidity',
            dataIndex: 'data',
            key: 'humidity',
            render: (data) => {
                return data && data.length > 0 
                    ? (data.reduce((sum, item) => sum + item.humidity, 0) / data.length).toFixed(2) 
                    : <Tag color="red">No data</Tag>;
            },
            width:'40%',
        }
    ]

    const onChangePagination = (page, pageSize) => {
        setPage(page)
        setItems(pageSize)
        setLoading(true)
     }

    return (
        
            <div className='h-full flex flex-col gap-5'>
                <p className='text-4xl text-cyan-950 font-bold'>Data</p>
            {loading ? <Spin className="self-center justify-self-center" indicator={<LoadingOutlined className="text-6xl" spin />} /> :
                <Table
                    pagination={{
                        total: total,
                        onChange: onChangePagination,
                        current: page,
                        pageSize: items,
                        showSizeChanger: true,
                    }}
                    bordered={true}
                    columns={columns}
                    dataSource={data}
                />}
            </div>
    )
}

export default DataPage