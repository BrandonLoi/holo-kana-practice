<template>
  <div>
    <b-img fluid :src="currentPhoto(state)" />
    <!-- <img :src="currentPhoto" height="" /> -->
  </div>
</template>

<script>
export default {
  name: "AkiDisplay",
  props: {
    state: String
  },
  data() {
    return {
      //increment through each state's poses
      incPrompt: 0,
      incCorrect: 0,
      incIncorrect: 0,
      //number of Aki images in @/assets/akiPoses for each state
      maxPrompt: 1,
      maxCorrect: 5,
      maxIncorrect: 7
    };
  },
  watch: {
    state() {
      switch (this.state) {
        case "prompt":
          this.incPrompt++;
          break;
        case "correct":
          this.incCorrect++;
          break;
        case "incorrect":
          this.incIncorrect++;
          break;
        default:
          break;
      }
    }
  },
  methods: {
    currentPhoto() {
      let string;
      if (!this.state) {
        string = `./prompt0.png`;
      } else {
        switch (this.state) {
          case "correct":
            string = `./correct${this.incCorrect % this.maxCorrect}.png`;
            break;
          case "incorrect":
            string = `./incorrect${this.incIncorrect % this.maxIncorrect}.png`;
            break;
          case "prompt":
          default:
            string = `./prompt${this.incPrompt % this.maxPrompt}.png`;
            break;
        }
      }
      const images = require.context("@/assets/akiPoses", false, /\.png$/);
      return images(string);
    }
  }
};
</script>
