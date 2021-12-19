import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import BaseButton from './components/UI/BaseButton.vue';

const app = createApp(App);

app.component('base-button', BaseButton);

app.mount('#app');
