<template>
    <div v-show="show" class="alert red">
        <div class="alert__header">
            <span class="alert__header">Notification</span>
            <span class="close" @click="close"><i class="fa-solid fa-xmark"></i></span>
        </div>
        <div class="alert__body">
            {{ text }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            show: true
        }
    },
    methods: {
        close() {
            this.show = false;
        }
    }
}
</script>
<style scoped>
.alert {
    animation-name: enterAlert;
    animation-duration: 5s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
    width: 90%;
    max-width: 300px;
    height: 100px;
    padding: 10px 20px;
    position: fixed;
    bottom: 10px;
    right: 20px;
    color: white;
    box-shadow: 0 0 5px #4c4c4c;
    border-radius: 5px;
}

.alert.red {
    background-color: #f44336;
}

.alert__header {
    font-weight: bold;
}

.alert__header .close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
}

.alert__body {
    margin-top: 20px;
    margin-bottom: 20px;
}

@keyframes enterAlert {
    0% {
        transform: translateX(-50%);
    }
    10% {
        transform: translateX(0);
        opacity: 1;
    }
    90% {
        transform: translateX(0);
        opacity: .65;
    }
    100% {
        transform: translateX(-50%);
        opacity: 0;
    }
}
</style>