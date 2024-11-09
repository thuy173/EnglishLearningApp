import React from "react";
import Banner from "./sections/Banner";
import TopBg from "../../assets/top-bg.svg";
import Content from "./sections/Content";

const ApproachPage: React.FC = () => {
  return (
    <section className="mt-20">
      <Banner />
      <div
        className="h-20 -mt-[79px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${TopBg})`,
        }}
      ></div>
      <Content />
    </section>
  );
};

export default ApproachPage;
