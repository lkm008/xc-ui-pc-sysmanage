<template>
  <div>
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      模板名称：
      <el-input v-model="params.templateName" style="width: 100px"></el-input>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link class="mui-tab-item"
                   :to="{path:'/cms/template/add/',query:{page: this.params.page}}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="siteId" label="站点id" width="120"></el-table-column>
      <el-table-column prop="templateName" label="模板名称" width="120"></el-table-column>
      <el-table-column prop="templateParameter" label="模板参数" width="150"></el-table-column>
      <el-table-column prop="templateFileId" label="模板文件id" width="250"></el-table-column>

      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.templateId)">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.templateId)">删除</el-button>
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
        siteList: [],//站点列表
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
        cmsApi.template_list(this.params.page, this.params.size, this.params).then((res) => {
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      //修改
      edit: function (templateId) {
        this.$router.push({
          path: '/cms/template/edit/' + templateId, query: {
            page: this.params.page
          }
        })
      },
      //删除
      del: function (templateId) {
        this.$confirm('确认删除此页面吗?', '提示', {}).then(() => {
          cmsApi.template_del(templateId).then((res) => {
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
      //初始化站点列表
      //站点查询
      cmsApi.site_findAll().then((res) => {
          if (res.success) {
            // this.siteList = JSON.parse(res.queryResult).list;
            this.siteList =res.queryResult.list;
          }
        }
      );
    }
  }
</script>

<style scoped>

</style>
