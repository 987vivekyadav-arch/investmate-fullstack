import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Lists from "./Lists"
import Monthly from "./Monthly";
import Date from "./Date";
import MonthlyChart from "./MonthlyChart"
import AllCharts from "./AllCharts"

function App(){

const[showSidebar,setShowSidebar]=React.useState(true)



  return(
<div>

 


<BrowserRouter>
<Sidebar
showSidebar={showSidebar}
setShowSidebar={setShowSidebar}
/>
<Routes>

<Route path="/"
element={<Home/>}
/>

<Route path="/register"
element={<Register/>}
/>

<Route path="/login"
element={<Login/>}
/>



<Route path="/monthly"
element={<Monthly/>}
/>

<Route path="/lists"
element={<Lists/>}
/>

<Route path="/date"
element={<Date/>}
/>

<Route path="/monthlyChart"
element={<MonthlyChart/>}
/>

<Route path="/allCharts"
element={<AllCharts/>}
/>



</Routes>
</BrowserRouter>

</div>


  )
}export default App