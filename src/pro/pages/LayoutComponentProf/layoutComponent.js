import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import "./layoutComponent.css"

const LayoutComponent = () => {
    return (
        <div className="layoutMainContainer">
            <div>
                <Sidebar />
            </div>
            <div className="headerOutLetdiv">
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutComponent