<template>
  <div class="Study">
    <b-container>
      <b-row>
        <b-col class="text-center">
          <b-btn @click="styleSelect = 'Hiragana'">Hiragana</b-btn>
          &nbsp;
          <b-btn @click="styleSelect = 'Katakana'">Katakana</b-btn>
          &nbsp;
          <b-btn @click="styleSelect = 'Romaji'">Romaji</b-btn>
        </b-col>
      </b-row>
    </b-container>
    <Syllabary :kana="styleSelect" />
  </div>
</template>

<script>
import Syllabary from "@/components/Syllabary.vue";

export default {
  name: "Study",
  components: {
    Syllabary
  },
  data() {
    return {
      styleSelect: "Hiragana"
    };
  }
};
</script>
