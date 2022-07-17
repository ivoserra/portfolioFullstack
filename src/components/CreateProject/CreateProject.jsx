import { useContext, useState, useEffect } from 'react'
import VideoUpload from '../VideoUpload/VideoUpload.jsx'

import { DataContext } from '../Context/DataContext.jsx'
import ImageUpload from '../ImageUpload/ImageUpload.jsx'
import { UserContext } from '../Context/UserContext.jsx'
import './CreateProject.scss'



export default function CreateProject(){

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
      video, setVideo, image, setImage, setRender
    } = useContext(DataContext)

  const { 
      alert, setAlert,
      successful, setSuccessful, 
      setNewProject, visitor,
      alertVisitorMsg, setAlertVisitorMsg,
      authorization, setAuthorization
    
    } = useContext(UserContext)
 


    const [message, setMessage]=useState('')
    const [errors, setErrors]=useState([])

  

   function handleSubmit(e){
        e.preventDefault()
        if(visitor){
            setAuthorization(true)
            setAlertVisitorMsg('You have no Authorization for submit')
            return
        }

        setAlert('')
        setMessage('')
    
       
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
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify(payload)
        }
        const url= "https://ivoserrawebdev.herokuapp.com/project"


        fetch(url, config)
        .then(response=>response.json())
        .then(result => {
            if(result.errors){
                setErrors(result.errors)
                setAlert("The project was not submitted, please check the required fields")
                return
            }

            if(result.confirm){
                setMessage(result.message)
                setSuccessful(!false)
                setErrors([])
                setVideo('')
                setImage('')
                setRender(!false)
            }
            
            
            
        }).catch(error => console.log(error))

    } 



  function closeWindow(){
    setNewProject(false)
    setAuthorization(false)
    setAlertVisitorMsg('')
    setAlert('')
    setMessage('')
    setErrors([])
}
 

    return(
        <section className="Create">
            {successful ?
                <section className='box-message'>
                    <h2>{message}</h2>
                    <button className="close" onClick={closeWindow}>X</button>
                </section>
                :
                <section>
                    <section className="create-header">
                        <section className="create-message">
                            {message ? <h2 className="message">{message}</h2> : null}

                        </section>
                        <button className="close" onClick={closeWindow}>X</button>
                    </section>

                    <section className="create-inner">
                        {alert && <p className="alert">{alert}</p> }
                        {authorization && <p className="alert">{alertVisitorMsg}</p> }

                        <section className="box-select create">
                            <select onChange={e => setType(e.target.value)}>
                                <option value="" >Type of project</option>
                                <option value="PROJ">PROJ</option>
                                <option value="DOM">DOM</option>
                                <option value="SPA">SPA</option>
                                <option value="BACK">BACK</option>
                                <option value="EXPER">EXPER</option>
                            </select>
                            {errors && errors.map((item, i) => <p key={i} className="alert">{item.type}</p>)}
                        </section>

                        <section className="create">
                            <p>title</p>
                            <input type="text" onChange={e => setTitle(e.target.value)} placeholder="write here"/>
                            {errors && errors.map((item, i) => <p key={i} className="alert">{item.title}</p>)}
                        </section>

                        <section className="create">
                            <p>year</p>
                            <input type="number" placeholder="click       --->" min={2021} max={3000} onChange={e => setYear(e.target.value)} onKeyUp={e => setYear(e.target.value)}/>
                            {errors && errors.map((item, i) => <p key={i} className="alert">{item.year}</p>)}
                        </section>

                        <section className="create">
                            <p>description</p>
                            <textarea type="text" onChange={e => setDescription(e.target.value)} placeholder="write here"/>
                            {errors && errors.map((item, i) => <p key={i} className='alert'>{item.description}</p>)}
                        </section>

                        <section className="create">
                            <p>tools: html, css, react... </p>
                            <input type="text" onChange={e => setTools(e.target.value.split(","))}/>
                            {errors && errors.map((item, i) => <p key={i} className="alert">{item.tools}</p>)}
                        </section>

                        <section className="create">
                            <p>responsive:</p>
                            <section className='check'>
                                <section className="check">
                                    <p>Yes</p>
                                    <input type="radio" value="Yes" name="responsive" onChange={e => setResponsive(e.target.value)}/>
                                </section>
                                <section className='check'>
                                    <p>No</p>
                                    <input type="radio" value="No" name="responsive" onChange={e => setResponsive(e.target.value)}/>
                                </section>
                            </section>
                        </section>

                        <section className='create'>
                            <p>repository</p>
                            <input type="link" onChange={e => setRepository(e.target.value)} placeholder="must be a link"/>
                            {errors && errors.map((item, i) => <p key={i} className='alert'>{item.repository}</p>)}
                        </section>

                        <section className="create">
                            <p>deploy</p>
                            <input type="link" onChange={e => setDeploy(e.target.value)} placeholder="must be a link"/>
                            {errors && errors.map((item, i) => <p key={i} className='alert'>{item.deploy}</p>)}
                        </section>

                        <section className="create">
                            <p>video</p>
                            {authorization && <p className="alert">{alertVisitorMsg}</p>}
                            <VideoUpload />
                            {errors && errors.map((item, i) => <p key={i} className='alert'>{item.ideo}</p>)}
                        </section>

                        <section className="create">
                            <p>image</p>
                            {authorization && <p className="alert">{alertVisitorMsg}</p>}
                            <ImageUpload />
                            {errors && errors.map((item, i) => <p key={i} className="alert">{item.image}</p>)}
                        </section>

                        <section className="create">
                            <p>Author</p>
                            <input type="text" onChange={e => setAuthor(e.target.value)} placeholder="write here"/>
                            {errors && errors.map((item, i) => <p key={i} className='alert'>{item.author}</p>)}
                        </section>

                        <button className="button" onClick={handleSubmit}>Submit</button>
                        {authorization && <p className="alert">{alertVisitorMsg}</p>}
                        {alert && <p className="alert" >{alert}</p>}


                    </section>



                </section>
            }


        </section>
    )
}