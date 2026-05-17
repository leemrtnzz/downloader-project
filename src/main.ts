import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Panel from "primevue/panel";
import Divider from "primevue/divider";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import AnimateOnScroll from "primevue/animateonscroll";
import "./assets/css/main.css";

const app = createApp(App);
app.use(ToastService);
app.component("Button", Button);
app.component("Card", Card);
app.component("InputText", InputText);
app.component("Message", Message);
app.component("Panel", Panel);
app.component("Divider", Divider);
app.component("Dialog", Dialog);
app.component("Toast", Toast);
app.directive("animateonscroll", AnimateOnScroll);
// app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".p-dark",
      cssLayer: false,
    },
  },
});

app.mount("#app");
