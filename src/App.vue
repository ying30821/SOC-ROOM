<template>
<div>
  <el-container>
    <el-aside width="64px">
      <SideBar/>
    </el-aside>
    <el-container>
      <el-header class="p-0">
        <NavBar/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script setup>
import SideBar from './components/SideBar.vue'
import NavBar from './components/NavBar.vue'
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 10;
}
aside {
  position: sticky;
  top: 0;
  height: 100vh;
}

</style>
