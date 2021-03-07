<template>
  <div class="floating-btn" :style="position">
    <el-button v-waves circle type="primary" :icon="icon" />
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'
export default {
  name: 'FloatingBtn',
  directives: {
    waves
  },
  props: {
    position: {
      type: Object,
      default: function() {
        return { right: 0, top: '15%' }
      }
    },
    icon: {
      type: String,
      default: 'el-icon-plus'
    }
  }
}
</script>

<style>
.floating-btn {
  position: fixed;
}
.floating-btn .el-button {
  width: 56px;
  height: 56px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
}
.floating-btn .el-button:hover {
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.15);
}
.floating-btn i {
  font-size: 24px;
}
</style>
