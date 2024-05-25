import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import transactionReducer from "./transaction/transactionSlice";
import incomeReducer from "./slides/incomeSlice";
import expenseReducer from "./slides/expenseSlice";
import { persistReducer, persistStore } from "redux-persist";
// Để sử dụng localStorage làm bộ nhớ
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer,
  income: incomeReducer,
  expense: expenseReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
