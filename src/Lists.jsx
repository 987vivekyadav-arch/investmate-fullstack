import React,{useEffect} from "react"
import {useNavigate} from "react-router-dom"
import "./Lists.css"

function Lists(){

const[lists,setLists]=React.useState([])

const[editItem,setEditItem]=React.useState(null)

const[editName,setEditName]=React.useState("")
const[editInvestedValue,setEditInvestedValue]=React.useState("")
const[editCurrentValue,setEditCurrentValue]=React.useState("")
const[editAdd,setEditAdd]=React.useState("")
const[editWithdraw,setEditWithdraw]=React.useState("")
const[editMonth,setEditMonth]=React.useState("")
const[editNotes,setEditNotes]=React.useState("")

const navigate=useNavigate()


/* ---------------- DELETE ---------------- */

function Delete(item){

fetch("https://investmate-fullstack.onrender.com/delete/"+item._id,{
    method:"DELETE",
    headers:{"authorization":"Bearer "+localStorage.getItem("token")}
})

.then(function(response){
    return response.json()
})

.then(function(data){

    const newLists=lists.filter(function(clickedItem){

        if(item._id!==clickedItem._id){
            return true
        }
        else{
            return false
        }

    })

    setLists(newLists)

})

}


/* ---------------- OPEN EDIT ---------------- */

function Edit(item){

    setEditItem(item)

    setEditName(item.name)

    setEditInvestedValue(item.investedValue)

    setEditCurrentValue(item.currentValue)

    setEditAdd(item.add)

    setEditWithdraw(item.withdraw)

    setEditMonth(
        new Date(item.month)
        .toISOString()
        .slice(0,7)
    )

    setEditNotes(item.notes)

}


/* ---------------- SAVE EDIT ---------------- */

function SaveEdit(){

fetch("https://investmate-fullstack.onrender.com/edit/"+editItem._id,{

    method:"PUT",

    headers:{
        "Content-Type":"application/json",
            "authorization":"Bearer "+localStorage.getItem("token")
        
    },

    body:JSON.stringify({

        name:editName,

        investedValue:editInvestedValue,

        currentValue:editCurrentValue,

        add:editAdd,

        withdraw:editWithdraw,

        month:editMonth,

        notes:editNotes

    })

})

.then(function(response){
    return response.json()
})

.then(function(data){

    const newLists=lists.map(function(item){

        if(item._id===data._id){

            return data

        }
        else{

            return item

        }

    })

    setLists(newLists)

    setEditItem(null)

})

}


/* ---------------- GET RECORDS ---------------- */

useEffect(function(){

    fetch("https://investmate-fullstack.onrender.com/lists",{

        headers:{
            "authorization":
            "Bearer "+localStorage.getItem("token")
        }

    })

    .then(function(response){
        return response.json()
    })

    .then(function(data){

        console.log(data)

        setLists(data)

    })

},[])


return(

<div className="lists-page">

    <div className="lists-container">


        {/* ================= HEADER ================= */}

        <div className="lists-header">

            <button
                className="lists-back-button"
                onClick={function(){
                    navigate(-1)
                }}
            >
                ←
            </button>


            <div>

                <h1 className="lists-title">
                    All Records
                </h1>

                <p className="lists-subtitle">
                    View your investment history
                </p>

            </div>

        </div>


        {/* =================================================
             WHEN NOT EDITING
        ================================================= */}

        {editItem===null && (

        <>


            <div className="lists-records">

                {lists.map(function(item,index){

                    const netInvested =
                        Number(item.investedValue || 0)
                        +
                        Number(item.add || 0)
                        -
                        Number(item.withdraw || 0)


                    const profit =
                        Number(item.currentValue || 0)
                        -
                        netInvested


                    const percentage =
                        netInvested>0
                        ?
                        (profit/netInvested)*100
                        :
                        0


                    return(

                    <div
                        className="list-card"
                        key={item._id || index}
                    >


                        {/* CARD HEADER */}

                        <div className="list-card-header">

                            <div>

                                <h2 className="list-month">

                                    {new Date(item.month)
                                    .toLocaleDateString(
                                        "en-IN",
                                        {
                                            month:"long",
                                            year:"numeric",
                                            timeZone:"UTC"
                                        }
                                    )}

                                </h2>


                                <p className="list-name">

                                    {item.name}

                                </p>

                            </div>


                            <div
                                className={
                                    profit>=0
                                    ?
                                    "list-profit positive"
                                    :
                                    "list-profit negative"
                                }
                            >

                                <strong>

                                    {profit>=0 ? "+" : "-"}

                                    ₹{Math.abs(profit)
                                    .toLocaleString("en-IN")}

                                </strong>


                                <span>

                                    {percentage>=0 ? "+" : ""}

                                    {percentage.toFixed(2)}%

                                </span>

                            </div>

                        </div>


                        {/* VALUES */}

                        <div className="list-values">


                            <div className="list-value-box">

                                <p>
                                    Invested
                                </p>

                                <strong>

                                    ₹{Number(
                                        item.investedValue || 0
                                    ).toLocaleString("en-IN")}

                                </strong>

                            </div>


                            <div className="list-value-box">

                                <p>
                                    Added Money
                                </p>

                                <strong>

                                    ₹{Number(
                                        item.add || 0
                                    ).toLocaleString("en-IN")}

                                </strong>

                            </div>


                            <div className="list-value-box">

                                <p>
                                    Withdrawn
                                </p>

                                <strong>

                                    ₹{Number(
                                        item.withdraw || 0
                                    ).toLocaleString("en-IN")}

                                </strong>

                            </div>


                            <div className="list-value-box">

                                <p>
                                    Net Invested
                                </p>

                                <strong>

                                    ₹{netInvested
                                    .toLocaleString("en-IN")}

                                </strong>

                            </div>


                            <div className="list-value-box current-value">

                                <p>
                                    Current Value
                                </p>

                                <strong>

                                    ₹{Number(
                                        item.currentValue || 0
                                    ).toLocaleString("en-IN")}

                                </strong>

                            </div>


                        </div>


                        {/* PROFIT */}

                        <div
                            className={
                                profit>=0
                                ?
                                "list-result positive-result"
                                :
                                "list-result negative-result"
                            }
                        >

                            <div>

                                <span>
                                    Profit / Loss
                                </span>

                                <strong>

                                    {profit>=0 ? "+" : "-"}

                                    ₹{Math.abs(profit)
                                    .toLocaleString("en-IN")}

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Return
                                </span>

                                <strong>

                                    {percentage>=0 ? "+" : ""}

                                    {percentage.toFixed(2)}%

                                </strong>

                            </div>

                        </div>


                        {/* NOTES */}

                        {item.notes && (

                        <div className="list-notes">

                            <span>
                                Notes
                            </span>

                            <p>
                                {item.notes}
                            </p>

                        </div>

                        )}


                        {/* ACTION BUTTONS */}

                        <div className="list-actions">


                            <button
                                className="list-delete-button"
                                onClick={function(){

                                    Delete(item)

                                }}
                            >
                                Delete
                            </button>


                            <button
                                className="list-edit-button"
                                onClick={function(){

                                    Edit(item)

                                }}
                            >
                                Edit
                            </button>


                        </div>


                    </div>

                    )

                })}

            </div>


            {/* ADD BUTTON */}

            <button
                className="lists-add-button"
                onClick={function(){

                    navigate("/monthly")

                }}
            >
                + Add Monthly Record
            </button>


        </>

        )}


        {/* =================================================
             EDIT FORM
        ================================================= */}

        {editItem!==null && (

        <div className="edit-form-card">


            <h2 className="edit-form-title">
                Edit Investment
            </h2>


            <p className="edit-form-subtitle">
                Update this record
            </p>


            <div className="edit-form">


                <div className="edit-field">

                    <label>
                        Investment Name
                    </label>

                    <input
                        type="text"
                        value={editName}
                        onChange={function(event){

                            setEditName(
                                event.target.value
                            )

                        }}
                    />

                </div>


                <div className="edit-field">

                    <label>
                        Invested Value
                    </label>

                    <input
                        type="number"
                        value={editInvestedValue}
                        onChange={function(event){

                            setEditInvestedValue(
                                event.target.value
                            )

                        }}
                    />

                </div>


                <div className="edit-field">

                    <label>
                        Current Value
                    </label>

                    <input
                        type="number"
                        value={editCurrentValue}
                        onChange={function(event){

                            setEditCurrentValue(
                                event.target.value
                            )

                        }}
                    />

                </div>


                <div className="edit-field">

                    <label>
                        Added Money
                    </label>

                    <input
                        type="number"
                        value={editAdd}
                        onChange={function(event){

                            setEditAdd(
                                event.target.value
                            )

                        }}
                    />

                </div>


                <div className="edit-field">

                    <label>
                        Withdrawn
                    </label>

                    <input
                        type="number"
                        value={editWithdraw}
                        onChange={function(event){

                            setEditWithdraw(
                                event.target.value
                            )

                        }}
                    />

                </div>


                <div className="edit-field">

                    <label>
                        Month
                    </label>

                    <input
                        type="month"
                        value={editMonth}
                        onChange={function(event){

                            setEditMonth(
                                event.target.value
                            )

                        }}
                    />

                </div>


                <div className="edit-field edit-notes">

                    <label>
                        Notes
                    </label>

                    <textarea
                        value={editNotes}
                        onChange={function(event){

                            setEditNotes(
                                event.target.value
                            )

                        }}
                    />

                </div>


                <div className="edit-form-buttons">


                    <button
                        className="edit-cancel-button"
                        onClick={function(){

                            setEditItem(null)

                        }}
                    >
                        Cancel
                    </button>


                    <button
                        className="edit-save-button"
                        onClick={function(){

                            SaveEdit()

                        }}
                    >
                        Save Changes
                    </button>


                </div>


            </div>

        </div>

        )}


    </div>

</div>

)

}

export default Lists