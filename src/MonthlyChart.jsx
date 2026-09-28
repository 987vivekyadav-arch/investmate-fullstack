import React from "react"
import {useLocation,useNavigate} from "react-router-dom"

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

import "./MonthlyChart.css"


function MonthlyChart(){

const location=useLocation()

const navigate=useNavigate()


/* DATA RECEIVED FROM DATE PAGE */

const lists=location.state || []


/* =========================
   TOTAL INVESTED
========================= */

const totalInvested=lists.reduce(function(total,item){

    return total+Number(item.investedValue || 0)

},0)


/* =========================
   TOTAL CURRENT
========================= */

const totalCurrent=lists.reduce(function(total,item){

    return total+Number(item.currentValue || 0)

},0)


/* =========================
   TOTAL ADDED
========================= */

const totalAdded=lists.reduce(function(total,item){

    return total+Number(item.add || 0)

},0)


/* =========================
   TOTAL WITHDRAWN
========================= */

const totalWithdraw=lists.reduce(function(total,item){

    return total+Number(item.withdraw || 0)

},0)


/* =========================
   PROFIT
========================= */

const totalProfit=
totalCurrent
-totalInvested
-totalAdded
+totalWithdraw


/* =========================
   PROFIT %
========================= */

let profitPercentage=0


const netInvested=
totalInvested
+totalAdded
-totalWithdraw


if(netInvested!==0){

    profitPercentage=
    (totalProfit/netInvested)*100

}


/* =========================
   LINE CHART DATA
========================= */

const lineData=lists.map(function(item,index){

    return{

        name:item.name || "Investment "+(index+1),

        value:Number(item.currentValue || 0)

    }

})


/* =========================
   BAR CHART DATA
========================= */

const barData=lists.map(function(item,index){

    return{

        name:item.name || "Investment "+(index+1),

        invested:Number(item.investedValue || 0),

        current:Number(item.currentValue || 0)

    }

})


/* =========================
   PIE CHART DATA
========================= */

const pieData=lists.map(function(item,index){

    return{

        name:item.name || "Investment "+(index+1),

        value:Number(item.investedValue || 0)

    }

})


/* =========================
   PROFIT CHART DATA
========================= */

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

<div className="monthly-charts-page">


    <div className="monthly-charts-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="charts-header">


            <button
                className="charts-back-button"
                onClick={function(){

                    navigate(-1)

                }}
            >
                ←
            </button>


            <div>

                <h1 className="charts-title">
                    Monthly Analysis
                </h1>

                <p className="charts-subtitle">
                    Analysis of your selected month
                </p>

            </div>


        </div>



        {/* =========================
            SUMMARY
        ========================= */}

        <div className="charts-summary-grid">


            <div className="summary-card">

                <div className="summary-label">
                    Total Invested
                </div>

                <div className="summary-value">
                    ₹{totalInvested.toLocaleString()}
                </div>

            </div>


            <div className="summary-card">

                <div className="summary-label">
                    Current Value
                </div>

                <div className="summary-value">
                    ₹{totalCurrent.toLocaleString()}
                </div>

            </div>


            <div className="summary-card">

                <div className="summary-label">
                    Added Money
                </div>

                <div className="summary-value">
                    ₹{totalAdded.toLocaleString()}
                </div>

            </div>


            <div className="summary-card">

                <div className="summary-label">
                    Profit / Loss
                </div>

                <div
                    className={
                        totalProfit>=0
                        ?"summary-value profit"
                        :"summary-value loss"
                    }
                >

                    {totalProfit>=0 ? "+" : "-"}

                    ₹{Math.abs(totalProfit).toLocaleString()}

                </div>


                <div
                    className={
                        totalProfit>=0
                        ?"summary-percent profit"
                        :"summary-percent loss"
                    }
                >

                    {totalProfit>=0 ? "+" : ""}

                    {profitPercentage.toFixed(2)}%

                </div>

            </div>


        </div>



        {/* =========================
            CHART GRID
        ========================= */}

        <div className="charts-grid">


            {/* =========================
                CHART 1
            ========================= */}

            <div className="chart-card">


                <div className="chart-heading">

                    <h2>
                        Current Value
                    </h2>

                    <p>
                        Current value of each investment
                    </p>

                </div>


                <div className="chart-container">

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



            {/* =========================
                CHART 2
            ========================= */}

            <div className="chart-card">


                <div className="chart-heading">

                    <h2>
                        Invested vs Current
                    </h2>

                    <p>
                        Compare invested and current value
                    </p>

                </div>


                <div className="chart-container">

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



            {/* =========================
                CHART 3
            ========================= */}

            <div className="chart-card">


                <div className="chart-heading">

                    <h2>
                        Investment Distribution
                    </h2>

                    <p>
                        Distribution of invested money
                    </p>

                </div>


                <div className="pie-chart-container">

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



            {/* =========================
                CHART 4
            ========================= */}

            <div className="chart-card">


                <div className="chart-heading">

                    <h2>
                        Profit / Loss
                    </h2>

                    <p>
                        Profit or loss for each investment
                    </p>

                </div>


                <div className="chart-container">

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


        {/* =========================
            EMPTY STATE
        ========================= */}

        {lists.length===0 && (

            <div className="charts-empty">

                <h2>
                    No monthly data
                </h2>

                <p>
                    Go back and select a month first.
                </p>

            </div>

        )}


    </div>

</div>

)

}

export default MonthlyChart