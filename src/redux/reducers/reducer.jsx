import { combineReducers } from "redux"
import appReducer from "./appSlice"

const rootReducer = combineReducers({
  app: appReducer
})

export default rootReducer
