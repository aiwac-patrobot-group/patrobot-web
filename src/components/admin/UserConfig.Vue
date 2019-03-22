<template>
  <div class="app-container">
    <p></p>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-input v-model="search" placeholder="请输入用户手机号查询"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-col>
    </el-row>
    <div v-show="searchStatus">
    <el-form   label-width="180px">
      <el-form-item label="用户手机号:" >
        <!--栅格化控制长度-->
        <el-col :span="10">
          <div>{{list.phoneNumber}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="匹配的机器人Mac地址:" >
        <!--栅格化控制长度-->
        <el-col :span="10">
          <div>{{list.macAddress}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="活跃状态:" >
        <!--栅格化控制长度-->
        <el-col :span="10">
          <div>{{list.loginStatus}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="自动投喂时间设置:" >
        <!--栅格化控制长度-->
        <el-col :span="10">
          <div>{{list.autoFeedPoints}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="自动巡航时间设置:" >
        <!--栅格化控制长度-->
        <el-col :span="10">
          <div>{{list.autoCruisePoints}}</div>
        </el-col>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
  // import { getList } from '@/api/table'

  export default {
    data() {
      return {
        list: {
          errorCode: '',
          errorDesc: '',
          phoneNumber: '',
          macAddress: '',
          loginStatus: null,
          autoFeedPoints: null,
          autoCruisePoints: null
        },
        search:"",
        searchStatus:0,
      }
    },
    methods: {
      onSearch:function(){
        console.log(this.search);
        if(this.search != null){
          this.$axios.post("/admin/userconfig", {phoneNumber:this.search})
            .then(data =>{
              console.log(data);
              this.list=data.data;
              if(this.list.errorCode=='200'){
                this.searchStatus=1;
              }else{
                this.searchStatus=0;
                this.openMessage();
              }
            })
        }
      },
      getParams:function(){
        var routerParams = this.$route.query;
        this.search=routerParams.phoneNumber;
        console.log(this.search);
      },
      openMessage:function(){
        this.$alert('该用户不存在,请核对手机号', '错误', {
          confirmButtonText: '确定',
        });
      }
    },
    created() {
      this.getParams();
      if(this.search!=null){
        this.onSearch();      
      }
    },
  }
</script>
