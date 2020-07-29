<template>
  <div>
    <email-password-authentication-form :styles="styles" />
  </div>
</template>

<script>
import EmailPasswordAuthenticationForm from "./EmailPasswordAuthenticationForm/EmailPasswordAuthenticationForm.vue";
import { defaultStyles } from "./styles.js";
import { mergeStyles } from "./utils.js";

export default {
  name: "AuthenticationForm",
  components: {
    EmailPasswordAuthenticationForm
  },
  props: {
    customStyles: Object
  },
  data() {
    return {
      styles: mergeStyles(defaultStyles, this.customStyles)
    };
  }
};
</script>

<style></style>
