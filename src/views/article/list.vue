<template>
  <div class="app-container">
    <el-table
      :data="articles"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="index"
        width="100"
      />
      <el-table-column
        prop="title"
        label="title"
      />
      <el-table-column label="categories" width="240">
        <template slot-scope="{row}">
          <el-tag
            v-for="item in row.categories"
            :key="item.id"
            effect="plain"
            style="margin: 0 6px"
          >
            {{ item.category }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_date"
        :formatter="formatTime"
        label="create time"
        width="240"
      />
      <el-table-column
        prop="article_state"
        label="article state"
        width="240"
      />

      <el-table-column label="operations" width="240">
        <template slot-scope="{row}">
          <router-link :to="'/article/edit/'+row.id">
            <el-button icon="el-icon-edit" circle />
          </router-link>
          <el-button icon="el-icon-delete" circle type="danger" style="margin-left: 10px" @click="remove(row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getArticles, deleteArticle } from '@/api/article'
import { formatTime } from '@/filters/index'
export default {
  name: 'ArticleList',
  components: {

  },
  props: [

  ],
  data() {
    return {
      articles: []
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.getArticles()
  },
  methods: {
    async getArticles() {
      const { data } = await getArticles()
      this.articles = data
    },

    remove(row) {
      this.$confirm(`Are you sure to delete ${row.id} article`, 'tip', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(async() => {
        await deleteArticle(row.id)
        this.$message({
          type: 'success',
          message: `Successfully deleted ${row.id} article`
        })
        this.getArticles()
      }).catch(() => {})
    },

    formatTime(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return formatTime(date)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
