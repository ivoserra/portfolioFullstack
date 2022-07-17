import { useState, useContext, useEffect } from "react"
import { DataContext } from "../Context/DataContext.jsx"

import { UserContext } from "../Context/UserContext.jsx"
import "./Editor.scss"
import CreateProject from "../CreateProject/CreateProject.jsx"
import EditProject from "../EditProject/EditProject.jsx"



export default function Dashboard(){

    
    const { data, setProject }=useContext(DataContext)

    const { setSuccessful, updateProject, setUpdateProject, newProject, setNewProject, setLogin,setAlert, user, setUser
    
    } = useContext(UserContext) 
    
   

    
    
    const dom = data.filter( item => item.type ==="DOM")
    const proj = data.filter(item => item.type ==="PROJ")
    const spa = data.filter(item => item.type === "SPA")
    const back = data.filter(item=> item.type === "BACK")
    const exper = data.filter(item => item.type === 'EXPER')


    // pre-delete profile condition
    const [ prevDelete, setPrevDelete] = useState(false)


    function openProject(id){
        setSuccessful(false)
        setAlert('')
        const proj = data.find(proj => proj._id === id)
        
        if(proj){
            setUpdateProject(true)
            setProject(proj)
            setNewProject(false)

        }
    
    }

    function createProject(e){
        e.preventDefault()
        setUpdateProject(false)
        setNewProject(!false)
        
       
    }

    function deleteProfile(e){
        const payload = { username : user}
        const config = { method: 'DELETE', headers:{ "Content-type":"application/json"}, body:JSON.stringify(payload)}
        const url = " https://ivoserrawebdev.herokuapp.com/user/profile"
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
            {prevDelete &&
                <section className="deleteProfile">
                    <p>Are you sure you want to delete your profile ?</p>
                    <button className="button" onClick={deleteProfile}>Yes</button>
                    <button className="button" onClick={e => setPrevDelete(false)}>No</button>
                </section>}

            <section className="editor-buttons">
                {!prevDelete && <button className="button one " onClick={e => setPrevDelete(!false)}>delete profile</button>}
                <button className="button one" onClick={createProject}>create a new project</button>
            </section>

            <section className="editor-all">
                <section className="editor-list">
                    <section className="editor-block">
                        <h5>PROJECTS</h5>
                        {proj.map(item => <section className="editor-proj" key={item._id}>
                            <p>{item.title}</p>
                            <button className="buttonL" onClick={e => openProject(item._id)}>edit</button>
                        </section>
                        )}
                    </section>
                    <section className="editor-block">
                        <h5>DOM and API</h5>
                        {dom.map(item => <section className="editor-proj" key={item._id}>
                            <p>{item.title}</p>

                            <button className="buttonL" onClick={e => openProject(item._id)}>edit</button>

                        </section>
                        )}
                    </section>
                    <section className="editor-block">
                        <h5>SPA and API</h5>
                        {spa.map(item => <section className="editor-proj" key={item._id}>
                            <p>{item.title}</p>
                            <button className="buttonL" onClick={e => openProject(item._id)}>edit</button>
                        </section>
                        )}
                    </section>
                    <section className="editor-block">
                        <h5>BACKEND</h5>
                        {back.map(item => <section className="editor-proj" key={item._id}>
                            <p>{item.title}</p>

                            <button className="buttonL" onClick={e => openProject(item._id)}>edit</button>

                        </section>
                        )}
                    </section>
                    <section className="editor-block">
                        <h5>exper</h5>
                        {exper.map(item => <section className="editor-proj" key={item._id}>
                            <p>{item.title}</p>

                            <button className="buttonL" onClick={e => openProject(item._id)}>edit</button>

                        </section>
                        )}
                    </section>

                </section>

                <section className="editor-form">
                    {updateProject && <EditProject />}
                    {newProject && <CreateProject />}
                </section>

            </section>
       </section>

    )
}