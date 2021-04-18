<template>
  <div class="app-container">
    <el-form ref="articleForm" :model="form">
      <el-form-item label="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="categories">
        <el-select v-model="form.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item.category"
            :label="item.category"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="article state">
        <el-radio-group v-model="form.article_state">
          <el-radio label="public" />
          <el-radio label="private" />
          <el-radio label="draft" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="comment state">
        <el-radio-group v-model="form.comment_state">
          <el-radio label="public" />
          <el-radio label="private" />
          <el-radio label="lock" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="pictrue">
        <el-input v-model="form.pictrue" />
      </el-form-item>
      <el-form-item label="theme">
        <el-input v-model="form.theme" />
      </el-form-item>
      <el-form-item label="music">
        <el-input v-model="form.music" />
      </el-form-item>
      <el-form-item label="summary">
        <el-input v-model="form.summary" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
      </el-form-item>
      <editor ref="editor" :options="editorOptions" height="400px" />
      <el-form-item style="margin-top: 24px">
        <el-button type="success" @click="priview">priview</el-button>
        <el-button type="primary" @click="submit">submit</el-button>
        <el-button type="warning" @click="reset('articleForm')">reset</el-button>
      </el-form-item>
    </el-form>
    <floating-btn @click.native="dialogVisible = true" />
    <el-dialog title="upload" :visible.sync="dialogVisible">
      <upload file-type="picture" />
    </el-dialog>
  </div>
</template>

<script>
import { Editor } from '@toast-ui/vue-editor'
import { getCategories } from '@/api/category'
import FloatingBtn from '@/components/FloatingBtn'
import Upload from '@/components/upload'
import { createArticle, getArticle, updateArticle } from '@/api/article'
import editorOptions from './editorOpctions'
export default {
  name: 'Editor',
  components: {
    editor: Editor,
    FloatingBtn,
    Upload
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {},
      categories: [],
      dialogVisible: false,
      editorOptions: editorOptions
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.getArticle(id)
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      const { data } = await getCategories()
      this.categories = data
    },

    async getArticle(id) {
      const { data } = await getArticle(id)
      data.categories = data.categoryIds
      this.$refs.editor.invoke('setHtml', data.content)
      this.form = data
    },

    async submit() {
      const data = Object.assign({}, this.form)
      const formattedCategories = data.categories.map(category => ({ id: category }))
      data.categories = formattedCategories
      data.content = this.$refs.editor.invoke('getHtml')
      console.log(data)
      this.isEdit
        ? await updateArticle(this.$route.params.id, data)
        : await createArticle(data)
      this.$router.push({ name: 'Article' })
      this.$message({
        type: 'success',
        message: `${this.isEdit ? 'update' : 'create'} article success`
      })
    },

    priview() {
      alert('priview')
    },

    reset(formName) {
      // todo, bug: reset form does not work
      this.$confirm(`Are you sure to reset this form`, 'tip', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        this.$refs[formName].resetFields()
      }).catch(() => {})
    }

  }
}
</script>

<style scoped lang="scss">

</style>
