import React, { Fragment } from "react";

import HeroSection from "../components/Hero-Section/HeroSection";
import CompanySection from "../components/Company-section/Company";

import AboutUs from "../components/About-us/AboutUs";

import ChooseUs from "../components/Choose-us/ChooseUs";
import Features from "../components/Feature-section/Features";
import FreeCourse from "../components/Free-course-section/FreeCourse";

import Testimonials from "../components/Testimonial/Testimonials";

import Newsletter from "../components/Newsletter/Newsletter";


const Home = () => {
  return (
    <Fragment>
     
      <HeroSection />
      <CompanySection />
      <AboutUs />
     
      <ChooseUs />
      <Features />
      <FreeCourse />
      <Testimonials />
      <Newsletter />
     
    </Fragment>
  );
};

export default Home;
