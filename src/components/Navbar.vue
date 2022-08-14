<template>
  <div class="navbar">
    <h1>SOC Room</h1>
    <div class="flex items-center">
      <p class="mr-3">admin</p>
      <el-button link>
        <span class="material-icons-outlined">notifications_active</span>
      </el-button>
      <el-button link>
        <span class="material-icons-outlined">login</span>
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 16px;
  margin: 0;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 10px rgb(202, 201, 201);
  padding: 16px;
}
</style>