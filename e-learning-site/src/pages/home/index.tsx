import React from "react";
import Hero from "./sections/Hero";
import Introduce from "./sections/Introduce";
import Feature from "./sections/Feature";

const HomePage: React.FC = () => {
  return (
    <section>
      <Hero />
      <Introduce />
      <Feature />
    </section>
  );
};

export default HomePage;
