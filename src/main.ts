import { createApp } from 'vue';

import App from './App.vue';
import { themeStore } from '@/stores/themeStore';
import './style.css';

themeStore.initialize();

createApp(App).mount('#app');
