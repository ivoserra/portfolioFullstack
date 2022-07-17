
import { AnimatePresence } from "framer-motion";
import { Route, Routes, Switch, useLocation } from "react-router-dom";

import About from '../components/About/About.jsx'
import Home from "../components/Home/Home.jsx";
import Project from "../components/Project/Project.jsx";
import NavBar from '../components/NavBar/NavBar.jsx'
import Error from '../components/Error/Error.jsx'
import LoginPage from '../components/LogInPage/LoginPage.jsx'


export default function Path(){

    const location = useLocation()

    return(

<section>
       <AnimatePresence exitBeforeEnter>
                 <Routes key={location.pathname} location={location}>
              
            
                    <Route path="/" index element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="dashboard" element={<LoginPage/>}/>

                    <Route path="work" element={<NavBar/>}>
                        <Route path=":workName" element={<Project/>}/>
                    </Route>

                    <Route path="*" element={<Error/>}/>
                </Routes>
        </AnimatePresence>

</section>
        
        


    


    )

}