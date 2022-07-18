import { useState, useContext, useEffect } from "react"
import { DataContext } from "../Context/DataContext"
import VideoUpload from "../VideoUpload/VideoUpload.jsx"
import  {ref,getStorage, deleteObject} from 'firebase/storage'

import "./EditProject.scss"
import ImageUpload from "../ImageUpload/ImageUpload"
import { UserContext } from "../Context/UserContext"


export default function EditProject(){

    const { 
        title, setTitle,
        year, setYear,
        description, setDescription,
        tools, setTools,
        responsive, setResponsive,
        repository, setRepository,
        deploy, setDeploy, 
        video, setVideo,
        image, setImage,
        author, setAuthor,
        type, setType,
        project, setRender
        } = useContext(DataContext)

    const {
        setUpdateProject,
        successful, setSuccessful,
        deleteButton, setDeleteButton, 
        alert, setAlert,
        visitor, setAlertVisitorMsg,
        alertVisitorMsg, authorization, setAuthorization
    } = useContext(UserContext)


    // message for api when creating a project
   const [ message, setMessage]=useState('')
   // mapping errors from error validators from backend
   const [ errors, setErrors]=useState([])


   // submit your edited project
    function submitProject(e){
        e.preventDefault()
        setErrors([])

        if(visitor){
            setAuthorization(true)
            setAlertVisitorMsg('You have no Authorization')
            return
        }


        const url = `https://ivoserrawebdev.herokuapp.com/project/${project._id}`

        // payload with ternary conditions so it does not overwrite old data with the empty inputs.
        const payload ={
            type: type ? type : project.type,
            name: title ? title.replace(/\s/g, '').toLowerCase() : project.name,
            title: title ? title: project.title,
            year:year ? year : project.year,
            description: description ? description: project.description,
            tools: tools ? tools : project.tools,
            responsive: responsive ? responsive : project.responsive,
            repository: repository ? repository: project.repository,
            deploy: deploy ? deploy : project.deploy,
            author:author ? author : project.author,
            video : video ? video : project.video,
            image : image ? image : project.image
        }
        
        const config ={ 
            method:'PATCH', 
            headers:{ "Content-Type": "application/json" }, 
            body:JSON.stringify(payload)
        }

            fetch(url, config)
            .then(response => response.json())
            .then(result => {
               
                if(result.errors){
                    setErrors(result.errors)
                    setAlert("The project was not submitted, please check the required fields")
                    return
                }

                if(result.confirm){
                    setSuccessful(!false)
                    setMessage(result.message)
                    setVideo('')
                    setImage('')
                    setErrors([])
                    setRender(!false)
                }
    
            })
            .catch(error => console.log(error))
      
    
    }

    
    function deleteProject(e){
        if(visitor){
            setAuthorization(true)
            setAlertVisitorMsg('You have no Authorization')
            return
        }

        if(video){
            const storage = getStorage()
            const videoRef=ref(storage, `${video}`)

            deleteObject(videoRef).then(()=>{
                setImage('')
                setImageUrl('')
               
                
            }).catch((error)=>{
                console.log(error)
            })
        }
        if(image){
            const storage = getStorage()
            const videoRef=ref(storage, `${image}`)
    
            deleteObject(videoRef).then(()=>{
                console.log('imgRef',img)
                setImage("")
                setProgress(0)
                setImageUrl('')
            }).catch((error)=>{
                console.log(error)
            })
            }


        const url = `https://ivoserrawebdev.herokuapp.com/project/${project._id}`
        const config ={ 
            method:'DELETE', 
            headers:{ "Content-Type":"application/json"}, 
        }
        fetch(url,config)
        .then(response=>response.json())
        .then(result=>{
            setMessage(result.message)
            setSuccessful(!false)
            setDeleteButton(false)
            setRender(!false)
            
        })
        .catch(error=> console.log(error))
    }


    function closeWindow(){
        setErrors([])
        setUpdateProject(false)
        setAlertVisitorMsg('')
        setAuthorization(false)
    }
          

    return(

        <section className="Update">
            {successful ?
                <section className="box-message">
                    <h2>{message}</h2>
                    <button className="close" onClick={closeWindow}>X</button>
                </section>
                :
                <section >
                    <section className="update-header">
                        <section className="update-message">
                            {authorization && <p className="alert">{alertVisitorMsg}</p>}
                            {message && <h2 className="message">{message}</h2>}
                        </section>
                        <button className="close" onClick={closeWindow}>X</button>
                    </section>

                    <section className="update-inner">
                        {alert && <p className="alert">{alert}</p>}

                        <section className="box-select update">
                            <select onChange={e => setType(e.target.value)}>
                                <option value="">Type of project</option>
                                <option value="PROJ">PROJ</option>
                                <option value="DOM">DOM</option>
                                <option value="SPA">SPA</option>
                                <option value="BACK">BACK</option>
                                <option value="EXPER">EXPER</option>
                            </select>

                            <p>{project.type}</p>
                            {errors && errors.map((item, i) => <p key={i} className="alert">{item.type}</p>)}
                        </section>
                        <section className="update">
                            <p>title</p>
                            <p>{project.title}</p>
                            <input placeholder="update here" type="text" onChange={e => setTitle(e.target.value)}/>
                            {errors && errors.map((item, i) => <p key={i} className="alert">{item.title}</p>)}
                        </section>
                        <section className="update">
                            <p >year</p>
                            <p>{project.year}</p>
                            <input placeholder="click here" type="number" min={2021} max={3000} onChange={e => setYear(e.target.value)} onKeyUp={e => setYear(e.target.value)}/>
                            {errors && errors.map((item, i) => <p key={i} className="alert">{item.year}</p>)}
                        </section>
                        <section className="update">
                            <p>description:</p>
                            <p>{project.description}</p>
                            <textarea placeholder="update your text here" type="text" onChange={e => setDescription(e.target.value)}/>
                            {errors && errors.map((item, i) => <p key={i} className='alert'>{item.description}</p>)}
                        </section>
                        <section className="update">
                            <p>tools:</p>
                            <p>{project.tools}</p>
                            <input placeholder="update here" type="text" onChange={e => setTools(e.target.value.split(","))}/>
                            {errors && errors.map((item, i) => <p key={i} className="alert">{errors.tools}</p>)}
                        </section>
                        <section className="update">
                            <p>responsive</p>
                            <p>{project.responsive}</p>
                            <section className="check">
                                <section className="check">
                                    <p>Yes</p>
                                    <input type="radio" value="Yes" name="responsive" onChange={e => setResponsive(e.target.value)}/>
                                </section>
                                <section className="check">
                                    <p>No</p>
                                    <input type="radio" value="No" name="responsive" onChange={e => setResponsive(e.target.value)}/>
                                </section>
                            </section>

                        </section>

                        <section className="update">
                            <p >repository</p>
                            <p>{project.repository}</p>
                            <input placeholder="update link" type="link" onChange={e => setRepository(e.target.value)}/>
                            {errors && errors.map((item, i) => <p key={i} className='alert'>{item.repository}</p>)}
                        </section>

                        <section className="update">
                            <p >deploy</p>
                            <p>{project.deploy}</p>
                            <input placeholder="update link" type="link" onChange={e => setDeploy(e.target.value)}/>
                            {errors && errors.map((item, i) => <p key={i} className='alert'>{item.deploy}</p>)}
                        </section>

                        <section className="update">
                            <p>video</p>
                            <VideoUpload projID={project._id} mongoVideo={project.video} />
                            {errors && errors.map((item, i) => <p key={i} className='alert'>{item.video}</p>)}
                            {authorization && <p className="alert">{alertVisitorMsg}</p>}
                        </section>

                        <section className="update">
                            <p>image</p>
                            <ImageUpload projID={project._id} mongoImage={project.image} />
                            {errors && errors.map((item, i) => <p key={i} className="alert">{item.image}</p>)}
                            {authorization && <p className="alert">{alertVisitorMsg}</p>}
                        </section>

                        <section className="update">
                            <p >Author</p>
                            <p>{project.author}</p>
                            <input placeholder="update Name" type="text" onChange={e => setAuthor(e.target.value)}/>
                            {errors && errors.map((item, i) => <p key={i} className='alert'>{item.author}</p>)}
                            {authorization && <p className="alert">{alertVisitorMsg}</p>}
                        </section>
                        

                        <section className="button-box">
                            <button className="button" onClick={submitProject}>Submit</button>
                            <button className="button" onClick={e => setDeleteButton(!false)}>delete</button>
                        </section>

                        {alert && <p className="alert" >{alert}</p>}

                        {deleteButton &&

                            <section className="delete-box">
                                <p>Deleting this project will permanently delete this data.</p>
                                <p>Are you sure you want to continue ?</p>
                                {authorization && <p className="alert">{alertVisitorMsg}</p>}
                                <section className="delete-button-box">
                                    <button className="button" onClick={e => setDeleteButton(false)}>No</button>
                                    <button className="button" onClick={deleteProject}>Yes</button>
                                </section>

                            </section>

                        }
                    </section>


                </section>


            }
        </section>


    )
}