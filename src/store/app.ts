import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import commonReducer from "./CommonSlice";
import userReducer from "../views/modules/UserManagement/utils/slice";
import roleReducer from "../views/modules/RoleManagement/utils/slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const reducer = {
  common: commonReducer,
  auth: authReducer,
  user: userReducer,
  role: roleReducer,
};

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<any>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store; // Export the store as the default export
