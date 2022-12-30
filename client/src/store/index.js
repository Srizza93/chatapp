import { createStore } from "vuex";
import validaton from "./modules/validation.js";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    validaton,
  },
  strict: debug,
});
