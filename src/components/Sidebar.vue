<template>
    <aside v-show="userLogined" class="sidebar">
        <div id="leftside-navigation" class="nano">
            <ul class="nano-content">
                <li>
                    <router-link to="/allTests" class="a"><span>All tests</span></router-link>
                </li>
                <li class="sub-menu">
                    <a href="#" class="a"><span>Categories</span></a>
                    <TransitionGroup tag="ul" name="fade">
                        <li v-for="category in categories" :key="category.id" class="inputContainer">
                          <router-link :to="{name: 'TestsByCategory', params: {id: category.id}}" class="a">{{ category.name }}</router-link>
                          <a v-show="role=='admin'" @click="deleteCategory(category.id)" class="a delete"><i class="fa-solid fa-trash-can"></i></a>
                        </li>
                        <li v-show="role=='admin'" class="inputContainer" :key="'inputContainerCategory'">
                          <input v-model="newCategory" type="text" class="sidebarInput" placeholder="Add category">
                          <a href="#" class="a add" @click="addCategory"><i class="fa-solid fa-plus"></i></a>
                        </li>
                    </TransitionGroup>
                </li>
                <li class="sub-menu">
                    <a href="#" class="a"><span>Levels</span></a>
                    <TransitionGroup tag="ul" name="fade">
                        <li v-for="level in levels" :key="level.id" class="inputContainer">
                            <router-link :to="{name: 'TestsByLevel', params: {id: level.id}}" class="a">{{ level.difficultyLevel }}</router-link>
                            <a v-show="role=='admin'" @click="deleteLevel(level.id)" class="a delete"><i class="fa-solid fa-trash-can"></i></a>
                        </li> 
                          <li v-show="role=='admin'" class="inputContainer" :key="'inputContainerLevels'">
                          <input v-model="newLevel" type="text" class="sidebarInput" placeholder="Add level">
                          <a href="#" class="a add" @click="addLevel"><i class="fa-solid fa-plus"></i></a>
                        </li>
                    </TransitionGroup>
                </li>
            </ul>
              <p class="user">
              <label class="username">{{ this.username }}</label>
              <button class="logout" @click="logout">Logout</button>
            </p>
        </div>
    </aside>
    <notification style="z-index: 1000" v-if="showMsg" :text="message" :color="color"></notification>
</template>
<script>
import $ from 'jquery';
import axios from 'axios';
import Notification from '@/components/Notification'
export default {
    components: {
      Notification
    },
    name: 'sidebar',
    data() {
        return {
            categories: [],
            levels: [],
            userLogined: false,
            username: '',
            newCategory: '',
            newLevel: '',
            message: '',
            showMsg: false,
            color: '',
            role: ''
        }
    },
    methods: {
      logout() {
        this.clearStorage();
        this.userLogined = false;
        this.$router.push({path: '/'});
      },
      clearStorage() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
      },
      addCategory() {
        this.showMsg = false;
        if(this.newCategory == '') {
          this.color = "red";
          this.notify("Please enter the name of new category");
          return;
        }
        axios.post('https://localhost:44310/api/TestCategories/post', {
          name: this.newCategory
          }, 
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        }).then(() => {
          this.fetchCategories();
          this.color = "green";
          this.notify("New category added successfully");
          this.newCategory = '';
        }).catch(err => {
          this.color = "red";
          this.notify(err.response.data.errors[0]);
        });
      },
      deleteCategory(id) {
        this.showMsg = false;
        axios.delete(`https://localhost:44310/api/TestCategories/delete/${id}`, {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        })
          .then(() => {
            this.fetchCategories();
            this.color = "green";
            this.notify("Category deleted successfully");
          })
          .catch(err => {
            this.color = "red";
            this.notify(err.response.data.errors[0]);
        });
      },
      addLevel() {
        this.showMsg = false;
        if(this.newLevel == '') {
          this.color = 'red';
          this.notify("Please enter the name of new level");
          return;
        }
        axios.post('https://localhost:44310/api/TestLevels/post', {
          difficultyLevel: this.newLevel
        }, {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        }).then(() => {
          this.fetchLevels();
          this.color = "green";
          this.notify("New level added successfully");
          this.newLevel = '';
        }).catch(err => {
          this.color = "red";
          this.notify(err.response.data.errors[0]);
        })
      },
      deleteLevel(id) {
        this.showMsg = false;
        axios.delete(`https://localhost:44310/api/TestLevels/delete/${id}`, {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        })
          .then(() => {
            this.fetchLevels();
            this.color = "green";
            this.notify("Level deleted successfully");
          })
          .catch(err => {
            this.color = "red";
            this.notify(err.response.data.errors[0]);
        });
      },
      notify(msg) {
        this.message = msg;
        this.showMsg = true;
        setTimeout(() => this.showMsg = false, 5000);
      },
      fetchCategories() {
        axios.get('https://localhost:44310/api/TestCategories/getAll').then(response => {
          this.categories = response.data.entity;
        });
      },
      fetchLevels() {
        axios.get('https://localhost:44310/api/TestLevels/getAll').then(response => {
          this.levels = response.data.entity;
        });
      }
    },
    mounted() {
        if(localStorage.getItem('username') != null) {
          this.userLogined = true;
          this.username = localStorage.getItem("username");
          this.role = localStorage.getItem("role");
        }
        $("#leftside-navigation .sub-menu > a").on("click", function (e) {
            $("#leftside-navigation ul ul").slideUp(),
            $(this).next().is(":visible") || $(this).next().slideDown(),
            e.stopPropagation();
        });
        this.fetchCategories();
        this.fetchLevels();
    }
}
</script>
<style scoped>
@import url('//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css');
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  font-stretch: normal;
  src: url(https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0B4gaVc.ttf) format('truetype');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
  src: url(https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf) format('truetype');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-stretch: normal;
  src: url(https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf) format('truetype');
}

body {
  color: #5D5F63;
  background: #293949;
  font-family: 'Open Sans', sans-serif;
  padding: 0;
  margin: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

.sidebar-toggle {
  margin-left: -240px;
}

.sidebar {
  width: 240px;
  height: 100%;
  min-height: 100% !important;
  position: fixed;
  background: #293949;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  z-index: 100;
}

.sidebar #leftside-navigation ul,
.sidebar #leftside-navigation ul ul {
  margin: -2px 0 0;
  padding: 0;
}

.sidebar #leftside-navigation ul li {
  list-style-type: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar #leftside-navigation ul li.active > a {
  color: #1abc9c;
}

.sidebar #leftside-navigation ul li.active ul {
  display: block;
}

.a {
  color: #aeb2b7;
  text-decoration: none;
  display: block;
  padding: 18px 0 18px 25px;
  font-size: 17px;
  outline: 0;
  -webkit-transition: all 200ms ease-in;
  -moz-transition: all 200ms ease-in;
  -o-transition: all 200ms ease-in;
  -ms-transition: all 200ms ease-in;
  transition: all 200ms ease-in;
}

.a:hover {
  color: #1abc9c;
}

.a span {
  display: inline-block;
}

.sidebar #leftside-navigation ul li a i {
  width: 20px;
}

.sidebar #leftside-navigation ul li a i .fa-angle-left,
.sidebar #leftside-navigation ul li a i .fa-angle-right {
  padding-top: 3px;
}

.sidebar #leftside-navigation ul ul {
  display: none;
}

.sidebar #leftside-navigation ul ul li {
  background: #23313f;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  border-bottom: none;
}

.sidebar #leftside-navigation ul ul li a {
  font-size: 13px;
  padding-top: 13px;
  padding-bottom: 13px;
  color: #aeb2b7;
}

.user {
  margin-top: auto;
  vertical-align: bottom;
}

.logout {
  margin-left: 100px;
  margin-bottom: 15px;
  height: 30px;
  width: 50px;
  background: #149279;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  transition: .5s ease;
  color: #aeb2b7;
}

.logout:hover {
  cursor: pointer;
  background: #0e6856;
}

.username {
  margin-left: 15px;
  color: #aeb2b7;
}

#leftside-navigation {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.inputContainer {
  display: flex;
}

.sidebarInput {
  height: 25px;
  color: #aeb2b7;
  font-size: 12px;
  margin-left: 25px;
  margin-bottom: 7px;
  max-width: 130px;
  background: transparent;
  outline: 0;
  border: none;
  border-bottom: 2px solid #aeb2b7;
  transition: .3s ease-in;
}

.sidebarInput:focus {
  border-bottom-color: #1abc9c;
}

.add {
  height: 25px;
  position: relative;
}

.fa-trash-can {
  transition: .15s ease-in;
}

.fa-trash-can:hover {
  cursor: pointer;
  color: #1abc9c;
}

.delete {
  height: 25px;
  position: relative;
  margin-left: auto;
  margin-right: 45px;
}



.fa-plus {
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 20px;
  transition: .15s ease-in;
}

.fa-plus:hover {
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
