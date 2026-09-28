import React from "react"
import { useNavigate } from "react-router-dom"
import "./Register.css"

function Register(){
const navigate=useNavigate()

const[register,setRegister]=React.useState([])

const[email,setEmail]=React.useState("")
const[password,setPassword]=React.useState("")

return(
<div className="register-page">

    <div className="register-box">

        <div className="register-logo">
            Invest<span>Mate</span>
        </div>

        <h1 className="register-title">
            Create Account
        </h1>

        <p className="register-subtitle">
            Sign up to start tracking your investments.
        </p>


        <div className="register-form">

            <div className="register-field">

                <label className="register-label">
                    Email
                </label>

                <input
                    className="register-input"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={function(event){
                        setEmail(event.target.value)
                    }}
                />

            </div>


            <div className="register-field">

                <label className="register-label">
                    Password
                </label>

                <input
                    className="register-input"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={function(event){
                        setPassword(event.target.value)
                    }}
                />

            </div>


            <button
                className="register-button"
                onClick={function(){

                    fetch("http://localhost:5000/register",{
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

                        setRegister([...register,data])

                        navigate("/login")

                    })

                }}
            >
                Create Account
            </button>

        </div>


        <p className="register-login-text">
            Already have an account?
        </p>

        <button
            className="register-login-button"
            onClick={function(){
                navigate("/login")
            }}
        >
            Login
        </button>

    </div>

</div>
)
}

export default Register