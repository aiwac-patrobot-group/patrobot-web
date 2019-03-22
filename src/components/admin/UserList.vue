<template>
  <div class="app-container">
    <p></p>
    <div>
    <el-input
          v-model="search"
          prefix-icon="el-icon-search"
          placeholder="搜索手机号或机器人mac地址"/>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list.filter(data => !search || data.phoneNumber.toLowerCase().includes(search.toLowerCase())||data.macAddress.toLowerCase().includes(search.toLowerCase()))"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="账号(手机号)">
        <template slot-scope="scope">
          {{ scope.row.phoneNumber }}
        </template>
      </el-table-column>
      <el-table-column label="机器人mac地址"  align="center">
        <template slot-scope="scope">
          {{ scope.row.macAddress }}
        </template>
      </el-table-column>
      <el-table-column 
        label="是否处于活跃状态"  
        prop="loginStatus"
        align="center"
        :filters="[{ text: '是', value: 1 }, { text: '否', value: 0 }]"
        :filter-method="filterStatus"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <span :type="scope.row.loginStatus === 1 ? 'primary' : 'success'"
          disable-transitions>
          <span v-show="!scope.row.loginStatus">否</span>
          <span v-if="scope.row.loginStatus">是</span></span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
        align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!--
    <div class="paginationClass">
      <el-pagination
      @size-change="handleSizeChange1"
      @current-change="handleCurrentChange1" :current-page="currentPage1"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total1">
      </el-pagination>
    </div>-->
  </div>
</template>

<script>

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        search:"",
        currentPage1:1,
        pageSize:10,
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
        this.$axios.post("/admin/userlist",{pageNo:1,pageSize:10})
          .then(data => {
            this.list = data.data.users;
            this.listLoading = false
            }
          )
      },
      filterStatus(value, row) {
        return row.loginStatus === value;
      },
      handleClick(row) {
        console.log(row);
        this.$router.push({path: '/admin/userconfig', query: {phoneNumber: row.phoneNumber}});
      },
  //     handleSizeChange1: function(pageSize) { // 每页条数切换
  //       this.pageSize = pageSize
  //       this.handleCurrentChange1(this.currentPage1);
  //     },
  //     handleCurrentChange1: function(currentPage) {//页码切换
  //       this.currentPage1 = currentPage
  //       this.currentChangePage(this.list,currentPage)
    
  //     },
  // //分页方法（重点）
  //     currentChangePage(list,currentPage) { 
  //       let from = (currentPage - 1) * this.pageSize;
  //       let to = currentPage * this.pageSize;
  //       this.tempList = [];
  //       for (; from < to; from++) {
  //         if (list[from]) {
  //         this.tempList.push(list[from]);
  //         }
  //       }
  //     },
    }
  }
</script>

