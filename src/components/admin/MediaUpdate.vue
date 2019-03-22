<template>
  <div class="app-container">

    <div>
      <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"></video-player>
    </div>
    <el-form label-width="180px">

      <el-form-item label="标题" >
        <!--栅格化控制长度-->
        <el-col :span="10">
          <div v-show="!changeTitle ">{{media.title}}</div>
        </el-col>
        <el-col :span="10">
          <el-input rows=2 v-show="changeTitle " size="small"v-model="newMedia.title" ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button v-show="!changeTitle" type="primary" size="small" @click="ChangeTitle">修改</el-button>
          <el-button v-show="changeTitle" type="primary" size="small" @click="SubmitNewTitle">确定</el-button>
          <el-button v-show="changeTitle" type="primary" size="small" @click="CancelChangeTitle">取消</el-button>
        </el-col>
      </el-form-item>
      
      <el-form-item label="摘要" >
        <!--栅格化控制长度-->
        <el-col :span="10">
          <div  v-show="!changeDesc">{{media.desc}}</div>
        </el-col>
        <el-col :span="10">
          <el-input rows=2 v-show="changeDesc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="newMedia.desc"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button v-show="!changeDesc" type="primary" size="small" @click="ChangeDesc">修改</el-button>
          <el-button v-show="changeDesc" type="primary" size="small" @click="SubmitNewDesc">确定</el-button>
          <el-button v-show="changeDesc" type="primary" size="small" @click="CancelChangeDesc">取消</el-button>
        </el-col>
      </el-form-item>
      <!--
      <el-form-item label="类型" >
        <el-col :span="10">
          <template>
            <el-radio v-bind:disabled="changeType" v-model="newMedia.type" label=1>视频</el-radio>
            <el-radio v-bind:disabled="changeType" v-model="newMedia.type" label=2>音频</el-radio>
          </template>
        </el-col>
        <el-col :span="4">
          <el-button v-show="changeType" type="primary" size="small" @click="ChangeType">修改</el-button>
          <el-button v-show="!changeType" type="primary" size="small" @click="SubmitNewType">确定</el-button>
          <el-button v-show="!changeType" type="primary" size="small" @click="CancelChangeType">取消</el-button>
        </el-col>
      </el-form-item>
        -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
    data() {
        return {
            changeTitle:0,
            // changedTitle:0,
            changeDesc:0,
            // changedDesc:0,
            // changeType:true,
            // changedType:0,
            // media:null,
            newMedia:{
                title:"New Title",
                desc:"New description of this media.",
                // type:null,
            },
            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "",
                src: "../../static/testaudio.mp3" //url地址
                }],
                poster: "../../static/testcover.png", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
                }
            },
        }
    },
    methods: {
        ChangeTitle:function(){
            this.changeTitle=1;
            // this.changedTitle=0;
        },
        CancelChangeTitle:function(){
            this.changeTitle=0;
            // this.changedTitle=0;
        },
        SubmitNewTitle:function(){
            if(this.newMedia.title!=""){
                this.changedTitle=1;
                this.changeTitle=0;
                this.media.title = this.newMedia.title;
            }else{
                this.$message('标题输入不能为空');
                this.CancelChangeTitle();
            }
        },
        ChangeDesc:function(){
            this.changeDesc=1;
            // this.changedDesc=0;
        },
        CancelChangeDesc:function(){
            this.changeDesc=0;
            // this.changedDesc=0;
        },
        SubmitNewDesc:function(){
            if(this.newMedia.desc!=""){
                // this.changedDesc=1;
                this.changeDesc=0;
                this.media.desc = this.newMedia.desc;
            }else{
                this.$message('摘要输入不能为空');
                this.CancelChangeDesc();
            }
        },
        // ChangeType:function(){
        //     this.changeType=false;
        // },
        // CancelChangeType:function(){
        //     this.changeType=true;
        //     this.newMedia.type = this.media.type
        // },
        // SubmitNewType:function(){
        //     // this.changedType=1;
        //     this.changeType=true;
        //     this.media.type = this.newMedia.type

        // },
        getParams:function(){
            var routerParams = this.$route.query
            this.media=routerParams
            // this.newMedia.type=routerParams.type
            this.playerOptions.poster = 'data:image/jpeg;base64,'+routerParams.cover
            this.playerOptions.sources[0].src = routerParams.url
            console.log(this.newMedia)
        },
        onSubmit:function(){
            if(this.media.title != null &&  this.media.type != null){
                console.log(this.media);
                this.$axios.post("/admin/mediaupdate", {id:this.media.id,opType:2,type:parseInt(this.media.type),title:this.media.title,desc:this.media.desc})
                    .then(response=>{
                    console.log(response);
                    // this.deleteStatus.errorCode = response.data.errorCode;
                    // var msg = this.deleteStatus.errorDesc;
                    if(response.data.errorCode=='200'){
                    // mess = this.deleteStatus.errorDesc
                        this.$message({
                            message:'修改成功',
                            type:'success'
                        });
                    }else{
                        this.$message({
                            message:"操作失败" ,
                            type:"error"
                        });
                        this.openError(response.data.errorDesc);
                    }
                }).catch(()=>{this.openError("系统错误");});
            }else{
                this.openWarn('输入不能为空');
            }
        },
        onCancel:function(){
            this.$message({
            message: '放弃添加',
            type: 'warning'
            });
            // location.reload()
            this.getParams();
        },
    },
    created:function() {
        this.getParams();
    },
}
</script>

<style>
.video-js .vjs-big-play-button{

}
</style>