<template>
  <div>
    <b-navbar
      toggleable="sm"
      type="dark"
      style="background-color: rgba(55,117,13)"
    >
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
      <b-navbar-brand>Kana with Aki</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">About</b-nav-item>
          <b-nav-item to="/study">Study</b-nav-item>
          <b-nav-item to="/quiz">Quiz</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid id="app">
      <b-row class="mt-2">
        <b-col>
          <transition name="fade">
            <router-view />
          </transition>
        </b-col>
      </b-row>
    </b-container>
  </div>
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
  border: 2mm ridge rgba(255, 52, 52, 0.6);
}

body {
  background-image: url("~@/assets/bg1.png");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  background-attachment: fixed;
}

/* custom mouse */
* {
  cursor: url("./assets/akiMouseResize.png"), auto !important;
}
</style>
