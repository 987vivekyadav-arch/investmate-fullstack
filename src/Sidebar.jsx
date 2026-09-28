import React from "react"
import {Link} from "react-router-dom"
import "./Sidebar.css"

function Sidebar({setShowSidebar,showSidebar}){

return(
<div className={showSidebar ? "sidebar sidebar-open" : "sidebar sidebar-closed"}>

    <button
        className="sidebar-button"
        onClick={function(){

            if(showSidebar===true){
                setShowSidebar(false)
            }else{
                setShowSidebar(true)
            }

        }}
    >

        <span className="sidebar-logo">
            Invest<span>Mate</span>
        </span>

        <span className="sidebar-toggle">
            ☰
        </span>

    </button>


    {showSidebar &&

    <div className="sidebar-links">

        <div className="sidebar-section-title">
            MAIN
        </div>


        <Link
            className="sidebar-link "
            to="/"
        >
            <span className="sidebar-icon"></span>
            <span>Home</span>
        </Link>


        <Link
            className="sidebar-link "
            to="/monthly"
        >
            <span className="sidebar-icon"></span>
            <span>Add Investment</span>
        </Link>


        <div className="sidebar-section-title">
            ANALYSIS
        </div>


        <Link
            className="sidebar-link"
            to="/date"
        >
            <span className="sidebar-icon"></span>
            <span>Monthly Analysis</span>
        </Link>


        <Link
            className="sidebar-link "
            to="/allcharts"
        >
            <span className="sidebar-icon"></span>
            <span>All Record Analysis</span>
        </Link>


        <Link
            className="sidebar-link "
            to="/lists"
        >
            <span className="sidebar-icon"></span>
            <span>All Records History</span>
        </Link>

    </div>

    }


    {showSidebar &&

    <div className="sidebar-logout-section">

        <button
            className="sidebar-link sidebar-logout"
            onClick={function(){

                localStorage.removeItem("token")

                window.location.href="/login"

            }}
        >

            <span className="sidebar-icon">
                ↪
            </span>

            <span>
                Logout
            </span>

        </button>

    </div>

    }

</div>
)
}

export default Sidebar