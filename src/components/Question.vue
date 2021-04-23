<template>
  <div class="question">
    <b-row>
      <b-col />
      <b-col>
        <h1 v-if="question.displayType != 'Sound'">
          {{ question.answer[question.displayType] }}
        </h1>
        <div v-else>
          <div class="clickable" @click="playPromptSound()">
            <b-img fluid :src="require('@/assets/appleBtn.png')" />
            <span
              class="position-absolute text-white"
              style="         
                    font-size: 1.25rem;
                    top: 59%;
                    left: 50%;
                    transform: translate(-50%, -50%);"
              >▶</span
            >
          </div>
        </div>
      </b-col>
      <b-col />
    </b-row>
    <br />
    <b-row>
      <b-col>
        <b-container>
          <b-row v-for="row in rowNum" :key="row">
            <b-col v-for="col in 2" :key="col">
              <b-btn
                v-if="choiceArray[2 * row + col - 3]"
                @click="answer(2 * row + col - 3)"
                block
                pill
                :variant="getButtonVariant(2 * row + col - 3)"
                :disabled="disabledState"
                size="lg"
              >
                {{ choiceArray[2 * row + col - 3][answerDisplay] }}
              </b-btn>
            </b-col>
            <br />
            <br />
            <br />
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    question: Object
  },
  computed: {
    rowNum() {
      if (!this.choiceArray.length) {
        return 0;
      }
      return Math.ceil(this.choiceArray.length / 2);
    },
    choiceArray() {
      let arr = [];
      arr = arr.concat(this.question.choices);
      this.setAnswerIndex();
      arr.splice(this.answerIndex, 0, this.question.answer);
      return arr;
    },
    answerDisplay() {
      switch (this.question.answerType) {
        case "Multichoice Romaji":
          return "Romaji";
        case "Multichoice Hiragana": {
          return "Hiragana";
        }
        case "Multichoice Katakana": {
          return "Katakana";
        }
        default:
          return "";
      }
    }
  },
  data() {
    return {
      answerIndex: undefined,
      disabledState: false
    };
  },
  methods: {
    answer(i) {
      this.$emit("answerQuestion", i === this.answerIndex);
      this.disabledState = true;

      //todo: highlight correct
    },
    setAnswerIndex() {
      const x = Math.floor(Math.random() * (this.question.choices.length + 1));
      this.answerIndex = x;
    },
    getButtonVariant(i) {
      if (this.disabledState === false) {
        return "outline-primary";
      }
      if (i !== this.answerIndex) {
        return "danger";
      }
      if (i === this.answerIndex) {
        return "success";
      }
    },
    playPromptSound() {
      /* eslint-disable global-require */
      const audio = new Audio(require("@/assets/" + this.question.answer.file));
      audio.play();
      /* eslint-enable global-require */
    }
  },
  watch: {
    question() {
      this.disabledState = false;
    }
  }
};
</script>

<style>
.clickable {
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
</style>
