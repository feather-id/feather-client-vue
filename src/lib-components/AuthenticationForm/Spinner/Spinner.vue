<template>
  <div :class="spinClass"></div>
</template>

<script>
import { css, keyframes } from "emotion";

const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

const spinClass = css`
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #fff;
  border-radius: 50%;
  margin: auto;
  width: 1rem;
  height: 1rem;
  animation: ${spin} 0.6s linear infinite;
`;

export default {
  name: "Spinner",
  data() {
    return {
      spinClass
    };
  }
};
</script>

<style></style>
