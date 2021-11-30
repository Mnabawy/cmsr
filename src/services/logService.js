import { initial } from "lodash";
import Reven from "raven-js";

function init() {
  Reven.config();
}

function log(error) {
  console.error(error );
  //   Reven.captureException(error);
}

export default {
  init,
  log,
};
