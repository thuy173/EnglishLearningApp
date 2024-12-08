import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "./sections/Hero";
import Introduce from "./sections/Introduce";
import Feature from "./sections/Feature";
import MethodImprove from "./sections/MethodImprove";
import HomeObject from "./sections/Object";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Learning English </title>
      </Helmet>
      <section>
        <Hero />
        <Introduce />
        <Feature />
        <MethodImprove />
        <HomeObject />
      </section>
    </>
  );
};

export default HomePage;
