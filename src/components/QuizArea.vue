<template>
  <div class="quizArea">
    <br />
    <b-btn v-if="gameState != 'ended'" variant="danger" @click="endGame"
      >End Quiz</b-btn
    >
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
        <b-row style="min-height: 120px">
          <b-col>
            <div v-if="displayAnswerRow" class="p-3" :style="footerStyle">
              <h5>{{ currentAnswerCorrect ? "Correct!" : "Incorrect" }}</h5>
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
            </div>
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
        <br />
        <br />
        <br />

        <b-row>
          <b-col>
            <b-btn @click="startGame" size="lg" variant="success">
              Restart
            </b-btn>
          </b-col>
        </b-row>

        <br />
        <b-row>
          <b-col>
            <b-btn variant="info" @click="returnToOptions" size="lg"
              >Options</b-btn
            >
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
    footerStyle() {
      return {
        visibility: this.displayAnswerRow ? "visible" : "hidden",
        backgroundColor: this.currentAnswerCorrect ? "#d4edda" : "#f8d7da"
      };
    },
    symbolOptions() {
      return [...this.options.kanaSelect, "Romaji"];
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
      displayAnswerRow: false,
      answerSelected: false,

      //new options
      promptTypes: ["Symbol", "Audio"]
    };
  },
  mounted() {
    this.startGame();
  },
  methods: {
    startGame() {
      this.resetScore();
      this.gameState = "ongoing";
      this.displayNextQuestion();
      this.startTimer();
    },
    endGame() {
      this.stopTimer();
      this.gameState = "ended";
    },
    displayNextQuestion() {
      this.displayAnswerRow = false;
      this.currentAnswerCorrect = undefined;
      this.currentQuestion = this.buildQuestion();
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
        case "Timed": {
          this.currentTimer = this.options.overallTime * 60;
          break;
        }
        default: {
          this.currentTimer = 0;
          break;
        }
      }
      this.formattedTime = this.formatTime(this.currentTimer);
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
    buildQuestion() {
      const q = {};
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

      const promptType = this.promptTypes[
        Math.floor(Math.random() * this.promptTypes.length)
      ];
      switch (promptType) {
        case "Symbol": {
          const answerType = this.promptTypes[
            Math.floor(Math.random() * this.promptTypes.length)
          ];
          if (answerType == "Audio") {
            q.promptDisplay = this.symbolOptions[
              Math.floor(Math.random() * this.symbolOptions.length)
            ];
            q.answerDisplay = "file";
          } else {
            //ensure prompt/answer is displayed with different symbols
            const tempArr = [...this.symbolOptions];
            const promptSymbolOptionIndex = Math.floor(
              Math.random() * tempArr.length
            );
            const promptSymbol = tempArr[promptSymbolOptionIndex];
            tempArr.splice(promptSymbolOptionIndex, 1);
            const answerSymbol =
              tempArr[Math.floor(Math.random() * tempArr.length)];
            q.promptDisplay = promptSymbol;
            q.answerDisplay = answerSymbol;
          }
          break;
        }
        case "Audio": {
          //answerDisplay must be a symbol
          const answerSymbol = this.symbolOptions[
            Math.floor(Math.random() * this.symbolOptions.length)
          ];
          q.promptDisplay = "file";
          q.answerDisplay = answerSymbol;
          break;
        }
        default: {
          console.error(`Unhandled prompt type: ${q.promptDi}`);
        }
      }
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
        this.displayAnswerRow = true;
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
    },
    resetScore() {
      this.questionsAnswered = 0;
      this.questionsAnsweredCorrectly = 0;
    }
  },
  watch: {
    currentTimer(val) {
      if (this.options.timeOption == "Timed" && val <= 0) {
        this.endGame();
      }
    },
    currentAnswerCorrect(val) {
      // if (this.gameState === "ended") {
      //   //todo: make this better
      // }
      switch (val) {
        case true:
          this.$emit("setState", "correct");
          break;
        case false:
          this.$emit("setState", "incorrect");
          break;
        case undefined:
          this.$emit("setState", "prompt");
          break;
      }
    }
  }
};
</script>
