import React from "react"
import {useNavigate} from "react-router-dom"
import "./Login.css"

function Login(){

const navigate=useNavigate()

const[login,setLogin]=React.useState([])

const[email,setEmail]=React.useState("")
const[password,setPassword]=React.useState("")

return(
    <div className="login-page">

        <div className="login-box">

            <div className="login-logo">
                Invest<span>Mate</span>
            </div>

            <h1 className="login-title">
                Welcome Back
            </h1>

            <p className="login-text">
                Login to your account
            </p>


            <div className="login-fields">

                <div className="login-field">

                    <label className="login-label">
                        Email
                    </label>

                    <input
                        className="login-input"
                        placeholder="Enter email"
                        value={email}
                        onChange={function(event){
                            setEmail(event.target.value)
                        }}
                    />

                </div>


                <div className="login-field">

                    <label className="login-label">
                        Password
                    </label>

                    <input
                        className="login-input"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={function(event){
                            setPassword(event.target.value)
                        }}
                    />

                </div>

            </div>


            <button
                className="login-button"
                onClick={function(){

                    fetch("https://investmate-fullstack.onrender.com/login",{
                        method:"POST",

                        headers:{
                            "Content-Type":"application/json"
                        },

                        body:JSON.stringify({
                            email:email,
                            password:password
                        })
                    })
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(data){

                        console.log(data)

                        setLogin([...login,data])

                        localStorage.setItem("token",data.token)

                        
                            navigate("/monthly")
                        

                    })

                }}
            >
                Login
            </button>


            <div className="login-divider">
                <span>or</span>
            </div>


            <p className="login-register-text">
                Don't have an account?
            </p>

            <button
                className="login-register-button"
                onClick={function(){
                    navigate("/register")
                }}
            >
                Sign Up
            </button>

        </div>

    </div>
)

}

export default Login