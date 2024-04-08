/* eslint-disable camelcase */
import './assets/scss/main.scss';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';

import * as rules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// veeValidate
Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});
configure({
  generateMessage: localize({
    zh_TW,
  }),
});
setLocale('zh_TW');

const pinia = createPinia();

app.use(pinia);
// 註冊router到各store底下
// eslint-disable-next-line no-param-reassign, no-return-assign
pinia.use(({ store }) => (store.$router = markRaw(router)));

app.use(router);
app.component('VueLoading', Loading);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
