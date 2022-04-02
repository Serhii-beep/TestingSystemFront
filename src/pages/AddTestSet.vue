<template>
    <div class="testbox">
        <div class="form">
            <h1>Adding test set</h1>
            <h4>Category<span>*</span></h4>
            <select v-model="selectedCategory">
                <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                >{{ category.name }}</option>
            </select>
            <h4>Level<span>*</span></h4>
            <select v-model="selectedLevel">
                <option
                    v-for="level in levels"
                    :key="level.id"
                    :value="level.id"
                >{{ level.difficultyLevel }}</option>
            </select>
            <h4>Test set description</h4>
            <textarea v-model="description" rows="10"></textarea>
            <div class="btn-block">
                <button @click="addTestSet">Add<i class="fa-solid fa-plus add"></i></button>
            </div>
        </div>
    </div>
    <notification v-if="showMsg" :text="message" :color="color"></notification>
</template>
<script>
import axios from 'axios'
import Notification from '@/components/Notification'
export default {
    components: {
        Notification
    },
    data() {
        return {
            categories: [],
            levels: [],
            selectedCategory: 0,
            selectedLevel: 0,
            description: '',
            message: '',
            showMsg: false,
            color: 'red'
        }
    },
    methods: {
        addTestSet() {
            this.showMsg = false;
            if(this.selectedCategory == '') {
                this.notify("Select category");
                return;
            }
            if(this.selectedLevel == '') {
                this.notify("Select level");
                return;
            }
            axios.post('https://localhost:44310/api/TestSets/post', {
                testCategoryId: this.selectedCategory,
                testLevelId: this.selectedLevel,
                description: this.description
            }, {
                headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
            }).then(() => {
                this.$router.push({path: '/allTests'});
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
        }
    },
    mounted() {
        axios.get('https://localhost:44310/api/TestCategories/getAll').then(resp => this.categories = resp.data.entity);
        axios.get('https://localhost:44310/api/TestLevels/getAll').then(resp => this.levels = resp.data.entity);
    }
}
</script>
<style scoped>
div, select {
    padding: 0;
    margin: 0;
    outline: none;
    font-size: 14px;
    color: #666;
    line-height: 22px;
}

h1, h4 {
    margin: 20px 0 4px;
    font-weight: 400;
}

span {
    color: red;
}

.testbox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    padding: 3px;
}

.form {
    width: 50%;
    height: 70%;
    padding: 20px;
    background: rgb(255, 255, 255);
    box-shadow: 0 2px 5px #ccc;
    margin-left: 240px;
}

select {
    padding: 7px 0;
    border-radius: 3px;
    border: 1px solid #ccc;
    background: transparent;
    width: 100%;
}

option {
    background: #fff;
}

textarea {
    width: calc(100% - 6px);
    resize: none;
    padding: 7px;
    font-size: 16px;
}

.btn-block {
    margin-top: 20px;
    text-align: center;
}

button {
    width: 150px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #095484;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
}

button:hover {
    background-color: #0666a3;

}

textarea:hover, select:hover {
    outline: none;
    border: 1px solid #095484;
    background: #e6eef7;
}

select:hover {
    cursor: pointer;
}

.add {
    margin-left: 7px;
}
</style>