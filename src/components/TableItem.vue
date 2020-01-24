<template>
  <div class="table-item">
    <span id="item-name">{{ activity.name }}</span>
    <span id="item-votes">{{ activity.votes }}</span>
    <span id="up" @click="$emit('increase', activity)">
      <svg
        width="39"
        height="15"
        viewBox="0 0 51 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M49.75 25.75L25.25 1.25L0.749999 25.75"
          stroke="white"
          stroke-width="10%"
        />
      </svg>
    </span>
    <span id="down" @click="$emit('decrease', activity)">
      <svg
        width="39"
        height="15"
        viewBox="0 0 51 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 1L25.5 25.5L0.999999 1"
          stroke="white"
          stroke-width="10%"
        />
      </svg>
    </span>
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
  align-content: center;
  grid-template-columns: repeat(4, 1fr);
  height: 5em;
  border: 1px solid white;
  border-radius: 3rem;
  color: white;
  font-size: 1.5em;
  grid-template-areas:
    "name name votes up"
    "name name votes down";
}
#item-name {
  grid-area: name;
  align-self: center;
  justify-self: center;
}
#item-votes {
  grid-area: votes;
  align-self: center;
  justify-self: end;
}
#up {
  cursor: pointer;
  padding-left: 20px;
  padding-right: 20px;
  grid-area: up;
  align-self: center;
  justify-self: center;
}
#up:hover path {
  stroke: green;
}
#down {
  cursor: pointer;
  padding-left: 20px;
  padding-right: 20px;
  grid-area: down;
  align-self: center;
  justify-self: center;
}
#down:hover path {
  stroke: red;
}
</style>
