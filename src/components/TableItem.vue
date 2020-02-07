<template>
<div>
   <div class="table-item">
    <button class="delete-activity small-btn" :class="{pressed: deleteClicked}" @click="deleteActivity(activity)" >x</button>
    <span  id="item-name">{{ activity.name }}</span>
    <span id="item-votes">{{ activity.votes }}</span>
    <span id="up" :class="{pressed: increaseClicked}" class="small-btn" @click="increase(activity)">
      <svg
        width="34"
        height="10"
        viewBox="0 0 51 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M49.75 25.75L25.25 1.25L0.749999 25.75" stroke-width="10%" />
      </svg>
    </span>
    <span id="down" :class="{pressed: decreaseClicked}" class="small-btn" @click="decrease(activity)">
      <svg
        width="34"
        height="10"
        viewBox="0 0 51 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M50 1L25.5 25.5L0.999999 1" stroke-width="10%" />
      </svg>
    </span>
  </div>
</div>
 
</template>

<script>
export default {
  name: "TableItem",
  props: {
    activity: Object,
    loading: Boolean
  },
  data: () => {
    return {
      increaseClicked: false,
      decreaseClicked: false,
      deleteClicked: false
    }
  },
  methods: {
    increase(activity){
      this.increaseClicked = true;
      setTimeout(() => {
        this.increaseClicked = false;
      }, 500);
      if(this.loading){
        return;
      }
      this.$emit('increase', activity);
    },
    decrease(activity){
      this.decreaseClicked = true;
      setTimeout(() => {
        this.decreaseClicked = false;
      }, 500);
      if(this.loading){
        return;
      }
      this.$emit('decrease', activity);
    },
    deleteActivity(activity){
      if(this.loading){
        return;
      }
      this.deleteClicked = true;
      setTimeout(() => {
        this.deleteClicked = false;
        this.$emit('delete',activity.id);
      }, 500);
    }
  }
};
</script>

<style>
.table-item {
  display: grid;
  overflow: hidden;
  align-content: center;
  margin-bottom: 2rem;
  grid-template-columns: repeat(6, 1fr);
  height: 5em;
  background: #B3C0EF;
  color: rgb(85, 110, 192);
  box-shadow: 9px 9px 9px rgb(137, 158, 230), -9px -9px 9px    rgba(255,255,255, 0.3);
  font-size: 1.5em;
  padding: 1rem;
  border-radius: 10px;
  grid-template-areas:
    "delete name name name votes up "
    "delete name name name votes down";
}

#item-name {
  grid-area: name;
  align-self: center;
  justify-self: start;
}
#item-votes {
  grid-area: votes;
  align-self: center;
  justify-self: center;
}
#up {
  display: flex;
  cursor: pointer;
  grid-area: up;
  stroke: rgb(137, 158, 230);
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
}
#up:hover path {
  stroke: rgba(26, 128, 0, 0.4);
}
#down {
  margin-top: 15px;
  display: flex;
  cursor: pointer;
  grid-area: down;
  stroke: rgb(137, 158, 230);
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
}
#down:hover path {
  stroke: rgba(153, 1, 1, 0.4);
}
.delete-activity {
  display: flex;
  align-self: center;
  justify-content: center;

  grid-area: delete;
  color: rgb(137, 158, 230);
}
.delete-activity:hover {
  color: rgba(153, 1, 1, 0.4);
}
.small-btn{
  border-radius: 50%;
  height: 35px;
  width: 35px;
  box-shadow: 5px 5px 5px rgb(137, 158, 230), -5px -5px 5px    rgba(255,255,255, 0.3);
}
@media only screen and (max-width: 500px) {
  /* For mobile phones: */
}
.pressed {
  -webkit-animation: pressed 200ms ease infinite alternate;
  -moz-animation: pressed 200ms ease infinite alternate;
  animation: pressed 200ms ease infinite alternate;
}

@-webkit-keyframes pressed {
  from {
    box-shadow: 9px 9px 9px rgb(137, 158, 230), -9px -9px 9px    rgba(255,255,255, 0.3);
  }
  
  to {
    box-shadow: 1px 1px 1px rgb(137, 158, 230), -1px -1px 1px    rgba(255,255,255, 0.3);
  }
}
</style>
