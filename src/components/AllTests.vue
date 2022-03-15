<template>
    <test-sets :testSets="allTestSets"></test-sets>
</template>
<script>
import TestSets from '@/components/TestSets'
import axios from 'axios'
export default {
    components: {
        TestSets
    },
    data() {
        return {
            allTestSets: []
        }
    },
    mounted() {
        axios.get('https://localhost:44310/api/TestSets/getAll').then(response => {
            this.allTestSets = response.data.entity;
        });
    }
}
</script>
<style scoped>

</style>