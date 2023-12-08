import { persistStore } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth", // Klucz, pod którym zostanie zachowany stan autoryzacji
  storage, // Wybrana metoda przechowywania (np. localStorage)
  whitelist: ["token"], // Lista kluczy stanu autoryzacji do zachowania
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);