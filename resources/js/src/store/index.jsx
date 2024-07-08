import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { useDispatch, useSelector } from "react-redux";

import { authReducer, loadingReducer, messagesReducer } from "../reducers";

const authPersistConfig = {
  key: "smartlives-webapp",
  storage: storage,
  whitelist: ["userData"],
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  messages: messagesReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export const useAppSelector = useSelector;
export const useAppDispatch = useDispatch;
