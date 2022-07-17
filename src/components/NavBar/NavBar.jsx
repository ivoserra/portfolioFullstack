import { NavLink, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from '../Context/DataContext'

import './navbar.scss'
import AnimatedPage from '../Animation/AnimatedPage'




export default function NavBar(){

const {data} = useContext(DataContext)


const proj = data.filter(item => item.type ==="PROJ")
const dom = data.filter( item => item.type ==="DOM")
const spa = data.filter(item => item.type === "SPA")
const back = data.filter(item=>item.type === "BACK")

      
    return (
   
  
        <section className="works">
        <AnimatedPage>
        <div className="projects">

        <section className="project">
         <li><h2>Personal Projects</h2></li>
        { proj.map(item => <li key={item._id}><NavLink className="title" key={item.name} to={item.name}>{item.title}</NavLink></li>)}
        </section>
       
        <section className="project">
         <li><h2>DOM and API</h2></li>
        { dom.map(item => <li key={item._id}><NavLink className="title" key={item.name} to={item.name}>{item.title}</NavLink></li>)}
        </section>

        <section className="project">
         <li><h2>REACT and API</h2></li>
        { spa.map(item => <li key={item._id}><NavLink className="title" key={item.name} to={item.name}>{item.title}</NavLink></li>)}
        </section>

        <section className="project">
        <li><h2>Express / MongoDB</h2></li>
        { back.map(item => <li key={item._id}><NavLink className="title" key={item.name} to={item.name}>{item.title}</NavLink></li>)}
        </section>

        </div>
        </AnimatedPage>
       
        <Outlet/>

        </section>


    

    )
}
