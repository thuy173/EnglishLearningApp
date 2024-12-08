import { IconType } from "react-icons";
import {
  FcBookmark,
  FcGraduationCap,
  FcIdea,
  FcShop,
  FcWorkflow,
} from "react-icons/fc";

interface HeaderConfigItem {
  title: string;
  path?: string;
  icon?: IconType;
  children?: HeaderConfigItem[];
  description?: string;
}

const headerConfig: HeaderConfigItem[] = [
  {
    title: "Trang chủ",
    path: "/",
    icon: FcShop,
  },
  {
    title: "Cá nhân",
    path: "/profile/setting",
    icon: FcBookmark,
  },
  {
    title: "Khóa học",
    path: "/library",
    icon: FcGraduationCap,
    children: [],
  },
  {
    title: "Kiểm tra",
    path: "/level-choice",
    icon: FcIdea ,
  },

  {
    title: "Phương pháp",
    path: "/approach",
    icon: FcWorkflow,
  },
];

export default headerConfig;
