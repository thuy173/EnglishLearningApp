import { Helmet } from "react-helmet-async";
import Level from "./sections/Level";
import NewCourse from "./sections/NewCourse";
import PopularCourse from "./sections/PopularCourse";

const CourseLibraryPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Course Library </title>
      </Helmet>
      <section>
        <Level />
        <PopularCourse />
        <NewCourse />
      </section>
    </>
  );
};

export default CourseLibraryPage;
