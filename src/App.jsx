import styled from "styled-components";
import routes from "./routes";
import SideBar from "./layouts/SideBar";
import TopBar from "./layouts/TopBar";

import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { Box, Toolbar } from "@mui/material"
import { setLayout } from "./redux/reducers/appSlice";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppWrapper = styled.div`
  display: flex;
`
const MainWrapper = styled(Box)`
`
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {    
    const pathname = location.pathname
    let layout = 'compose'
    if (pathname.indexOf('compose') > -1)
      layout = 'compose'
    
    if (pathname.indexOf('foundation') > -1)
      layout = 'foundation'
    
    if (pathname.indexOf('nonprofit') > -1)
      layout = 'nonprofit'
    
    if (pathname.indexOf('history') > -1)
      layout = 'history'
      
    dispatch(setLayout(layout))
  }, [])

  const getRoutes = (allRoutes) => 
    allRoutes.map(route => 
      <Route exact path={route.route} element={route.component} key={route.key} />)

  return (
    <AppWrapper>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <TopBar />
      <SideBar />
      <MainWrapper
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 200px)` } }}
      >
        <Toolbar />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/foundation" />} />
        </Routes>
      </MainWrapper>
      
    </AppWrapper>
  );
}

export default App;
