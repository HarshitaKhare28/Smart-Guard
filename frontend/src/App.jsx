import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Login} from "./pages/Login";
import {About} from "./pages/About";
import {Home} from "./pages/Home";
import {SOS_History} from "./pages/SOS_History";
import {Monthly_Report} from "./pages/Monthly_Report";
import {Navbar} from "./Components/Navbar";
import {TrackingPage} from "./pages/TrackingPage";
import './App.css'
import './index.css'


function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/> 
    <Routes>
      <Route path="/"element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/home/sos-history" element={<SOS_History/>}/>
      <Route path="/home/monthly-report" element={<Monthly_Report/>}/>
      <Route path="/home/tracking" element={<TrackingPage/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
