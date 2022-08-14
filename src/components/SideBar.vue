<template>
  <el-menu
    :collapse="true"
    class="sidebar-container"
    default-active="1"
    background-color="#1E2A3B"
    text-color="#fff"
  >
    <el-menu-item
      v-for="(item, index) in navLists"
      :key="index"
      :index="String(index + 1)"
      @click="router.push(item.path)"
    >
      <span class="material-icons-outlined">{{ item.meta.icon }}</span>
      <template #title>{{ item.meta.title }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { reactive, onMounted} from 'vue'
import { routes } from '/@/router/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const navLists = reactive([])

onMounted(() => {
  navLists.splice(0)
  navLists.push(...routes)
})
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  border-right: 0px;
}
</style>