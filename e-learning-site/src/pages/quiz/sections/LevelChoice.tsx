import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectLevels } from "@/redux/apps/level/LevelSelectors";
import { useEffect } from "react";
import { fetchLevelsData } from "@/redux/apps/level/LevelSlice";
import A0Image from "../../../assets/ept-result-a0.svg";
import A1Image from "../../../assets/ept-result-a1.svg";
import A2Image from "../../../assets/ept-result-a2.svg";
import B1Image from "../../../assets/ept-result-b1.svg";
import B2Image from "../../../assets/ept-result-b2.svg";
import C1Image from "../../../assets/ept-result-c1.svg";
import HeadShort from "@/components/head-short";
import { Helmet } from "react-helmet-async";

const LevelChoice = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const levels = useAppSelector(selectLevels);

  const defaultCardData = [
    {
      imageUrl: A0Image,
    },
    {
      imageUrl: A1Image,
    },
    {
      imageUrl: A2Image,
    },
    {
      imageUrl: B1Image,
    },
    {
      imageUrl: B2Image,
    },
    {
      imageUrl: C1Image,
    },
  ];

  const mapApiDataToCards = () => {
    if (!levels) return [];

    return levels.map((level, index) => ({
      id: level.id,
      name: level.name,
      description: level.description,
      imageUrl: defaultCardData[index % defaultCardData.length].imageUrl,
    }));
  };

  const mappedLevelData = mapApiDataToCards();

  useEffect(() => {
    dispatch(
      fetchLevelsData({
        name: "",
        pageNumber: 0,
        pageSize: 20,
        sortField: "id",
        sortDirection: "ASC",
      })
    );
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Quiz </title>
      </Helmet>
      <section>
        <HeadShort />
        <div className="container px-52 my-16 ">
          <h2 className="text-center text-2xl font-bold my-8">
            Chọn cấp độ phù hợp với bạn
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mappedLevelData.map((item) => (
              <Card
                key={item.id}
                className="rounded-2xl shadow-none border-2 border-b-4 border-gray-300 pt-6 p-8 cursor-pointer"
                onClick={() => navigate(`/level-choice/${item.id}/quiz`)}
              >
                <img src={item.imageUrl} className="object-contain" />
                <h3 className="text-center text-xl font-bold pt-4 text-gray-400">
                  {item.description}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LevelChoice;
