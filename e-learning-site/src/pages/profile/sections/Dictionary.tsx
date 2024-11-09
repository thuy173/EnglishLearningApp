import DictionaryCard from "@/components/dictionary-card";
import VocabCard from "@/components/vocab-card";
const MyDictionary = () => {
  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <DictionaryCard key={index} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 my-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <VocabCard key={index} word="Word" partOfSpeech="n" />
        ))}
      </div>
    </section>
  );
};

export default MyDictionary;
