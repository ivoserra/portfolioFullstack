import React from 'react'
// import data from '../../Data/data.js'
import { useState, useEffect } from 'react'
import UserContextProvider from './UserContext'




export const DataContext = React.createContext(null)


export default function DataContextProvider(props){



    
    const [ project, setProject]=useState({})
 
    const [ message , setMessage]=useState("")
    
    // data from mongoose
    const [ data, setData]=useState([])
  
    
    // variables for each input on the forms for creating a project or update a project
    const [ title , setTitle ]= useState('')
    const [ year, setYear ]= useState()
    const [ description, setDescription ]= useState('')
    const [ tools, setTools]= useState(null)
    const [ responsive, setResponsive ]= useState("no")
    const [ repository, setRepository ]= useState('')
    const [ deploy, setDeploy ]= useState('')
    const [ video, setVideo]=useState()
    const [ image, setImage ]=useState("")
    const [ author, setAuthor ]= useState('')
    const [ type, setType ]=useState("")

    const [ render, setRender]=useState(false)


    useEffect(()=>{

        fetch(" https://ivoserrawebdev.herokuapp.com/project")
        .then(response=> response.json())
        .then(result => {
            if(result.confirm){
                setMessage(result.message)
                setData(result.project)
                console.log('fetch')
            }
       
        })
        .catch(error => console.log(error.message))

    },[render])



    const contextData = { 
        data, setData,
        type, setType,
        title, setTitle,
        year, setYear,
        description, setDescription,
        tools, setTools,
        responsive, setResponsive,
        repository, setRepository,
        deploy, setDeploy,
        author, setAuthor,
        image,setImage, 
        video, setVideo, 
        project, setProject, 
        message, setMessage, 
        project, setProject,
        render, setRender,    
    }
  
  
    return(
        <DataContext.Provider value={contextData}>
            {props.children}
        </DataContext.Provider>
    )
}