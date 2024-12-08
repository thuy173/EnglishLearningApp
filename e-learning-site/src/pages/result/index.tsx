import HeadShort from "@/components/head-short";
import BannerResult from "./sections/Banner";
import ResultChart from "./sections/ResultChart";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { resultData } from "@/redux/apps/quiz/QuizSelectors";
import { useEffect } from "react";
import { fetchResultAttemptData } from "@/redux/apps/quiz/QuizSlice";
import { useParams } from "react-router-dom";
import ResultContent from "./sections/ResultContent";
import { Helmet } from "react-helmet-async";

const ResultPage = () => {
  const dispatch = useAppDispatch();
  const resultAttempt = useAppSelector(resultData);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchResultAttemptData(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title> Result </title>
      </Helmet>
      <HeadShort />
      {resultAttempt && (
        <>
          <BannerResult result={resultAttempt} />
          <ResultChart result={resultAttempt} />
          <ResultContent result={resultAttempt} />
        </>
      )}
    </>
  );
};

export default ResultPage;
