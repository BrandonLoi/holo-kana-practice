<template>
  <div class="Study">
    <b-container class="align-center">
      <b-row>
        <b-col class="text-center">
          <b-btn @click="sylSelect = 'Hiragana'">Hiragana</b-btn>
          &nbsp;
          <b-btn @click="sylSelect = 'Katakana'">Katakana</b-btn>
          &nbsp;
          <b-btn @click="sylSelect = 'Romaji'">Romaji</b-btn>
        </b-col>
      </b-row>
      <Syllabary :kana="sylSelect" />
    </b-container>
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
      sylSelect: "Hiragana"
    };
  }
};
</script>
