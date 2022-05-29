import { useState, useContext, useEffect } from "react"
import { DataContext } from "../Context/DataContext"
import VideoUpload from "../VideoUpload/VideoUpload.jsx"
import  {ref,getStorage, deleteObject} from 'firebase/storage'

import "./Update.scss"
import ImageUpload from "../ImageUpload/ImageUpload"
import { UserContext } from "../Context/UserContext"


export default function Update(){

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
        project,
        } = useContext(DataContext)

    const {
        update, setUpdate,
        confirm, setConfirm,
        deleteButton, setDeleteButton, 
        alert, setAlert,
        alertType, setAlertType,
        alertTitle, setAlertTitle,
        alertYear,setAlertYear,
        alertDescription, setAlertDescription,
        alertDeploy, setAlertDeploy,
        alertRepository, setAlertRepository,
        alertVideo, setAlertVideo,
        alertImage,setAlertImage,
        alertAuthor,setAlertAuthor,
        alertTools, setAlertTools,
    } = useContext(UserContext)


   const [message, setMessage]=useState('') 
      

    function updateData(e){
        e.preventDefault()

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

        const url = `http://localhost:8000/project/${project._id}`
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
            image : image ? image : project.image,
        }
        const config ={ 
            method:'PATCH', 
            headers:{ "Content-Type":"application/json" }, 
            body:JSON.stringify(payload)
        }

            fetch(url, config)
            .then(response => response.json())
            .then(result => {
                if(result.errors){
                    result.errors.forEach(err=>{
                        err.type ? setAlertType(err.type):null
                        err.year? setAlertYear(err.year):null
                        err.title ? setAlertTitle(err.title):null
                        err.description ? setAlertDescription(err.description):null
                        err.repository ? setAlertRepository(err.repository):null
                        err.deploy ? setAlertDeploy(err.deploy):null
                        err.video ? setAlertVideo(err.video):null
                        err.image? setAlertImage(err.image):null
                        err.author? setAlertAuthor(err.author):null
                        err.tools ? setAlertTools(err.tools):null
                    })
                    setAlert("The project was not submitted, please check the required fields")
                    return
                }
                setConfirm(!false)
                setMessage(result.message)
                setVideo('')
                setImage('')
                console.log('update data confirm ')
    
            })
            .catch(error => console.log(error))
      
    
    }

    
    function deleteProject(e){

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


        const url = `http://localhost:8000/project/${project._id}`
        const config ={ 
            method:'DELETE', 
            headers:{ "Content-Type":"application/json"}, 
        }
        fetch(url,config)
        .then(response=>response.json())
        .then(result=>{
            console.log(result)
            setMessage(result.message)
            setConfirm(!false)
            setDeleteButton(false)
            
        })
        .catch(error=> console.log(error))
    }
          

    return(

        <section className="Update">
        {confirm ? 
        <section className="box-message">
        <h2>{message}</h2>
        <button className="close" onClick={e=>setUpdate(false)}>X</button>
        </section>
        : 
        <section key={project._id}>
        <section className="update-header">
        <section className="update-message">
        {message ? <h2 className="message">{message}</h2>: null}
        </section>
        <button className="close" onClick={e=>setUpdate(false)}>X</button>
        </section>

        <section className="update-inner">
        {alert ? <p className="alert">{alert}</p>: null}
            <section className="box-select update">
                <select onChange={e =>setType(e.target.value)}>
                    <option value="">Type of project</option>
                    <option value="PROJ">PROJ</option>
                    <option value="DOM">DOM</option>
                    <option value="SPA">SPA</option>
                    <option value="BACK">BACK</option>
                    <option value="EXPER">EXPER</option>   
                </select>
                <p>{project.type}</p>
                {alertType ? <p className="alert">{alertType}</p>: null}
                </section>
            <section className="update">
                <p>title</p>
                <p>{project.title}</p>
                <input placeholder="update here" type="text" onChange={e=>setTitle(e.target.value)}></input>
                {alertTitle ? <p className="alert">{alertTitle}</p> : null}
            </section>
            <section className="update">
                  <p >year</p>
                  <p>{project.year}</p>
                  <input placeholder="click here       ------->" type="number" min={2021} max={3000} onChange={ e =>setYear(e.target.value)} onKeyUp={e=>setYear(e.target.value)}></input>
                  { alertYear ? <p className="alert">{alertYear}</p> : null} 
            </section>
            <section className="update">
                  <p>description:</p>
                  <p>{project.description}</p>
                  <textarea placeholder="update your text here" type="text" onChange={ e =>setDescription(e.target.value)}></textarea>
                  { alertDescription ? <p className='alert'>{alertDescription}</p> : null}
            </section>
            <section className="update">
                  <p>tools:</p>
                  <p>{project.tools}</p>
                  <input placeholder="update here" type="text" onChange={ e => setTools(e.target.value.split(","))}></input>
                  { alertTools ? <p className="alert">{alertTools}</p>:null }             
            </section>
            <section className="update">
                  <p>responsive</p>
                  <p>{project.responsive}</p>
                  <section className="check">
                  <section className="check">
                  <p>Yes</p>
                  <input type="radio" value="Yes" name="responsive" onChange={e=> setResponsive(e.target.value)}></input>
                  </section>
                  <section className="check">
                  <p>No</p>
                  <input type="radio" value="No" name="responsive" onChange={e=> setResponsive(e.target.value)}></input>
                  </section>
                  </section>

              </section>
              <section className="update">
                  <p >repository</p>
                  <p>{project.repository}</p>
                  <input placeholder="update link" type="link" onChange={ e => setRepository(e.target.value)}></input>
                  {alertRepository ? <p className='alert'>{alertRepository}</p> : null}
             </section>
              <section className="update"> 
                  <p >deploy</p>   
                  <p>{project.deploy}</p>
                  <input placeholder="update link" type="link" onChange={ e => setDeploy(e.target.value)}></input>
                  {alertDeploy ? <p className='alert'>{alertDeploy}</p> : null}
              </section>
              <section className="update">
                 <p>video</p>
                  <VideoUpload projID={project._id} mongoVideo={project.video}/>
                  {alertVideo ? <p className='alert'>{alertVideo}</p> : null}     
              </section>
              <section className="update">
                 <p>image</p>
                 <ImageUpload projID={project._id} mongoImage={project.image}/>
                 {alertImage ? <p className="alert">{alertImage}</p>:null}
              </section>
              <section className="update">
                  <p >Author</p>
                  <p>{project.author}</p>
                   <input placeholder="update Name" type="text" onChange={ e => setAuthor(e.target.value)}></input>
                   {alertAuthor ? <p className='alert'>{alertAuthor}</p>:null}
              </section>
              <section className="button-box">
                <button className="button" onClick={updateData}>Submit</button>
                <button className="button" onClick={e=>setDeleteButton(!false)}>delete</button>
              </section>
              {alert ? <p className="alert" >{alert}</p> : null}
              { deleteButton ?
                <section className="delete-box">
                <p>Deleting this project will permanently delete this data.</p>
                <p>Are you sure you want to continue ?</p>
                <section className="delete-button-box">
                    <button className="button" onClick={e => setDeleteButton(false)}>No</button>
                    <button  className="button" onClick={deleteProject}>Yes</button>
                </section>
                </section>
            
                :
                null

              }
              </section>
    
           
           </section>
           
    
        }
        </section>
    

    )
}