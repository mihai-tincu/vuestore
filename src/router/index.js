import Vue from "vue";
import VueRouter from "vue-router";
import VueStore from "../components/VueStore";
import ShoppingCart from "../components/ShoppingCart";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        { path: "/", component: VueStore },
        { path: "/cart", component: ShoppingCart },
        { path: "*", redirect: "/" }
    ]
})