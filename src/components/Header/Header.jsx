import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import './Header.scss'

const box ={
    hidden:{opacity:0, y:-100,},
    visible:{ opacity:1, y: 0, transition:{type:"tween", duration:1}},
}
  
  const item={
    hidden:{opacity:0, y:-150,},
    visible:{opacity:1, y:0, transition:{type:"tween",duration:1}},
   
  }


export default function Header(){


    return(
       
        <motion.section variants={box} initial="hidden" animate="visible" className="header">
    
                <motion.section variants={item} initial="hidden" animate="visible" className='brand'>
                <h1>SERRA</h1>
                <p>M.E.R.N. stack </p>
                </motion.section>

                <section className="sub-header">
                
                <nav className="nav-sub-header">
                        <NavLink to="/" className="title subLinkOne">home</NavLink>
                        <NavLink to="/about" className="title subLinkTwo">about</NavLink>
                        <NavLink to="/work" className="title subLinkThree">work</NavLink>
                        <NavLink to="/dashboard" className="title subLinkFour">database</NavLink>
                </nav>
                

                </section>
      
        </motion.section>
       
    )
}