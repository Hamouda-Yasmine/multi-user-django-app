import {
  Button,
  Icon,
  Link,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
 
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { MdOutlineCheck } from "react-icons/md";
import { useAppState } from "../../../app/App";
import Cookies from 'react-cookies';

const Enrolling = ({ isOpen, onClose }) => {
  const { state } = useAppState();
  const navigate=useNavigate();
  const {id}=useParams()
  let csrftoken = Cookies.load('csrftoken');
  axios.defaults.headers.common['X-CSRFToken'] =csrftoken

  // saving the id of the kid and the course in Takencourse table 
  const handleEnroll=async()=>{
  await axios.post("/kids/takenCourseCreate/",{kid:state.data.id,course:id},{ withCredentials: true }).then((response)=>{
        navigate(`/taken_course/${response.data.id}`)
   }).catch((error)=>{
    console.error(error)
   })
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"xl"}
      isCentered>
      <ModalOverlay />
      <ModalContent >
        <ModalCloseButton />
        <ModalHeader mt={-10}> Ce que notre cours peut offrir à votre enfant</ModalHeader>
        <ModalBody>
          <List count={2}>
            <ListItem>
              <Icon
                color={useColorModeValue("teal.200", "teal.500")}
                as={MdOutlineCheck}
                mr={1}></Icon>
              <strong>Accès illimité à tous les chapitres.</strong>
              <Text>
                Visionnez des vidéos de cours captivantes,Explorez une multitude
                de contenus pédagogiques, Profitez d'une expérience
                d'apprentissage enrichissante pour votre enfant.
              </Text>
            </ListItem>
            <ListItem>
              <Icon
                as={MdOutlineCheck}
                mr={1}
                color={useColorModeValue("teal.200", "teal.500")}></Icon>
              <strong>Annulez à tout instant.</strong>
              <Text>
                Aucune pénalité : annulez simplement si cela ne vous convient
                pas.
              </Text>
            </ListItem>
          </List>
        </ModalBody>
        <ModalFooter mb={-10}>
          <Button onClick={handleEnroll} variant="ghost" >Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Enrolling;
