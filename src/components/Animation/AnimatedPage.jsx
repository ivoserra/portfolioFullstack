import {motion} from 'framer-motion'



const animations = {
    initial: {opacity: 0, y:100},
    animate: {opacity: 1, y: 0},
    exit:{opacity:0, y:100}
    
}


export default function AnimatedPage({children}){



    return(
        <motion.div 
        variants={animations} 
        initial="initial" 
        animate="animate"
        whileInView="visible" 
        exit="exit"
        transition={{duration: 0.4}}>

            {children}

        </motion.div>
    )


}