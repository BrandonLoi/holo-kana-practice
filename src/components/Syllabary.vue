<template>
  <b-container>
    <br />
    <br />

    <b-row class="text-center">
      <b-col style="border: 1px blue solid" cols="2" />
      <b-col
        v-for="v in vowelArray"
        style="border: 1px blue solid"
        :key="v"
        cols="2"
      >
        <h4>{{ v }}</h4>
      </b-col>
    </b-row>

    <b-row
      style="border: 1px solid blue"
      v-for="i in syllabaries"
      :key="i.order"
    >
      <b-col
        class="text-center my-auto"
        style="border-right: 1px blue solid"
        align-v="center"
        cols="2"
      >
        <h2>{{ i.rowConsonant }}</h2>
      </b-col>
      <b-col
        class="text-center my-auto"
        style="border-left: 1px blue solid; border-right: 1px blue solid"
        cols="2"
        v-for="v in vowelArray"
        :key="v"
      >
        <div></div>
        <b-btn
          block
          pill
          @click="playSound(i.columns[v].file)"
          variant="primary"
          size="lg"
          v-if="i.columns[v]"
        >
          {{ i.columns[v][kana] }}
        </b-btn>
      </b-col>
      <br />
      <br />
      <br />
    </b-row>
    <br />
    <br />
    <br />
  </b-container>
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
      vowelArray: ["a", "i", "u", "e", "o"]
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

<style></style>
