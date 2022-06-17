<template>
  <w-app>
    <w-flex class="justify-center grey--bg">
      <div class="container white--bg">
        <MainRoute
          v-if="route === 'home'"
          @change-route="(newRoute) => setRoute(newRoute)"
          @add-user="userDialogOpen = true"
        />
        <SingleGame
          v-else-if="route === 'singleGame'"
          @go-back="setRoute('home')"
        />
      </div>
      <w-dialog v-model="userDialogOpen" title="Introduce tu usuario">
        <w-flex column gap="5">
          <w-input
            class="mb1"
            label="Tu nombre de usuario"
            v-model="username"
            round
            lg
          >
          </w-input>
          <w-button @click="addUser" xl>Aceptar <w-icon class="ml4">fa fa-arrow-right</w-icon></w-button>
        </w-flex>
      </w-dialog>
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
    const userDialogOpen = ref<boolean>(false);
    const username = ref<string>("");

    onMounted(() => {
      route.value = "home"
      const storedUsername = localStorage.getItem('username')
      username.value = storedUsername ? storedUsername : ""
  })

    const setRoute = (newRoute: string) => (route.value = newRoute);

    const addUser = () => {
      localStorage.setItem('username', username.value);
    };

    return {
      userDialogOpen,
      route,
      setRoute,
      addUser,
      username,
    };
  },
});
</script>

<style>
.container {
  max-height: 100vh;
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
