<template>
  <el-dialog
    :model-value="isVisible"
    @close="handleCloseModal"
    width="50vw"
  >
    <template #header>
      <h2 class="text-center">
        Investigate Action<br>
        {{ actionDetail.title }}
      </h2>
    </template>
    <div class="flex justify-between mb-4">
      <p>
        Duration:<span class="text-medium ml-1">{{ actionDetail.duration }} minutes</span>
      </p>
      <p>
        Score:<span class="text-medium ml-1">{{ actionDetail.score }} pts</span>
      </p>
    </div>
    <div class="text-center mb-4">
      <el-tag :disable-transitions="true" round size="small">
        <p class="tag">{{ actionDetail.tags }}</p>
      </el-tag>
    </div>
    <p class="mb-4">{{ actionDetail.depiction }}</p>
    <p class="mb-4">Related dashboard: Web Access</p>
    <p class="text-gray text-xs">Notice: There may be more than one answer. You can submit any of it.</p>
    <el-divider/>
    <el-form
      :model="formData"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Login Time">
            <p class="text-xs text-gray mb-4">success login time</p>
            <el-date-picker
              v-model="formData.loginTime"
              type="datetime"
              placeholder="Select date and time"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Attacker IP">
            <p class="text-xs text-gray mb-4">source ip address</p>
            <el-input v-model="formData.ip" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Username">
            <p class="text-xs text-gray mb-4">login username</p>
            <el-input v-model="formData.userName" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCloseModal" type="primary">
          Submit
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  isVisible: Boolean,
  actionDetail: Object,
})
const emit = defineEmits(['update:isVisible'])

const formData = reactive({
  loginTime: null,
  ip: null,
  userName: null,
})

const handleCloseModal = () => {
  emit('update:isVisible', false)
}
</script>

<style lang="scss" scoped>
.el-form {
  &:deep(.el-date-editor) {
    width: 100%;
  }
  &:deep(.el-input__wrapper) {
    display: flex;
  }
}
.text-medium {
  font-weight: 500;
}
.tag {
  position: relative;
  padding-left: 12px;
  font-size: 14px;
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: #409EFF;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
}
</style>