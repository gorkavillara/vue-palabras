<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import RouteController from "./components/RouteController.vue";
</script>

<template>
  <RouteController />
</template>

<style>
@font-face {
  font-family: "SFPro";
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local("SFPro"),
    url("/fonts/SFPro/SFProText-Regular.ttf") format("ttf");
}
@font-face {
  font-family: "SFPro";
  font-weight: 600;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local("SFPro"),
    url("/fonts/SFPro/SFProText-SemiBold.ttf") format("ttf");
}
@font-face {
  font-family: "SFPro";
  font-weight: 700;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local("SFPro"),
    url("/fonts/SFPro/SFProText-Bold.ttf") format("ttf");
}
#app {
  font-family: 'SFPro', sans-serif;
}
@media (max-width: 600px) {
  .container {
    width: 100%;
  }
}
@media (min-width: 601px) {
  .container {
    width: 600px;
  }
}
</style>
