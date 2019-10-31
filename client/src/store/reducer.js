import { combineReducers } from "redux-immutable";
import { reducer as formReducer } from "../components/store";
const reducer = combineReducers({
  form: formReducer
});

export default reducer;
