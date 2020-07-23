<template>
  <div>
    <p :class="titleClass">Reset password</p>
    <form-input
      :styles="styles"
      :onChange="onChangeInput"
      :value="email"
      name="emailInput"
      placeholder=""
      title="Email"
      type="email"
    />
    <div v-if="!!errorMessage">{{ errorMessage }}</div>
    <button :disabled="isBusy" @click="onSubmit" :class="primaryCtaButtonClass">
      <spinner v-if="isBusy" />
      <span v-if="!isBusy">Continue</span>
    </button>
    <button
      :class="secondaryCtaButtonClass"
      @click="e => setCurrentForm('sign_in')"
    >
      Cancel
    </button>
  </div>
</template>

<script>
import FormInput from "../FormInput/FormInput.vue";
import Spinner from "../Spinner/Spinner.vue";
import { css } from "emotion";

export default {
  name: "EmailPasswordAuthenticationFormForgotPassword",
  components: {
    FormInput,
    Spinner
  },
  props: {
    email: String,
    isBusy: Boolean,
    onChangeInput: Function,
    setCurrentForm: Function,
    setIsBusy: Function,
    styles: Object
  },
  data() {
    return {
      primaryCtaButtonClass: css`
        ${this.styles.primaryCtaButton}
      `,
      secondaryCtaButtonClass: css`
        ${this.styles.secondaryCtaButton}
      `,
      titleClass: css`
        ${this.styles.title}
      `,
      subtitleClass: css`
        ${this.styles.subtitle}
      `,
      helpButton: {
        title: "Forgot Password?",
        onClick: () => this.setCurrentForm("forgot_password")
      },
      errorMessage: null
    };
  },
  methods: {
    onSubmit() {
      this.setIsBusy(true);
      const email = this.email;
      const templateName = "reset_password";
      this.$feather
        .newCurrentCredential({ email, templateName })
        .then(credential => {
          if (credential.status !== "requires_verification")
            throw new Error("Something went wrong.");
          this.setIsBusy(false);
          this.errorMessage = null;
          this.setCurrentForm("verify_email");
        })
        .catch(error => {
          this.setIsBusy(false);
          this.errorMessage = error.message;
        });
    }
  }
};
</script>

<style></style>
