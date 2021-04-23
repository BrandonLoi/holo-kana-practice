<template>
  <div id="syllabaryContainer">
    <br />
    <br />
    <b-container class="content">
      <b-row no-gutters style="border: 1px solid blue">
        <b-col style="border-right: 1px blue solid" cols="2" />
        <b-col
          class="d-flex"
          v-for="(v, index) in vowelArray"
          :key="v"
          v-bind:class="[
            index == vowelArray.length - 1 ? lastItemClass : itemColClass
          ]"
          cols="2"
        >
          <h2 class="col-header-margin">{{ v }}</h2>
        </b-col>
      </b-row>
      <b-row
        no-gutters
        style="border: 1px solid blue"
        v-for="i in syllabaries"
        :key="i.order"
      >
        <b-col class="d-flex" style="border-right: 1px blue solid" cols="2">
          <h2 style="margin: auto">{{ i.rowConsonant }}</h2>
        </b-col>
        <b-col
          cols="2"
          v-for="(v, index) in vowelArray"
          :key="v"
          v-bind:class="[
            index == vowelArray.length - 1 ? lastItemClass : itemColClass
          ]"
          align-v="center"
        >
          <div
            v-if="i.columns[v]"
            @click="playSound(i.columns[v].file)"
            class="clickable"
          >
            <b-img fluid :src="require('@/assets/appleBtn.png')" />
            <span
              class="position-absolute text-white"
              style="         
                    font-size: 1.25rem;
                    top: 59%;
                    left: 50%;
                    transform: translate(-50%, -50%);"
              >{{ i.columns[v][kana] }}</span
            >
          </div>
        </b-col>
        <br />
        <br />
        <br />
      </b-row>
    </b-container>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import json from "@/assets/kana.json";
export default {
  name: "Syllabary",
  props: {
    kana: String
  },
  data() {
    return {
      syllabaries: json.Gojūon,
      audioSrc: "",
      vowelArray: ["a", "i", "u", "e", "o"],
      itemColClass: "item-col",
      lastItemClass: "last-item"
    };
  },
  methods: {
    playSound(sound) {
      if (sound) {
        let audio = new Audio(require("@/assets/" + sound));
        audio.play();
      }
    }
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #ff0000;
}
.col-header-margin {
  margin: auto;
  margin-bottom: 5px;
}
.item-col {
  border-left: 1px blue solid;
  border-right: 1px blue solid;
}
.last-item {
  border-left: 1px blue solid;
}
.clickable {
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
</style>
