import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"

//import store from './store';

const testData = [];

for (let i = 1; i <= 10; i++) {
    testData.push({
        id: i, name: `Product #${i}`, category: `Category ${i % 3}`,
        description: `This is Product #${i}`, price: i * 50
    })
}

const store = createStore({
    state () {
      return {
        products: testData
      }
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })

const app = createApp(App)

app.use(store)
//app.use(store)

app.mount('#app')
