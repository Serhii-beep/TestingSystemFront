<template>
    <test-sets :testSets="testSets"></test-sets>
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
            id: 0,
            testSets: []
        }
    },
    created() {
        this.id = this.$route.params.id;
    },
    async beforeRouteUpdate(to) {
        this.id = to.params.id;
    },
    watch: {
        id(newId) {
            this.id = newId;
            axios.get(`https://localhost:44310/api/TestSets/getByLevel/${this.id}`).then(response => {
                this.testSets = response.data.entity;
            });
        }
    }
}
</script>
<style scoped>

</style>