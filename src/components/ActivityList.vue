<template>
  <div id="activity-list">
    <div
      id="activity-list-container"
      v-for="activity in activities"
      :key="activity.id"
    >
      <TableItem
        @increase="increase"
        @decrease="decrease"
        class="activity-item"
        :activity="activity"
      ></TableItem>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import TableItem from "./TableItem";
export default {
  name: "ActivityList",
  components: {
    TableItem
  },
  data() {
    return {
      activities: [],
      polls: [],
      loading: false
    };
  },
  mounted() {
    this.getActivities();
  },
  methods: {
    async getActivities() {
      let snapshot = await db.collection("Polls").get();
      snapshot.forEach(doc => {
        this.polls.push(doc.data());
      });
      this.polls[0].BallotItems.forEach(activity => {
        this.activities.push(activity);
      });
    },
    increase(activity) {
      activity.votes++;
    },
    decrease(activity) {
      activity.votes -= activity.votes > 0 ? 1 : 0;
    }
  }
};
</script>

<style>
#activity-list {
  display: grid;
  align-self: start;
  grid-gap: 3rem;
  width: 100%;
  align-content: center;
  justify-content: center;
}
#activity-list-container {
  width: 95vw;
  max-width: 900px;
}
</style>
