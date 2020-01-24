import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/firestore";
import config from "../firebase_config";

Vue.config.productionTip = false;

firebase.initializeApp(config);

export const db = firebase.firestore();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
