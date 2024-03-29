import Home from "./pages/Home";
import Login from "./components/Login-Register/Login"

import Educateur from "./components/Educateur/Educateur"
import CourseDetailsPage from "./components/Educateur/CourseDetailsPage";
import EducateurSignup from "./components/Educateur/EducateurSignup";
import Navbar from "./components/Header/Navbar"
import KidsSignup from "./components/Kids/KidsSignup";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Kids from "./components/Kids/Kids";
import Psychologue from "./components/Psychologue/Psychologue";
import PsychoSignup from "./components/Psychologue/PsychoSignup";
import PsychoProfile from "./components/Psychologue/PsychoProfile";
import AboutUs from "./components/About-us/AboutUs";
import UserProfile from "./components/Profile/UserProfile";
import KidsProfile from "./components/Kids/KidsProfile";
import { AppProvider} from './app/App';
import EducateurProfile from "./components/Educateur/EducateurProfile";
import AllCoursesSection from "./components/Nos-offres/AllCoursesSection";
import CourseDetails from "./components/Nos-offres/CourseDetails";
import TakenCourse from "./components/Kids/TakenCourse";


function App() {

  
  return (
 
    /*
      -BrowserRouter is used to wrap all the app to enable routing.
      -Router is used within it to define the different routes and their corresponding components.
    */ 
 
  <AppProvider  >

      <BrowserRouter >
        
     
       <Navbar/>
         <Routes>
          
          <Route path='/login' element={<Login/>}></Route>
          <Route exact path='/' element={<Home />}></Route>
          <Route path="/userprofile" element={<UserProfile/>}> </Route>
          <Route  path='/about' element={<AboutUs/>}></Route>
          <Route path='/all_courses' element={<AllCoursesSection/>}></Route>
          <Route path='/course_details/:id' element={<CourseDetails/>}></Route>

          <Route path='/kids' element={<Kids/>}></Route>
          <Route path='/kids_signup' element={<KidsSignup/>}></Route>
          <Route path='/kids_profile'element={<KidsProfile/>}></Route> 
          <Route path='/taken_course/:id' element={<TakenCourse/>}></Route>
           
          <Route  path='/educateur' element={<Educateur />}></Route>
          <Route  path='/educateur_signup' element={<EducateurSignup />}></Route>
          <Route path='/educateur_profile'element={<EducateurProfile/>}></Route> 
          <Route path='/coursesedit/:id'element={<CourseDetailsPage/>}></Route> 

          <Route  path='/psychologue' element={<Psychologue />}></Route>
          <Route  path='/psychologue_signup' element={<PsychoSignup />}></Route>
          <Route  path='/psychologue_profile' element={<PsychoProfile />}></Route>
         
          
          
         </Routes>

        <Footer />
         
      </BrowserRouter>
  </AppProvider>
       
     
    
  );
}

export default App;