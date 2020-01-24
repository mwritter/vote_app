<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  width: 100%;
}

.black-bg {
  background-color: black;
}
a {
  text-decoration: none;
  color: inherit;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
