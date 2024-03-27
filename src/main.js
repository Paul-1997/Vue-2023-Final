import './assets/scss/main.scss';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
// 註冊router到各store底下
// eslint-disable-next-line no-param-reassign, no-return-assign
pinia.use(({ store }) => (store.$router = markRaw(router)));
app.use(router);

app.mount('#app');
