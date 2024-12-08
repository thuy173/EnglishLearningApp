import { Helmet } from "react-helmet-async";
import Banner from "./sections/Banner";
import CourseInCategory from "./sections/CourseInCategory";
import NewCourse from "../courselib/sections/NewCourse";

const CoursePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Course </title>
      </Helmet>
      <section className="container md:px-40">
        <Banner />
        <CourseInCategory />
      </section>
      <NewCourse />
    </>
  );
};

export default CoursePage;
