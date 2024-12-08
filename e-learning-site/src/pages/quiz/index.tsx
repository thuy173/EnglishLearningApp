import { Helmet } from "react-helmet-async";
import QuizList from "./sections/QuizList";

const QuizPage = () => {
  return (
    <>
      <Helmet>
        <title> Quiz </title>
      </Helmet>
      <section className="mt-28 mb-20 ">
        <QuizList />
      </section>
    </>
  );
};

export default QuizPage;
