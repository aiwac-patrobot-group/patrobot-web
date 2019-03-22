<template>
  <div class="app-container">
    <p></p>
    <div>
    <el-row :gutter="50">
      <el-col :span="10">
        <el-input
          v-model="search"
          prefix-icon="el-icon-search"
          placeholder="视频名称或相关内容查询"/>
      </el-col>
      <el-col :span="10">
        <template>
          <el-radio v-model="type" border label='1' @change="changeType">视频</el-radio>
          <el-radio v-model="type" border label='2'@change="changeType" >音频</el-radio>
        </template>
      </el-col>

    </el-row>

    </div>
    <el-table
      v-loading="listLoading"
      :data="list.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase())||data.desc.toLowerCase().includes(search.toLowerCase()))"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="封面">
        <template slot-scope="scope">
        <img width="120" v-bind:src="['data:image/jpeg;base64,' + scope.row.cover]"></img>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="简介"  align="center">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column
      prop="type"
      label="类型"
      align="center"
      :filters="[{ text: '视频', value: 1 }, { text: '音频', value: 2 }]"
      :filter-method="filterType"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <div
          :type="scope.row.type === 1 ? 'primary' : 'success'"
          disable-transitions>
          <div v-if="scope.row.type === 1">视频</div>
          <div v-else>音频</div>
          </div>
      </template>
    </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="120"
        align="center">
        <template slot-scope="scope">
        <div>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </div>
        <div>
        <el-button
          size="mini"
          type="danger"
          @click="deleteWarning(scope.$index, scope.row)">删除</el-button>
        </div>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        type:'2',
        list: null,
        listLoading: true,
        search:"",
        currentPage1:1,
        pageSize:10,
        opMedia:{
            id:"",
            opType:"1",
            type:"",
            title:""
        },
        deleteStatus:{
            errorCode:"",
            errorDesc:""
        }
      }
    },
    created() {
      this.fetchData()
      // this.currentChangePage(this.list,this.currentPage)

    },
    methods: {
      // http加载数据
      fetchData() {
        this.listLoading = true
        this.$axios.post("/admin/medialist", {type:parseInt(this.type)})
          .then(data => {
            console.log(data)
            this.list = data.data.media;
            this.listLoading = false
            }
          )
      },
      filterType(value, row) {
        return row.type === value;
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.opMedia.id=row.id;
        this.opMedia.opType=1;
        this.opMedia.type = row.type
        this.opMedia.title = row.title
        this.$axios.post("/admin/mediaupdate", {id:this.opMedia.id,opType:this.opMedia.opType,type:this.opMedia.type,title:this.opMedia.title})
            .then(response=>{
                console.log(response);
                this.deleteStatus.errorCode = response.data.errorCode;
                var msg = this.deleteStatus.errorDesc;
                if(this.deleteStatus.errorCode=='200'){
                // mess = this.deleteStatus.errorDesc
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    });
                }else{
                    this.$message({
                        message:'删除失败' ,
                        type:"error"
                    });
                }
            })
        this.fetchData()
            
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({path:'/admin/mediaupdate',query:{id:row.id,title:row.title,desc:row.desc,cover:row.cover,url:row.url,type:row.type}})
      },
      changeType(){
        this.fetchData()
      },
      deleteWarning(index, row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.handleDelete(index, row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

</style>