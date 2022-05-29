import React from 'react'
import {useState}from 'react'


export const UserContext =React.createContext(null)

export default function UserContextProvider(props){
    
    
const [ login, setLogin ] = useState(false)
const [ update, setUpdate ] = useState(false)
const [ newProject, setNewProject ] = useState(false)
const [ confirm, setConfirm ] = useState(false)
const [ deleteButton, setDeleteButton ] = useState(false)
const [ alert, setAlert ] = useState('')


const [ alertUser, setAlertUser ] = useState('')
const [ alertPassword, setAlertPassword ] = useState('')
const [ alertType, setAlertType ] = useState('')
const [ alertTitle, setAlertTitle ] = useState("")
const [ alertYear, setAlertYear ] = useState("")
const [ alertDescription, setAlertDescription ] = useState('')
const [ alertTools, setAlertTools ] = useState('')
const [ alertDeploy, setAlertDeploy ] = useState('')
const [ alertRepository, setAlertRepository ] = useState('')
const [ alertVideo, setAlertVideo ] = useState('')
const [ alertImage, setAlertImage ] = useState('')
const [ alertAuthor, setAlertAuthor ] = useState('')
const [ alertRegName, setAlertRegName ] = useState('')
const [ alertRegPass, setAlertRegPass ] = useState('')
const [ alertReg, setAlertReg ] = useState('')

const [ name, setName ] = useState('')
const [ password, setPassword ] = useState('')
const [ regName, setRegName]=useState('')
const [ regPass, setRegPass]=useState('')
const [ visitor, setVisitor ] = useState(false)
const [ user, setUser ] = useState('')

const contextUser = {

    login, setLogin,
    update, setUpdate,
    newProject, setNewProject,
    confirm, setConfirm,
    alert, setAlert,
    alertUser, setAlertUser,
    alertPassword, setAlertPassword,
    alertType, setAlertType,
    alertTitle, setAlertTitle,
    alertYear,setAlertYear,
    alertDescription, setAlertDescription,
    alertTools, setAlertTools,
    alertDeploy, setAlertDeploy,
    alertRepository, setAlertRepository,
    alertVideo, setAlertVideo,
    alertImage, setAlertImage,
    alertAuthor, setAlertAuthor,
    name, setName,
    password, setPassword,
    deleteButton, setDeleteButton,
    alertRegName,setAlertRegName,
    alertRegPass, setAlertRegPass,
    alertReg, setAlertReg,
    visitor, setVisitor,
    regName,setRegName,
    regPass, setRegPass,
    user, setUser 
   
   

}


return(
    <UserContext.Provider value={contextUser}>
        {props.children}
    </UserContext.Provider>
)

}