import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <BrowserRouter>
    <Header/>
        <Routes>
         <Route exact path="/" element={<Home />} />
         <Route path="/signin" element={<SignIn />} />
         <Route path="/signup" element={<SignUp />} />
         {/* <Route path="/profile" element={<Profile />} /> */}
         <Route path="/about" element={<About />} />
           <Route element={<PrivateRoute />} >
                 <Route path="/profile" element={<Profile />} />
            </Route>
        
       </Routes>
    </BrowserRouter>
  )  
}  

export default App

