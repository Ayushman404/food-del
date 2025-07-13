import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./components/Footer/Footer"
import LoginModel from "./components/LoginModel/LoginModel"
import { useState } from "react"
function App(){

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin && <LoginModel setShowLogin={setShowLogin}/>}
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path = "/" element={<Home/>} />
        <Route path = '/cart' element = {<Cart />} />
        <Route path = '/placeorder' element = {<PlaceOrder />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
