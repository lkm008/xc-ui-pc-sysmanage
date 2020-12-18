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
        <el-upload
          action="api/cms/template/upload"
          list-type="picture-card"
          :before-upload="setuploaddata"
          :on-success="handleSuccess"
          :file-list="fileList"
          :limit="picmax"
          :on-exceed="rejectupload"
          :before-remove="handleRemove"
          :data="uploadval">
          <i class="el-icon-plus"></i>
        </el-upload>
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
  let sysConfig = require('@/../config/sysConfig')
  let apiUrl = sysConfig.xcApiUrlPre;

  export default {
    name: "template_add",
    data() {
      return {
        siteList: [],//站点列表
        fileList:[],
        picmax:1,//最大上传文件的数量
        uploadval:{},//上传提交的额外的数据 ，将uploadval转成key/value提交给服务器
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
      },
      //在上传前设置上传请求的数据
      setuploaddata(){

      },
      //上传成功的钩子方法
      handleSuccess(response, file, fileList){
        console.log(response)
//        alert('上传成功')
        //调用课程管理的保存图片接口，将图片信息保存到课程管理数据库course_pic中
        //从response得到新的图片文件的地址
        if(response.success){
          this.pageForm.templateFileId = response.templateFileId;
    /*      courseApi.addCoursePic(this.courseid,fileId).then(res=>{
            if(res.success){
              this.$message.success("上传图片")
            }else{
              // this.$message.error(res.message)
              this.handleError()
            }
          })*/
        }else {
          this.handleError()
        }

      },
      //上传失败执行的钩子方法
      handleError(err, file, fileList){
        this.$message.error('上传失败');
        //清空文件队列
        this.fileList = []
      },
      //超出文件上传个数提示信息
      rejectupload(){
        this.$message.error("最多上传"+this.picmax+"个图片");
      },
      //删除图片
      handleRemove(file, fileList) {
        console.log(file)
        //调用服务端去删除课程图片信息，如果返回false，前端停止删除
        //异步调用
  /*      return new Promise((resolve,rejct)=>{
          courseApi.deleteCoursePic(this.courseid).then(res=>{
            if(res.success){
              this.$message.success('删除成功');
              //成功
              resolve()
            }else{
              this.$message.error("删除失败");
              //失败
              rejct()
            }

          })
        })*/

      },
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
