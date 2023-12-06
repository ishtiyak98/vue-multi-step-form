import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./styles/main.scss";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/fa";
import * as SiIcons from "oh-vue-icons/icons/si";

const app = createApp(App);
const Fa = Object.values({ ...FaIcons });
const Si = Object.values({ ...SiIcons });
addIcons(...Fa, ...Si);

app.use(router);
app.use(vuetify);
app.component("v-icon", OhVueIcon);
app.mount("#app");
