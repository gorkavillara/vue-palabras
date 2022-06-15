<template>
  <div class="pa6">
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
  </div>
</template>

<style scoped>
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
</style>
