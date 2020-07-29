# feather-client-vue

This library provides a fully-featured authentication form (sign-in, sign-up, and password-resets) as a single Vue component. Under the hood, this library wraps the [feather-client-js](https://github.com/feather-id/feather-client-js) library. If you like to build your own custom authentication forms, please checkout that library as well.

Have any questions? We're hanging out on [Discord](https://discord.gg/S55amqV) 👋

## Install

```sh
$ npm install feather-client-vue --save
# or
$ yarn add feather-client-vue
```

## Usage

```js
import Vue from "vue";
import App from "./App.vue"; // your App, which has an element with id="app"
import VueFeather from "feather-client-vue";
import { FeatherClient } from "feather-client-vue";

Vue.config.productionTip = false;

Vue.use(VueFeather);

const feather = FeatherClient("pk_live_...");

new Vue({
  feather,
  render: h => h(App)
}).$mount("#app");
```
