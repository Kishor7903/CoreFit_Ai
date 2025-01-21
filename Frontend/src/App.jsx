import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AppLayout from "./pages/AppLayout"
import Signup from "./pages/Signup"
import UserDetails from "./pages/UserDetails"
import ImageRecommendation from "./pages/ImageRecommendation"
import AuthLayout from "./pages/AuthLayout"
import Login from "./pages/Login"
import Details from "./pages/Details"


function App() {
  return (
      <Routes>
        <Route path="/" element={<AppLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="userdetails" element={<UserDetails />} />
          <Route path="imageRecomendation" element={<ImageRecommendation />} />
          <Route path="details" element={<Details />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />} >
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
  )
}

export default App
