<template>
  <div id="syllabaryContainer">
    <b-container class="content">
      <br />
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
            <b-img
              fluid
              :src="
                require('@/assets/appleBtn' +
                  Math.floor(Math.random() * totalAppleVariations) +
                  '.png')
              "
            />
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
      </b-row>
      <br />
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
      lastItemClass: "last-item",
      totalAppleVariations: 3
    };
  },
  methods: {
    playSound(sound) {
      if (sound) {
        const audio = new Audio(require("@/assets/" + sound));
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
.clickable:hover {
  background-color: rgba(251, 202, 141, 0.85);
}
.clickable:active {
  background-color: rgba(251, 181, 141, 0.85);
}

.last-item {
  border-left: 1px blue solid;
  border-right: 1px blue solid;
}
</style>
