<template>
  <div :class="inputContainerClass">
    <div :class="inputTitleWrapperClass">
      <p :class="inputTitleClass">{{ title }}</p>
      <button
        v-if="helpButton"
        type="button"
        :name="helpButton.name"
        :class="forgotPasswordButtonClass"
        @click="helpButton.onClick"
      >
        {{ helpButton.title }}
      </button>
    </div>
    <input
      :class="inputFieldClass"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
import { css } from "emotion";

export default {
  name: "VerificationCodeInput",
  props: [
    "helpButton",
    "name",
    "placeholder",
    "styles",
    "title",
    "type",
    "value"
  ],
  data() {
    return {
      inputTitleWrapperClass: css`
        display: flex;
        flexdirection: row;
        width: 100%;
      `,
      inputContainerClass: css`
        ${this.styles.inputContainer}
      `,
      inputTitleClass: css`
        ${this.styles.inputTitle}
      `,
      inputFieldClass: css`
        ${this.styles.inputField}
      `,
      forgotPasswordButtonClass: css`
        ${this.styles.forgotPasswordButton}
      ` //TODO rename this
    };
  }
};
</script>

<style></style>
