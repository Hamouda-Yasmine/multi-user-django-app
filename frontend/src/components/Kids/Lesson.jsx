import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
const Lesson = ({ idLesson }) => {
  const [lesson, setLesson] = useState();
  useEffect(() => {
    fetchLesson();
  }, [idLesson]);
  const fetchLesson = async () => {
    try {
      const response = await axios.get(`/educateur/lessonsRUD/${idLesson}/`);
      setLesson(response.data);
    } catch (error) {}
  };

  return (
    <>
      {lesson ? (
        <div>
          <h1>{lesson.title}</h1>
          <div>{ReactHtmlParser(lesson.content)}</div>
        </div>
      ) : (
        <div>Lesson:</div>
      )}
    </>
  );
};

export default Lesson;
