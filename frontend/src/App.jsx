import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Signup} from "./pages/Signup";
import {Login} from "./pages/Login";
import Home from "./pages/Home";
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
      <Route path="/signup"element={<Signup/>}/>
      <Route path="/"element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
     
      <Route path="/home/tracking" element={<TrackingPage/>}/>
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
