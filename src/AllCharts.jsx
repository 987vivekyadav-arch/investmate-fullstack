import React from "react"
import {useNavigate} from "react-router-dom"
import {useEffect} from "react"

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts"

import "./AllCharts.css"

function AllCharts(){

const[lists,setLists]=React.useState([])

useEffect(function(){

    fetch("https://investmate-fullstack.onrender.com/allCharts",{

        headers:{
            "authorization":"Bearer "+localStorage.getItem("token")
        }

    })

    .then(function(response){
        return response.json()
    })

    .then(function(data){

        setLists(data)

    })

},[])







const navigate=useNavigate()




/* TOTALS */

const totalInvested=lists.reduce(function(total,item){

    return total+Number(item.investedValue || 0)

},0)


const totalCurrent=lists.reduce(function(total,item){

    return total+Number(item.currentValue || 0)

},0)


const totalAdded=lists.reduce(function(total,item){

    return total+Number(item.add || 0)

},0)


const totalWithdraw=lists.reduce(function(total,item){

    return total+Number(item.withdraw || 0)

},0)


const netInvested=
totalInvested
+totalAdded
-totalWithdraw


const totalProfit=
totalCurrent
-netInvested


let profitPercentage=0


if(netInvested!==0){

    profitPercentage=
    (totalProfit/netInvested)*100

}


/* LINE CHART */

const lineData=lists.map(function(item,index){

    return{

        name:item.name || "Investment "+(index+1),

        value:Number(item.currentValue || 0)

    }

})


/* BAR CHART */

const barData=lists.map(function(item,index){

    return{

        name:item.name || "Investment "+(index+1),

        invested:Number(item.investedValue || 0),

        current:Number(item.currentValue || 0)

    }

})


/* PIE CHART */

const pieData=lists.map(function(item,index){

    return{

        name:item.name || "Investment "+(index+1),

        value:Number(item.investedValue || 0)

    }

})


/* PROFIT CHART */

const areaData=lists.map(function(item,index){

    const profit=

        Number(item.currentValue || 0)
        -Number(item.investedValue || 0)
        -Number(item.add || 0)
        +Number(item.withdraw || 0)


    return{

        name:item.name || "Investment "+(index+1),

        profit:profit

    }

})


return(

<div className="all-charts-page">

    <div className="all-charts-container">


        {/* HEADER */}

        <div className="all-charts-header">

            <button
                className="all-charts-back-button"
                onClick={function(){

                    navigate(-1)

                }}
            >
                ←
            </button>


            <div>

                <h1 className="all-charts-title">

                    All-Time Analysis

                </h1>

                <p className="all-charts-subtitle">

                    Analysis of all your investment records

                </p>

            </div>

        </div>


        {/* SUMMARY */}

        <div className="all-charts-summary-grid">


            <div className="all-summary-card">

                <div className="all-summary-label">

                    Total Invested

                </div>

                <div className="all-summary-value">

                    ₹{totalInvested.toLocaleString("en-IN")}

                </div>

            </div>


            <div className="all-summary-card">

                <div className="all-summary-label">

                    Current Value

                </div>

                <div className="all-summary-value">

                    ₹{totalCurrent.toLocaleString("en-IN")}

                </div>

            </div>


            <div className="all-summary-card">

                <div className="all-summary-label">

                    Added Money

                </div>

                <div className="all-summary-value">

                    ₹{totalAdded.toLocaleString("en-IN")}

                </div>

            </div>


            <div className="all-summary-card">

                <div className="all-summary-label">

                    Profit / Loss

                </div>


                <div
                    className={
                        totalProfit>=0
                        ?"all-summary-value all-profit"
                        :"all-summary-value all-loss"
                    }
                >

                    {totalProfit>=0 ? "+" : "-"}

                    ₹{Math.abs(totalProfit).toLocaleString("en-IN")}

                </div>


                <div
                    className={
                        totalProfit>=0
                        ?"all-summary-percent all-profit"
                        :"all-summary-percent all-loss"
                    }
                >

                    {totalProfit>=0 ? "+" : ""}

                    {profitPercentage.toFixed(2)}%

                </div>

            </div>

        </div>


        {/* CHARTS */}

        <div className="all-charts-grid">


            {/* LINE CHART */}

            <div className="all-chart-card">

                <div className="all-chart-heading">

                    <h2>

                        Current Value

                    </h2>

                    <p>

                        Current value of each investment

                    </p>

                </div>


                <div className="all-chart-container">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <LineChart data={lineData}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#292933"
                            />

                            <XAxis
                                dataKey="name"
                                stroke="#777782"
                            />

                            <YAxis
                                stroke="#777782"
                            />

                            <Tooltip
                                contentStyle={{
                                    background:"#111118",
                                    border:"1px solid #30303a",
                                    borderRadius:"10px",
                                    color:"#ffffff"
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#ff0080"
                                strokeWidth={3}
                                dot={{r:4}}
                                activeDot={{r:6}}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* BAR CHART */}

            <div className="all-chart-card">

                <div className="all-chart-heading">

                    <h2>

                        Invested vs Current

                    </h2>

                    <p>

                        Compare invested and current value

                    </p>

                </div>


                <div className="all-chart-container">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart data={barData}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#292933"
                            />

                            <XAxis
                                dataKey="name"
                                stroke="#777782"
                            />

                            <YAxis
                                stroke="#777782"
                            />

                            <Tooltip
                                contentStyle={{
                                    background:"#111118",
                                    border:"1px solid #30303a",
                                    borderRadius:"10px",
                                    color:"#ffffff"
                                }}
                            />

                            <Legend/>

                            <Bar
                                dataKey="invested"
                                name="Invested"
                                fill="#ff0080"
                                radius={[5,5,0,0]}
                            />

                            <Bar
                                dataKey="current"
                                name="Current"
                                fill="#00d4ff"
                                radius={[5,5,0,0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* PIE CHART */}

            <div className="all-chart-card">

                <div className="all-chart-heading">

                    <h2>

                        Investment Distribution

                    </h2>

                    <p>

                        Distribution of invested money

                    </p>

                </div>


                <div className="all-pie-chart-container">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={75}
                                innerRadius={45}
                            >

                                {pieData.map(function(item,index){

                                    const colors=[
                                        "#ff0080",
                                        "#00d4ff",
                                        "#8b5cf6",
                                        "#22c55e",
                                        "#f59e0b"
                                    ]

                                    return(

                                        <Cell
                                            key={index}
                                            fill={
                                                colors[
                                                    index %
                                                    colors.length
                                                ]
                                            }
                                        />

                                    )

                                })}

                            </Pie>


                            <Tooltip
                                contentStyle={{
                                    background:"#111118",
                                    border:"1px solid #30303a",
                                    borderRadius:"10px",
                                    color:"#ffffff"
                                }}
                            />

                            <Legend/>

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* PROFIT / LOSS */}

            <div className="all-chart-card">

                <div className="all-chart-heading">

                    <h2>

                        Profit / Loss

                    </h2>

                    <p>

                        Profit or loss for each investment

                    </p>

                </div>


                <div className="all-chart-container">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <AreaChart data={areaData}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#292933"
                            />

                            <XAxis
                                dataKey="name"
                                stroke="#777782"
                            />

                            <YAxis
                                stroke="#777782"
                            />

                            <Tooltip
                                contentStyle={{
                                    background:"#111118",
                                    border:"1px solid #30303a",
                                    borderRadius:"10px",
                                    color:"#ffffff"
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="profit"
                                stroke="#ff0080"
                                strokeWidth={3}
                                fill="#ff0080"
                                fillOpacity={0.12}
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </div>

            </div>


        </div>


        {/* EMPTY */}

        {lists.length===0 && (

            <div className="all-charts-empty">

                <h2>

                    No investment data

                </h2>

                <p>

                    Go back and add an investment record first.

                </p>

            </div>

        )}


    </div>

</div>

)

}

export default AllCharts;