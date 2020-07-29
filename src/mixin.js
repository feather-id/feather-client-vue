export default function(Vue) {
  Vue.mixin({ beforeCreate: featherInit });

  /**
   * Feather init hook, injected into each instances init hooks list.
   * i.e. every component
   * Inspired by Vuex's $store injection
   */

  function featherInit() {
    const options = this.$options;
    // inject feather
    if (options.feather) {
      this.$feather = options.feather;
    } else if (options.parent && options.parent.$feather) {
      this.$feather = options.parent.$feather;
    }
  }
}
