<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage
  },
  mounted(){
    console.log(this.$store)
  }
}
</script>

<style>
html,body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
</style>
