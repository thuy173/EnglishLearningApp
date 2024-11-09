import { CourseDetailDto } from "@/types/feature/Course";

interface LessonProps {
  course: CourseDetailDto;
}
const Banner: React.FC<LessonProps> = ({ course }) => {
  return (
    <section>
      <div className="mt-20 mb-10">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="object-fill w-full h-40"
        />
      </div>
    </section>
  );
};

export default Banner;
