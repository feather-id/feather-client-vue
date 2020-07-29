<template>
  <div>
    <p :class="titleClass">
      New Password
    </p>
    <form-input
      :onChange="onChangePassword"
      :styles="styles"
      :value="password"
      name="passwordInput"
      placeholder=""
      title="New Password"
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
        Update Password
      </span>
    </button>
  </div>
</template>

<script>
import ErrorMessage from "../ErrorMessage/ErrorMessage.vue";
import FormInput from "../FormInput/FormInput.vue";
import Spinner from "../Spinner/Spinner.vue";
import { css } from "emotion";

export default {
  name: "EmailPasswordAuthenticationFormNewPassword",
  components: {
    ErrorMessage,
    FormInput,
    Spinner
  },
  props: {
    email: String,
    input: Object,
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
      errorMessage: null,
      password: ""
    };
  },
  methods: {
    onChangePassword(event) {
      this.password = event.target.value;
    },
    onSubmit() {
      this.setIsBusy(true);
      const password = this.password;
      this.$feather
        .currentCredential()
        .then(credential =>
          this.$feather.passwords.update(password, credential.token)
        )
        .then(() =>
          this.$feather.newCurrentCredential({ email: this.email, password })
        )
        .then(credential => this.$feather.newCurrentUser(credential.token))
        .catch(error => {
          this.errorMessage = error.message;
        })
        .finally(() => this.setIsBusy(false));
    }
  }
};
</script>

<style></style>
