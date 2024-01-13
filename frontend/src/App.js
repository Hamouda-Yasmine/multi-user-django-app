import Home from "./pages/Home";
import Login from "./components/Login/Login"
import Header from "./components/Header/Header";
import Educateur from "./components/Homeusers/Educateur"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Kids from "./components/Homeusers/Kids";
import Psychologue from "./components/Homeusers/Psychologue";
import AboutUs from "./components/About-us/AboutUs";
function App() {

  
  return (
 
    /*
      -BrowserRouter is used to wrap all the app to enable routing.
      -Router is used within it to define the different routes and their corresponding components.
    */ 
 
      
       <BrowserRouter >
        
        
     
        <Header />
 
         <Routes>
          
          <Route path='/login' element={<Login/>}></Route>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/about' element={<AboutUs/>}></Route>
          <Route path='/kids' element={<Kids/>}></Route>
          <Route exact path='/educateur' element={<Educateur />}></Route>
          <Route exact path='/psychologue' element={<Psychologue />}></Route>
          
          
         </Routes>

        <Footer />
         
      </BrowserRouter>
     
    
  );
}

export default App;