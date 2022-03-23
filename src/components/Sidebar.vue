<template>
    <aside v-show="userLogined" class="sidebar">
        <div id="leftside-navigation" class="nano">
            <ul class="nano-content">
                <li>
                    <router-link to="/allTests" class="a"><span>All tests</span></router-link>
                </li>
                <li class="sub-menu">
                    <a href="#" class="a"><span>Categories</span></a>
                    <ul>
                        <li v-for="category in categories" :key="category.id">
                          <router-link :to="{name: 'TestsByCategory', params: {id: category.id}}" class="a">{{ category.name }}</router-link>
                        </li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="#" class="a"><span>Levels</span></a>
                    <ul>
                        <li v-for="level in levels" :key="level.id">
                            <router-link :to="{name: 'TestsByLevel', params: {id: level.id}}" class="a">{{ level.difficultyLevel }}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
              <p class="user">
              <label class="username">{{ this.username }}</label>
              <button class="logout" @click="logout">Logout</button>
            </p>
        </div>
    </aside>
</template>
<script>
import $ from 'jquery';
import axios from 'axios';
export default {
    name: 'sidebar',
    data() {
        return {
            categories: [],
            levels: [],
            userLogined: false,
            username: ''
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
      }
    },
    mounted() {
        if(localStorage.getItem('username') != null) {
          this.userLogined = true;
          this.username = localStorage.getItem("username")
        }
        $("#leftside-navigation .sub-menu > a").on("click", function (e) {
            $("#leftside-navigation ul ul").slideUp(),
            $(this).next().is(":visible") || $(this).next().slideDown(),
            e.stopPropagation();
        });
        axios.get('https://localhost:44310/api/TestCategories/getAll').then(response => {
            this.categories = response.data.entity;
        });
        axios.get('https://localhost:44310/api/TestLevels/getAll').then(response => {
            this.levels = response.data.entity;
        });
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
</style>