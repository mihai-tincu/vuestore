<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col bg-dark text-white">
                <a class="navbar-brand">Vue Store</a>
                <cart-summary />
            </div>
        </div>
        <div class="row">
            <div class="col-3 bg-info p-2">
                <category-controls />
            </div>
            <div class="col-9 p-2 ">
                <product-list />
            </div>
        </div>
    </div>
</template>

<script>
import ProductList from "./ProductList";
    import CategoryControls from "./CategoryControls";
    import CartSummary from "./CartSummary";

export default {
        components: { CartSummary, CategoryControls, ProductList }
}
</script>