import React from 'react'
import { Layout, Menu } from "antd";
import {
    DashboardOutlined, SettingOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router";

const { Sider } = Layout;

const items = [
    {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
    },
    {
        key: 'settings',
        icon: <SettingOutlined />,
        label: 'Settings',
    }
];

const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

const SiderLayout = () => {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Sider style={siderStyle} collapsible={true}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" items={items} onClick={e => navigate(e.key)} defaultSelectedKeys={location.pathname.split('/')[1] !== "" ? location.pathname.split('/')[1] : "dashboard"} />
        </Sider>
    )
}

export default SiderLayout