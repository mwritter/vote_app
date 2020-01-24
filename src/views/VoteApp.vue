<template>
  <div id="vote-app">
    <div id="nav">
      <router-link to="/">
        <h1>HOME</h1>
      </router-link>
    </div>
    <activity-list></activity-list>
  </div>
</template>

<script>
import ActivityList from "@/components/ActivityList";
export default {
  name: "VoteApp",
  components: {
    ActivityList
  }
};
</script>

<style>
#vote-app {
  display: grid;
  background-color: black;
  height: 100%;
  width: 100%;
}
</style>
