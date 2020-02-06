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
  background: #B3C0EF;
  height: 100vh;
  overflow: scroll;
}
</style>
