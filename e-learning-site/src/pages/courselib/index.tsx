import Level from "./sections/Level";
import NewCourse from "./sections/NewCourse";
import PopularCourse from "./sections/PopularCourse";

const CourseLibraryPage: React.FC = () => {
  return (
    <section>
      <Level />
      <PopularCourse />
      <NewCourse />
    </section>
  );
};

export default CourseLibraryPage;
