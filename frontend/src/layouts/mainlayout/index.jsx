import { Layout, Button } from "antd";
import SiderLayout from "./Sider";
import { Outlet } from 'react-router';
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;


function MainLayout() {

    const { isColapsed, setIsColapsed } = useContext(MyContext);

    return (
        <Layout hasSider>
            <SiderLayout />
            <Layout>
                <Header className="bg-white p-0">
                    <Button className="h-full w-15 rounded-s-none border-0" onClick={() => setIsColapsed(!isColapsed)} icon={!isColapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />} />
                </Header>
                <Content className="mx-5 my-2.5 p-2.5 bg-white rounded-xl border border-gray-300">
                    <Outlet />
                </Content>
                <Footer className="bg-white text-center">
                    Smart Farm Project
                </Footer>
            </Layout>
        </Layout>
    )
}

export default MainLayout
