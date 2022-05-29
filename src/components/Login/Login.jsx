import { useState, useEffect } from "react"
import { useContext } from "react"
import { DataContext } from "../Context/DataContext.jsx"
import { UserContext } from "../Context/UserContext.jsx"
import Editor from '../Editor/Editor.jsx'

import './Login.scss'



export default function Login(){




    const {
        alert, setAlert,
        login,setLogin, 
        name, setName, 
        password, setPassword, 
        alertUser, setAlertUser,
        alertPassword, setAlertPassword,
        alertRegName, setAlertRegName,
        alertRegPass, setAlertRegPass,
        visitor, setVisitor,
        alertReg, setAlertReg,
        regName, setRegName,
        regPass, setRegPass,
        user, setUser
        
    } = useContext(UserContext)


  
    const [ message, setMessage ]=useState('')
    const [ register, setRegister ] = useState(false)
    const [ registerMsg, setRegisterMsg ] = useState('')


    useEffect(()=>{
        if(!login){
            setPassword('')
            setName('')
        }
    },[login])


    function handleLogout(e){
        e.preventDefault()
        setLogin(false)
        setName('')
        setPassword('')
       
    }

    function logUser(e){
        e.preventDefault()
        setAlertUser('')
        setAlertPassword('')
        setAlert('')
        const url = 'http://localhost:8000/user/login'
        const payload = {username:name, password:password}
        const config={method:'POST', headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)}

            fetch(url, config)
            .then(response =>response.json())
            .then(result => {
                if(result.errors){
                    result.errors.forEach(error=>{

                        error.username ? setAlertUser(error.username):null
                        error.password ? setAlertPassword(error.password):null
                    })
                }
                if(result.alert){
                   setAlert(result.alert)
                }
                if(result.confirm){
                    setLogin(!false)
                    result.type !== "visitor" ? setVisitor(false) : setVisitor(true)
                    setUser(result.username)
                    setMessage(result.message)
                    setRegister(false)
                    setAlertUser('')
                    setAlertPassword('')
                    console.log(user, visitor)
                }
               
                setPassword('')
                setName('')
               
            }).catch(error => console.log(error.message))

    }

    console.log(user, visitor)

    function registerUser(e){
        e.preventDefault()
        setAlertRegName('')
        setAlertRegPass('')
        setAlertReg('')
        const url = 'http://localhost:8000/user/register'
        const payload = { username: regName , password: regPass }
        const config={ method:"POST", headers:{ "Content-Type":"application/json"}, body: JSON.stringify(payload)}

        fetch(url, config)
        .then( response => response.json())
        .then(result =>{
            if (result.errors){
                result.errors.forEach(error=>{
                    error.username ? setAlertRegName(error.username) : null
                    error.password ? setAlertRegPass(error.password) : null
                })
                setRegister(false)
                setRegName('')
                setRegPass('')
                return
            }
            if(!result.confirm){
                setAlertReg(result.message)
                setRegName('')
                setRegPass('')
                setRegister(false)
                return
            }
            setRegisterMsg(result.message)
            setRegister(true)
            setRegName('')
            setRegPass('')
            setAlertRegName('')
            setAlertRegPass('')
            setAlertReg('')

        })
        .catch(error => console.log(error))

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
               <Editor></Editor>
            </section>
        ):( <section className="inner-form">
            <form className="login-form" onSubmit={logUser}>
                <h1>login</h1>
                <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="name"></input>
                <section className="alert">{alertUser ? <p className="alert">{alertUser}</p>:null}</section>
                <input type="password"  value={password} onChange={e=>setPassword(e.target.value)} placeholder="password"></input>
               <section className="alert">{ alertPassword ? <p className="alert">{alertPassword}</p>:null}</section>
               <section className="alert">{ alert ? <p className="alert">{alert}</p>:<></> }</section>

                <button className="button">submit</button>
                
            </form>            
            
            { register ? <section className="register-form"><h3>{registerMsg}</h3></section> 
            : 
            <section className="register-form">
            <section className="regis-info">
                <h2>Are you a visitor?</h2>
                <p>Welcome to my dashboard component</p>
                <p>This is a fullstack CRUD component: I create, delete and update my portfolio from the browser connected to a database.
                As a visitor you need to register and be able to see my dashboard.. but you will not be able to submit any videos, images and projects.</p>
                <p>Once you register and login there is a delete profile button before you decide to logout , if thats your wish!</p>
                <p>enjoy ! Ivo serra</p>
            </section>
                <form className="reg-form" onSubmit={registerUser}>
                <h1>register here</h1>
                <input type="text" value={regName} onChange={e=>setRegName(e.target.value)} placeholder="name"></input>
                <section className="alert">{alertRegName ? <p className="alert">{alertRegName}</p>:null}</section>
                <input type="password" value={regPass} onChange={e=>setRegPass(e.target.value)} placeholder="password"></input>
                <section className="alert">{ alertRegPass ? <p className="alert">{alertRegPass}</p>:null}</section>
                <section className="alert">{ alertReg ? <p className="alert">{alertReg}</p>:<></> }</section>
                <button className="button">submit</button>
                </form>
            </section>
            }
            </section>
        )}
        </section>
        </section>
    
    )
}