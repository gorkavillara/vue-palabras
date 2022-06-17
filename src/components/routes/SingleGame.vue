<template>
  <div class="pa0 single-game">
    <w-button
      color="white"
      bg-color="transparent"
      class="mt4"
      round
      lg
      @click="$emit('goBack')"
      ><w-icon>fa fa-arrow-left</w-icon></w-button
    >
    <w-flex column class="header justify-center align-center">
      <div class="white title1 text-center">Puntuación: {{ points }}</div>
      <div
        class="white mt4 animate__heartBeat animate__infinite"
        :class="{ animate__animated: time < 10 && time > 0 }"
      >
        Tiempo restante: {{ time }} seg
      </div>
    </w-flex>
    <w-flex column class="score">
      <div class="overlay"></div>
      <w-flex column class="tries justify-end pb4" v-if="tries.length">
        <div
          class="try"
          v-for="tr in tries"
          :class="{ correct: tr.correct, incorrect: !tr.correct }"
          :key="tr.id"
        >
          <span class="text">{{ tr.word }}</span>
          <span class="points">+{{ tr.points }}</span>
        </div>
      </w-flex>
      <span class="current-word" :class="{ placeholder: word === '' }">{{
        word === "" ? "Escribe algo..." : word
      }}</span>
    </w-flex>
    <div class="letters">
      <w-button
        v-for="letter in letters"
        :key="letter"
        color="primary"
        icon
        class="bdrs6 pa2 text-bold"
        xl
        @click="addLetter(letter)"
        >{{ letter }}</w-button
      >
      <w-flex style="grid-column: 2/4" class="justify-center"
        ><w-button
          style="width: 100%"
          color="primary pa2"
          xl
          @click="eraseLastLetter"
          ><w-icon>fa fa-step-backward</w-icon></w-button
        ></w-flex
      >
    </div>
    <div class="floating-actions">
      <w-button class="sh4 cancel-button red-light1" round xl @click="eraseWord"
        ><w-icon class="mr1">fa fa-trash</w-icon>Vaciar</w-button
      >
      <w-button
        class="sh4 send-button"
        round
        xl
        @click="checkWord"
        :disabled="isDisabled()"
        >Aceptar<w-icon class="ml1">wi-check</w-icon></w-button
      >
    </div>
  </div>
  <w-dialog v-model="gameOver" title="Juego Finalizado" persistent>
    <w-flex column align-center gap="5">
      <!-- <ConfettiExplosion v-show="gameOver" :particleCount="200" :force="0.3" /> -->
      <w-flex column align-center gap="5" v-if="points > maxPoints">
        <h1>¡Enhorabuena!</h1>
        <p class="text-center">Has conseguido superar tu récord con...</p>
        <p
          class="text-center max-points animate__animated animate__bounceInRight"
        >
          {{ points }} puntos
        </p>
        <p>
          {{
            maxPoints !== 0
              ? `Tu máxima puntuación es de ${maxPoints} puntos`
              : ""
          }}
        </p>
      </w-flex>
      <w-flex column align-center gap="5" v-else>
        <p class="mt4 text-center">Tu puntuación es de</p>
        <p class="text-center max-points-red animate__animated animate__shakeX">
          {{ points }} puntos
        </p>
        <p class="caption">
          {{
            maxPoints !== 0
              ? `Tu máxima puntuación es de ${maxPoints} puntos`
              : ""
          }}
        </p>
      </w-flex>
      <w-flex class="pa6" gap="4">
        <w-button
          class="sh4 cancel-button red-light1"
          round
          lg
          @click="$emit('goBack')"
          ><w-icon class="mr1">fa fa-home</w-icon>Inicio</w-button
        >
        <w-button class="sh4 send-button" round lg @click="resetGame"
          >Repetir<w-icon class="ml1" xs>fa fa-refresh</w-icon></w-button
        >
      </w-flex>
    </w-flex>
  </w-dialog>
</template>

<script lang="ts">
// import ConfettiExplosion from "vue-confetti-explosion";
import { ref, onMounted, watch, onUnmounted } from "vue";
import { dicc } from "../../utils/dicc.js";

const vowels = ["A", "E", "I", "O", "U"];
const consonants = [
  "B",
  "C",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

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
    // ConfettiExplosion,
  },
  setup() {
    const TOTALTIME: number = 40;

    const gameOver = ref<boolean>(false);
    const time = ref<number>(TOTALTIME);
    const points = ref<number>(0);
    const word = ref<string>("");
    const letters = ref<string[]>([]);
    const tries = ref<Try[]>([]);
    const maxPoints = ref<number>();

    let countDown: any; // ARREGLAR

    onMounted(() => {
      letters.value = getRandomLetters();

      countDown = setInterval(() => time.value--, 1000);

      const storedTries = localStorage.getItem("wordGameTries");
      maxPoints.value =
        storedTries !== null
          ? JSON.parse(storedTries)
              .map((tr: StoredTry) => tr.points)
              .reduce((a: number, b: number) => (b > a ? b : a), 0)
          : 0;
    });

    onUnmounted(() => clearInterval(countDown));

    watch(time, (time) => {
      if (time > 0) return;
      clearInterval(countDown);
      gameOver.value = true;
      storeGame();
    });

    const getRandomLetters = () => {
      let leftOverChars = [...consonants];
      let selectedChars: string[] = getRandomVowels();
      Array.from({ length: 8 - selectedChars.length }).forEach(() => {
        const rnd = Math.floor(Math.random() * leftOverChars.length);
        selectedChars.push(leftOverChars[rnd]);
        leftOverChars.splice(rnd, 1);
      });
      return selectedChars.sort((a, b) => 0.5 - Math.random());
    };

    const storeGame = () => {
      const newTry = {
        points: points.value,
        letters: letters.value,
        tries: tries.value,
        date: new Date(),
      };
      const storedTries = localStorage.getItem("wordGameTries");
      localStorage.setItem(
        "wordGameTries",
        storedTries === null
          ? JSON.stringify([newTry])
          : JSON.stringify([...JSON.parse(storedTries), newTry])
      );
    };

    const addLetter = (letter: string) =>
      (word.value = `${word.value}${letter}`);

    const eraseWord = () => (word.value = "");

    const checkWord = () => {
      // Primero chequeamos la base de datos y vemos si existe
      const found: boolean =
        dicc.findIndex(
          (w: string) => w.toLowerCase() === word.value.toLowerCase()
        ) !== -1;
      const repeated: boolean =
        tries.value.findIndex(
          (tr: Try) => tr.word.toLowerCase() === word.value.toLowerCase()
        ) !== -1;
      const correct: boolean = found && !repeated;
      const pts: number = correct ? word.value.length * 20 : 0;
      // Después creamos la entrada dentro de tries
      tries.value.push({
        id: tries.value.length,
        word: word.value,
        correct,
        points: pts,
      });
      // Si es correcto subimos la puntuación
      points.value += pts;
      // Finalmente vaciamos el current word
      return eraseWord();
    };

    const isDisabled = () => {
      if (word.value.length < 3 || word.value.length > 5) return true;
    };

    const resetGame = () => {
      points.value = 0;
      tries.value = [];
      word.value = "";
      time.value = TOTALTIME;
      gameOver.value = false;
      letters.value = getRandomLetters();
      countDown = setInterval(() => time.value--, 1000);
    };

    const getRandomVowels = () => {
      let leftOverChars = [...vowels];
      let selectedChars: string[] = [];
      const rndCount = Math.floor(Math.random() * 3) + 2;
      Array.from({ length: rndCount }).forEach(() => {
        const rnd = Math.floor(Math.random() * leftOverChars.length);
        selectedChars.push(leftOverChars[rnd]);
        leftOverChars.splice(rnd, 1);
      });
      return selectedChars;
    };

    const eraseLastLetter = () =>
      (word.value = word.value.substr(0, word.value.length - 1));

    return {
      points,
      letters,
      word,
      addLetter,
      tries,
      eraseWord,
      checkWord,
      time,
      gameOver,
      resetGame,
      maxPoints,
      eraseLastLetter,
      isDisabled,
    };
  },
};
</script>

<style scoped lang="scss">
.single-game {
  height: 100%;
}
.header {
  position: relative;
  top: -50px;
  left: 0;
  background: rgb(0, 51, 129);
  background: linear-gradient(
    0deg,
    rgba(0, 51, 129, 1) 0%,
    rgba(0, 32, 231, 1) 100%
  );
  width: 100%;
  height: 200px;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  padding-bottom: 50px;
}

.score {
  width: 90%;
  height: 40vh;
  border-radius: 1.5rem;
  background: white;
  position: relative;
  z-index: 10;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.5rem;
  overflow: hidden;
  box-shadow: 0 0 20px #8f8f8fdd;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    box-shadow: inset 0px 30px 20px rgba(255, 255, 255);
    z-index: 2;
  }
  .current-word {
    position: absolute;
    width: 85%;
    bottom: 15px;
    height: 40px;
    font-size: 32px;
    font-weight: 700;
    color: #3c3c3c;
    text-align: center;
  }
  .placeholder {
    color: #d2d2d2;
    font-weight: 500;
    font-style: italic;
  }
  .tries {
    position: absolute;
    width: 85%;
    bottom: 50px;
    z-index: 1;
    .try {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .text {
        font-size: 24px;
        font-weight: 500;
      }
      .points {
        font-size: 16px;
      }
    }
    .correct {
      color: green;
    }
    .incorrect {
      color: red;
    }
  }
}

.max-points {
  font-size: 32px;
  color: green;
  font-weight: 700;
}
.max-points-red {
  font-size: 32px;
  color: red;
  font-weight: 700;
}

.letters {
  position: relative;
  // top: calc(150px + 0.4 * 100vh);
  bottom: 100px;
  width: 100%;
  height: calc(90vh - 150px - 0.4 * 100vh);
  padding: 4rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
}

.floating-actions {
  position: relative;
  bottom: 100px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  padding: 2rem 0rem;
}

.cancel-button {
  background-color: transparent;
}
.send-button {
  background-color: rgb(37, 70, 160);
}
</style>
