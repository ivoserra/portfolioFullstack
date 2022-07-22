import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import './LoginPage.scss'

export const Login = () => {


    const { alert, setAlert, setLogin, setMessage, setVisitor, setUser, setRegister }=useContext(UserContext)


    const [ errors, setErrors]=useState([])
    const [ name, setName]=useState('')
    const [password, setPassword]=useState('')
    const [ showPassword, setShowPassword]=useState(false)

    function logUser(e){
        e.preventDefault()
        setErrors([])
        setAlert('')
        const url = ' https://ivoserrawebdev.herokuapp.com/user/login'
        const payload = {username:name, password:password}
        const config={method:'POST', headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)}

            fetch(url, config)
            .then(response =>response.json())
            .then(result => {
                if(result.errors){
                 setErrors(result.errors)
                }
                if(result.alert){
                   setAlert(result.alert)
                }
                if(result.confirm){
                    console.log(result)
                    setLogin(!false)
                    result.type !== "visitor" ? setVisitor(false) : setVisitor(true)
                    setUser(result.username)
                    setMessage(result.message)
                    setRegister(false)
                    setErrors([])
                    setName('')
                    setPassword('')
                    
                }
               
                setPassword('')
                setName('')
               
            }).catch(error => console.log(error.message))

    }






  return (

      <section className="login-form" >
          <h1>login</h1>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="name"></input>
          {errors && errors.map((item, i) => <p key={i} className="alert">{item.username}</p>)}
          <section className="input-log">
            <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="password"></input>
            <button className="eye" onClick={e => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }</button>
          </section>
          {errors && errors.map((item, i) => <p key={i} className="alert">{item.password}</p>)}
          {alert && <section className="alert"><p className="alert">{alert}</p></section>}

          <button className="button" onClick={logUser}>submit</button>
      </section>
                          
  )
}
