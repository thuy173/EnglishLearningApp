import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/apps/auth/authSlice";
import userReducer from "../redux/apps/user/UserSlice";
import categoryReducer from "../redux/apps/category/CategorySlice";
import courseReducer from "../redux/apps/course/CourseSlice";
import lessonReducer from "../redux/apps/lesson/LessonSlice";
import vocabReducer from "../redux/apps/vocab/VocabSlice";
import progressReducer from "../redux/apps/progress/ProgressSlice";
import quizReducer from "../redux/apps/quiz/QuizSlice";
import levelReducer from "../redux/apps/level/LevelSlice";
import searchReducer from "../redux/apps/search/SearchSlice";

import messageReducer from "../redux/apps/message/MessageSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  course: courseReducer,
  lesson: lessonReducer,
  vocab: vocabReducer,
  progress: progressReducer,
  testing: quizReducer,
  level: levelReducer,
  search: searchReducer,

  messages: messageReducer,
});

export default rootReducer;
