<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col bg-dark text-white">
                    <a class="navbar-brand">Vue Store</a>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="offset-3 col-6">
                    <label>Name</label>
                    <input type="text" v-model="name" class="form-control" />
                    <span v-if="v$.name.$error" class="text-danger">
                        {{ v$.name.$errors[0].$message }}
                    </span>
                </div>
            </div>

            <div class="row">
                <div class="offset-3 col-6">
                    <label>Email</label>
                    <input type="text" v-model="email" class="form-control " />
                    <span v-if="v$.email.$error" class="text-danger">
                        {{ v$.email.$errors[0].$message }}
                    </span>
                </div>
            </div>

            <div class="row">
                <div class="offset-3 col-6">
                    <label>Address</label>
                    <input type="text" v-model="address" class="form-control " />
                    <span v-if="v$.address.$error" class="text-danger">
                        {{ v$.address.$errors[0].$message }}
                    </span>
                </div>
            </div>

            <div class="row">
                <div class="offset-3 col-6">
                    <label>City</label>
                    <input type="text" v-model="city" class="form-control " />
                    <span v-if="v$.city.$error" class="text-danger">
                        {{ v$.city.$errors[0].$message }}
                    </span>
                </div>
            </div>

            <div class="row">
                <div class="offset-3 col-6">
                    <label>Zip</label>
                    <input type="text" v-model="zip" class="form-control " />
                    <span v-if="v$.zip.$error" class="text-danger">
                        {{ v$.zip.$errors[0].$message }}
                    </span>
                </div>
            </div>
        </div>

        <div class="text-center">
            <router-link to="/cart" class="btn btn-secondary m-1">
                Back
            </router-link>
            <button class="btn btn-primary m-1" v-on:click="submitOrder">
                Place Order
            </button>
        </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { mapActions } from "vuex";

export default {
    methods: {
        ...mapActions({
            "storeOrder": "storeOrder",
            "clearCart": "cart/clearCartData"
        }),
        submitOrder() {
            this.v$.$validate();

            if (this.v$.$error)
                return;

            let order = this.storeOrder(this.order);
            this.clearCart();
            this.$router.push(`/thanks/${order}`);
        }
    },
    data() {
        return {
            v$: useValidate(),
            name: '',
            email: '',
            address: '',
            city: '',
            zip: ''
        }
    },
    validations() {
        return {
            name: { required },
            email: { email, required },
            address: { required },
            city: { required },
            zip: { required }
        }
    }
}
</script>