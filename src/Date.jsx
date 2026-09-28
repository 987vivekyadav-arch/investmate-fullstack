import React,{useEffect} from "react"
import { useNavigate } from "react-router-dom"
import "./Date.css"

function Date(){

function FilteredData(){

    const result=lists.filter(function(clickItem,index){

        if(clickItem.month.startsWith(date)){
            return true
        }
        else{
            return false
        }

    })

    return result
}


useEffect(function(){

    fetch("http://localhost:5000/date",{headers:{
            "authorization":"Bearer "+localStorage.getItem("token")
        }})

    .then(function(response){
        return response.json()
    })

    .then(function(data){

        console.log(data)

        setLists(data)

    })

},[])

const navigate=useNavigate()
const[lists,setLists]=React.useState([])
const[date,setDate]=React.useState("")


return(

<div className="date-page">

    <div className="date-container">


        {/* HEADER */}

        <div className="date-header">

            <button
                className="date-back-button"
                onClick={function(){
                    navigate(-1)
                }}
            >
                ←
            </button>

            <div>

                <h1 className="date-title">
                    Monthly Records
                </h1>

                <p className="date-subtitle">
                    Select a month to view your investments
                </p>

            </div>

        </div>


        {/* MONTH SELECTOR */}

        <div className="date-selector-card">

            <label className="date-label">
                Select Month
            </label>

            <input
                className="date-input"
                type="month"
                value={date}
                onChange={function(event){
                    setDate(event.target.value)
                }}
            />

        </div>


        {/* RECORDS */}

        <div className="date-records">

            {FilteredData().map(function(item,index){

                return(

                    <div
                        className="date-record-card"
                        key={index}
                    >

                        <div className="date-record-header">

                            <div>

                                 <h2>
                                    {item.name}
                                </h2>

                                <h2>
                                    {item.month}
                                </h2>

                                <p>
                                    Investment Record
                                </p>

                            </div>

                        </div>


                        <div className="date-record-values">


                            <div className="date-value-box">

                                <span>
                                    Invested
                                </span>

                                <strong>
                                    ₹{item.investedValue}
                                </strong>

                            </div>


                            <div className="date-value-box">

                                <span>
                                    Current Value
                                </span>

                                <strong>
                                    ₹{item.currentValue}
                                </strong>

                            </div>


                            <div className="date-value-box">

                                <span>
                                    Added Money
                                </span>

                                <strong>
                                    ₹{item.add}
                                </strong>

                            </div>


                            <div className="date-value-box">

                                <span>
                                    Withdrawn
                                </span>

                                <strong>
                                    ₹{item.withdraw}
                                </strong>

                            </div>


                        </div>


                        {item.notes && (

                            <div className="date-notes">

                                <span>
                                    Notes
                                </span>

                                <p>
                                    {item.notes}
                                </p>

                            </div>

                        )}

                    </div>

                )

            })}

        </div>


        {/* EMPTY STATE */}

        {date && FilteredData().length===0 && (

            <div className="date-empty">

                <div className="date-empty-icon">
                    ○
                </div>

                <h2>
                    No records found
                </h2>

                <p>
                    There are no investment records for this month.
                </p>

            </div>

        )}


    </div>


<button className="date-chart-button"
onClick={function(){
    navigate("/monthlyChart",{state:FilteredData()})
}}
>View Charts</button>



</div>

)

}

export default Date