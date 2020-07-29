import Vue from "vue";
import Dev from "./serve.vue";
import VueFeather from "@/entry";
import { FeatherClient } from "@/entry";

Vue.config.productionTip = false;

Vue.use(VueFeather);

let feather = FeatherClient("pk_goes_here");

new Vue({
  feather,
  render: h => h(Dev)
}).$mount("#app");
