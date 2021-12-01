import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducer";

export default configureStore({
  reducer: rootReducer
})
