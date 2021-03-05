<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="tabs" @tab-click="tabClick">
      <el-tab-pane label="background image" name="first">
        <el-image
          v-for="url in urls"
          :key="url"

          :src="url"
          lazy
          fit="cover"
          :preview-src-list="urls"
          style="width: 200px; height: 200px; margin: 0 10px"
        >
          <div
            slot="placeholder"
            v-loading="true"
            class="image-slot"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          />
        </el-image>
      </el-tab-pane>
      <el-tab-pane ref="articleHeaderImage" label="article header image" lazy name="second">
        <el-image
          v-for="url in urls"
          :key="url"

          :src="url"
          lazy
          fit="cover"
          :preview-src-list="urls"
          style="width: 200px; height: 200px; margin: 0 10px"
        >
          <div
            slot="placeholder"
            v-loading="true"
            class="image-slot"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          />
        </el-image>
      </el-tab-pane>
      <el-tab-pane label="article content image" lazy name="third">角色管理</el-tab-pane>
      <el-tab-pane label="avatar" lazy name="fourth">角色管理</el-tab-pane>
      <el-tab-pane label="others" lazy name="five">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-upload
      class="avatar-uploader"
      action="http://localhost:9528/api/album/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :headers="uploadHeader"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      activeName: 'first',
      imageUrl: '',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
    }
  },
  computed: {
    uploadHeader() {
      return { token: getToken() }
    }
  },
  methods: {
    tabClick(tab) {
      console.log(tab.name)
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isImg = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImg) {
        this.$message.error('the file must be a pictrue!')
      }
      if (!isLt2M) {
        this.$message.error('the file size must be less then 2M!')
      }
      return isImg && isLt2M
    }
  }
}
</script>

<style lang="scss">
.image-slot {
  height: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 278px;
  height: 178px;
  display: block;
}
</style>
