<template>
  <div class="question">
    <b-row>
      <b-col>
        <h1>{{ question.answer[question.displayType] }}</h1>
      </b-col>
    </b-row>

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

        <!-- Type Response -->
        <!-- <b-container>
          <b-row>
            <b-col>
              <b-form-textarea
                id="textarea-large"
                size="lg"
                placeholder="Enter a response..."
              />
            </b-col>
          </b-row>
        </b-container> -->
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
    }
  },
  watch: {
    question() {
      this.disabledState = false;
    }
  }
};
</script>

<style></style>
