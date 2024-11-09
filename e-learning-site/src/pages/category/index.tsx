import Banner from "./sections/Banner";
import CourseInCategory from "./sections/CourseInCategory";

const CoursePage: React.FC = () => {
  return (
    <section className="container px-40">
      <Banner />
      <CourseInCategory />
    </section>
  );
};

export default CoursePage;
