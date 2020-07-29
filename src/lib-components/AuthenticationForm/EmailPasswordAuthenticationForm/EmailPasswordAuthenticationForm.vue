<template>
  <div :class="wrapperClass">
    <div :class="containerClass">
      <sign-in
        :email="email"
        :isBusy="isBusy"
        :onChangeInput="onChangeInput"
        :password="password"
        :setCurrentForm="setCurrentForm"
        :setIsBusy="setIsBusy"
        :styles="styles"
        v-if="currentForm === 'sign_in'"
      />
      <sign-up
        :email="email"
        :isBusy="isBusy"
        :onChangeInput="onChangeInput"
        :password="password"
        :confirmPassword="confirmPassword"
        :setCurrentForm="setCurrentForm"
        :setIsBusy="setIsBusy"
        :styles="styles"
        v-else-if="currentForm === 'sign_up'"
      />
      <forgot-password
        :email="email"
        :isBusy="isBusy"
        :onChangeInput="onChangeInput"
        :setCurrentForm="setCurrentForm"
        :setIsBusy="setIsBusy"
        :styles="styles"
        v-else-if="currentForm === 'forgot_password'"
      />
      <verify-email
        :isBusy="isBusy"
        :onChangeInput="onChangeInput"
        :setCurrentForm="setCurrentForm"
        :setIsBusy="setIsBusy"
        :styles="styles"
        v-else-if="currentForm === 'verify_email'"
      />
      <new-password
        :email="email"
        :isBusy="isBusy"
        :setCurrentForm="setCurrentForm"
        :setIsBusy="setIsBusy"
        :styles="styles"
        v-else-if="currentForm === 'new_password'"
      />
    </div>
  </div>
</template>

<script>
import ForgotPassword from "./ForgotPassword.vue";
import NewPassword from "./NewPassword.vue";
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";
import VerifyEmail from "./VerifyEmail.vue";

import { css } from "emotion";

export default {
  name: "EmailPasswordAuthenticationForm",
  components: {
    ForgotPassword,
    NewPassword,
    SignIn,
    SignUp,
    VerifyEmail
  },
  props: {
    styles: Object
  },
  data() {
    return {
      wrapperClass: css`
        ${this.styles.wrapper}
      `,
      containerClass: css`
        ${this.styles.container}
      `,
      confirmPassword: "",
      currentForm: "sign_in",
      email: "",
      isBusy: false,
      password: ""
    };
  },
  methods: {
    onChangeInput(event) {
      const value = event.target.value;
      event.preventDefault();
      switch (event.target.name) {
        case "emailInput":
          this.email = value;
          break;
        case "passwordInput":
          this.password = value;
          break;
        case "confirmPasswordInput":
          this.confirmPassword = value;
          break;
        default:
          break;
      }
    },
    setCurrentForm(currentForm) {
      this.currentForm = currentForm;
    },
    setIsBusy(value) {
      this.isBusy = value;
    }
  }
};
</script>

<style></style>
