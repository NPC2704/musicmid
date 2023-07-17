import store from "./redux/store";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

const reduxConfig = () => {
  const store1 = createStore(store, applyMiddleware(thunk));
  const persistor = persistStore(store1);

  return { store, persistor };
};

export default reduxConfig;
