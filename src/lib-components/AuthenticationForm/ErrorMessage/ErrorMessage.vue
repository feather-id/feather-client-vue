<template>
  <div class="warning-message">
    <font-awesome-icon :class="errorIconClass" icon="exclamation-triangle" />
    <p :class="errorMessageClass">{{ message }}</p>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { css } from "emotion";

library.add(faExclamationTriangle);
export default {
  name: "Spinner",
  components: {
    FontAwesomeIcon
  },
  props: {
    message: String,
    styles: Object
  },
  data() {
    return {
      errorIconClass: css`
        ${this.styles.errorIcon}
      `,
      errorMessageClass: css`
        ${this.styles.errorMessage}
      `
    };
  }
};
</script>

<style>
.warning-message {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 16px 4px 32px 4px;
}
</style>
