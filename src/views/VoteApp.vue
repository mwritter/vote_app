<template>
  <div id="vote-app">
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
  grid-gap: 1rem;
  justify-content: center;
  grid-template-rows: repeat(2, 1fr);
  background: rgb(255, 255, 255);
  height: 100vh;
  overflow: auto;
}
</style>
