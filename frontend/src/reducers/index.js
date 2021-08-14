import { combineReducers } from "redux";
import postReducer from "./postReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import transReducer from "./transReducer";
import reportReducer from "./reportReducer";



export default combineReducers({
  posts: postReducer,
  trans: transReducer,
  error: errorReducer,
  auth: authReducer,
  reports: reportReducer
});