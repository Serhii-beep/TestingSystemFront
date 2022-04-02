<template>
    <div class="wrapper">
        <loading-bar v-if="isLoading===true">
        </loading-bar>
        <section class="container" v-else>
            <div class="questionBox" id="questionBox">
                <transition
                enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut"
                mode="out-in">
                    <div class="questionContainer" v-if="current < tests.length" :key="current">
                        <header>
                            <div class="progressContainer">
                                <progress class="progress is-info is-small"
                                    :value="(current/tests.length)*100"
                                    max="100"
                                >
                                </progress>
                                <p>
                                    {{ (current/tests.length)*100 }}% complete
                                </p>
                            </div>
                        </header>
                        <h2 class="title">{{ tests[current].question.questionText }}</h2>
                        <div class="optionContainer">
                            <div class="option"
                                v-for="answer in tests[current].answers"
                                :key="answer.id"
                                @click="(e) => selectAnswer(e, answer.id)"
                            >
                                {{ answer.answerText }}
                            </div>
                        </div>
                        <footer class="questionFooter">
                            <nav class="pagination" role="navigation" aria-label="navigation">
                                <a v-show="role=='admin'" class="button is-active" @click="manageTests"><i class="fa-solid fa-pen-to-square"></i></a>
                                <a class="button is-active" @click="next" :disabled="current >= tests.length">
                                    {{ (current == tests.length - 1) ? 'Finish' : 'Next' }}
                                </a>
                            </nav>
                        </footer>
                    </div>
                    <div class="quizCompleted has-text-centered"
                        v-else
                        :key="current"
                    >
                        <span class="icon">
                            <i
                                :class="(score/maxScore)>=0.7 ? 'fa-solid fa-circle-check is-active' : 'fa fa-times-circle'"
                            ></i>
                        </span>
                        <h2 class="title">
                            {{ (score/maxScore>=0.7? 'You did an amazing job!' : 'Try one more time!') }}
                        </h2>
                        <p class="subtitle">
                            Total score: {{ score }} / {{ maxScore }}
                        </p>
                        <br>
                        <a class="button" @click="restart">restart <i class="fa fa-refresh"></i></a>
                    </div>
                </transition>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
import LoadingBar from '@/components/LoadingBar'
export default {
    components: {
        LoadingBar
    },
    data() {
        return {
            tests: [],
            current: 0,
            testSetId: 0,
            score: 0,
            maxScore: 0,
            isClicked: false,
            isLoading: true,
            role: ''
        }
    },
    methods: {
        next() {
            this.current++;
            this.isClicked = false;
        },
        restart() {
            this.score = 0;
            this.current = 0;
            this.isClicked = false;
        },
        async selectAnswer(e, answerId) {
            if(this.isClicked === true) {
                return;
            }
            this.isClicked = true;
            const isCorrect = await axios.get(`https://localhost:44310/api/Tests/checkAnswer/${this.tests[this.current].id}&${answerId}`);
            if(isCorrect.data.entity === true) {
                this.score += this.tests[this.current].question.points;
                e.target.style.backgroundColor = "green";
            }
            else {
                e.target.style.backgroundColor = "red";
            }
        },
        manageTests() {
            this.$router.push({name: 'ManageTests', params: {testSetId: this.$route.params.testSetId}});
        }
    },
    mounted() {
        this.testSetId = this.$route.params.testSetId;
        axios.get(`https://localhost:44310/api/Tests/getTests/${this.testSetId}`).then(response => {
            this.tests = response.data.entity;
            for(let i = 0; i < this.tests.length; ++i) {
                this.maxScore += this.tests[i].question.points;
            }
            this.isLoading = false;
        });
        this.role = localStorage.getItem('role');
    }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");

.animated {
    animation-duration: 0.3s;
}

@keyframes zoomIn {
    0% {transform:scale(0);}
    5% {transform:scale(0.05);}
    10% {transform:scale(0.1);}
    15% {transform:scale(0.15);}
    20% {transform:scale(0.2);}
    25% {transform:scale(0.25);}
    30% {transform:scale(0.3);}
    35% {transform:scale(0.35);}
    40% {transform:scale(0.4);}
    45% {transform:scale(0.45);}
    50% {transform:scale(0.5);}
    55% {transform:scale(0.55);}
    60% {transform:scale(0.6);}
    65% {transform:scale(0.65);}
    70% {transform:scale(0.7);}
    75% {transform:scale(0.75);}
    80% {transform:scale(0.8);}
    85% {transform:scale(0.85);}
    90% {transform:scale(0.9);}
    95% {transform:scale(0.95);}
    100% {transform:scale(1);}
}

@keyframes zoomOut {
    0% {transform:scale(1);}
    5% {transform:scale(0.95);}
    10% {transform:scale(0.9);}
    15% {transform:scale(0.85);}
    20% {transform:scale(0.8);}
    25% {transform:scale(0.75);}
    30% {transform:scale(0.7);}
    35% {transform:scale(0.65);}
    40% {transform:scale(0.6);}
    45% {transform:scale(0.55);}
    50% {transform:scale(0.5);}
    55% {transform:scale(0.45);}
    60% {transform:scale(0.4);}
    65% {transform:scale(0.35);}
    70% {transform:scale(0.3);}
    75% {transform:scale(0.25);}
    80% {transform:scale(0.2);}
    85% {transform:scale(0.15);}
    90% {transform:scale(0.1);}
    95% {transform:scale(0.05);}
    100% {transform:scale(0);}
}

.zoomIn {
    animation-name: zoomIn;
    animation-timing-function: ease-in-out;
}

.zoomOut {
    animation-name: zoomOut;
    animation-timing-function: ease-in-out;
}


.wrapper {
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    height: 100vh;
    background: #CFD8DC;
    margin-left: 240px;
    cursor: default !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button {
    transition: 0.3s;
}

.title, .subtitle {
    font-family: Montserrat, sans-serif;
    font-weight: normal;
    text-align: center;
    margin: 0 auto;
    padding: 1.5rem;
}

.animated {
    transition-duration: 0.15s;
}

.container {
    margin: 0 0.5rem;
}

.questionBox {
    max-width: 30rem;
    width: 30rem;
    min-height: 30rem;
    background: #FAFAFA;
    position: relative;
    display: flex;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.questionBox header {
    background: rgba(0, 0, 0, 0.025);
    padding: 1.5rem;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.questionBox header .progressContainer {
    width: 60%;
    margin: 0 auto;
}

.questionBox header .progressContainer > progress {
    margin: 0;
    border-radius: 5rem;
    overflow: hidden;
    border: none;
    color: #3D5AFE;
}

.questionBox header .progressContainer > progress::-webkit-progress-value {
  background: #3D5AFE;
}

.questionBox header .progressContainer > p {
    margin: 0;
    margin-top: 0.5rem;
}

.questionBox .quizCompleted {
    width: 100%;
    padding: 1rem;
    text-align: center;
}

.questionBox .quizCompleted > .icon {
    color: #FF5252;
    font-size: 5rem;
}

.questionBox .quizCompleted > .icon .is-active {
    color: #00E676;
}

.questionBox .questionContainer {
    white-space: normal;
    width: 100%;
}

.questionBox .questionContainer .optionContainer {
    margin-top: 12px;
    flex-grow: 1;
}

.questionBox .questionContainer .optionContainer .option {
    border-radius: 290486px;
    padding: 9px 18px;
    margin: 0 18px;
    margin-bottom: 12px;
    transition: 0.3s;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.85);
    border: transparent 1px solid;
}

.questionBox .questionContainer .optionContainer .option:hover {
    background-color: rgba(0, 0, 0, 0.15);
}

.questionBox .questionContainer .questionFooter {
    background: rgba(0, 0, 0, 0.025);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    align-self: flex-end;
}

.questionBox .questionContainer .questionFooter .pagination {
    margin: 30px 25px;
}

.pagination {
    display: flex;
    justify-content: flex-end;
}

.button {
    padding: 0.5rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 5rem;
    margin: 0 10px;
    transition: 0.3s;
}

.button:hover {
    cursor: pointer;
    background: #0a2ffe;
    color: white;
    border-color: transparent;
}
</style>