<template>
  <div>
    <p :class="titleClass">Sign up</p>
    <form-input
      :styles="styles"
      :onChange="onChangeInput"
      :value="email"
      name="emailInput"
      placeholder
      title="Email"
      type="email"
    />
    <form-input
      :styles="styles"
      :onChange="onChangeInput"
      :value="password"
      name="passwordInput"
      placeholder
      title="Password"
      type="password"
    />
    <form-input
      :styles="styles"
      :onChange="onChangeInput"
      :value="confirmPassword"
      name="confirmPasswordInput"
      placeholder
      title="Confirm password"
      type="password"
    />
    <div v-if="!!errorMessage">{{ errorMessage }}</div>
    <button :disabled="isBusy" @click="onSubmit" :class="primaryCtaButtonClass">
      <spinner v-if="isBusy" />
      <span v-if="!isBusy">
        Sign Up
      </span>
    </button>
    <button
      :class="secondaryCtaButtonClass"
      @click="e => setCurrentForm('sign_in')"
    >
      Go to sign in
    </button>
  </div>
</template>

<script>
import FormInput from "../FormInput/FormInput.vue";
import Spinner from "../Spinner/Spinner.vue";
import { css } from "emotion";

export default {
  name: "EmailPasswordAuthenticationFormSignUp",
  components: {
    FormInput,
    Spinner
  },
  props: {
    confirmPassword: String,
    email: String,
    isBusy: Boolean,
    onChangeInput: Function,
    password: String,
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
      errorMessage: null
    };
  },
  methods: {
    onSubmit() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage =
          "Your password and password confirmation do not match";
        return;
      }
      this.setIsBusy(true);
      this.$feather
        .newCurrentCredential({
          email: this.email,
          password: this.password
        })
        .then(credential => {
          if (credential.status !== "valid")
            throw new Error("Email address already registered.");
          return this.$feather.newCurrentUser(credential.token);
        })
        .then(currentUser => {
          this.setIsBusy(false);
          this.errorMessage = null;
          console.log(currentUser);
        })
        .catch(e => {
          // Handle errors
          this.setIsBusy(false);
          this.errorMessage = e.message;
          console.error(e);
        });
    }
  }
};
</script>

<style>
.feather-authentication-form {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
