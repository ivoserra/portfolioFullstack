import { useState, useEffect } from "react"
import { useContext } from "react"
import { DataContext } from "../Context/DataContext.jsx"
import { UserContext } from "../Context/UserContext.jsx"
import Dashboard from '../Dashboard/Dashboard.jsx'
import { Login } from "./Login.jsx"

import './LoginPage.scss'
import { Register } from "./Register.jsx"



export default function LoginPage(){




    const {
        setAlert, setMessage, login,setLogin, register, registerMsg, setRegisterMsg, message,
        
    } = useContext(UserContext)



    function handleLogout(e){
        e.preventDefault()
        setLogin(false)
        setAlert('')
        setMessage('')
        setRegisterMsg('')
       
    }






    return(
        <section className="Login">
            <section className="">
            { login ? (
                <section className="log-main">
                <section className="log-header">   
                    {message ? <section><h1>{message}</h1></section>:<></>}
                    <button className="button" onClick={handleLogout}>logout</button>
                </section>
                <Dashboard/>
                </section>           
            )
            :
            ( 
                <section className="inner-form">
                <Login/>               
                { register ? <section className="register-form"><h3>{registerMsg}</h3></section> 
                : <Register/>
                }
                </section>
            )
            }
            </section>
        </section>
    
    )
}