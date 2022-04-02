<template>
    <loading-bar v-if="isLoading==true" class="load"></loading-bar>
    <test-sets v-else :testSets="allTestSets"></test-sets>
</template>
<script>
import TestSets from '@/components/TestSets'
import LoadingBar from '@/components/LoadingBar'
import axios from 'axios'
export default {
    components: {
        TestSets,
        LoadingBar
    },
    data() {
        return {
            allTestSets: [],
            isLoading: true
        }
    },
    mounted() {
        axios.get('https://localhost:44310/api/TestSets/getAll').then(response => {
            this.allTestSets = response.data.entity;
        });
        this.isLoading = false;
    }
}
</script>
<style scoped>
.load {
    align-self: center;
    margin-left: 850px;
}
</style>