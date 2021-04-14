<template>
  <b-container fluid id="app">
    <br />
    <b-row>
      <b-col />
      <b-col id="nav" class="content">
        <router-link to="/">About</router-link>
        &nbsp;
        <router-link to="/study">Study</router-link>
        &nbsp;
        <router-link to="/quiz">Quiz</router-link>
      </b-col>
      <b-col />
    </b-row>
    <br />
    <b-row>
      <b-col>
        <transition name="fade">
          <router-view />
        </transition>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.content {
  background-color: rgba(255, 228, 196, 0.85);
}
</style>
