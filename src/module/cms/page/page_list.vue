<template>
  <div>
    <!--      <el-button type="primary" v-on:click="query" size="small">查询</el-button>-->
    <!--查询表单-->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="params.pageAliase" style="width: 100px"></el-input>
      页面名称：
      <el-input v-model="params.pageName" style="width: 100px"></el-input>
      <!--        页面类型：<el-input v-model="params.pageType"  style="width: 100px"></el-input>-->
      页面类型：
      <el-radio-group v-model="params.pageType">
        <el-radio class="radio" label="0">静态</el-radio>
        <el-radio class="radio" label="1">动态</el-radio>
        <el-radio class="radio" label="">动态+静态</el-radio>
      </el-radio-group>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link class="mui-tab-item"
                   :to="{path:'/cms/page/add/',query:{page: this.params.page,siteId: this.params.siteId}}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120"></el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="siteId" label="站点id" width="180"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button
            size="small" type="text"
            @click="edit(page.row.pageId)">编辑
          </el-button>
          <el-button
            size="small" type="text"
            @click="del(page.row.pageId)">删除
          </el-button>
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
        total: 50,
        params: {
          siteId: '',
          pageAliase: '',
          pageName: '',
          pageType: '',
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
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          console.log(res)
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      //修改
      edit: function (pageId) {
        this.$router.push({
          path: '/cms/page/edit/' + pageId, query: {
            page: this.params.page,
            siteId: this.params.siteId
          }
        })
      },
      //删除
      del: function (pageId) {
        this.$confirm('确认删除此页面吗?', '提示', {}).then(() => {
          cmsApi.page_del(pageId).then((res) => {
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
      this.params.siteId = this.$route.query.siteId || '';
    },
    mounted() {
      //默认查询页面
      this.query();
      //初始化站点列表
      //站点查询
        cmsApi.site_list().then((res) => {
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
