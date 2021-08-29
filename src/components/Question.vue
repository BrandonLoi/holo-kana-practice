<template>
  <div class="question">
    <b-row style="min-height: 90px; max-height: 90px">
      <b-col />
      <b-col>
        <h1 v-if="question.promptDisplay != 'file'">
          {{ question.answer[question.promptDisplay] }}
        </h1>
        <div v-else>
          <div
            class="clickable"
            @click="playSound(question.answer.file)"
            style="margin: auto; max-width: 90px; max-height: 90px;"
          >
            <b-img fluid :src="require('@/assets/appleBtn0.png')" />
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
              <div v-if="question.answerDisplay == 'file'">
                <b-btn
                  v-if="choiceArray[2 * row + col - 3]"
                  @click="selectAnswer(2 * row + col - 3)"
                  block
                  pill
                  :variant="
                    selectedAnswer == 2 * row + col - 3 && !disabledState
                      ? 'primary'
                      : getButtonVariant(2 * row + col - 3)
                  "
                  :disabled="disabledState"
                  size="lg"
                  >▶</b-btn
                >
              </div>
              <div v-else>
                <b-btn
                  v-if="choiceArray[2 * row + col - 3]"
                  @click="selectAnswer(2 * row + col - 3)"
                  block
                  pill
                  :variant="
                    selectedAnswer == 2 * row + col - 3 && !disabledState
                      ? 'primary'
                      : getButtonVariant(2 * row + col - 3)
                  "
                  :disabled="disabledState"
                  size="lg"
                >
                  {{ choiceArray[2 * row + col - 3][question.answerDisplay] }}
                </b-btn>
              </div>
            </b-col>
            <br />
            <br />
            <br />
          </b-row>
          <b-row
            :style="
              selectedAnswer != undefined && !disabledState
                ? 'visibility: visible'
                : 'visibility: hidden'
            "
          >
            <b-col />
            <b-col cols="3">
              <b-btn
                block
                pill
                @click="confirmAnswer()"
                variant="primary"
                size="lg"
                >Check</b-btn
              >
            </b-col>
            <b-col />
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
    }
  },
  data() {
    return {
      answerIndex: undefined,
      disabledState: false,
      selectedAnswer: undefined
    };
  },
  methods: {
    selectAnswer(i) {
      this.selectedAnswer = i;
      if (this.question.promptDisplay != "file") {
        this.playSound(this.choiceArray[i].file);
      }
    },
    setAnswerIndex() {
      const x = Math.floor(Math.random() * (this.question.choices.length + 1));
      this.answerIndex = x;
    },
    getButtonVariant(i) {
      if (this.selectedAnswer == i && !this.disabledState) {
        return "primary";
      }
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
    playSound(sound) {
      /* eslint-disable global-require */
      const audio = new Audio(require("@/assets/" + sound));
      audio.play();
      /* eslint-enable global-require */
    },
    confirmAnswer() {
      this.$emit("answerQuestion", this.selectedAnswer === this.answerIndex);
      this.disabledState = true;
      this.selectedAnswer = undefined;
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
