import React, { useState } from 'react'
import './App.css'
import { RouterProvider } from "react-router";
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { routes } from './configs/routes';
import { MyContext } from './context/MyContext';

function App() {
  const [isColapsed, setIsColapsed] = useState(false)
  return (
    <StyleProvider layer>
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
        <MyContext.Provider value={{ isColapsed, setIsColapsed }}>
          <RouterProvider router={routes} />
        </MyContext.Provider>
      </ConfigProvider>
    </StyleProvider>

  )
}

export default App
