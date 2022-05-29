import { useState, useContext, useEffect } from "react"
import Update from '../Update/Update.jsx'
import Create from '../Create/Create.jsx'
import { DataContext } from "../Context/DataContext.jsx"

import { UserContext } from "../Context/UserContext.jsx"
import "./Editor.scss"



export default function Editor(){

    
    const { setProject , library, setLibrary, setMessage, upToDate, setVideo, setImage }=useContext(DataContext)

    const {
        confirm, setConfirm,
        deleteButton, 
        update, setUpdate, 
        newProject , setNewProject, 
        login,setLogin,setAlert,setAlertType,
        setAlertTitle, setAlertYear, 
        setAlertDescription,setAlertTools,setAlertDeploy,setAlertRepository,
        setAlertVideo,setAlertImage,setAlertAuthor,
        visitor, 
        user, setUser,
    
    } = useContext(UserContext) 
    



    useEffect(()=>{
        const url = "http://localhost:8000/project"
        fetch(url)
        .then(response=>response.json())
        .then(result=>{
            if(result.confirm){
                setLibrary(result.project)
            }
           
        })
        .catch(error=> console.log(error.message))
    },[ login, update, newProject ])
    
    
    const dom = library.filter( item => item.type ==="DOM")
    const proj = library.filter(item => item.type ==="PROJ")
    const spa = library.filter(item => item.type === "SPA")
    const back = library.filter(item=>item.type === "BACK")
    const exper = library.filter(item => item.type === 'EXPER')
    


    function openProject(id){
        setConfirm(false)
        setAlert('')
        setAlertType('')                
        setAlertYear('')
        setAlertTitle('')
        setAlertDescription('')
        setAlertRepository('')
        setAlertDeploy('')
        setAlertTools('')
        setAlertVideo()
        setAlertImage()
        setAlertAuthor()
        console.log(id)
        const proj = library.find(proj => proj._id === id)
        console.log(proj)
        if( proj){
            setProject(proj)
            setUpdate(!false)
            setNewProject(false)
        }
     


    }

    function createProject(e){
        e.preventDefault()
        setUpdate(false)
        setNewProject(!false)
        setConfirm(false)
       
    }

    function deleteProfile(e){
        const payload = { username : user}
        const config = { method: 'DELETE', headers:{ "Content-type":"application/json"}, body:JSON.stringify(payload)}
        const url = "http://localhost:8000/user/profile"
        fetch(url, config)
        .then(response=>response.json())
        .then(result=>{
            if(result.confirm){
              setUser('')
              setLogin(false)
              setVisitor(false)
            }
           
        })
        .catch(error=> console.log(error.message))
    }


    return(
        <section className="Editor">
        <section className="editor-buttons">
          <button className="button one " onClick={deleteProfile}>delete profile</button>
          <button className="button one" onClick={createProject}>create a new project</button>
        </section>
          
          <section className="editor-all">
            <section className="editor-list">

                <section className="editor-block">
                    <h5>PROJECTS</h5>
                    {proj.map(item => <section  className="editor-proj" key={item._id}>
                        <p>{item.title}</p>
                    
                        <button className="buttonL" onClick={e => openProject(item._id)}>edit</button>
                    
                        </section>
                        )}
                </section>
                <section className="editor-block">
                    <h5>DOM and API</h5>
                    {dom.map(item => <section  className="editor-proj" key={item._id}>
                        <p>{item.title}</p>
                    
                        <button className="buttonL" onClick={e => openProject(item._id)}>edit</button>
                    
                        </section>
                        )}
                </section>
                <section className="editor-block">
                    <h5>SPA and API</h5>
                    {spa.map(item => <section  className="editor-proj" key={item._id}>
                        <p>{item.title}</p>
                    
                        <button className="buttonL" onClick={e => openProject(item._id)}>edit</button>
                    
                        </section>
                        )}
                </section>
                <section className="editor-block">
                    <h5>BACKEND</h5>
                    {back.map(item => <section  className="editor-proj" key={item._id}>
                        <p>{item.title}</p>
                    
                        <button className="buttonL" onClick={e => openProject(item._id)}>edit</button>
                    
                        </section>
                        )}
                </section>
                <section className="editor-block">
                    <h5>exper</h5>
                    {exper.map(item => <section  className="editor-proj" key={item._id}>
                        <p>{item.title}</p>
                    
                        <button className="buttonL" onClick={e => openProject(item._id)}>edit</button>
                    
                        </section>
                        )}
                </section>
       
            </section>
        
            <section className="editor-form">
            {update ? <Update></Update>:<></>}
            {newProject ? <Create/>:<></>}
            </section>

        </section>
       </section>

    )
}