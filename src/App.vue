<template>
  <div id="app">
    <router-link to="/">
      <div id="home-banner">FreeTime<strong>Friday</strong></div>
    </router-link>
    <router-view />
  </div>
</template>

<style>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
}

html,
body {
  padding: 0;
  margin: 0;
  height: 100vh;
}
#home-banner {
  position: fixed;
  background: rgba(99, 99, 99, 0.527);
  color: white;
  font-size: 1.2em;
  padding: 1rem;
  border-radius: 0px 0px 20px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#app-message {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  color: rgb(0, 0, 0);
  background-color: rgba(68, 68, 68, 0.2);
  border-radius: 25px;
  padding: 1rem;
}
.action-icon {
  margin-right: 20px;
}
</style>
