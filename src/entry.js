// Import vue components
import { AuthenticationForm } from "@/lib-components/index";
import { FeatherClient } from "feather-client-js";
import applyMixin from "./mixin.js";

// install function, executed by Vue.use()
const install = function installFeatherClientVue(Vue, options) {
  if (install.installed) return;
  install.installed = true;
  applyMixin(Vue);
  Vue.component(AuthenticationForm.name, AuthenticationForm);
};

// Create module definition for Vue.use()
const VueFeather = {
  install
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if ("false" === process.env.ES_BUILD) {
  let GlobalVue = null;
  if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
  } else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(VueFeather);
  }
}
// Default export, registered via Vue.use()
export default VueFeather;

// The FeatherClient, which must be initialized and passed to Vue
// as an option. Further components may be exported here as well
export { FeatherClient };
