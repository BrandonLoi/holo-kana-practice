<template>
  <div class="options">
    <br />
    <b-container>
      <b-row>
        <b-col />
        <b-col class="text-right">Question Options:</b-col>
        <b-col class="text-left">
          <b-form-checkbox-group
            v-model="contentSelect"
            :options="contentOptions"
            size="lg"
            stacked
          />
        </b-col>
        <b-col />
      </b-row>
      <br />
      <b-row>
        <b-col />
        <b-col class="text-right">Question Display:</b-col>
        <b-col class="text-left">
          <b-form-checkbox-group
            v-model="displaySelect"
            :options="displayOptions"
            size="lg"
            stacked
          />
        </b-col>
        <b-col />
      </b-row>
      <br />

      <b-row>
        <b-col />
        <b-col class="text-right">Answer Types:</b-col>
        <b-col class="text-left">
          <b-form-checkbox-group
            v-model="typeSelect"
            :options="typeOptions"
            size="lg"
            stacked
          />
        </b-col>
        <b-col />
      </b-row>
      <br />
      <b-row>
        <b-col />
        <b-col class="text-center">
          <b-form-group>
            <b-form-radio-group
              id="btn-radios-2"
              v-model="timeSelect"
              :options="timeOptions"
              button-variant="outline-primary"
              size="lg"
              name="radio-btn-outline"
              buttons
            ></b-form-radio-group>
          </b-form-group>
          <div v-if="timeSelect == '#'">
            <b-row>
              <b-col class="my-auto">Number of Questions:</b-col>
              <b-col>
                <b-form-input
                  v-model="numberOfQuestionsString"
                  type="number"
                  min="1"
                  :max="numberOfQuestionsMax"
                />{{ numberOfQuestionsValue }} question(s)
              </b-col>
            </b-row>
          </div>
          <div v-else-if="timeSelect == 'Timed'">
            <b-row>
              <b-col class="my-auto text-right">Overall:</b-col>
              <b-col>
                <b-form-input
                  v-model="overallTimeString"
                  type="number"
                  :min="overallTimeMin"
                  :max="overallTimeMax"
                />{{ overallTimeValue }} minute(s)
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col class="my-auto text-right">Question:</b-col>
              <b-col>
                <b-form-input
                  v-model="questionTimeString"
                  type="number"
                  :min="questionTimeMin"
                  :max="questionTimeMax"
                />{{ questionTimeValue }} second(s)
              </b-col>
            </b-row>
          </div>
          <div v-else-if="timeSelect == 'Unlimited'">
            <b-row>
              <b-col class="my-auto text-right">Mistake Limit:</b-col>
              <b-col>
                <b-form-input
                  v-model="mistakeLimitString"
                  type="number"
                  :min="mistakeLimitMin"
                  :max="mistakeLimitMax"
                />{{ mistakeLimitValue }} mistake(s)
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col />
      </b-row>
      <br />
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Options",
  computed: {
    selectedOptions() {
      return {
        answerTypes: this.typeSelect,
        questionDisplay: this.displaySelect,
        questionContent: this.contentSelect,
        timeOption: this.timeSelect,
        numberOfQuestions: this.numberOfQuestionsValue,
        overallTime: this.overallTimeValue,
        questionTimeValue: this.questionTimeValue,
        mistakeLimitValue: this.mistakeLimitValue
      };
    },
    overallTimeValue() {
      return this.numberCheck(
        this.overallTimeString,
        this.overallTimeDefault,
        this.overallTimeMin,
        this.overallTimeMax
      );
    },
    questionTimeValue() {
      return this.numberCheck(
        this.questionTimeString,
        this.questionTimeDefault,
        this.questionTimeMin,
        this.questionTimeMax
      );
    },
    numberOfQuestionsValue() {
      return this.numberCheck(
        this.numberOfQuestionsString,
        this.numberOfQuestionsDefault,
        this.numberOfQuestionsMin,
        this.numberOfQuestionsMax
      );
    },
    mistakeLimitValue() {
      return this.numberCheck(
        this.mistakeLimitString,
        this.mistakeLimitDefault,
        this.mistakeLimitMin,
        this.mistakeLimitMax
      );
    }
  },
  data() {
    return {
      //answer type
      typeOptions: [
        "Multichoice Romaji",
        "Multichoice Hiragana",
        "Multichoice Katakana"
      ],
      // typeOptions: [
      //   "Multichoice Romaji",
      //   "Multichoice Hiragana",
      //   "Multichoice Katakana",
      //   "Type Romaji",
      //   "Type Hiragana",
      //   "Type Katakana"
      // ],
      typeSelect: ["Multichoice Romaji"],

      //question content
      contentOptions: ["Symbol"],
      // contentOptions: ["Symbol", "Vocab", "Listen"],
      contentSelect: ["Symbol"],

      //question display
      displayOptions: ["Romaji", "Hiragana", "Katakana", "Sound"],
      displaySelect: ["Hiragana"],

      //time mode selection
      timeOptions: ["#", "Timed", "Unlimited"],
      timeSelect: "Unlimited",

      //# - number of questions
      numberOfQuestionsString: "10",
      numberOfQuestionsDefault: 10,
      numberOfQuestionsMin: 1,
      numberOfQuestionsMax: 10000,

      //timed - overall time
      overallTimeString: "2",
      overallTimeDefault: 2,
      overallTimeMin: 1,
      overallTimeMax: 60,

      //timed - question time
      questionTimeString: "20",
      questionTimeDefault: 20,
      questionTimeMin: 5,
      questionTimeMax: 60,

      //unlimited - mistake limit
      mistakeLimitString: "5",
      mistakeLimitDefault: 5,
      mistakeLimitMin: 1,
      mistakeLimitMax: 10000
    };
  },
  mounted() {
    this.$emit("setOptions", this.selectedOptions);
  },
  methods: {
    //prevents option input numbers from being in an invalid state
    numberCheck(string, numDefault, min, max) {
      const x = parseInt(string);
      if (!x) {
        return numDefault;
      }
      if (x < min) {
        return min;
      }
      if (x > max) {
        return max;
      }
      return x;
    }
  },
  watch: {
    selectedOptions(val) {
      this.$emit("setOptions", val);
    }
  }
};
</script>
