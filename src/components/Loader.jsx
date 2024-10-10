import React from 'react'
import { PacmanLoader } from 'react-spinners'

const Loader = () => {
  return (
   <>
           <div className="absolute top-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center w-screen h-screen  z-50">
          <PacmanLoader
            color="#1218ff"
            cssOverride={{}}
            loading
            margin={26}
            size={77}
            speedMultiplier={1}
            />
        </div>
   
            </>
  )
}

export default Loader
