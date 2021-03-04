<template>
  <div class="app-container">
    <el-form :model="form">
      <el-form-item label="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-select v-model="form.categories" multiple placeholder="请选择">
        <el-option
          v-for="item in categories"
          :key="item.id"
          :label="item.category"
          :value="item.id"
        />
      </el-select>
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
      <el-form-item label="pictrue">
        <el-input v-model="form.pictrue" />
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
import { getCategories } from '@/api/category'
import { createArticle } from '@/api/article'
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
      },
      categories: []
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      const { data } = await getCategories()
      this.categories = data
    },

    async submit() {
      const data = this.form
      const formattedCategories = data.categories.map(category => ({ id: category }))
      data.categories = formattedCategories
      await createArticle(data)
      this.$message({
        type: 'success',
        message: 'create article success'
      })
    },

    onEditorChange() {
      this.form.content = this.$refs.editor.invoke('getHtml')
    },

    priview() {
      alert('priview')
    }

  }
}
</script>

<style scoped lang="scss">

</style>
