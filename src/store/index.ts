import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { setupListeners } from '@reduxjs/toolkit/query';
import { questionsApi } from '../servises/quizApi';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(questionsApi.middleware),
});
setupListeners(store.dispatch);
export default store;
