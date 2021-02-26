<template>
  <div class="app-container">

    <el-form ref="ruleForm" :model="form" :inline="true" :rules="rules" @submit.native.prevent>
      <el-form-item prop="category">
        <el-input v-model="form.category" clearable @input="validate" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="add('ruleForm')">add</el-button>
        <el-button type="info" icon="el-icon-refresh-right" @click="reset('ruleForm')">reset</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
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
        label="create_time"
        width="180"
      />
      <el-table-column
        prop="articles"
        label="articles"
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
export default {
  components: {},
  props: [],
  data() {
    return {
      visible: false,
      form: {
        category: ''
      },
      tableData: [
        {
          id: 1,
          category: 'js',
          create_time: '2021--10-10',
          articles: 2
        },
        {
          id: 2,
          category: 'css',
          create_time: '2021--10-10',
          articles: 8
        }
      ],
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
  mounted() {},
  methods: {
    validate() {
      console.log(this.form.category)
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reset(formName) {
      this.$refs[formName].resetFields()
    },
    edit(row) {
      this.$prompt('update category name', 'tip', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        inputValue: row.category,
        inputPattern: /^\w{1,16}$/,
        inputErrorMessage: 'The input character length is 1 to 16',
        closeOnClickModal: false
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'successfully updated category'
        })
      }).catch(() => {})
    },
    remove(row) {
      this.$confirm(`Are you sure to delete ${row.category} category`, 'tip', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: `Successfully deleted ${row.category} category`
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
</style>
