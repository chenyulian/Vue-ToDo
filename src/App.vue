<template>
  <div id="app">
    <Nav />
    <Sidebar :style="isShowSidebar?{'display':'block'}:{'display':'none'}"/>
    
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default class App extends Vue {
  isShowSidebar = true
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
</style>
