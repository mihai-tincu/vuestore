<template>
    <!--<vue-store />-->
    <router-view />
</template>

<script>

//import VueStore from './components/VueStore.vue'
import { mapActions } from "vuex";

export default {
  name: 'App',
  //components: {
  //  VueStore
  //},
  methods: {
      ...mapActions(
          {
              getData: "getData",
              initializeCart: "cart/initializeCart"
          }
      )
  },
  created() {
      this.getData();
      this.initializeCart(this.$store);
  }
}
</script>

<style>

</style>
