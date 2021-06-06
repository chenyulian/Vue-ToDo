<template>
  <div id="app">
    <Nav />
    <div class="content_container">
      <Sidebar :style="isShowSidebar?{'display':'block'}:{'display':'none'}"/>
      <router-view class="content" />
    </div>
    
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

.content_container {
  display: flex;
}

.content {
  width: 100%;
  padding: 100px 24px;
}
</style>
