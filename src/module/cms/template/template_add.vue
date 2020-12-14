<template>
  <div>
    <el-form :model="pageForm" :rules="pageFormRules" label-width="80px" ref="pageForm">
      <el-form-item label="站点id" prop="siteId">
<!--        <el-input v-model="pageForm.siteId" auto-complete="off"></el-input>-->
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      ​
      <el-form-item label="模板名称" prop="templateName">
        <el-input v-model="pageForm.templateName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="模板参数" prop="templateParameter">
        <el-input v-model="pageForm.templateParameter" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="模板文件id" prop="templateFileId">
        <el-input v-model="pageForm.templateFileId" auto-complete="off"></el-input>
      </el-form-item>
      ​
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit">提交</el-button>
      <el-button type="primary" @click="go_back">返回</el-button>
    </div>
  </div>
</template>

<script>
  import * as cmsApi from '../api/cms'

  export default {
    name: "template_add",
    data() {
      return {
        siteList: [],//站点列表
        //新增界面数据
        pageForm: {
          siteId: '',
          templateName: '',
          templateParameter: '',
          templateFileId: '',
        },
        pageFormRules: {
          siteId: [
            {required: true, message: '请输入站点id' , trigger: 'blur'}
          ],
          templateName: [
            {required: true, message: '请输入模板名称', trigger: 'blur'}
          ],
          templateParameter: [
            {required: true, message: '请输入模板参数', trigger: 'blur'}
          ],
          templateFileId: [
            {required: true, message: '请输入模板文件id', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      addSubmit() {
        // alert("提交")
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              cmsApi.template_add(this.pageForm).then((res) => {
                console.log(res);
                if (res.success) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['pageForm'].resetFields();
                } else if (res.message) {
                  this.$message.error(res.message);
                } else {
                  this.$message.error('提交失败');
                }
              })
            })
          }
        })
      },
      go_back() {
        this.$router.push({
          path: '/cms/template/list',
          query: {
            page: this.$route.query.page,
          }
        })
      }
    },
    created: function () {
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
