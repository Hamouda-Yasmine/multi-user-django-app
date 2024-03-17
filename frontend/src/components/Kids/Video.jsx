import axios from 'axios'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';

const Video = ({idVideo}) => {
  const [video,setVideo]=useState()
  useEffect(() => {
    fetchVideo()
  }, [idVideo])
  const fetchVideo=async()=>{
    try {
      const response=await axios.get(`/educateur/videosRUD/${idVideo}/`)
      setVideo(response.data)
    } catch (error) {
      
    }
  }
  return (
     <>
     {video?(<>
      <h1>Lesson Video</h1>
      
      <YouTube videoId={video.url} /></>
   ):(<div>no video</div>)}
     </>
    
 
    
  )
}

export default Video