import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar-Course/Sidebar";
import {  useParams } from "react-router-dom";
import axios from "axios"
import { Box, Stack} from "@chakra-ui/react";
import { useAppState } from "../../app/App";
import Video from "./Video";
import Lesson from "./Lesson";


const TakenCourse = () => {
  const {state}=useAppState();
  const {id}=useParams();
  const [chapterList,setChpterList]=useState([]);
  const [progress,setProgress]=useState({});
  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/educateur/educateurChaptersCourses/${id}/`
      );
      const data = response.data;
      setChpterList(data);

      const response1= await axios.get(`/kids/course-progress/${state.data.id}/${id}/`)
      console.log("heree",response1.data)
      setProgress(response1.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
   

  // get the selected item video or lesson and pass the id to the video component or lesson component 
  const [selectedItem,setSelectedItem]=useState();
  const handleItemClick = (itemId,type) => {
    setProgress([]);
    setSelectedItem({itemId:itemId,itemType:type});
  };
  return (
    <Stack spacing={8} direction='row' >
      <Sidebar  chapters={chapterList} handleItemClick={handleItemClick} />

     

<Box  w="100%" p={4}>

{progress.length > 0 ? (
    <>
      {progress[0].type === 'video' ? (
        <Video idVideo={progress[0].idLessonVideo} />
      ) : progress[0].type === 'lesson' ? (
        <Lesson idLesson={progress[0].idLessonVideo} />
      ) : (
        <div>Unknown progress type</div>
      )}
    </>
  ) : selectedItem ? (
    <>
      {selectedItem.itemType === 'video' ? (
        <Video idVideo={selectedItem.itemId} />
      ) : selectedItem.itemType === 'lesson' ? (
        <Lesson idLesson={selectedItem.itemId} />
      ) : (
        <div>Unknown progress type</div>
      )}
    </>
  ) : (
    <div>No progress or selectedItem available</div>
  )}
  
</Box>
    </Stack>


 

   

  );
};

export default TakenCourse;
