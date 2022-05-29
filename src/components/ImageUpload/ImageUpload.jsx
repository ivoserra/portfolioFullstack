import { useState, useRef, useContext } from 'react'

import  {ref,uploadBytesResumable, getDownloadURL, getStorage, deleteObject} from 'firebase/storage'

import {storage} from "../../firebase.js"
import { DataContext } from '../Context/DataContext.jsx'

import './ImageUpload.scss'




export default function ImageUpload({projID, mongoImage}){

    const { image, setImage }=useContext(DataContext)

    const [ progress, setProgress]= useState(0)
    const [ imageUrl, setImageUrl]= useState()
    const img = useRef();


    function formHandler(e){
        e.preventDefault()
        setImageUrl(URL.createObjectURL(img.current.files[0]))
        //console.log('URL.createObjectURL(img.current.files[0]', URL.createObjectURL(img.current.files[0]))
        const url = uploadFile(img.current.files[0])
      
    }

    
    function uploadFile(file){
        //console.log(file)
        if(!file) return;
        const storageRef = ref(storage, `/files/image/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress(prog);
            //error callback
        }, (err) => console.log(err),
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((imgUrl) => setImage(imgUrl))
          }
         )

    }

    console.log(image)


    function deleteImage(){

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
        if(mongoImage){
            const storage = getStorage()
            const videoRef=ref(storage, `${mongoImage}`)

            deleteObject(videoRef).then(()=>{
                setImage('')
                setImageUrl('')
               
                
            }).catch((error)=>{
                console.log(error)
            })
            const url = `http://localhost:8000/project/${projID}`
            
            const payload={ image:"" }
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
                setImage('')
                setProject(result.project)
            })
        }
    }


    return(
        <section className="Video">
        <div className="file">
        <section className="input-video">
            <input ref={img}  type="file" accept="image/*" className="input"/>
            {image || mongoImage ? null : <button className="button" type="submit" onClick={formHandler}>Upload</button> }
            {image || mongoImage ? <button className="button" onClick={deleteImage}>delete</button> : null }
        </section>
        <hr/>

        <h3>Uploaded {progress} % </h3>
        </div>
        <div className="image-container">
         {image || mongoImage ? <img src={image || mongoImage} width="620" height="240"></img> : null }
        </div>
        </section>
    )
}