import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/apps/auth/AuthSlice';
import categoryReducer from '../redux/apps/category/CategorySlice';
import courseReducer from '../redux/apps/course/CourseSlice';
import lessonReducer from '../redux/apps/lesson/LessonSlice';
import vocabReducer from '../redux/apps/vocab/VocabSlice';

import messageReducer from '../redux/apps/message/MessageSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  course: courseReducer,
  lesson: lessonReducer,
  vocab: vocabReducer,

  messages: messageReducer,
});

export default rootReducer;
