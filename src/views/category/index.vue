<template>
  <div class="app-container">

    <el-form ref="ruleForm" :model="form" :inline="true" :rules="rules" @submit.native.prevent>
      <el-form-item ref="category" prop="category">
        <el-input v-model="form.category" clearable @blur="blur" @keyup.native.enter="submit('ruleForm')" @input="validate" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="submit('ruleForm')">submit</el-button>
        <el-button type="info" icon="el-icon-refresh-right" @click="reset('ruleForm')">reset</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="categories"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="index"
        width="100"
      />
      <el-table-column
        prop="category"
        label="category"
        width="180"
      />
      <el-table-column
        prop="create_time"
        :formatter="formatTime"
        label="create time"
        width="240"
      />
      <el-table-column
        prop="articleIds.length"
        label="Number of articles"
      />
      <el-table-column label="operations" width="240">
        <template slot-scope="{row}">
          <el-button icon="el-icon-edit" circle @click="edit(row)" />
          <el-button icon="el-icon-delete" circle type="danger" @click="remove(row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCategories, createCategory, deleteCategory, updateCategory } from '@/api/category'
import { formatTime } from '@/filters/index'

export default {
  name: 'Categories',
  components: {},
  props: [],
  data() {
    return {
      form: {
        category: ''
      },
      categories: [],
      rules: {
        category: [
          { required: true, message: 'category is required', trigger: 'blur' },
          { max: 16, message: 'The input character length is 1 to 16', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getCategories()
  },
  methods: {

    validate() {
      // console.log(this.form.category)
    },

    formatTime(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return formatTime(date)
    },

    reset(formName) {
      this.$refs[formName].resetFields()
    },

    async blur() {
      const category = this.$refs['category']
      await this.$nextTick()
      if (!this.form.category) {
        // console.log('blur')
        category.resetField()
        // console.log('blur22')
      }
    },

    async getCategories() {
      const { data } = await getCategories()
      this.categories = data
    },

    submit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          // console.log({ category: this.category })
          await createCategory({ category: this.form.category })
          this.$message({
            type: 'success',
            message: 'create category success'
          })
          this.getCategories()
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },

    edit(row) {
      this.$prompt('update category name', 'tip', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        inputValue: row.category,
        inputPattern: /^\w{1,8}$/,
        inputErrorMessage: 'The input character length is 1 to 8',
        closeOnClickModal: false
      }).then(async({ value }) => {
        await updateCategory(row.id, { category: value })
        this.$message({
          type: 'success',
          message: 'successfully updated category'
        })
        this.getCategories()
      }).catch(() => {})
    },

    remove(row) {
      this.$confirm(`Are you sure to delete ${row.category} category`, 'tip', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(async() => {
        await deleteCategory(row.id)
        this.$message({
          type: 'success',
          message: `Successfully deleted ${row.category} category`
        })
        this.getCategories()
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
</style>
