<template>
  <div class="home">
    <div class="welcome">
      This is the FreeTimeFriday app, welcome.
      So far we only have the friday activity poll.
    </div>
    <div class="app-list">
      <router-link to="/vote_app">
      <v-card>
        <div class="app-list-item">
        Activity Poll
      </div>
      </v-card>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data: () => {
    return {
      command: "",
      commands: {
        vote: '/vote_app'
      },
      errorCommand: "",
      error: false
    }
  },
  methods: {

  }
};
</script>

<style>
.error{
  color: rgb(207, 73, 73);
}
.app-list{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
}
.app-list-item{
  border: 2px solid black;
  padding: .5rem;
  font-size: 1.2em;
}
.home {
  display: grid;
  padding-top: 10rem;
  padding-left: 1rem;
  padding-left: 1rem;
  grid-gap: 2rem;
  justify-content: center;
  align-content: center;
}

.output:focus, .command_prompt:focus{
  outline: none;
}
</style>
