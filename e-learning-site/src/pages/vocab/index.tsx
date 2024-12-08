import { Helmet } from "react-helmet-async";
import HeaderVocabList from "./sections/Head";
import WordCard from "./sections/WordCard";

const VocabPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Vocabulary </title>
      </Helmet>
      <section>
        <HeaderVocabList />
        <WordCard />
      </section>
    </>
  );
};

export default VocabPage;
