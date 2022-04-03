<template>
    <TransitionGroup tag="div" name="fade" class="cardWrapper">
        <div class="cardContainer inactive" 
            v-for="testSet in testSetsCombined" 
            :key="testSet.id" 
            @click="testSetClick(testSet.id)"
        >
            <div class="card">
                <div class="side front">
                    <div class="info">
                        <h2>{{ testSet.category }}</h2>
                        <p class="level">Level: {{ testSet.level }}</p>
                        <p class="description">{{ testSet.description }}</p>
                    </div>
                    <div v-show="role=='admin'" @click.stop class="toolsContainer">
                        <ul class="tools">
                            <li @click="updateTestSet(testSet.id)"><i class="fa-solid fa-pen-to-square"></i></li> | 
                            <li @click="deleteTestSet(testSet.id)"><i class="fa-solid fa-trash-can"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="role=='admin'" class="cardContainer inactive" @click="addTestSet" :key="'addTestSet'">
            <div class="card center">
                <i class="fa-solid fa-plus vert"></i>
            </div>
        </div>
    </TransitionGroup>
</template>
<script>
import axios from 'axios'
export default {
    name: 'testsets',
    props: {
        testSets: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            testSetsCombined: [],
            role: ''
        }
    },
    methods: {
        testSetClick(id) {
            this.$router.push({name: 'Tests', params: {testSetId: id}});
        },
        addTestSet() {
            this.$router.push({path: '/addTestSet'});
        },
        updateTestSet(id) {
            this.$router.push({name: 'UpdateTestSet', params: { testSetId: id }});
        },
        deleteTestSet(id) {
            axios.delete(`https://localhost:44310/api/TestSets/delete/${id}`, {
                headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
            })
                .then(() => {
                    this.testSetsCombined = this.testSetsCombined.filter(test => test.id != id);
                });
                
        }
    },
    mounted() {
        this.role = localStorage.getItem('role');
    },
    watch: {
        async testSets(newValue) {
            this.testSetsCombined = await Promise.all(newValue.map(async function(el) {
                const newEl = new Object();
                newEl.id = el.id;
                newEl.description = el.description;
                const cat = await axios.get(`https://localhost:44310/api/TestCategories/getById/${el.testCategoryId}`);
                const lev = await axios.get(`https://localhost:44310/api/TestLevels/getById/${el.testLevelId}`);
                newEl.category = cat.data.entity.name;
                newEl.level = lev.data.entity.difficultyLevel;
                return newEl;
            }));
        }
    }
}
</script>
<style scoped>
@-webkit-keyframes Border {
    0% { border-color: #258039 }
    33% { border-color: #F5BE41; }
    67% { border-color: #31A9B8; }
    100% { border-radius: #CF3721; }
}

@keyframes Border {
    0% { border-color: #258039 }
    33% { border-color: #F5BE41; }
    67% { border-color: #31A9B8; }
    100% { border-radius: #CF3721; }
}

@-webkit-keyframes BorderAdd {
    0% { border-color: #1b1db9 }
    33% { border-color: #d326b6; }
    67% { border-color: #bad619; }
    100% { border-radius: #c20f62; }
}

@keyframes BorderAdd {
    0% { border-color: #1b1db9 }
    33% { border-color: #d326b6; }
    67% { border-color: #bad619; }
    100% { border-radius: #c20f62; }
}

.cardWrapper {
    position: relative;
    display: flex;
    left: 221px;
    width: calc(100% - 240px);
    min-height: 450px;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

h2, p {
    margin: 0;
    padding: 0;
}

h2 {
    font-family: "Oswald", sans-serif;
    text-transform: uppercase;
    color: #333333;
    font-size: 37px;
    font-weight: 500px;
    letter-spacing: -0.2px;
    margin-bottom: 10px;
    margin-top: 10px;
}

p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: #555;
    line-height: 22px;
}

.cardContainer {
    position: relative;
    width: 240px;
    height: 450px;
    min-width: 300px;
    min-height: 400px;
    margin: 4px;
    perspective: 1000px;
}

.card {
    display: inline-block;
    border: 4px solid;
    width: 100%;
    height: 100%;
    -webkit-animation: Border 5s infinite alternate;
    animation: Border 5s infinite alternate;
    cursor: pointer;
    overflow-wrap: break-word;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translateZ(-100px);
    transform: translateZ(-100px);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.info::-webkit-scrollbar {
    display: none;
}

.card:after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 14px 50px -4px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1.4);
}

.card:hover {
    -webkit-transform: translateZ(0px);
    transform: translateZ(0px);
}

.card:hover:after {
    opacity: 1;
}

.card:hover:last-child::after {
    opacity: 0;
}

.card .side {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: rgb(250, 250, 250);
}

.card .front {
    z-index: 2;
}

.front {
    background-color: #dadce2;
    background-position: center;
    background-size: cover;
    border-radius: 5px 5px 0 0;
    width: 100%;
    height: 350px;
}

.info {
    text-align: center;
    overflow-y: scroll;
    height: 88%;
}

.level {
    margin-bottom: 7px;
    font-size: 20px;
}

.description {
    font-size: 17px;
    margin-left: 9px;
    margin-right: 9px;
    margin-top: 40px;
}

.center {
    text-align: center;
    font-size: 60px;
    overflow-x: hidden;
    -webkit-animation: BorderAdd 5s infinite alternate;
    animation: BorderAdd 5s infinite alternate;
}

.vert {
    position: relative;
    top: calc(50% - 45px);
    border: 5px solid black;
    border-radius: 15px;
    padding: 7px;
}

.toolsContainer {
    height: 8%;
    margin: 13px 25px;
    border: 2px solid #555;
    border-radius: 13px;
    transition: 0.5s ease;
}

.toolsContainer:hover {
    transform: scale(1.1);
}

.tools {
    display: flex;
    height: 100%;
    flex-direction: row;
    list-style: none;
    align-items: center;
    justify-content: center;
}

.tools li {
    margin: auto 9px;
    color: #555;
    font-size: 18px;
    transition: .15s ease;
}

.tools li:hover {
    color: #1abc9c;
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