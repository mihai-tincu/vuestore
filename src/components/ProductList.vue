<template>
    <div>
        <div v-for="p in products" v-bind:key="p.id" class="card m-1 p-1 bg-light">
            <h4>
                {{ p.name }}
                <span class="badge badge-pill badge-primary float-right badge-color">
                    {{ formatCurrency(p.price) }}
                </span>
            </h4>
            <div class="card-text bg-white p-1">
                {{ p.description }}
                <button class="btn btn-success btn-sm float-right"
                        v-on:click="handleProductAdd(p)">
                    Add To Cart
                </button>
            </div>
        </div>
        <page-controls />
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import { mapGetters, mapMutations } from "vuex";
    import PageControls from "./PageControls";

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

    export default {
        components: { PageControls },
        computed: {
            ...mapState(["products"]),
            ...mapGetters({ products: "processedProducts" })
        },
        methods: {
            ...mapMutations({ addProduct: "cart/addProduct" }),
            handleProductAdd(product) {
                this.addProduct(product);
                this.$router.push("/cart");
            },
            formatCurrency(value) {
                return formatter.format(value)
            }
        }
    }
</script>

<style>
    .badge-color {
        background-color: #007bff;
    }

    .float-right {
        float: right;
    }
</style>