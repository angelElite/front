import React from 'react'
import Modall from './Modal'
import useApiRequest from '../hooks/useGestionRed'
const Modalrender = ({id,url,method,title,handleAccept,handleDecline})=> {

    const { dataRouningConfig,loadingRouningConfig,errorRouningConfig} = useApiRequest(url=url+id,method =method)
    const json = JSON.stringify(dataRouningConfig);
   console.log(json)
    return (
      <Modall
        title={title}
        content={<div>hola</div>}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    );
}

export default Modalrender