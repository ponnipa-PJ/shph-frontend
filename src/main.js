import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue-apexcharts'
import VueExcelXlsx from "vue-excel-xlsx";
import JwPagination from 'jw-vue-pagination';
import VueHtml2pdf from 'vue-html2pdf'
import store from './store';
import VueQRCodeComponent from 'vue-qrcode-component'
import VueHtml2Canvas from 'vue-html2canvas';
import Vue2Editor from "vue2-editor";
import excel from 'vue-excel-export'
import VueMoment from 'vue-moment'

Vue.use(excel)
Vue.use(VueApexCharts)
Vue.component('qr-code', VueQRCodeComponent)
Vue.component('apexchart', VueApexCharts)
Vue.component('jw-pagination', JwPagination);
Vue.use(VueHtml2pdf)
Vue.use(VueHtml2Canvas);
Vue.use(Vue2Editor);
Vue.use(VueMoment);

Vue.config.productionTip = false

Vue.use(VueExcelXlsx);

// import './assets/fonts/fontawesome/font-awesome.min.css'
// import './assets/fonts/iconsmind/iconsmind.css'
// import './assets/css/plugins.min.css'
import './assets/css/style.css'
// import './assets/scripts/script.j/s'


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
