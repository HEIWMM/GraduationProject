<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    // MainPage
  },
  mounted() {
    console.log(this.$store);
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  .el-button {
    background-color: #ee8932;
    border-color: #ee8932;
  }
  .el-header,
  .el-footer {
    background-color: #009da3;
  }
  .el-main {
    background-color: #70c5ca;
  }
}
</style>
