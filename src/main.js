import Vue from 'vue'
import App from './App.vue'
import "./style/app.css";
import { store } from "./store";
import "./directives"

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
