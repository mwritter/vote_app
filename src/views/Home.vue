<template>
  <div class="home">
    <h1 class="header">FreeTimeFriday</h1>
    <div class="app-list">
      <router-link to="/vote_app">
        <h1>Vote App</h1>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style>
.app-list {
  display: grid;
}
.home {
  display: grid;
}
.header {
  justify-self: start;
  background-color: lightblue;
  width: 100%;
}
</style>
