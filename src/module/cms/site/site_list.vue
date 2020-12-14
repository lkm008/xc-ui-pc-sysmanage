<template>
  <div>
    <el-form :model="params">
      站点名称：
      <el-input v-model="params.siteName" style="width: 100px"></el-input>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link class="mui-tab-item"
                   :to="{path:'/cms/site/add/',query:{page: this.params.page}}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="siteName" label="站点名称" width="120"></el-table-column>
      <el-table-column prop="siteDomain" label="站点域名" width="120"></el-table-column>
      <el-table-column prop="sitePort" label="站点端口" width="150">
      </el-table-column>
      <el-table-column prop="siteWebPath" label="站点web路径" width="250"></el-table-column>
      <el-table-column prop="sitePhysicalPath" label="站点物理路径" width="250"></el-table-column>
      <el-table-column prop="siteCreateTime" label="站点创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.siteId)">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.siteId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="this.params.size"
      v-on:current-change="changePage"
      :total="total" :current-page="this.params.page" style="float:right;">
    </el-pagination>
  </div>
</template>

<script>
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        list: [],
        total: 10,
        params: {
          page: 1,//页码
          size: 5//每页显示个数
        }
      }
    },
    methods: {
      //分页查询
      changePage: function (page) {
        this.params.page = page;
        this.query()
      },
      //查询
      query: function () {
        cmsApi.site_list(this.params.page, this.params.size, this.params).then((res) => {
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      //修改
      edit: function (siteId) {
        this.$router.push({
          path: '/cms/site/edit/' + siteId, query: {
            page: this.params.page
          }
        })
      },
      //删除
      del: function (siteId) {
        this.$confirm('确认删除此页面吗?', '提示', {}).then(() => {
          cmsApi.site_del(siteId).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //查询页面
              this.query()
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
        })
      },
    },
    created() {
      //从路由上获取参数
      this.params.page = Number.parseInt(this.$route.query.page || 1);
    },
    mounted() {
      //默认查询页面
      this.query();
    }
  }
</script>

<style scoped>

</style>
