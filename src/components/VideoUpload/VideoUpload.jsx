import { useState, useRef, useContext } from 'react'

import  {ref,uploadBytesResumable, getDownloadURL, getStorage, deleteObject} from 'firebase/storage'

import {storage} from "../../firebase.js"
import { DataContext } from '../Context/DataContext.jsx'
import { UserContext } from '../Context/UserContext.jsx'
import './VideoUpload.scss'



export default function VideoUpload({projID, mongoVideo}){


    const { video, setVideo }=useContext(DataContext)
    const { visitor }= useContext(UserContext)

    const [ progress, setProgress]= useState(0)
    const [ imageUrl, setImageUrl]= useState()
    const img = useRef();


    function formHandler(e){
        e.preventDefault()
        if(visitor){return}
        setImageUrl(URL.createObjectURL(img.current.files[0]))
        //console.log('URL.createObjectURL(img.current.files[0]', URL.createObjectURL(img.current.files[0]))
        const url = uploadFile(img.current.files[0])
    }

    
    function uploadFile(file){
        //console.log('file', file)
        if(visitor){return}
        if(!file){return};
        const storageRef = ref(storage, `/files/video/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress(prog);
            //error callback
        }, (err) => console.log(err),
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((imgUrl) => setVideo(imgUrl))
          }
         )
    }

    
    function deleteVideo(){
        if(visitor){return}

        if(video){
        const storage = getStorage()
        const videoRef=ref(storage, `${video}`)

        deleteObject(videoRef).then(()=>{
            console.log('imgRef',img)
            setVideo("")
            setProgress(0)
            setImageUrl('')
        }).catch((error)=>{
            console.log(error)
        })
        }
        if(mongoVideo){
            const storage = getStorage()
            const videoRef=ref(storage, `${mongoVideo}`)

            deleteObject(videoRef).then(()=>{
                setVideo('')
                setImageUrl('')
               
                
            }).catch((error)=>{
                console.log(error)
            })
            const url = `https://ivoserrawebdev.herokuapp.com/project/${projID}`
            
            const payload={ video:""}
            console.log(payload)
            const config ={ 
                method:"PATCH", 
                headers:{"Content-Type":"application/json"}, 
                body:JSON.stringify(payload)
            }
            fetch(url, config)
            .then(response=> response.json())
            .then(result => {
                console.log(result)
                setVideo('')
                setProject(result.project)
            })
        }
    }
    

    return(
        <section className="Video">
        <div className="file">
        <div>
         {video || mongoVideo ? <video width="420" controls>
              <source src={video || mongoVideo} type="video/mp4"></source>
              <source src={video || mongoVideo} type="video/webm"></source>
          </video> : <></> }
        </div>

        <section className="input-video">
            <input ref={img} type="file" accept="video/*" className="input"/>
            { video || mongoVideo ? null : <button className="button" type="submit" onClick={formHandler}>Upload</button> }
            { video || mongoVideo ? <button className="button" onClick={deleteVideo}>delete</button>: null }
        </section>
        <hr/>

        <h3>Uploaded {progress} % </h3>
        </div>
  
        </section>
    )
}