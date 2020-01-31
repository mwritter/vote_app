<template>
  <div class="home">
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
  justify-content: center;
  margin-top: 2rem;
}
.home {
  display: grid;
}
.header {
  justify-self: start;
  width: 100%;
}
</style>
