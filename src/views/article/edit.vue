<template>
  <div class="app-container">
    <el-form :model="form">
      <el-form-item label="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="articleState">
        <el-radio-group v-model="form.articleState">
          <el-radio label="public" />
          <el-radio label="private" />
          <el-radio label="draft" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="commentState">
        <el-radio-group v-model="form.commentStat">
          <el-radio label="public" />
          <el-radio label="private" />
          <el-radio label="lock" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="summary">
        <el-input v-model="form.summary" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
      </el-form-item>
      <editor ref="editor" height="400px" @change="onEditorChange" />
      <el-form-item style="margin-top: 24px">
        <el-button @click="priview">priview</el-button>
        <el-button type="primary" @click="submit">submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Editor } from '@toast-ui/vue-editor'
export default {
  name: 'Editor',
  components: {
    editor: Editor
  },
  props: [

  ],
  data() {
    return {
      form: {
        content: ''
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    onEditorChange() {
      this.form.content = this.$refs.editor.invoke('getHtml')
    },
    priview() {
      alert('priview')
    },
    submit() {
      console.log(this.form)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
