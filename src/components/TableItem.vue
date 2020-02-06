<template>
<div>
   <div class="table-item">
    <span id="item-name">{{ activity.name }}</span>
    <span id="item-votes">{{ activity.votes }}</span>
    <span id="up" @click="$emit('increase', activity)">
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
    <span id="down" @click="$emit('decrease', activity)">
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
    <p class="delete-activity" @click="$emit('delete',activity.id)" >delete</p>
</div>
 
</template>

<script>
export default {
  name: "TableItem",
  props: {
    activity: Object
  }
};
</script>

<style>
.table-item {
  display: grid;
  overflow: hidden;
  align-content: center;
  grid-template-columns: repeat(5, 1fr);
  height: 5em;
  background: #B3C0EF;
  color: rgb(85, 110, 192);
  box-shadow: 9px 9px 9px rgb(137, 158, 230), -9px -9px 9px    rgba(255,255,255, 0.3);
  font-size: 1.5em;
  padding: 1rem;
  border-radius: 10px;
  grid-template-areas:
    "name name name votes up "
    "name name name votes down";
}

#item-name {
  grid-area: name;
  align-self: center;
  justify-self: center;
}
#item-votes {
  grid-area: votes;
  align-self: center;
  justify-self: center;
}
#up {
  display: flex;
  cursor: pointer;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  grid-area: up;
  stroke: rgb(137, 158, 230);
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
  box-shadow: 5px 5px 5px rgb(137, 158, 230), -5px -5px 5px    rgba(255,255,255, 0.3);
}
#up:hover path {
  stroke: rgba(26, 128, 0, 0.4);
}
#down {
  margin-top: 15px;
  display: flex;
  cursor: pointer;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  grid-area: down;
  stroke: rgb(137, 158, 230);
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
  box-shadow: 5px 5px 5px rgb(137, 158, 230), -5px -5px 5px    rgba(255,255,255, 0.3);
}
#down:hover path {
  stroke: rgba(153, 1, 1, 0.4);
}
.delete-activity {
  margin-bottom: 2rem;
  margin-top: 1rem;
  color: rgba(179, 40, 40, 0.4);
  cursor: pointer;
}
@media only screen and (max-width: 500px) {
  /* For mobile phones: */
}
</style>
