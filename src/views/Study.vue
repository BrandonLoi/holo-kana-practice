<template>
  <div class="Study">
    <b-container>
      <b-row>
        <b-col sm class="my-2">
          <b-btn variant="primary" @click="styleSelect = 'Hiragana'"
            >Hiragana</b-btn
          ></b-col
        >
        <b-col sm class="my-2">
          <b-btn variant="primary" @click="styleSelect = 'Katakana'"
            >Katakana</b-btn
          ></b-col
        >
        <b-col sm class="my-2">
          <b-btn variant="primary" @click="styleSelect = 'Romaji'"
            >Romaji</b-btn
          ></b-col
        >
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
