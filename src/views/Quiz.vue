<template>
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
      <!-- small screen UI -->
      <b-container class="d-xl-none" fluid>
        <b-row>
          <b-col>
            <b-container class="content">
              <QuizArea @returnToOptions="endQuiz" :options="options" />
            </b-container>
          </b-col>
        </b-row>
      </b-container>

      <!-- large screen UI -->
      <b-container class="d-none d-xl-block" fluid>
        <b-row>
          <b-col cols="1" class="d-none d-lg-block" />
          <b-col cols="6">
            <b-container class="content">
              <QuizArea @returnToOptions="endQuiz" :options="options" />
            </b-container>
          </b-col>
          <b-col align-self="center">
            <b-img fluid :src="require('@/assets/akiPoses/point1.png')" />
          </b-col>
        </b-row>
      </b-container>
    </div>
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
      if (this.options.kanaSelect && this.options.kanaSelect.length) {
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
