<template>
    <div class="load">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
    </div>
</template>
<script>
export default {
    name: 'loading-bar'
}
</script>
<style scoped>
.line {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 7px;
    border-radius: 15px;
    background-color: #4b9cdb;
}

.line:nth-last-child {
    margin-right: 0;
}

.load .line:nth-last-child(1) {
    animation: loading 1.5s 1s infinite; 
}

.load .line:nth-last-child(2) {
    animation: loading 1.5s 0.5s infinite;
}

.load .line:nth-last-child(3) {
    animation: loading 1.5s 0s infinite;
}

@keyframes loading {
    0% {
        height: 15px;
    }

    50% {
        height: 35px;
    }
    
    100% {
        height: 15px;
    }
}
</style>