<template>
  <div id="app">
    <input id="uploadUrl">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#uploadUrl {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
