<template>

  <div class="app-container">
    <p></p>

    <el-form ref="form" :model="form" label-width="180px">


      <el-form-item label="标题(不能为空)">
        <!--栅格化控制长度-->
        <el-col :span="20">
          <el-input v-model="form.title"  placeholder="不能为空" />
        </el-col>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1" >视频</el-radio>
          <el-radio :label="2">音频</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="摘要">
        <el-col :span="20">
          <el-input v-model="form.desc"/>
        </el-col>
      </el-form-item>

      <el-form-item label="上传文件(不能为空)">
        <el-col :span="20">
          <!--上传医生图片-->
          <el-upload
            class="upload-file"
            drag
            accept=".mp4, .mp3, .wav"
            :limit="1"
            :on-progress="uploadVideoProcess"
            :on-success="handleVideoSuccess"
            list-type="text"
            :action="doUpload()"
            :before-upload="beforeUpload"
            ref="newupload"
            multiple
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>，不能为空</div>
          </el-upload>
        </el-col>
        <el-progress v-if="videoFlag == true"
                     type="circle"
                     :percentage="videoUploadPercent"
                     style="margin-top:30px;">
        </el-progress>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {type: 1},
        // videoUploadPercent:0,
        videoFlag:false,
      }
    },
    methods: {
      onSubmit() {
        this.$refs.newupload.submit();
      },
      onCancel() {
        this.$message({
          message: '放弃添加',
          type: 'warning'
        });
        this.form = {};
      },
      beforeUpload(file){
        if (file!=null && this.form.title!=null && this.form.desc!=null){
          let fd = new FormData();
          fd.append('file',file);//传文件
          fd.append('title',this.form.title);//传其他参数
          fd.append('desc',this.form.desc);//传其他参数
          fd.append('type',parseInt(this.form.type));//传其他参数
          console.log(fd);
          this.$axios.post('/file/upload',fd).then(function(res){
              this.openWarn("上传成功");
              // Vue.prototype.$message({
              //   message: '上传成功',
              //   type: 'success'
              // });

            }).catch(
              // (e)=>{this.openError(e.toString());}
          );
        } else {
          this.openWarn("不能为空");
          // Vue.prototype.$message({
          //   message: '不能为空',
          //   type: 'error'
          // });
        }
        return false

      },
      handleVideoSuccess(res, file) {                   //获取上传图片地址
        this.videoFlag = false;
        this.videoUploadPercent = 0;
        if(res.status == 200){
            this.videoForm.videoUploadId = res.data.uploadId;
            this.videoForm.Video = res.data.uploadUrl;
        }else{
            this.$message.error('视频上传失败，请重新上传！');
        }
      },
      newSubmitForm(){
        //确定上传
        this.$refs.newupload.submit();
      },
      doUpload(){
        // 传一个无用url
        return "/useless";
      },
      //进度条
      uploadVideoProcess (event, file, fileList) {
        this.videoFlag = true;
        this.videoUploadPercent = file.percentage.toFixed(0) * 1;
      },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      openWarn(message) {
        this.$alert(message, '消息', {
          confirmButtonText: '确定',
          callback: action => {
            // 确认操作回调函数
            Vue.prototype.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      openError(message) {
        this.$alert(message, '错误', {
          confirmButtonText: '确定',
          callback: action => {
            // 确认操作回调函数
            Vue.prototype.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
    },
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

