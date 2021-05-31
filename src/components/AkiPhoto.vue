<template>
  <div>
    <b-img fluid v-if="picture" :src="picture" />
    <h1>Current State: {{ quizState }}</h1>
  </div>
</template>

<script>
export default {
  name: "AkiPhoto",
  props: {
    quizState: {
      type: String,
    },
  },
  computed: {
    picture() {
      switch (this.quizState) {
        case "prompt": {
          //thinking
          return undefined;
        }
        case "correct": {
          //wink/pointing
          const image = this.getCorrectPhoto();
          return require(`@/assets/akiPoses/${image}`);
        }
        case "incorrect": {
          //shocked
          return undefined;
        }
        case "concluded": {
          //yay face
          return undefined;
        }
        default:
          return undefined
      }
    },
  },
  data() {
    return {
      correctCounter: 0,
      pointMax: 4,
      possibleStates: ["prompt", "correct", "incorrect", "concluded"],
    };
  },
  methods: {
    getCorrectPhoto() {
      return `point${this.correctCounter++ % this.pointMax}.png`;
    }
  }
};
</script>
