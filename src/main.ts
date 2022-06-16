import { createApp } from "vue";
import App from "./App.vue";
import WaveUI from "wave-ui";
import "wave-ui/dist/wave-ui.css";
import "font-awesome/css/font-awesome.min.css";
import "animate.css";

const app = createApp(App);

new WaveUI(app, {});

app.mount("#app");
