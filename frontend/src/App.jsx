import React from 'react'
import './App.css'
import { Routes, Route } from "react-router";
import { mainPageRoutes } from './configs/routes';

function App() {

  return (
    <Routes>
      <Route element={mainPageRoutes.element}>
        <Route index element={mainPageRoutes.children[0].element} />
        {mainPageRoutes?.children?.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
}

export default App
