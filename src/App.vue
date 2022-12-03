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
    ...mapActions(["getData"])
  },
  created() {
    this.getData();
  }
}
</script>

<style>

</style>
