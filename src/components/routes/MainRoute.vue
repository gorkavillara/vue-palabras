<template>
  <div class="pa6 main-route">
    <h1 class="title1 text-left text-bold mb6">Palabras</h1>
    <w-flex column class="align-center" gap="3">
      <button
        class="option-card-blue sh2"
        @click="$emit('changeRoute', 'singleGame')"
      >
        <w-flex class="justify-space-between">
          <w-flex column class="justify-space-between text-left pl6">
            <h2 class="white title2">Juego rápido</h2>
            <p class="white body">Practica tus habilidades</p>
          </w-flex>
          <w-image
            src="img/Rectangle.png"
            :height="100"
            :width="100"
            transition="fade"
          ></w-image>
        </w-flex>
      </button>
    </w-flex>
    <div class="record">
      <div v-if="maxPoints > 0" class="active">
        <span class="points">
          <w-icon class="mr2">fa fa-certificate</w-icon><span>Máxima puntuación:
          {{ maxPoints }}</span>
        </span>
        <span class="games">En un total de {{ tries.length }} partidas</span>
      </div>
      <div v-else class="inactive">
        <span class="points"> Todavía no tienes ningún récord </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "@vue/runtime-core";

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
  bottom: 10px;
  border-radius: 1.5rem;
  background: rgb(188, 191, 0);
  background: linear-gradient(0deg, rgb(191, 146, 0) 0%, rgb(255, 187, 0) 100%);
  padding: 1rem;
  color: rgb(255, 255, 255);
  .active {
    display: flex;
    flex-direction: column;
    align-items: center;
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
