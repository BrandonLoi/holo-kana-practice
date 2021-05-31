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
      <b-container fluid>
        <b-row>
          <b-col cols="1" class="d-none d-lg-block" />
          <b-col>
            <b-container class="content">
              <QuizArea @returnToOptions="endQuiz" @setState="setState" :options="options" />
            </b-container>
          </b-col>
          <b-col cols="5" class="d-none d-xl-block" align-self="center">
            <aki-photo :quizState="quizState" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Options from "@/components/Options.vue";
import QuizArea from "@/components/QuizArea.vue";
import AkiPhoto from "@/components/AkiPhoto.vue";
export default {
  name: "Quiz",
  components: {
    Options,
    QuizArea,
    AkiPhoto,
  },
  computed: {
    settingsValid() {
      if (this.options.kanaSelect && this.options.kanaSelect.length) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      options: {},
      quizDisplay: false,
      quizState: undefined
    };
  },
  methods: {
    setOptions(options) {
      this.options = options;
    },
    beginQuiz() {
      this.quizDisplay = true;
      this.quizState = "prompt"
    },
    endQuiz() {
      this.quizDisplay = false;
    },
    setState(s) {
      this.quizState = s
    }
  },
};
</script>
