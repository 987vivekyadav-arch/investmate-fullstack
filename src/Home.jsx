import React from "react"
import {useNavigate} from "react-router-dom"
import "./Home.css"

function Home(){

const navigate=useNavigate()

return(
<div className="home-page">

    <nav className="home-navbar">

        <h1 className="home-logo">
            Invest<span>Mate</span>
        </h1>

        <div className="home-nav-links">

            <button
                className="home-login-link"
                onClick={function(){
                    navigate("/login")
                }}
            >
                Login
            </button>

            <button
                className="home-signup-link"
                onClick={function(){
                    navigate("/register")
                }}
            >
                Sign Up
            </button>

        </div>

    </nav>


    <main className="home-content">

        <div className="home-text">

            <p className="home-label">
                INVESTMATE
            </p>

            <h2 className="home-title">
                Take Control
                <br/>
                of Your Investments
            </h2>

            <p className="home-description">
                Track your investments, manage your monthly
                contributions, and understand your portfolio
                in one place.
            </p>

            <div className="home-buttons">

                <button
                    className="home-primary-button"
                    onClick={function(){
                        navigate("/register")
                    }}
                >
                    Get Started
                </button>

                <button
                    className="home-secondary-button"
                    onClick={function(){
                        navigate("/login")
                    }}
                >
                    Login
                </button>

            </div>

        </div>


        <div className="home-visual">

            <div className="home-chart-card">

                <div className="home-chart-top">
                    <span>Portfolio</span>
                    <span>Overview</span>
                </div>

                <div className="home-chart">

                    <div className="chart-line chart-line-one"></div>
                    <div className="chart-line chart-line-two"></div>
                    <div className="chart-line chart-line-three"></div>
                    <div className="chart-line chart-line-four"></div>
                    <div className="chart-line chart-line-five"></div>

                </div>

                <div className="home-chart-bars">

                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                </div>

            </div>

        </div>

    </main>


    <div className="home-bottom">

        

    </div>

</div>
)
}

export default Home