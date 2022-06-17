<template>
  <button
    id=""
    class="sh2 animate__animated animate__fadeInUp"
    :class="{
      [`animate__delay-${delay}s`]: delay > 0,
      [`option-card-${color}`]: true,
    }"
    @click="$emit('changeRoute')"
  >
    <w-flex class="justify-space-between">
      <w-flex column class="justify-space-between text-left pl6">
        <h2 class="white title2">{{ title }}</h2>
        <p class="white body">{{ description }}</p>
      </w-flex>
      <w-image
        :src="image_url"
        :height="100"
        :width="100"
        transition="fade"
      ></w-image>
    </w-flex>
  </button>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";

export default defineComponent({
  props: {
    delay: Number,
    color: String,
    title: String,
    description: String,
    image_url: String,
  },
  name: "GameButton",
  setup(props) {
    onBeforeMount(() => {
      if (!props.delay) return;
      if (props.delay <= 0) return;
    });
  },
});
</script>

<style lang="scss">
.option-card-blue {
  width: 90%;
  height: 150px;
  border-radius: 1.5rem;
  outline: none;
  border: none;
  background: rgb(0, 191, 191);
  background: linear-gradient(
    0deg,
    rgba(0, 191, 191, 1) 0%,
    rgba(0, 255, 255, 1) 100%
  );
}
.option-card-green {
  width: 90%;
  height: 150px;
  border-radius: 1.5rem;
  outline: none;
  border: none;
  background: rgb(19, 191, 0);
  background: linear-gradient(0deg, rgb(19, 191, 0) 0%, rgb(98, 255, 0) 100%);
}
.option-card-purple {
  width: 90%;
  height: 150px;
  border-radius: 1.5rem;
  outline: none;
  border: none;
  background: rgb(181, 0, 191);
  background: linear-gradient(0deg, rgb(181, 0, 191) 0%, rgb(255, 0, 247) 100%);
}
</style>
