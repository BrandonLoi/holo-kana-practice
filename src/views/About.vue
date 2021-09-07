<template>
  <div class="about">
    <b-container class="text-center content">
      <br />
      <b-row>
        <b-col>
          <p>
            The Japanese writing system uses 3 sets of characters.
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="text-center">
          <h3>
            <span :class="kanjiClass">私</span>
            <span :class="hClass">の</span>
            <span :class="kanjiClass">名前</span>
            <span :class="hClass">は</span>
            <span :class="kataClass">ジョン</span>
            <span :class="hClass">です</span>。
            <br />
            <span :class="kanjiClass">
              Watashi
            </span>
            <span :class="hClass">
              no
            </span>
            <span :class="kanjiClass">
              namae
            </span>
            <span :class="hClass">
              wa
            </span>
            <span :class="kataClass">
              Jon
            </span>
            <span :class="hClass">
              desu
            </span>
            .
            <br />
            <span :class="kanjiClass">M</span>
            <span :class="hClass">y </span>
            <span :class="kanjiClass">name </span>
            <span :class="hClass">is </span>
            <span :class="kataClass">John</span>.
          </h3>
        </b-col>
      </b-row>

      <br />

      <b-row class="text-center">
        <b-col>
          <b-btn @click="highlightText('Hiragana')" size="lg" variant="success">
            Hiragana
          </b-btn>
        </b-col>
        <b-col>
          <b-btn @click="highlightText('Katakana')" size="lg" variant="primary">
            Katakana
          </b-btn>
        </b-col>
        <b-col>
          <b-btn @click="highlightText('Kanji')" size="lg" variant="danger">
            Kanji
          </b-btn>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col class="text-center">
          <b-collapse :visible="userHighlight">
            <b-btn @click="highlightText()">Close</b-btn>
          </b-collapse>
        </b-col>
      </b-row>
      <br />
      <b-collapse v-model="hHighlight">
        <b-container fluid>
          <b-row>
            <b-col class="text-center">
              <h5>Hiragana</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              Hiragana is made of 46 symbols that can represent every sound in
              the Japanese language. However, reading/writing exclusively with
              Hiragana would be difficult and time consuming. Doing so would be
              analagous to reading/writing english with lowercase letters and no
              spaces:
            </b-col>
            <b-col cols="4">
              <b-container fluid>
                <b-row>
                  <b-col><h5>あ</h5></b-col>
                  <b-col><h5>い</h5></b-col>
                  <b-col><h5>う</h5></b-col>
                  <b-col><h5>え</h5></b-col>
                  <b-col><h5>お</h5></b-col>
                </b-row>
                <b-row>
                  <b-col><h5>a</h5></b-col>
                  <b-col><h5>i</h5></b-col>
                  <b-col><h5>u</h5></b-col>
                  <b-col><h5>e</h5></b-col>
                  <b-col><h5>o</h5></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <br />
          <b-row class="text-center">
            <b-col>
              <h5>
                thisisprettyhardtoreadafterawhile,isntit?
              </h5>
            </b-col>
          </b-row>
        </b-container>
      </b-collapse>
      <b-collapse v-model="kataHighlight">
        <b-container>
          <b-row>
            <b-col><h5>Katakana</h5></b-col>
          </b-row>
          <b-row class="text-center">
            <b-col>
              Katakana uses the same sounds as Hiragana, though is used for
              words/names from other languages or emphasize certain words in a
              sentence.
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h5>
                John
                <br />
                <span :class="kataClass">ジョン</span>
              </h5>
            </b-col>
            <b-col>
              <h5>
                mahjong
                <br />
                <span :class="kataClass">マージャン</span>
              </h5>
            </b-col>
            <b-col>
              <h5>
                camera
                <br />
                <span :class="kataClass">カメラ</span>
              </h5>
            </b-col>
            <b-col>
              <h5>
                America
                <br />
                <span :class="kataClass">アメリカ</span>
              </h5>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col>
              Remember though, in Japanese these words are still using the
              Japanese language's possible sounds. <br />Due to this, sometimes
              words will sound slightly differently (often times an extra
              syllable) from their original pronunciation.
            </b-col>
          </b-row>
        </b-container>
      </b-collapse>
      <b-collapse v-model="kanjiHighlight">
        <b-container>
          <b-row>
            <b-col><h5>Kanji</h5></b-col>
          </b-row>
        </b-container>
      </b-collapse>
      <b-row> </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "About",
  computed: {
    userHighlight() {
      if (this.hHighlight || this.kataHighlight || this.kanjiHighlight) {
        return true;
      }
      return false;
    },
    hClass() {
      if (!this.userHighlight) {
        return "hiragana";
      }
      return this.hHighlight ? "hiragana" : "noHighlight";
    },
    kataClass() {
      if (!this.userHighlight) {
        return "katakana";
      }
      return this.kataHighlight ? "katakana" : "noHighlight";
    },
    kanjiClass() {
      if (!this.userHighlight) {
        return "kanji";
      }
      return this.kanjiHighlight ? "kanji" : "noHighlight";
    }
  },
  data() {
    return {
      hHighlight: false,
      kataHighlight: false,
      kanjiHighlight: false
    };
  },
  methods: {
    highlightText(h) {
      switch (h) {
        case "Hiragana":
          this.hHighlight = true;
          this.kataHighlight = false;
          this.kanjiHighlight = false;
          break;
        case "Katakana":
          this.hHighlight = false;
          this.kataHighlight = true;
          this.kanjiHighlight = false;

          break;
        case "Kanji":
          this.hHighlight = false;
          this.kataHighlight = false;
          this.kanjiHighlight = true;
          break;
        default:
          this.hHighlight = false;

          this.kataHighlight = false;
          this.kanjiHighlight = false;
          break;
      }
    }
  },
};
</script>

<style scoped>
.hiragana {
  color: green;
}
.katakana {
  color: blue;
}
.kanji {
  color: red;
}
.noHighlight {
  color: #2c3e50;
}
</style>
