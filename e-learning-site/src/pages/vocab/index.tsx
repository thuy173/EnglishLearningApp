import HeaderVocabList from "./sections/Head";
import WordCard from "./sections/WordCard";

const VocabPage: React.FC = () => {
  return (
    <section>
      <HeaderVocabList />
      <WordCard />
    </section>
  );
};

export default VocabPage;
