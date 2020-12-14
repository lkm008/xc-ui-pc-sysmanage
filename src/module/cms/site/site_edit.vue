<template>
<div>
<!--  <el-form   :model="pageForm" label-width="80px"  >-->
<!--    <el-form   :model="pageForm" :rules="pageFormRules" label-width="80px" >-->
  <el-form :model="pageForm" :rules="pageFormRules" label-width="80px" ref="pageForm">
    <el-form-item label="站点名称" prop="siteName">
      <el-input v-model="pageForm.siteName" auto-complete="off"></el-input>
    </el-form-item>
    ​
    <el-form-item label="域名" prop="siteDomain">
      <el-input v-model="pageForm.siteDomain" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="端口" prop="sitePort">
      <el-input v-model="pageForm.sitePort" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="访问路径" prop="siteWebPath">
      <el-input v-model="pageForm.siteWebPath" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="物理路径" prop="sitePhysicalPath">
      <el-input v-model="pageForm.sitePhysicalPath" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="创建时间">
      <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.siteCreateTime"></el-date-picker>
    </el-form-item>
    ​
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="editSubmit" >提交</el-button>
    <el-button type="primary" @click="go_back" >返回</el-button>
  </div>
</div>
</template>

<script>
  import * as cmsApi from '../api/cms'
    export default {
        name: "site_edit",
      data(){
        return {
          //页面id
          siteId:'',
          //新增界面数据
          pageForm: {
            siteName: '',
            siteDomain: '',
            sitePort: '',
            siteWebPath: '',
            siteCreateTime: new Date(),
            sitePhysicalPath: ''
          },
          pageFormRules: {
            siteName: [
              {required: true, message: '请输入站点名称', trigger: 'blur'}
            ],
            siteDomain: [
              {required: true, message: '请输入站点域名', trigger: 'blur'}
            ],
            sitePort: [
              {required: true, message: '请输入站点端口', trigger: 'blur'}
            ],
            siteWebPath: [
              {required: true, message: '请输入访问入口', trigger: 'blur'}
            ],
            sitePhysicalPath: [
              {required: true, message: '请输入物理路径', trigger: 'blur'}
            ],
          },

        }
      },
      methods:{
        editSubmit(){
          this.$refs.pageForm.validate((valid) => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                cmsApi.site_edit(this.siteId,this.pageForm).then((res) => {
                  console.log(res);
                  if(res.success){
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                    //自动返回
                    this.go_back();
                  }else{
                    this.$message.error('修改失败');
                  }
                });
              });
            }
          });
        },
        go_back(){
          this.$router.push({
            path: '/cms/site/list',
            query: {
              page: this.$route.query.page,
            }
          })
        }
      },
      created:function(){
          //页面参数通过路由传入，这里通过this.$route.params来获取
          this.siteId=this.$route.params.siteId;
          console.log("siteId=="+this.siteId)
        //根据主键查询页面信息
        cmsApi.site_get(this.siteId).then((res) => {
          console.log(res);
          if(res.success){
            this.pageForm = res.cmsSite;
          }
        });
      }
    }
</script>

<style scoped>

</style>
