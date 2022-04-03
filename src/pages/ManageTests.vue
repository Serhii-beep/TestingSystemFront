<template>
    <div class="content">
        <button class="btn addTest" @click="addTest">Add new test</button>
        <div class="testsContainer">
            <div class="test"
                v-for="test in tests"
                :key="test.id"
            >
                <div class="question"><label contenteditable="true">{{test.question.questionText}}</label>
                    <button class="btn" @click="deleteTest(test.id)">Delete test</button>
                </div>
                <TransitionGroup name="fade" tag="div" class="answers">
                    <div class="answerContainer"
                        v-for="answer in test.answers"
                        :key="answer.id"
                    >
                        <div class="answer ans" :class="{greenBorder: test.correctAnswerId==answer.id}" contenteditable="true">
                            {{answer.answerText}}
                        </div>
                        <div class="tools">
                            <button class="btn" @click="changeCorrectAnswer(test.id, answer.id)"><i class="fa-solid fa-check"></i></button>
                            <button class="btn" @click="deleteAnswer(test.id, answer.id)"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                </TransitionGroup>
                <div class="pointsContainer">
                    <label>Points: </label>
                    <div class="points" contenteditable="true" @keydown="checkPoints">
                        {{ test.question.points }}
                    </div>
                    <button class="btn end" @click="addAnswer(test.id)">Add answer</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            testSetId: 0,
            tests: []
        }
    },
    methods: {
        changeCorrectAnswer(testId, answerId) {
            for(let i = 0; i < this.tests.length; ++i) {
                if(this.tests[i].id == testId) {
                    this.tests[i].correctAnswerId = answerId;
                    break;
                }
            }
        },
        checkPoints(e) {
            if(e.which != 8 && e.which != 46 && e.which != 37 && e.which != 39 && (e.which < 48 || e.which > 57)) {
                e.preventDefault();
            }
        },
        addAnswer(testId) {
            for(let i = 0; i < this.tests.length; ++i) {
                if(this.tests[i].id == testId) {
                    this.tests[i].answers.push({
                        id: this.maxAnswerId(this.tests) + 1,
                        answerText: 'New answer',
                        testId: testId
                    });
                    break;
                }
            }
        },
        deleteAnswer(testId, answerId) {
            for(let i = 0; i < this.tests.length; ++i) {
                if(this.tests[i].id == testId) {
                    this.tests[i].answers = this.tests[i].answers.filter(ans => ans.id != answerId);
                    break;
                }
            }
        },
        addTest() {
            const testId = this.maxTestId(this.tests) + 1;
            const questionId = this.maxQuestionId(this.tests) + 1;
            const answerId = this.maxAnswerId(this.tests) + 1;
            this.tests.push({
                id: testId,
                testSetId: this.testSetId,
                correctAnswerId: answerId,
                question: {
                    id: questionId,
                    questionText: 'New question',
                    points: 1,
                    testId: testId
                },
                answers: []
            });
            this.addAnswer(testId);
            scrollTo(0, document.body.scrollHeight);
        },
        deleteTest(testId) {
            this.tests = this.tests.filter(t => t.id != testId);
        },
        maxTestId(array) {
            if(array.length == 0) return 1;
            let max = array[0].id;
            for(let i = 1; i < array.length; ++i) {
                if(array[i].id > max) {
                    max = array[i].id;
                }
            }
            return max;
        },
        maxAnswerId(array) {
            if(array.length == 0) return 1;
            if(array[0].answers.length == 0) return 1;
            let max = array[0].answers[0];
            for(let i = 0; i < array.length; ++i) {
                for(let j = 0; j < array[i].answers.length; ++j) {
                    if(array[i].answers[j].id > max) {
                        max = array[i].answers[j].id;
                    }
                }
            }
            return max;
        },
        maxQuestionId(array) {
            if(array.length == 0) return 1;
            let max = array[0].question.id;
            for(let i = 1; i < array.length; ++i) {
                if(array[i].question.id > max) {
                    max = array[i].question.id;
                }
            }
            return max;
        },
        fetchTests() {
            axios.get(`https://localhost:44310/api/Tests/getTests/${this.testSetId}`)
            .then(response => {
                this.tests = response.data.entity;
        })
        }
    },
    mounted() {
        this.testSetId = this.$route.params.testSetId;
        this.fetchTests();
    }
}
</script>
<style scoped>
.content {
    width: calc(100% - 240px);
    height: 100%;
    margin-left: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.btn {
    padding: 0.5rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 5rem;
    margin-right: 5px;
    transition: 0.3s;
}

.btn:hover {
    cursor: pointer;
    background: #0a2ffe;
    color: white;
    border-color: transparent;
}

.addTest {
    width: 150px;
    margin: 7px 0;
}

.testsContainer {
    width: 620px;
    background: #f0f0f0;
    border-radius: 0.5rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.test {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 7px;
    border-bottom: 2px solid black;
    border-bottom-style: dashed;
}

.answers {
    width: 100%;
}

.answerContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 4px;
    margin-left: 10px;
}

.answer {
    display: flex;
    border: 1px solid rgb(129, 129, 129);
    border-radius: 10px;
    width: 80%;
    align-items: center;
    justify-content: center;
    padding: 5px 7px;
    transition: .15s ease;
}

.ans:hover {
    transform: scale(1.05);
}

.question {
    display: flex;
    height: 40px;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 7px;
    align-items: center;
}

.greenBorder {
    border: 2px solid green;
}

.pointsContainer {
    display: flex;
    width: 100%;
}

.pointsContainer label {
    align-self: flex-start;
    margin-right: 3px;
}

.points {
    min-width: 10px;
}

.end {
    margin-left: auto;
}

label:hover {
    cursor:text;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>