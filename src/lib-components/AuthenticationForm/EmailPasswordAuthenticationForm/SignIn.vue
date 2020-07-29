<template>
  <div>
    <!-- TODO parameterize the title text -->
    <p :class="titleClass">Sign in</p>

    <form-input
      :class="subtitleClass"
      :styles="styles"
      :onChange="onChangeInput"
      :value="email"
      name="emailInput"
      placeholder
      title="Email"
      type="email"
    />
    <form-input
      :helpButton="helpButton"
      :styles="styles"
      :onChange="onChangeInput"
      :value="password"
      name="passwordInput"
      placeholder
      title="Password"
      type="password"
    />
    <error-message
      v-if="!!errorMessage"
      :message="errorMessage"
      :styles="styles"
    />
    <button :disabled="isBusy" @click="onSubmit" :class="primaryCtaButtonClass">
      <spinner v-if="isBusy" />
      <span v-if="!isBusy">
        Login!
      </span>
    </button>
    <button
      :class="secondaryCtaButtonClass"
      @click="e => setCurrentForm('sign_up')"
    >
      Go to sign up
    </button>
  </div>
</template>

<script>
import ErrorMessage from "../ErrorMessage/ErrorMessage.vue";
import FormInput from "../FormInput/FormInput.vue";
import Spinner from "../Spinner/Spinner.vue";
import { css } from "emotion";

export default {
  name: "EmailPasswordAuthenticationFormSignIn",
  components: {
    ErrorMessage,
    FormInput,
    Spinner
  },
  props: {
    email: String,
    isBusy: Boolean,
    password: String,
    onChangeInput: Function,
    setCurrentForm: Function,
    setIsBusy: Function,
    styles: Object
  },
  filters: {
    css
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
      this.$feather
        .newCurrentCredential({
          email: this.email,
          password: this.password
        })
        .then(credential => {
          if (credential.status !== "valid")
            throw new Error("Email or password is incorrect.");
          return this.$feather.newCurrentUser(credential.token);
        })
        .then(() => {
          this.setIsBusy(false);
          this.errorMessage = null;
        })
        .catch(e => {
          // Handle errors
          this.setIsBusy(false);
          this.errorMessage = e.message;
        });
    }
  }
};
</script>

<style></style>
