import { motion } from 'framer-motion'



const withTransition = (Component) =>{

    return (props) =>(<motion.div
                 
    initial="initialState"
    animate="animateState"
    exit="exitState"
    transition={{
      duration: 0.5,
    }}
    variants={{
      initialState:{
        opacity: 0,
      },
      animateState:{
        opacity: 1,
      },
      exitState:{
  
      },
    }}
  
  
  
  className="fade-in-out">
  <Component {...props}/>
  </motion.div>
  
  )
  }
export default withTransition;