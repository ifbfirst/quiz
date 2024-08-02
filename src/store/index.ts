import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { setupListeners } from '@reduxjs/toolkit/query';
import { questionsApi } from '../services/quizApi';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['statistics'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(questionsApi.middleware),
});
setupListeners(store.dispatch);

const persistor = persistStore(store);

export { store, persistor };
