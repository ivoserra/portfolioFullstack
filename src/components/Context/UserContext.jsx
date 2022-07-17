import React from 'react'
import {useState}from 'react'


export const UserContext =React.createContext(null)

export default function UserContextProvider(props){


// to open the dashboard is login is true
const [ login, setLogin ] = useState(false)

// condition to distinguish admin from visitor
const [ visitor, setVisitor ] = useState(false)

// set the user when logged
const [ user, setUser ] = useState('')

// to confirm if the user has authority for create and delete projects
const [ authorization, setAuthorization]=useState(false)

// to open a window to update or edit a project
const [ updateProject, setUpdateProject ] = useState(false)

// to open the window of a new project to create
const [ newProject, setNewProject ] = useState(false)


// condition when a project is successfully submited 
const [ successful, setSuccessful ] = useState(false)

// state for delete button
const [ deleteButton, setDeleteButton ] = useState(false)

// state variable for specific alert messages from the backend
const [ alert, setAlert ] = useState('')


// register to open or close the register form
const [ register, setRegister ] = useState(false)

// state for specific messages from backend
const [ registerMsg, setRegisterMsg ] = useState('')

// state for specific messages on backend 
const [ message, setMessage ]=useState('')

// state to warn user when visitor that cannot perform admin actions
const [ alertUser, setAlertUser ] = useState('')
const [ alertReg, setAlertReg ] = useState('')
const [ alertVisitorMsg, setAlertVisitorMsg] = useState('')



const contextUser = {

    login, setLogin,
    updateProject, setUpdateProject,
    newProject, setNewProject,
    successful, setSuccessful,
    register, setRegister,
    registerMsg, setRegisterMsg,
    message, setMessage,

    alert, setAlert,
    alertUser, setAlertUser,
    

    alertVisitorMsg, setAlertVisitorMsg,
   
    deleteButton, setDeleteButton,
    alertReg, setAlertReg,
    visitor, setVisitor,
 
    user, setUser,
    authorization, setAuthorization, 
   
}


return(
    <UserContext.Provider value={contextUser}>
        {props.children}
    </UserContext.Provider>
)

}