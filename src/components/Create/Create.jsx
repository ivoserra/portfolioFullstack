import { useContext, useState, useEffect } from 'react'
import VideoUpload from '../VideoUpload/VideoUpload.jsx'

import { DataContext } from '../Context/DataContext.jsx'
import ImageUpload from '../ImageUpload/ImageUpload.jsx'
import { UserContext } from '../Context/UserContext.jsx'
import './Create.scss'



export default function Create(){

  const { 
      title, setTitle,
      year, setYear,
      description,setDescription,
      tools, setTools,
      responsive, setResponsive,
      repository, setRepository,
      deploy, setDeploy,
      author, setAuthor,
      type, setType, 
      video, image, 
    } = useContext(DataContext)

  const { 
      alert, setAlert,
      alertType, setAlertType, 
      alertTitle, setAlertTitle,
      alertYear, setAlertYear,
      alertDescription, setAlertDescription,
      alertTools, setAlertTools,
      alertDeploy, setAlertDeploy,
      alertRepository, setAlertRepository,
      alertVideo, setAlertVideo,
      alertImage, setAlertImage,
      alertAuthor, setAlertAuthor,
      confirm, setConfirm, 
    setNewProject,
    
    } = useContext(UserContext)
 
    

  const [message, setMessage]=useState('')
  const url= "http://localhost:8000/project"


   function handleSubmit(e){
        e.preventDefault()

        setAlert('')
        setMessage('')
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

       
        const payload ={
            type:type ,
            name: title.replace(/\s/g, '').toLowerCase(),
            title:title,  
            year:year, 
            description:description,
            tools:tools,
            responsive:responsive,
            repository: repository,
            deploy:deploy,
            video:video,
            image:image,
            author:author,
            
        }
        
        const config={
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(payload)
        }

        fetch(url, config)
        .then(response=>response.json())
        .then(result => {

            if(result.errors){
                result.errors.map(err=>{
                    err.type? setAlertType(err.type):null                 
                    err.year? setAlertYear(err.year):null
                    err.title ? setAlertTitle(err.title):null
                    err.description ? setAlertDescription(err.description):null
                    err.repository ? setAlertRepository(err.repository):null
                    err.deploy ? setAlertDeploy(err.deploy):null
                    err.tools ? setAlertTools(err.tools):null
                    err.video ? setAlertVideo(err.video):null
                    err.image? setAlertImage(err.image):null
                    err.author? setAlertAuthor(err.author):null
                   
                })
                setAlert("The project was not submitted, please check the required fields")
                return
            }

            if(result.confirm){
                console.log(result.message)
                setMessage(result.message)
                setConfirm(!false)
            }
            
            
            
        }).catch(error => console.log(error))

    } 

 
 

    return(
        <section className="Create">
        {confirm ? 
        <section className='box-message'>
        <h2>{message}</h2>
        <button className="close" onClick={e =>setNewProject(false)}>X</button>
        </section>
        :
        <section>
        <section className="create-header">
        <section className="create-message">
        {message ? <h2 className="message">{message}</h2>: null}
     
        </section>
        <button className="close" onClick={e=>setNewProject(false)}>X</button>
        </section>
       
          <section className="create-inner">
          {alert ? <p className="alert">{alert}</p>: null}
                <section className="box-select create">
                <select onChange={e =>setType(e.target.value)}>
                    <option value="" >Type of project</option>
                    <option value="PROJ">PROJ</option>
                    <option value="DOM">DOM</option>
                    <option value="SPA">SPA</option>
                    <option value="BACK">BACK</option>
                    <option value="EXPER">EXPER</option>   
                </select>
                {alertType ? <p className="alert">{alertType}</p>: null}
                </section>
                    <section className="create">
                        <p>title</p>
                        <input type="text" onChange={ e =>setTitle(e.target.value)} placeholder="write here"></input>
                        {alertTitle ? <p className="alert">{alertTitle}</p> : null}
                    </section>
                    <section className="create">
                        <p>year</p>
                        <input type="number" placeholder="click       --->" min={2021} max={3000} onChange={ e =>setYear(e.target.value)} onKeyUp={e=>setYear(e.target.value)}></input>
                        { alertYear ? <p className="alert">{alertYear}</p>:null}
                    </section>
                    <section className="create">
                        <p>description</p>
                        <textarea type="text" onChange={ e =>setDescription(e.target.value)} placeholder="write here"></textarea>
                        { alertDescription ? <p className='alert'>{alertDescription}</p>:null}
                    </section>
                    <section className="create">
                        <p>tools: html, css, react... </p>
                        <input type="text" onChange={ e => setTools(e.target.value.split(","))}></input> 
                        { alertTools ? <p className="alert">{alertTools}</p>:null }                
                    </section>
                    <section className="create">
                        <p>responsive:</p>
                        <section className='check'>
                        <section className="check">
                        <p>Yes</p>
                        <input type="radio" value="Yes" name="responsive" onChange={e=> setResponsive(e.target.value)}></input>
                        </section>
                        <section className='check'>
                        <p>No</p>
                        <input type="radio" value="No" name="responsive" onChange={e=> setResponsive(e.target.value)}></input>
                        </section>
                        </section>

                    </section>
                    
                    <section className='create'>
                        <p>repository</p>
                        <input type="link" onChange={ e => setRepository(e.target.value)} placeholder="must be a link"></input>
                        {alertRepository ? <p className='alert'>{alertRepository}</p>:null}
                        </section>
                        <section className="create">
                        <p>deploy</p>
                        <input type="link" onChange={ e => setDeploy(e.target.value)} placeholder="must be a link"></input>
                        {alertDeploy ? <p className='alert'>{alertDeploy}</p>:null}
                    </section>
              
                    <section className="create">
                        <p>video</p>
                        <VideoUpload/>
                        {alertVideo ? <p className='alert'>{alertVideo}</p>:null}
                    </section>
                    <section className="create">
                        <p>image</p>
                        <ImageUpload/>
                        {alertImage ? <p className="alert">{alertImage}</p>:null}
                    </section>
                    <section className="create">
                        <p>Author</p>
                        <input type="text" onChange={ e => setAuthor(e.target.value)} placeholder="write here"></input>
                        {alertAuthor ? <p className='alert'>{alertAuthor}</p>:null}
                    </section>
                    <button className="button" onClick={handleSubmit}>Submit</button>
                    {alert ? <p className="alert" >{alert}</p> : null}
    
          </section>
          
            
            
        </section>
        }
   
        
        </section>
    )
}