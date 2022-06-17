<template>
  <div class="pa6 main-route">
    <h1 class="title1 text-left text-bold mb6">Palabras</h1>
    <w-flex column class="align-center" gap="3">
      <GameButton
        @change-route="$emit('changeRoute', 'singleGame')"
        :delay="0"
        color="blue"
        image_url="img/Solo.png"
        title="Juego Rápido"
        description="Practica tus habilidades"
      />
      <!-- <GameButton
        @change-route="$emit('addUser')"
        :delay="1"
        color="purple"
        image_url="img/Online.png"
        title="Duelo Online"
        description="Demuestra al mundo quién es mejor"
      /> -->
      <GameButton
        @change-route="$emit('changeRoute', 'singleGame')"
        :delay="1"
        color="purple"
        image_url="img/Online.png"
        title="Duelo Online"
        description="Demuestra al mundo quién es mejor"
      />
    </w-flex>
    <div class="animate__animated animate__fadeIn animate__delay-1s record">
      <div v-if="maxPoints > 0" class="active">
        <span class="points">
          <w-icon class="mr2">fa fa-certificate</w-icon
          ><span>Máxima puntuación: {{ maxPoints }}</span>
        </span>
        <span class="games">En un total de {{ tries.length }} partidas</span>
      </div>
      <button
        v-else
        class="inactive"
        @click="$emit('changeRoute', 'singleGame')"
      >
        <span class="points"> Todavía no tienes ningún récord </span>
        <span class="points">
          Haz clic aquí para iniciar tu primera partida
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
import GameButton from "../buttons/GameButton.vue";

type Try = {
  id: number;
  word: string;
  correct: boolean;
  points: number;
};

type StoredTry = {
  points: number;
  letters: string[];
  tries: Try[];
  date: Date;
};

export default {
  components: {
    GameButton,
  },
  setup() {
    const tries = ref<StoredTry[]>([]);
    const maxPoints = ref<number>(0);
    onMounted(() => {
      const storedTries = localStorage.getItem("wordGameTries");
      tries.value = storedTries !== null ? JSON.parse(storedTries) : [];
      maxPoints.value = tries.value
        .map((tr: StoredTry) => tr.points)
        .reduce((a, b) => (b > a ? b : a), 0);
    });
    return {
      tries,
      maxPoints,
    };
  },
};
</script>

<style scoped lang="scss">
.main-route {
  position: relative;
  height: 100%;
}
.option-card-blue {
  width: 90%;
  height: 150px;
  background: rgb(0, 191, 191);
  background: linear-gradient(
    0deg,
    rgba(0, 191, 191, 1) 0%,
    rgba(0, 255, 255, 1) 100%
  );
  border-radius: 1.5rem;
  outline: none;
  border: none;
}
.record {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  bottom: 20px;
  border-radius: 1.5rem;
  background: rgb(188, 191, 0);
  background: linear-gradient(0deg, rgb(191, 146, 0) 0%, rgb(255, 187, 0) 100%);
  padding: 1rem;
  .active,
  .inactive {
    width: 100%;
    background: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgb(255, 255, 255);
    .points {
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    .games {
      font-size: 12px;
      font-style: italic;
    }
  }
}
</style>
