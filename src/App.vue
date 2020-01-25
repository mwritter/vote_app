<template>
  <div id="app">
    <v-app-bar
      class="app-bar"
      color="#000000"
      dark
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <router-link to="/">
        <v-icon class="action-icon">mdi-home</v-icon>
      </router-link>
      FreeTime<strong>Friday</strong></v-app-bar
    >
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
