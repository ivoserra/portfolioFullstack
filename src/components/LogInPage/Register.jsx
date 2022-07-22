import React, {useContext, useState}from 'react'
import { UserContext } from '../Context/UserContext'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import './LoginPage.scss'

export const Register = () => {

    const { setRegister, registerMsg, setRegisterMsg }= useContext(UserContext)



    const [ errors, setErrors]=useState([])
    const [ name, setName]=useState('')
    const [ password, setPassword]=useState('')
    const [ showPassword, setShowPassword]=useState(false)


    function registerUser(e) {
        e.preventDefault()
        setErrors([])

        const url = ' https://ivoserrawebdev.herokuapp.com/user/register'
        const payload = { username: name, password: password }
        const config = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }

        fetch(url, config)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    setErrors([...result.errors])
                    console.log(errors)
                    setRegister(false)
                    setName('')
                    setPassword('')
                    return
                }
                if (result.confirm) {
                    setRegisterMsg(result.message)
                    setRegister(true)
                    setName('')
                    setPassword('')
                    setErrors([])
                }
                setRegisterMsg(result.message)

            })
            .catch(error => console.log(error))

    }

    return (

        <section className="register-form">
            <section className="regis-info">
                <h2>Are you a visitor?</h2>
                <p>Welcome to my dashboard component</p>
                <p>This is a fullstack CRUD component: I create, delete and update my portfolio from the browser connected to a database.
                    As a visitor you need to register and be able to see my dashboard.. but you will not be able to submit any videos, images and projects.</p>
                <p>Once you register and login there is a delete profile button before you decide to logout , if thats your wish!</p>
                <p>enjoy ! Ivo serra</p>
            </section>
            <section className="reg-form">
                <h1>register here</h1>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="name"></input>
                {errors && errors.map((item, i) => <p key={i} className="alert">{item.username}</p>)}
                <section className='input-log'>
                    <input type={showPassword ? "text":"password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="password"></input>
                    <button className="eye" onClick={e => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }</button>
                </section>
                {errors && errors.map((item, i) => <p key={i} className="alert">{item.password}</p>)}
                {registerMsg && <p className="alert">{registerMsg}</p>}

                <button className="button" onClick={registerUser}>submit</button>
            </section>
        </section>
  )
}
