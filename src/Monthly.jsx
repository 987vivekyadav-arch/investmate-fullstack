import React,{useEffect} from "react"
import { useNavigate } from "react-router-dom"
import "./Monthly.css"

function Monthly(){

const navigate=useNavigate()

const[investment,setInvestment]=React.useState([])

const[name,setName]=React.useState("")
const[investedValue,setInvestedValue]=React.useState("")
const[currentValue,setCurrentValue]=React.useState("")
const[add,setAdd]=React.useState("")
const[withdraw,setWithdraw]=React.useState("")
const[month,setMonth]=React.useState("")
const[notes,setNotes]=React.useState("")

return(

<div className="monthly-page">

    <div className="monthly-container">

        <div className="monthly-header">

            <button
                className="monthly-back-button"
                onClick={function(){
                    navigate(-1)
                }}
            >
                ←
            </button>

            <div>
                <h1 className="monthly-title">
                    Add Monthly Record
                </h1>

                <p className="monthly-subtitle">
                    Add your investment details
                </p>
            </div>

        </div>


        <div className="monthly-card">


            <div className="monthly-input-section">

                <label className="monthly-label">
                    Investment Name
                </label>

                <input
                    className="monthly-input"
                    placeholder="Enter name..."
                    value={name}
                    onChange={function(event){
                        setName(event.target.value)
                    }}
                />

            </div>


            <div className="monthly-input-section">

                <label className="monthly-label">
                    Invested Value
                </label>

                <input
                    className="monthly-input"
                    type="number"
                    placeholder="Enter invested value..."
                    value={investedValue}
                    onChange={function(event){
                        setInvestedValue(event.target.value)
                    }}
                />

            </div>


            <div className="monthly-input-section">

                <label className="monthly-label">
                    Current Value
                </label>

                <input
                    className="monthly-input"
                    type="number"
                    placeholder="Enter current value..."
                    value={currentValue}
                    onChange={function(event){
                        setCurrentValue(event.target.value)
                    }}
                />

            </div>


            <div className="monthly-row">

                <div className="monthly-input-section">

                    <label className="monthly-label">
                        Added Money
                    </label>

                    <input
                        className="monthly-input"
                        type="number"
                        placeholder="Added money..."
                        value={add}
                        onChange={function(event){
                            setAdd(event.target.value)
                        }}
                    />

                </div>


                <div className="monthly-input-section">

                    <label className="monthly-label">
                        Withdrawn Money
                    </label>

                    <input
                        className="monthly-input"
                        type="number"
                        placeholder="Withdrawn money..."
                        value={withdraw}
                        onChange={function(event){
                            setWithdraw(event.target.value)
                        }}
                    />

                </div>

            </div>


            <div className="monthly-input-section">

                <label className="monthly-label">
                    Month
                </label>

                <input
                    className="monthly-input"
                    type="month"
                    value={month}
                    onChange={function(event){
                        setMonth(event.target.value)
                    }}
                />

            </div>


            <div className="monthly-input-section">

                <label className="monthly-label">
                    Notes
                </label>

                <textarea
                    className="monthly-textarea"
                    placeholder="Enter notes..."
                    value={notes}
                    onChange={function(event){
                        setNotes(event.target.value)
                    }}
                />

            </div>


            <button
                className="monthly-save-button"
                onClick={function(){

                    fetch("http://localhost:5000/monthly",{
                        method:"POST",

                        headers:{
                            "Content-Type":"application/json",
                            "authorization":"Bearer "+localStorage.getItem("token")
                        },

                        body:JSON.stringify({

                            name:name,
                            investedValue:investedValue,
                            currentValue:currentValue,
                            add:add,
                            withdraw:withdraw,
                            month:month,
                            notes:notes

                        })
                    })

                    .then(function(response){
                        return response.json()
                    })

                    .then(function(data){

                        console.log(data)

                        setInvestment([...investment,data])

                        navigate("/lists")

                    })

                }}
            >
                Save Record
            </button>


        </div>

    </div>

</div>

)

}

export default Monthly