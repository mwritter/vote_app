<template>
  <div id="app">
    <ActivityList />
  </div>
</template>

<script>
import ActivityList from "./components/ActivityList";
export default {
  name: "app",
  components: {
    ActivityList
  },
  data: () => {
    return {};
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  width: 100%;
  background-color: black;
}
#app {
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#activity-list {
  display: grid;
  grid-gap: 3rem;
  width: 85vw;
  max-width: 900px;
  list-style: none;
}
</style>
