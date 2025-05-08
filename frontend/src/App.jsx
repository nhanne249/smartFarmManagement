import React, { useState } from 'react'
import { RouterProvider } from "react-router";
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, notification } from 'antd';
import { routes } from './configs/routes';
import { MyContext } from './context/MyContext';
import './App.css'

function App() {
  const [isColapsed, setIsColapsed] = useState(false)
  const [api,contextHolder] = notification.useNotification({
    placement: 'topRight',
    duration: 2,
    maxCount: 3,
  });
  return (
    <StyleProvider layer hashPriority="high">
      <ConfigProvider
        theme={{
          components: {
            Statistic: {
              contentFontSize: 40,
              titleFontSize: 16,
            },
          },
        }}
        >
        <MyContext.Provider value={{ isColapsed, setIsColapsed,api }}>
        {contextHolder}
          <RouterProvider router={routes} />
        </MyContext.Provider>
      </ConfigProvider>
    </StyleProvider>

  )
}

export default App
