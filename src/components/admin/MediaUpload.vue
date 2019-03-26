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
          <el-upload
            class="upload-file"
            drag
            accept=".mp4,.wmv,.asf,.asx,.rm,.rmvb,.3gp,.mov,.m4v,.avi,.dat,.mkv,.flv,.vob,.cd,.aiff,.wav,.aiff,.mp3,.vqf,.flac,.aac"
            action="/useless"
            :before-upload="beforeUpload"
            ref="newupload"
            :multiple="false"
            :file-list="fileList"
            :on-change="handleChange"
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
        form: {type: null,},
        videoFlag:false,
        fileList:[],
      }
    },
    methods: {
      onSubmit() {
        if(this.fileList==[]){
          this.openError("上传文件不能为空");
        }else if(this.form.title == null){
          this.openError("文件标题不能为空");
        }else if(this.form.type == null){
          this.openError("文件类型不能为空");
        }else{
          this.$refs.newupload.submit();
        }
      },
      onCancel() {
        this.$confirm('确定要放弃上传吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form = {};
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消放弃上传'
          });          
        });
        
      },
      beforeUpload(file){
        if (file!=null && this.form.title!=null && this.form.type!=null){
          let fd = new FormData();
          fd.append('file',file);//传文件
          fd.append('title',this.form.title);//传其他参数
          fd.append('desc',this.form.desc);//传其他参数
          fd.append('type',parseInt(this.form.type));//传其他参数
          console.log(file);
          this.$axios.post('/file/upload',fd)
            .then(response =>{
              console.log(response);
                if(response.data.errorCode=='200'){
                    this.openWarn("上传成功")
                }else{
                    this.openError(response.data.errorDesc)
                }
            }).catch(error => {
            //超时之后在这里捕抓错误信息.
            if (error.response) {
              console.log('error.response')
              console.log(error.response);
            } else if (error.request) {
              console.log(error.request)
              console.log('error.request')
          if(error.request.readyState == 4 && error.request.status == 0){
            //我在这里重新请求
        }
    } else {
        console.log('Error', error.message);
    }
    console.log(error.config);
    });
        } else {
          console.log(file)
          this.openWarn("文件不能为空");
          // Vue.prototype.$message({
          //   message: '不能为空',
          //   type: 'error'
          // });
        }
        return false
      },
      isVideo(fileFormat){
        var videoFormat = ["mp4","wmv","asf","asx",
                      "rm","rmvb","3gp","mov","m4v",
                      "avi","dat","mkv","flv","vob"];
        for(var i=0;i<videoFormat.length;i++){
          if(videoFormat[i]==fileFormat){
            return true;
          }
        }
        return false;
      },
      isAudio(fileFormat){
        var audioFormat = ["cd","wav","aiff","mp3","vqf","flac","aac"];
        for(var i=0;i<audioFormat.length;i++){
          if(audioFormat[i]==fileFormat){
            return true;
          }
        }
        return false;
      },
      handleChange(file,fileList){
        this.fileList = fileList.slice(-1);
        // if(file.type)
        var fileSplit = (file.name).split(".");
        var fileFormat = fileSplit[fileSplit.length-1];
        if(this.isVideo(fileFormat)){
          this.form.type=1;
        }else if(this.isAudio(fileFormat)){
          this.form.type=2;
        }else{
          this.openError("上传文件类型错误，请重新选择");
          this.handleRemove(file, fileList);
        }
      },

      newSubmitForm(){
        //确定上传
        this.$refs.newupload.submit();
      },

     handleRemove(file, fileList) {
        this.fileList = [];
        file = null;
        console.log(file);

      },
      openWarn(message) {
        this.$alert(message, '消息', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      },
      openError(message) {
        this.$alert(message, '错误', {
          confirmButtonText: '确定',
          callback: action => {
            // 确认操作回调函数
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ message }`
            // });
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

