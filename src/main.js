import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import Axios from "axios";
import { createRouter, createWebHistory } from 'vue-router'
//import store from "./store"

import VueStore from "./components/VueStore";
import ShoppingCart from "./components/ShoppingCart";
import CartModule from "./store/cart";
import OrdersModule from "./store/orders";
import OrderCheckout from "./components/OrderCheckout";
import OrderThanks from "./components/OrderThanks";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"

const baseUrl = "http://localhost:3500";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

const testData = [];

for (let i = 1; i <= 10; i++) {
    testData.push({
        id: i, name: `Product #${i}`, category: `Category ${i % 3}`,
        description: `This is Product #${i}`, price: i * 50
    })
}

const store = createStore({
    strict: true,
    modules: { cart: CartModule, orders: OrdersModule },
    state() {
        return {
            products: [],
            categoriesData: [],
            productsTotal: 0,
            currentPage: 1,
            pageSize: 4,
            currentCategory: "All"
        }
    },
    getters: {
        productsFilteredByCategory: state => state.products
            .filter(p => state.currentCategory == "All"
                || p.category == state.currentCategory),
        processedProducts: (state, getters) => {
            let index = (state.currentPage - 1) * state.pageSize;
            return getters.productsFilteredByCategory
                .slice(index, index + state.pageSize);
        },
        pageCount: (state, getters) =>
            Math.ceil(getters.productsFilteredByCategory.length / state.pageSize),
        categories: state => ["All", ...state.categoriesData]
    },
    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setPageSize(state, size) {
            state.pageSize = size;
            state.currentPage = 1;
        },
        setCurrentCategory(state, category) {
            state.currentCategory = category;
            state.currentPage = 1;
        },
        setData(state, data) {
            state.products = data.pdata;
            state.productsTotal = data.pdata.length;
            state.categoriesData = data.cdata.sort();
        }
    },
    actions: {
        async getData(context) {
            let pdata = (await Axios.get(productsUrl)).data;
            let cdata = (await Axios.get(categoriesUrl)).data;
            context.commit("setData", { pdata, cdata });
        }
    }
})

const routes = [
    { path: "/", component: VueStore },
    { path: "/cart", component: ShoppingCart },
    { path: "/checkout", component: OrderCheckout },
    { path: "/thanks/:id", component: OrderThanks },
    { path: "/:catchAll(.*)", redirect: "/" }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')


