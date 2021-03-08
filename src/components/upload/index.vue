<template>
  <div class="upload-wrapper">
    <div class="meta">
      <el-row :gutter="20">
        <el-col :span="span">
          <el-select v-model="upload.fileType" :disabled="fileTypeDisabled" size="small" class="type" placeholder="fileType(required)">
            <el-option
              v-for="type in fileTypes"
              :key="type"
              :label="type"
              :value="type"
            />
          </el-select>
        </el-col>
        <el-col v-if="isPicture" :span="span">
          <el-select v-model="upload.pictureType" :disabled="pictrueTypeDisabled" size="small" class="type" placeholder="pictrueType(required)">
            <el-option
              v-for="type in pictureTypes"
              :key="type"
              :label="type"
              :value="type"
            />
          </el-select>
        </el-col>
        <el-col :span="span">
          <el-input v-model="upload.name" size="small" placeholder="name" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-input
            v-model="upload.desc"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 2}"
            placeholder="desc"
          />
        </el-col>
      </el-row>
    </div>
    <el-button
      class="clear"
      type="warning"
      size="small"
      icon="el-icon-refresh-right"
      plain
      @click="$refs.upload.clearFiles()"
    >clear list</el-button>
    <el-upload
      ref="upload"
      class="upload-file"
      :action="baseUrl + '/album/uploadFile'"
      :data="upload"
      :on-preview="handleClip"
      :on-remove="handleRemove"
      :headers="uploadHeader"
      :list-type="listType"
      :before-upload="beforeUpload"
    >
      <el-button size="small" type="primary">upload</el-button>
      <div slot="tip" class="el-upload__tip tips">
        <p class="tip">The file size less then 1M</p>
        <p class="tip">Click the name of the uploaded file to copy to the clipboard</p>
      </div>
    </el-upload>
  </div>
</template>

<script>
import service from '@/utils/request'
import { getToken } from '@/utils/auth'
import { unlink } from '@/api/album'
import { fileTypes, pictureTypes, FileType } from './type'
import copy from '@/utils/copy'
export default {
  name: 'Upload',
  props: {
    fileType: {
      type: String,
      default: ''
    },
    pictrueType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileTypes,
      pictureTypes,
      fileList: [],
      upload: {
        fileType: '',
        pictrueType: '',
        url: ''
      },
      listType: 'picture',
      fileTypeDisabled: false,
      pictrueTypeDisabled: false,
      span: 8
    }
  },
  computed: {
    uploadHeader() {
      return { token: getToken() }
    },
    isPicture() {
      return this.upload.fileType === FileType.picture
    },
    baseUrl() {
      return service.defaults.baseURL
    }
  },
  watch: {
    'upload.fileType': {
      handler: 'fileTypeChange',
      immediate: true
    }
  },
  created() {
    if (this.fileType) {
      this.upload.fileType = this.fileType
      this.fileTypeDisabled = true
    }
    if (this.pictrueType) {
      this.upload.pictrueType = this.pictrueType
      this.pictrueTypeDisabled = true
    }
  },
  methods: {
    tabClick(tab) {
      console.log(tab.name)
    },
    async handleRemove(file) {
      if (file && file.response && file.response.data) {
        const { url } = file.response.data
        console.log(file)
        await unlink({ url })
        this.$message.success('unlink file success!')
      }
    },
    handleClip(file) {
      const { url } = file.response.data
      copy(url)
    },
    fileTypeChange() {
      if (this.upload.fileType !== FileType.picture) {
        this.listType = 'text'
        this.span = 12
      } else {
        this.listType = 'picture'
        this.span = 8
      }
    },
    beforeUpload(file) {
      const fileType = this.upload.fileType
      const pictureType = this.upload.pictureType

      if (fileType === FileType.picture && pictureType) {
        const isImage = file.type.startsWith('image/')
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isImage) this.$message.error('You need to upload a file in image format!')
        if (!isLt1M) this.$message.error('The size of the picture should be less than 1M!')
        return isImage && isLt1M
      } else if (fileType === FileType.css) {
        const isCSS = file.type.startsWith('text/css')
        if (!isCSS) this.$message.error('You need to upload a file in css format!')
        return isCSS
      } else if (fileType === FileType.audio) {
        const isAudio = file.type.startsWith('audio/')
        if (!isAudio) this.$message.error('You need to upload a file in audio format!')
        return isAudio
      } else if (fileType === FileType.video) {
        const isVideo = file.type.startsWith('video/')
        if (!isVideo) this.$message.error('You need to upload a file in video format!')
        return isVideo
      } else if (fileType === FileType.other) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-wrapper {
  position: relative;
  .el-row {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-select {
    width: 100%;
  }
  .meta {
    width: 100%;
    position: absolute;
    top: 0px;
  }
  .upload-file {
    padding-top: 120px;
  }
  .clear {
    position: absolute;
    top: 120px;
    left: 80px;
  }
  .tips {
    background: whitesmoke;
    padding: 0.5rem 1rem;
    .tip {
      margin-top: 0;
      margin-bottom: 8px;
    }
    .tip+.tip {
      margin-bottom: 0;
    }
  }
}
</style>

