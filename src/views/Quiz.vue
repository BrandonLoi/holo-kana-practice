<template>
  <div class="quiz">
    <b-container v-if="!quizDisplay">
      <Options @setOptions="setOptions" />
      <b-row>
        <b-col />
        <b-col v-if="settingsValid">
          <b-btn @click="beginQuiz" variant="success" size="lg">
            Start Quiz
          </b-btn>
        </b-col>
        <b-col />
      </b-row>
    </b-container>
    <b-container v-else>
      <QuizArea @returnToOptions="endQuiz" :options="options" />
    </b-container>
  </div>
</template>

<script>
import Options from "@/components/Options.vue";
import QuizArea from "@/components/QuizArea.vue";
export default {
  name: "Quiz",
  components: {
    Options,
    QuizArea
  },
  computed: {
    settingsValid() {
      if (
        this.options.answerTypes &&
        this.options.answerTypes.length &&
        this.options.questionContent &&
        this.options.questionContent.length
      ) {
        return true;
      }
      return false;
    }
  },
  data() {
    return {
      options: {},
      quizDisplay: false
    };
  },
  methods: {
    setOptions(options) {
      this.options = options;
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
