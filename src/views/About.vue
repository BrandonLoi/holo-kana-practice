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
          <p
            style="clear: both; display: inline-block; overflow: hidden; white-space: nowrap;"
          >
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
              desu.
            </span>
            <br />
            <span :class="kanjiClass">M</span>
            <span :class="hClass">y </span>
            <span :class="kanjiClass">name </span>
            <span :class="hClass">is </span>
            <span :class="kataClass">John</span>.
          </p>
        </b-col>
      </b-row>

      <b-row class="text-center">
        <b-col sm>
          <b-btn
            class="mt-1"
            @click="highlightText('Hiragana')"
            size="lg"
            variant="success"
          >
            Hiragana
          </b-btn>
        </b-col>
        <b-col sm>
          <b-btn
            class="mt-1"
            @click="highlightText('Katakana')"
            size="lg"
            variant="primary"
          >
            Katakana
          </b-btn>
        </b-col>
        <b-col sm>
          <b-btn
            class="mt-1"
            @click="highlightText('Kanji')"
            size="lg"
            variant="danger"
          >
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
            <b-col align-self="center">
              Hiragana is made of 46 symbols that can represent every sound in
              the Japanese language. However, reading/writing exclusively with
              Hiragana would be difficult and time consuming. Doing so would be
              analagous to reading/writing english with lowercase letters and no
              spaces:
              <br />
              <br />
              <p>
                itwouldbehardtoreadlikethis
              </p>
            </b-col>
            <b-col>
              <b-table
                table-variant="info"
                bordered
                :items="hiraganaExamples"
              />
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
          <br />
          <b-row class="text-center">
            <b-col>
              In Japanese these words are still using the Japanese language's
              possible sounds. <br />Sometimes words will sound slightly
              differently (often times an extra syllable) from their original
              pronunciation.
            </b-col>
          </b-row>
        </b-container>
      </b-collapse>
      <b-collapse v-model="kanjiHighlight">
        <b-container>
          <b-row>
            <b-col><h5>Kanji</h5></b-col>
          </b-row>
          <b-row>
            <b-col>
              Kanji are adapted Chinese characters that are used alongside
              Hiragana and Katakana. Often they are used to represent a commonly
              spoken phrase or name.
            </b-col>
          </b-row>
          <b-row>
            <b-col
              ><h5 class="kanji">女性</h5>
              <h5>woman</h5></b-col
            >
            <b-col
              ><h5 class="kanji">山</h5>
              <h5>mountain</h5></b-col
            >
            <b-col
              ><h5 class="kanji">文</h5>
              <h5>writing</h5></b-col
            >
          </b-row>
          <b-row>
            <b-col
              >These require memorization to write/read and sometimes are
              accompanied by small Hiragana readings above them (Furigana) when
              the symbol is uncommon.</b-col
            >
          </b-row>
        </b-container>
      </b-collapse>
      <hr />
      <b-row>
        <b-col>
          This site lets you practice Hiragana and Katakana on the
          <router-link class="link" to="/study">Study</router-link> and
          <router-link class="link" to="/quiz">Quiz</router-link> pages. <br />I
          made this site to help myself study kana and to practice using the
          Vue.js framework.
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col md="7" align-self="center"
          >The audio used on this fansite is from
          <strong>Aki Rosenthal</strong>, a Virtual Youtuber as a part of
          Hololive's First Generation. I encourage you to check out her fun and
          relaxing streams as well as some of her excellent
          <a href="https://www.youtube.com/watch?v=Ii7rtNaGlls" target="_blank"
            >songs
          </a>
          <a href="https://www.youtube.com/watch?v=8fqjcg2uRYs" target="_blank"
            >and
          </a>
          <a href="https://www.youtube.com/watch?v=3y5-Fl2ExIA" target="_blank"
            >music
          </a>
          <a href="https://www.youtube.com/watch?v=eN--w_NA6hs" target="_blank"
            >videos</a
          >
          <br />
          <br />
          Many of the voices heard here were recorded by Aki in this stream:
          <br />
          <a href="https://youtu.be/Y4h-hiKeNTg" target="_blank">
            <b-img fluid :src="require('@/assets/audioVidThumbnail.jpg')" />
          </a>
        </b-col>
        <b-col md class="mt-2">
          <b-img
            thumbnail
            width="250"
            :src="require('@/assets/portrait.webp')"
          />
          <br />
          <br />
          <!-- Social Links -->
          <div style="margin-left: auto; margin-right: auto; display: table">
            <b-button
              href="https://www.youtube.com/channel/UCFTLzh12_nrtzqBPsTCqenA"
              block
              variant="danger"
              target="_blank"
              >Aki's Youtube Channel</b-button
            >
            <b-button
              href="https://en.hololive.tv/portfolio/items/aki-rosenthal"
              block
              variant="success"
              target="_blank"
              >Aki's English Bio Page</b-button
            >
            <b-button
              href="https://twitter.com/akirosenthal"
              block
              variant="primary"
              target="_blank"
              >Aki's Twitter</b-button
            >
          </div>
        </b-col>
      </b-row>
      <br />
    </b-container>
    <br />
    <br />
    <br />
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
      kanjiHighlight: false,
      hiraganaExamples: [
        { hiragana: "あ", latin: "a" },
        { hiragana: "い", latin: "i" },
        { hiragana: "う", latin: "u" },
        { hiragana: "え", latin: "e" },
        { hiragana: "お", latin: "o" }
      ]
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
  }
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
.link {
  font-weight: bold;
  color: #2c3e50;
}
</style>
