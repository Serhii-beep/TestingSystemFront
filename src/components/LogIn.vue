<template>
    <video id="smokeScreen" autoplay loop muted>
        <source src="../videos/space.mp4" type="video/mp4">
    </video>
    <div class="login">
        <h2 @click="register=!register"
            :class="{'active': !register, 'nonactive': register}"
        > sign in </h2>
        <h2 @click="register=!register"
            :class="{'active': register, 'nonactive': !register}"
        > sign up </h2>
        <div class="form" v-if="register===false">
            <input type="text" class="text" name="username" v-model="username" autocomplete="off">
            <span>username</span>
            <br>
            <br>
            <input type="password" class="text" name="password" v-model="password" autocomplete="off">
            <span>password</span>
            <br>
            <button class="signin" @click="login">Sign In</button>
        </div>
        <div class="form" v-else>
            <input type="text" class="text" name="username" v-model="username" autocomplete="off">
            <span>username</span>
            <br>
            <br>
            <input type="password" class="text" name="password" v-model="password" autocomplete="off">
            <span>password</span>
            <br>
            <br>
            <input type="password" class="text" name="confirmPassword" v-model="confirmPassword" autocomplete="off">
            <span>confirm password</span>
            <br>
            <button class="signin" @click="signup">Register</button>
        </div>
        <p class="error">{{ error }}</p>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            register: false,
            username: '',
            password: '',
            confirmPassword: '',
            error: ''
        }
    },
    methods: {
        login() {
            axios.post(`https://localhost:44310/api/Account/jwttoken?username=${this.username}&password=${this.password}`)
                .then(response => {
                    localStorage.userToken = response.data.token;
                    localStorage.username = response.data.username;
                    localStorage.role = response.data.role;
                    this.$emit('updateSidebar');
                    this.$router.push({path: '/allTests'});
                })
                .catch(error => {
                    this.error = error.response.data.errors[0];
                    return;
                }
            );
        },
        signup() {
            if(this.password != this.confirmPassword) {
                this.error = "Passwords are not the same";
                return;
            }
            axios.post(`https://localhost:44310/api/Account/register?username=${this.username}&password=${this.password}&role=user`)
                .then(response => {
                    this.login();
                })
                .catch(error => {
                    this.error = error.response.data.errors[0];
                    return;
                });
        }
    },
    mounted() {
        if(localStorage.getItem('userToken') != null) {
            this.$router.push({path: '/allTests'});
        }
        document.querySelector('video').playbackRate = 0.8;
    }
}
</script>
<style scoped>
.signin {
    background-color: #d3d3d3;
    color: #fff;
    font-size: 14px;
    letter-spacing: 1px;
}

.login {
    position: relative;
    height: 660px;
    width: 505px;
    margin: auto;
    top: 50px;
    padding: 60px 60px;
    border-radius: 30px;
    background: transparent;
    background-size: cover;
}

.form {
    padding-top: 80px;
    margin-top: 50px;
}

.active {
    border-bottom: 2px solid #1161ed;
    color: #fff;
}

h2:hover {
    cursor: pointer;
}

.nonactive {
    color: rgba(255, 255, 255, 0.2);
}

.active, .nonactive {
    transition: .5s ease;
}

h2 {
    padding-left: 12px;
    font-size: 22px;
    text-transform: uppercase;
    padding-bottom: 5px;
    letter-spacing: 2px;
    display: inline-block;
    font-weight: 100;
}

h2:first-child {
    padding-left: 0px;
}

span {
    text-transform: uppercase;
    font-size: 12px;
    opacity: 0.4;
    display: inline-block;
    position: relative;
    top: -65px;
    transition: all 0.5s ease-in-out;
}

#smokeScreen {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
}

.text {
    border: none;
    padding: 10px 20px;
    width: 100%;
    display: block;
    height: 40px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0);
    overflow: hidden;
    margin-top: 15px;
    transition: all 0.5s ease-in-out;
}

.text:focus {
    outline: 0;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    background: rgba(0, 0, 0, 0);
}

.text:focus + span {
    opacity: 0.6;
}

input[type="text"],
input[type="password"] {
    color: #1161ed;
}

input {
    display: inline-block;
    padding-top: 20px;
    font-size: 14px;
}

h2, span {
    margin-left: 20px;
}

span {
    color: #fff;
}

.signin {
    background-color: #1161ed;
    color: #FFF;
    width: 100%;
    padding: 10px 20px;
    display: block;
    height: 39px;
    border-radius: 20px;
    margin-top: 30px;
    transition: all 0.5s ease-in-out;
    border: none;
    text-transform: uppercase;
}

.signin:hover {
    background: #4082f5;
    box-shadow: 0px 4px 35px -5px #4082f5;
    cursor: pointer;
}

.signin:focus {
    outline: none;
}

hr {
    border: 1px solid rgba(255, 255, 255, 0.1);
    top: 85px;
    position: relative;
}

.error {
    color: red;
    font-size: 18px;
    margin-top: 35px;
    text-align: center;
}
</style>