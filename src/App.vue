<template>
  <div id="app">
    <v-app-bar class="app-bar" color="#000000" dark>
      <router-link to="/"> FreeTime<strong>Friday</strong> </router-link>
    </v-app-bar>
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
.action-icon {
  margin-right: 20px;
}
</style>
