<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="tabs" @tab-click="tabClick">
      <el-tab-pane
        v-for="type in pictureTypes"
        :key="type"
        :label="type"
        :name="type"
        class="pictures-container"
      >
        <div v-for="picture in pictures" :key="picture.id" :class="['picture-wrapper', isBigPicture ? 'w-b' : 'w-s']">
          <el-image
            :src="picture.url"
            lazy
            fit="cover"
            :preview-src-list="picturesPreview"
            class="picture"
          >
            <div
              slot="placeholder"
              v-loading="true"
              class="image-slot"
              element-loading-text="loading..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
            />
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
              <span>failed</span>
            </div>
          </el-image>
          <div class="meta">
            <p class="name">{{ picture.name || 'Unnamed' }}</p>
            <p v-if="isBigPicture" class="desc">{{ picture.desc || 'No description information' }}</p>
            <div class="controls">
              <p v-copy="picture.url" class="link">
                <span v-if="isBigPicture">link</span>
                <i class="el-icon-paperclip" />
              </p>
              <p class="link">
                <span v-if="isBigPicture">edit</span>
                <i class="el-icon-edit" />
              </p>
              <p class="link" @click="remove(picture.id, picture.url)">
                <span v-if="isBigPicture">remove</span>
                <i class="el-icon-delete" />
              </p>
            </div>

          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <floating-btn @click.native="dialogVisible = true" />
    <el-dialog title="upload" :visible.sync="dialogVisible">
      <upload file-type="picture" @uploaded="uploaded" />
    </el-dialog>
  </div>
</template>

<script>
import Upload from '@/components/upload'
import FloatingBtn from '@/components/FloatingBtn'
import { FileType, PictureType, pictureTypes } from '@/components/upload/type'
import { find, remove } from '@/api/album'
import copy from '@/directive/copy'
export default {
  components: {
    Upload,
    FloatingBtn
  },
  directives: {
    copy
  },
  data() {
    return {
      activeName: PictureType.backgroundPictrue,
      pictures: [],
      picturesPreview: [],
      dialogVisible: false,
      pictureType: PictureType.backgroundPictrue
    }
  },
  computed: {
    pictureTypes() {
      return pictureTypes
    },
    isBigPicture() {
      return this.pictureType === PictureType.backgroundPictrue ||
            this.pictureType === PictureType.articleHeadPicture ||
            this.pictureType === PictureType.articleContentPciture
    }
  },
  created() {
    this.getPicture()
  },
  methods: {
    tabClick(tab) {
      this.pictureType = tab.name
      this.getPicture()
    },
    async getPicture() {
      const { data } = await find(FileType.picture, this.pictureType)
      this.picturesPreview = data.map(item => item.url)
      this.pictures = data
    },
    async remove(id, url) {
      const { data } = await remove(FileType.picture, [{ id, url }])
      this.$message.success(JSON.stringify(data))
      this.getPicture()
    },
    uploaded() {
      this.getPicture()
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.pictures-container {
  display: flex;
  flex-wrap: wrap;
}
.picture-wrapper {
  position: relative;
  padding: 10px;
}
.picture {
  vertical-align: middle;
  width: 100%;
  height: 100%;
}

.image-slot {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  color: #ccc;
  font-size: 24px;
  span {
    font-size: 14px;
    padding: 2px;
  }
}
.w-s .meta {
  padding: 12px;
}
.meta {
  position: absolute;
  padding: 16px 24px;
  margin: 10px;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 1;
  color: white;
  background-color: rgba($color: #000000, $alpha: 0.5);
  transition: all 0.5s;
  p {
    margin-top: 0;
    margin-bottom: 12px;
    opacity: 0.85;
    transition: all 0.5;
    &:last-child {
      margin-bottom: 0;
    }
    &.link:hover {
      opacity: 1;
      color: $menuActiveText;
      cursor: pointer;
    }
  }
  .controls {
    display: flex;
    p {
      margin-bottom: 0;
      margin-right: 24px;
    }
  }
}
.picture-wrapper:hover .meta{
  opacity: 1;
}
.w-b {
  width: 100%;
  height: 300px;
}
.w-s {
  width: 50%;
  height: 200px;
}
@media (min-width: 576px) {
  .w-s {
    width: 200px;
  }
  .w-b {
    width: 100%;
  }
}
@media (min-width: 768px) {
  .w-b {
    width: 50%;
    height: 300px;
  }
}
@media (min-width: 1200px) {
  .w-b {
    height: 400px;
  }
}
@media (min-width: 1400px) {
  .w-b {
    width: 33.33%;
    height: 400px;
  }
}
@media (min-width: 1921px) {
  .w-b {
    width: 25%;
    height: 350px;
  }
}
</style>
