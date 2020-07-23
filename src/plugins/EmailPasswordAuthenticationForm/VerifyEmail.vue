<template>
  <div>
    <p :class="titleClass">Verify Email</p>

    <verification-code-input
      :styles="styles"
      name="verificationCodeInput"
      placeholder=""
      title="Verification Code"
      type="text"
      v-model="verificationCode"
    />
    <div v-if="!!errorMessage">{{ errorMessage }}</div>
    <button :disabled="isBusy" @click="onSubmit" :class="primaryCtaButtonClass">
      <spinner v-if="isBusy" />
      <span v-if="!isBusy">
        Continue
      </span>
    </button>
  </div>
</template>

<script>
import VerificationCodeInput from "../VerificationCodeInput/VerificationCodeInput.vue";
import Spinner from "../Spinner/Spinner.vue";
import { css } from "emotion";

export default {
  name: "EmailPasswordAuthenticationFormForgotPassword",
  components: {
    VerificationCodeInput,
    Spinner
  },
  props: {
    isBusy: Boolean,
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
      verificationCode: "",
      errorMessage: null
    };
  },
  methods: {
    onSubmit() {
      console.log("clicked on submit!");
      this.setIsBusy(true);
      const verificationCode = this.verificationCode;
      this.$feather
        .currentCredential()
        .then(credential => credential.update({ verificationCode }))
        .then(credential => {
          this.setIsBusy(false);
          if (credential.status === "valid") {
            this.setCurrentForm("new_password");
          } else {
            this.errorMessage =
              "Something went wrong. We were not able to verify ownership of your email address.";
          }
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
