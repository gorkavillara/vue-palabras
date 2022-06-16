<template>
  <w-app>
    <w-flex class="justify-center grey--bg">
      <div class="container white--bg">
        <MainRoute
          v-if="route === 'home'"
          @change-route="newRoute => setRoute(newRoute)"
        />
        <SingleGame
          v-else-if="route === 'singleGame'"
          @go-back="setRoute('home')"
        />
      </div>
    </w-flex>
  </w-app>
</template>

<script lang="ts">
import MainRoute from "./routes/MainRoute.vue";
import SingleGame from "./routes/SingleGame.vue";
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  components: {
    MainRoute,
    SingleGame,
  },
  setup() {
    const route = ref<string>("");

    onMounted(() => (route.value = "home"));

    const setRoute = (newRoute: string) => (route.value = newRoute);

    return {
      route,
      setRoute,
    };
  },
});
</script>
