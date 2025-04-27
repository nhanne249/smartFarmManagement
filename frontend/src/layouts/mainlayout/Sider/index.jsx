import React, { useContext } from 'react'
import { Layout, Menu } from "antd";
import {DashboardOutlined, SettingOutlined,TableOutlined, MessageOutlined} from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router";
import { MyContext } from '../../../context/MyContext';

const { Sider } = Layout;

const items = [
    {
        key: '',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
    },
    {
        key: 'settings',
        icon: <SettingOutlined />,
        label: 'Settings',
    },
    {
        key: 'data',
        icon: <TableOutlined />,
        label: 'Data',
    },
    {
        key: 'assistant',
        icon:   <MessageOutlined />,
        label: 'Assistant',
    },
];

const SiderLayout = () => {

    const { isColapsed } = useContext(MyContext);

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Sider theme='light' className='h-screen' collapsed={isColapsed}>
            <Menu className='border-none' theme="light" mode="inline" items={items} onClick={e => navigate(e.key)} defaultSelectedKeys={location.pathname.split('/')[1] !== "" ? location.pathname.split('/')[1] : "dashboard"} />
        </Sider>
    )
}

export default SiderLayout