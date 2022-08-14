<template>
  <el-row :gutter="36">
    <el-col :xs="24" :sm="12">
      <h2 class="text-center mb-6">ACTION TIMELINE</h2>
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in actionsData"
          :key="index"
          :timestamp="item.timestamp"
          :color="actionStatusMap.get(item.actionStatus)?.color"
          :icon="actionStatusMap.get(item.actionStatus)?.icon"
          placement="bottom"
        >
          <div v-if="item.actionStatus === 'Done'" class="dialogue dialogue-success">
            <h3>{{ item.title }}</h3>
          </div>
          <div v-else class="dialogue">
            <h3
              :class="[item.actionStatus === 'Processing' ? 'border-bottom-danger' : 'border-bottom-warning']"
              class="border-bottom pb-2 mb-2"
            >
              {{ item.title }}
            </h3>
            <div class="flex justify-between mb-2">
              <p>{{ item.duration }} minutes</p>
              <p>Score: {{ item.score }}</p>
            </div>
            <el-button
              @click="handleOpenModel(index)"
              class="dialogue-btn stretched-link"
              type="info"
              link
            >
              Read More
            </el-button>
          </div>
        </el-timeline-item>
      </el-timeline>
      <ActionSaveModel
        v-if="isVisibleSaveModal"
        v-model:isVisible="isVisibleSaveModal"
        :actionDetail="actionDetail"
      />
    </el-col>
    <el-col :xs="24" :sm="12">
      <section class="ticket-container">
        <h3 class="mb-2">Tickets</h3>
        <el-tabs v-model="activeTab">
          <el-tab-pane
            v-for="(item, index) in tabLists"
            :key="index"
            :label="item.name"
            :name="item.name">
            <template #label>
              <span class="mr-2">{{ item.name }}</span>
              <el-tag
                :type="item.name === activeTab ? null : 'info'"
                :disable-transitions="true"
                round
              >
                {{ item.count }}
              </el-tag>
            </template>
          </el-tab-pane>
        </el-tabs>
      <ul>
        <li v-for="(item, index) in ticketLists" :key="index" class="ticket-item">
          <el-row align="middle">
            <el-col :xs="10" :sm="8" :md="6">
              <el-tag
                :color="ticketStatusMap.get(item.ticketStatus)?.color"
                :disable-transitions="true"
                class="ticket-tag"
              >
                {{ item.ticketStatus }}
              </el-tag>
            </el-col>
            <el-col :xs="14" :sm="16" :md="18">
              <h4>{{ item.title }}</h4>
            </el-col>
          </el-row>
        </li>
      </ul>
      </section>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Check, Search, Clock } from '@element-plus/icons-vue'
import ActionSaveModel from './ActionSaveModel.vue'
import { actionsData as  fakeActionsData } from  '/@/assets/fakeData/actionMgmt'

const isVisibleSaveModal = ref(false)
const actionDetail = ref({})
const activeTab = ref('All')
const tabLists = [
  { name: 'All', count: 8 },
  { name: 'Queued', count: 5 },
  { name: 'Resolved', count: 2 },
  { name: 'Rejected', count: 1 },
]
const actionsData = reactive(fakeActionsData)
const actionStatusMap = new Map([
  ['Done', { icon: Check, color: '#22C55E' }],
  ['Processing', { icon: Search, color: '#DC2626' }],
  ['Unstart', { icon: Clock, color: '#FACC15' }],
])
const ticketStatusMap = new Map([
  ['Pending', { color: '#0284C7' }],
  ['Processing', { color: '#FACC15' }],
  ['Rejected', { color: '#DC2626' }],
  ['Resolved', { color: '#22C55E' }],
])

const ticketLists = computed(() => {
  if (activeTab.value === 'All') {
    return [...actionsData]
  }
  if (activeTab.value === 'Queued') {
    return actionsData.filter(item => item.ticketStatus === 'Pending' || item.ticketStatus === 'Processing')
  }
  return actionsData.filter(item => item.ticketStatus === activeTab.value)
})

const handleOpenModel = (index) => {
  isVisibleSaveModal.value = true
  actionDetail.value = {...actionsData[index]}
}
</script>

<style lang="scss" scoped>
.el-timeline-item {
  &:deep(.el-timeline-item__wrapper) {
    padding-left: 72px;
  }
  &:deep(.el-timeline-item__tail) {
    left: 16px;
  }
  &:deep(.el-timeline-item__node--normal) {
    width: 36px;
    height: 36px;
  }
  &:deep(.el-icon) {
    font-size: 20px;
  }
}
.dialogue {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgb(202, 201, 201);
  position: relative;
  padding: 12px;
  &::before {
    content: "";
    position: absolute;
    left: -8px;
    border-top: 8px solid transparent;
    border-right: 8px solid #fff;
    border-bottom: 8px solid transparent;
  }
  &-success {
    background-color: $success;
    color: #fff;
    &::before {
      border-right: 8px solid $success;
    }
  }
  &-btn {
    display: block;
    font-size: 12px;
    margin-left: auto;
  }
}
.border-bottom {
  border-bottom:  2px solid #000;
  &-danger {
    border-color: $danger;
  }
  &-warning {
    border-color: $warning;
  }
}
.stretched-link::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    content: "";
}
.ticket {
  &-container {
    background-color: #fff;
    box-shadow: 0 0 10px rgb(202, 201, 201);
    border-radius: 8px;
    padding: 16px;
  }
  &-item {
    padding: 16px;
    border-bottom: 1px solid #DCDFE6;
    &:last-child {
      border-bottom: 0;
    }
    &:hover {
      background-color: #E0F2FE;
    }
  }
  &-tag {
    color: #fff;
    border: 0;
    // width: 15%;
    margin-right: 20px;
  }
}
</style>