<template>
  <sidebar :key="componentKey"></sidebar>
  <router-view @updateSidebar="updateSidebar"></router-view>
</template>
<script>
import Sidebar from '@/components/Sidebar'
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      componentKey: 0
    }
  },
  methods: {
    updateSidebar() {
      this.componentKey += 1;
    }
  }
}
</script>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
    min-height: 100% !important;
  }

  #app {
    height: 100%;
  }
</style>
