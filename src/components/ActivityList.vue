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
    <div class="loading-bar" :class="{ loading: this.loading }"></div>
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
      loading: false
    };
  },
  mounted() {
    // this.getActivities();
  },
  created() {
    this.addRealTimeListeners();
    // this.getActivities();
  },
  methods: {
    async getActivities() {
      let snapshot = await db.collection("ActivitiesPoll").get();
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        this.activities.push(appData);
      });
    },
    async addRealTimeListeners() {
      const self = this;
      db.collection("ActivitiesPoll").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const source = change.doc.metadata.hasPendingWrites
            ? "Local"
            : "Server";
          switch (change.type) {
            case "modified":
              for (let activity of self.activities) {
                if (activity.id == change.doc.id) {
                  activity.name = change.doc.data().name;
                  activity.votes = change.doc.data().votes;
                }
              }
              break;
            case "added":
              if (source === "Server") {
                self.activities.push({
                  id: change.doc.id,
                  name: change.doc.data().name,
                  votes: change.doc.data().votes
                });
              }
              break;
          }
        });
      });
    },
    async increase(activity) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      await db
        .collection("ActivitiesPoll")
        .doc(activity.id)
        .update({
          votes: activity.votes + 1
        });
      this.loading = false;
    },
    async decrease(activity) {
      if (this.loading || activity.votes == 0) {
        return;
      }
      this.loading = true;
      await db
        .collection("ActivitiesPoll")
        .doc(activity.id)
        .update({
          votes: activity.votes - 1
        });
      this.loading = false;
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
.loading-bar {
  height: 1px;
  border-radius: 50%;
  width: 5px;
  height: 5px;
}
.loading {
  background-color: green;
}
</style>
