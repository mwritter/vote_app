<template>
  <div id="activity-list">
   <div class="new_activity_card">
      <input @keyup.enter="addActivity()" class="input" v-model="newActivity" placeholder="New Activity"/>
    <!-- <v-btn class="btn" @click="addActivity()">Submit</v-btn> -->
   </div>
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
      <p class="delete-activity" @click="deleteActivity(activity.id)" >delete</p>
    </div>
    <div v-if="hasError">
      <span class="error" v-for="(error, index) in db_errors" :key="index">
        {{ error }} {{ getEmoji('oops') }}
      </span>
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
      loading: false,
      newActivity: "",
      hasError: false,
      db_errors: [],
      emoji: {
        oops: [],
        yay: []
      }
    };
  },
  created() {
    this.addRealTimeListeners();
  },
  methods: {
    async addRealTimeListeners() {
      const self = this;
      db.collection("ActivitiesPoll").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          switch (change.type) {
            case "modified":
              for (let activity of self.activities) {
                if (activity.id == change.doc.id) {
                  activity.name = change.doc.data().name;
                  activity.votes = change.doc.data().votes;
                }
              }
              break;
            case "removed":
              self.activities = 
                self.activities.filter((activity) => {
                  return activity.id != change.doc.id;
                });
              break;
            case "added":
                self.activities.push({
                  id: change.doc.id,
                  name: change.doc.data().name,
                  votes: change.doc.data().votes
                });
              break;
          }
        });
      });
    },
    async addActivity() {
      if (!this.newActivity.trim().length > 0){
        return;
      }
      const newActivity = {
        name: this.newActivity,
        votes: 0
      };
      await db.collection("ActivitiesPoll")
        .add(newActivity)
        .catch(error => {
          this.db_errors.push(error)
        });
      this.newActivity = "";
    },
    async deleteActivity(docID){
      await db.collection("ActivitiesPoll")
        .doc(docID)
        .delete()
        .catch((error) => {
          this.db_error = error;
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
        })
        .catch(error => {
          this.db_errors.push(error)
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
    },
    getEmoji(type){
      return type === 'oops'
        ? this.emoji.oops[0]
        : this.emoji.yay[0];
    }
  }
};
</script>

<style>
#activity-list {
  display: grid;
  grid-gap: 3rem;
  justify-content: center;
  align-content: start;
  height: 100%;
}
#activity-list-container {
  justify-self: start;
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
.new_activity_card{
  margin-top: 5rem;
  color: rgb(85, 110, 192);
  box-shadow: 9px 9px 9px rgb(137, 158, 230), -9px -9px 9px    rgba(255,255,255, 0.3);
  border-radius: 10px;
  padding: 1.5rem;
  width: 95vw;
  max-width: 900px;
}
.delete-activity {
  margin-top: 5px;
  color: rgba(179, 40, 40, 0.4);
  cursor: pointer;
}
.error {
  color:rgb(179, 40, 40);
}
</style>
