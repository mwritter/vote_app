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
import TableItem from "./TableItem";
export default {
  name: "ActivityList",
  components: {
    TableItem
  },
  data() {
    return {
      activities: [
        {
          id: 1,
          title: "Board Games",
          votes: 1
        },
        {
          id: 2,
          title: "Free Time Friday App",
          votes: 1
        },
        {
          id: 3,
          title: "Switch Time!",
          votes: 1
        }
      ]
    };
  },

  methods: {
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
