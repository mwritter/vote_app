<template>
  <div>
    <div id="activity-list">
      <div class="new_activity_card" @click="focusOnText()">
        <form autocomplete="off" @submit.prevent="addActivity()">
          <input
            id="new-activity-input"
            v-model="newActivity"
            placeholder="Add New Activity"
          />
        </form>
      </div>

      <div id="no-itmes" v-if="activities.length == 0">
        <p>We dont have any activites yet, why dont you try adding some 🙂</p>
      </div>

      <div v-else>
        <transition-group
          mode="in-out"
          tag="div"
          name="fade-in"
          class="activity-item"
        >
          <TableItem
            v-for="activity in activities"
            :key="activity.id"
            @increase="increase"
            @decrease="decrease"
            @delete="deleteActivity"
            :activity="activity"
            :loading="loading"
          ></TableItem>
        </transition-group>
      </div>
      <div v-if="hasError">
        <span class="error" v-for="(error, index) in db_errors" :key="index">
          {{ error }} {{ getEmoji("oops") }}
        </span>
      </div>
    </div>
    <transition name="fade-in">
      <div v-if="message.length > 0" id="app-message">
        {{ message }}
      </div>
    </transition>
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
      message: "",
      emoji: {
        oops: ["💩"],
        yay: ["😄", "🚀", "😸", "🥓", "🎊", "👾", "🥇"]
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
              self.activities = self.activities.filter(activity => {
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
      if (!this.newActivity.trim().length > 0) {
        return;
      }
      const newActivity = {
        name: this.newActivity,
        votes: 0
      };
      await db
        .collection("ActivitiesPoll")
        .add(newActivity)
        .catch(error => {
          this.db_errors.push(error);
        });
      this.showSuccessMessage("added");
      this.newActivity = "";
    },
    async deleteActivity(docID) {
      await db
        .collection("ActivitiesPoll")
        .doc(docID)
        .delete()
        .catch(error => {
          this.db_error = error;
        });
      this.showSuccessMessage("deleted");
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
          this.db_errors.push(error);
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
    showSuccessMessage(type) {
      this.message = `${this.getEmoji("yay")} Successfully ${type} activity!`;
      this.removeMessage();
    },
    removeMessage(after = 2000) {
      setTimeout(() => {
        this.message = "";
      }, after);
    },
    showErrorMessage() {
      this.message = `Oh ${this.getEmoji("oops")} something went wrong!`;
      this.removeMessage();
    },
    getEmoji(type) {
      const index = Math.floor(Math.random() * this.emoji[type].length);
      return type === "oops" ? this.emoji.oops[index] : this.emoji.yay[index];
    },
    focusOnText() {
      document.getElementById("new-activity-input").focus();
    }
  }
};
</script>

<style>
#activity-list {
  display: grid;
  margin-top: 5rem;
  border-radius: 2rem;
  padding: 3rem;
  grid-gap: 2rem;
  align-content: start;
  width: 100vw;
  max-width: 900px;
  box-shadow: 9px 9px 9px rgb(0, 0, 0, 0.03),
    -9px -9px 9px rgba(236, 236, 236, 0.096);
}

#activity-list-container {
  margin-left: 10px;
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
#no-itmes {
  justify-self: center;
  align-self: center;
}
.new_activity_card {
  display: flex;
  margin-top: 3rem;
  color: rgb(56, 56, 56);
  box-shadow: 9px 9px 9px rgb(0, 0, 0, 0.03),
    -9px -9px 9px rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.2rem;
  font-size: 1.2em;
}

.new_activity_card input:focus {
  outline: none;
}
.new_activity_card input {
  max-width: 900px;
}

.new_activity_card input::placeholder {
  color: rgb(56, 56, 56);
}

.error {
  color: rgb(179, 40, 40);
}
.fade-in-enter-active {
  transition: all 0.3s ease;
}
.fade-in-leave-active {
  transition: all 0.3s ease;
}
.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}

@media only screen and (max-width: 800px) {
  /* For mobile phones: */
  #activity-list {
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 0;
    box-shadow: 0px 0px 0px;
  }
}

@media only screen and (min-width: 500px) {
  .submit {
    display: none;
  }
}
</style>
