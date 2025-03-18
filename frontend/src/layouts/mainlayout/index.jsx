import { Layout, Menu } from "antd";
import SiderLayout from "./Sider";
import { Outlet } from 'react-router';

const { Content, Footer } = Layout;


function MainLayout() {

    return (
        <Layout hasSider>
            <SiderLayout />
            <Layout>
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                    }}
                >
                    <Outlet />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Smart Farm Project
                </Footer>
            </Layout>
        </Layout>
    )
}

export default MainLayout
