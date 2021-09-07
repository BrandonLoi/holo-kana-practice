ro<template>
  <div class="quiz">
    <b-container class="content" v-if="!quizDisplay">
      <Options @setOptions="setOptions" />
      <b-row>
        <b-col />
        <b-col v-if="settingsValid">
          <b-btn @click="beginQuiz" variant="success" size="lg">
            Start Quiz
          </b-btn>
        </b-col>
        <b-col v-else>
          <b-btn variant="secondary" size="lg"
            >Choose a kana set to begin</b-btn
          >
        </b-col>
        <b-col />
      </b-row>
      <br />
      <br />
    </b-container>
    <div v-else>
      <b-container fluid>
        <b-row>
          <b-col cols="1" class="d-none d-lg-block" />
          <b-col>
            <b-container class="content">
              <QuizArea
                @returnToOptions="endQuiz"
                @setState="setState"
                :options="options"
              />
            </b-container>
          </b-col>
          <b-col cols="5" class="d-none d-xl-block" align-self="center">
            <AkiDisplay class="akiStyle" :state="state" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Options from "@/components/Options.vue";
import QuizArea from "@/components/QuizArea.vue";
import AkiDisplay from "@/components/AkiDisplay.vue";
export default {
  name: "Quiz",
  components: {
    Options,
    QuizArea,
    AkiDisplay
  },
  computed: {
    settingsValid() {
      if (this.options.kanaSelect && this.options.kanaSelect.length) {
        return true;
      }
      return false;
    }
  },
  data() {
    return {
      options: {},
      quizDisplay: false,
      state: undefined,
      akiRotate: 3
    };
  },
  methods: {
    setOptions(options) {
      this.options = options;
    },
    setState(state) {
      this.state = state;
    },
    beginQuiz() {
      this.quizDisplay = true;
    },
    endQuiz() {
      this.quizDisplay = false;
    }
  }
};
</script>

<style scoped>
.akiStyle {
  border: solid 5px;
  border-image: linear-gradient(#9cec5a, #e29191) 30;
  background-color: rgba(135, 0, 28, 0.85);
}

.quizBorder {
  border: solid 5px;
  border-image: linear-gradient(#9cec5a, #e29191) 30;
}
</style>
