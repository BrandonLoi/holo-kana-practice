<template>
  <div class="quizArea">
    <br />
    <b-btn variant="danger" @click="endGame">End Quiz</b-btn>
    <div v-if="gameState != 'ended'" id="questionUI">
      <br />
      <b-container>
        <!-- Time/Score -->
        <b-row>
          <b-col>
            <h5>{{ formattedTime }}</h5>
          </b-col>
          <b-col>
            <h5>{{ questionsAnsweredCorrectly }} / {{ questionsAnswered }}</h5>
          </b-col>
        </b-row>
        <br />
        <!-- Question -->
        <Question
          :question="currentQuestion"
          @answerQuestion="answerQuestion"
        />
        <!-- Correct/Incorrect Alert -->
        <b-row style="min-height: 80px">
          <b-col>
            <b-alert
              :variant="currentAnswerCorrect ? 'success' : 'danger'"
              v-model="displayFooter"
            >
              <h5>{{ currentAnswerCorrect ? "Correct!" : "Incorrect" }}</h5>
              <p style="font-weight: bold">
                {{ currentQuestion.answer[currentQuestion.displayType] }}
              </p>
              <b-btn
                @click="displayNextQuestion"
                block
                pill
                variant="primary"
                size="lg"
              >
                Next Question
                <b-icon icon="arrow-right" />
              </b-btn>
            </b-alert>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div v-else id="resultsUI">
      <br />
      <br />
      <br />
      <br />
      <b-container>
        <b-row>
          <b-col>
            <h3>Game Over</h3>
          </b-col>
        </b-row>
        <br />
        <br />

        <b-row v-if="options.timeOption !== 'Timed'">
          <b-col>
            <h3>
              {{ formattedTime }}
            </h3>
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col>
            <h3>
              {{ formattedTime }}
            </h3>
          </b-col>
        </b-row>
        <br />

        <b-row>
          <b-col>
            <h3>{{ questionsAnsweredCorrectly }} / {{ questionsAnswered }}</h3>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-btn variant="secondary" @click="returnToOptions">Options</b-btn>
          </b-col>
        </b-row>
        <br />
        <br />
        <br />
      </b-container>
    </div>
  </div>
</template>

<script>
import Question from "@/components/Question.vue";
import json from "@/assets/kana.json";

export default {
  name: "QuizArea",
  components: {
    Question
  },
  props: {
    options: Object
  },
  computed: {
    footerVariant() {
      return this.currentAnswerCorrect ? "success" : "danger";
    }
  },
  data() {
    return {
      questionsAnsweredCorrectly: 0,
      questionsAnswered: 0,
      ticker: undefined,
      formattedTime: "00:00:00",
      currentTimer: 0,
      timerState: "stopped",
      gameState: "ended",
      currentQuestion: undefined,
      currentAnswerCorrect: false,
      displayFooter: false
    };
  },
  mounted() {
    this.startGame();
  },
  methods: {
    startGame() {
      this.gameState = "ongoing";
      this.displayNextQuestion();
      this.startTimer();
    },
    endGame() {
      this.stopTimer();
      this.gameState = "ended";
    },
    displayNextQuestion() {
      this.displayFooter = false;
      this.currentAnswerCorrect = false;
      this.currentQuestion = this.buildSymbolQuestion();
      // if different kinds of questions are added with:
      //   -prompt types (words, sentences)
      //   -answer formats (typing, click/drag)
      // organize them in this switch statement
      // const content = this.options.questionContent[
      //   Math.floor(Math.random() * this.options.questionContent.length)
      // ];
      // switch (content) {
      //   case "Symbol": {
      //     this.currentQuestion = this.buildSymbolQuestion();
      //     break;
      //   }
      //   case "Sound": {
      //     this.currentQuestion = this.buildSymbolQuestion();
      //     break;
      //   }
      //   default: {
      //     console.log("unhandled case!");
      //     break;
      //   }
      // }
    },
    startTimer() {
      this.clearTimer();
      this.timerState = "started";
      if (this.options.timeOption == "Timed") {
        this.ticker = setInterval(() => {
          this.currentTimer--;
          this.formattedTime = this.formatTime(this.currentTimer);
        }, 1000);
      }
      if (
        this.options.timeOption == "Unlimited" ||
        this.options.timeOption == "#"
      ) {
        this.ticker = setInterval(() => {
          this.currentTimer++;
          this.formattedTime = this.formatTime(this.currentTimer);
        }, 1000);
      }
    },
    stopTimer() {
      clearInterval(this.ticker);
      this.timerState = "stopped";
    },
    clearTimer() {
      this.stopTimer();
      switch (this.options.timeOption) {
        case "#": {
          break;
        }
        case "Timed": {
          this.currentTimer = this.options.overallTime * 60;
          break;
        }
        default: {
          break;
        }
      }
    },
    formatTime(seconds) {
      let measuredTime = new Date(null);
      measuredTime.setSeconds(seconds);
      return measuredTime.toISOString().substring(11, 19);
    },
    getRandomSymbol() {
      const columns = Object.entries(json.Gojūon);
      const row = Object.entries(
        columns[Math.floor(Math.random() * columns.length)][1].columns
      );
      const syllable = row[Math.floor(Math.random() * row.length)];
      return syllable[1];
    },
    buildSymbolQuestion() {
      const q = {};
      q.displayType = this.options.questionDisplay[
        Math.floor(Math.random() * this.options.questionDisplay.length)
      ];
      q.answerType = this.options.answerTypes[
        Math.floor(Math.random() * this.options.answerTypes.length)
      ];
      q.answer = this.getRandomSymbol();
      let choices = [];
      while (choices.length < 3) {
        const c = this.getRandomSymbol();
        if (
          c.Hiragana !== q.answer.Hiragana &&
          !choices.find(x => x.Hiragana === c.Hiragana)
        ) {
          choices.push(c);
        }
      }
      q.choices = choices;
      return q;
    },
    answerQuestion(a) {
      this.questionsAnswered++;
      if (a) {
        this.playSound(
          `akiNoises/yes${this.questionsAnsweredCorrectly % 9}.mp3`
        );
        this.currentAnswerCorrect = true;
        this.questionsAnsweredCorrectly++;
      } else {
        this.currentAnswerCorrect = false;
        this.playSound(
          `akiNoises/no${(this.questionsAnswered -
            this.questionsAnsweredCorrectly) %
            16}.mp3`
        );
      }

      //if game end condition is met
      if (
        this.options.timeOption === "#" &&
        this.questionsAnswered >= this.options.numberOfQuestions
      ) {
        this.endGame();
      } else if (
        this.options.timeOption === "Unlimited" &&
        this.options.mistakeLimitValue <=
          this.questionsAnswered - this.questionsAnsweredCorrectly
      ) {
        this.endGame();
      } else {
        this.displayFooter = true;
      }
    },
    playSound(sound) {
      if (sound) {
        /* eslint-disable global-require */
        const audio = new Audio(require("@/assets/" + sound));
        audio.play();
        /* eslint-enable global-require */
      }
    },
    returnToOptions() {
      this.$emit("returnToOptions");
    }
  },
  watch: {
    currentTimer(val) {
      if (this.options.timeOption == "Timed" && val <= 0) {
        this.endGame();
      }
    }
  }
};
</script>
