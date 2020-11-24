<template>
  <d2-container>
    <template slot="header">
      <el-form :inline="true" size="mini" style="margin-bottom: -18px;">
        <el-form-item label="搜索" prop="keyWord">
          <el-input v-model="keyWord" placeholder="请输入员工姓名" style="width: 200px;" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSerch">
            <d2-icon name="search" /> 查询
          </el-button>
        </el-form-item>
      </el-form>
    </template>
    <!-- <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="add">
      新增
    </el-button>
    <el-button v-if="multipleSelection.length>0" type="danger" size="mini" icon="el-icon-delete" @click="batchDel">
      删除
    </el-button> -->
    <el-table :data="tableData" v-loading="loading" size="small" stripe highlight-current-row style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
	  <el-table-column label="工号" prop="code">
	    <template slot-scope="scope">
	      {{scope.row.userid}}
	    </template>
	  </el-table-column>
      <el-table-column label="人员" prop="name">
        <template slot-scope="scope">
          {{scope.row.userName}}
        </template>
      </el-table-column>
      <el-table-column label="标识(ip/mac)" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.macid}}
        </template>
      </el-table-column>
	  <el-table-column label="有效时间" prop="code" :show-overflow-tooltip="true">
	    <template slot-scope="scope">
	      {{scope.row.validDate}}
	    </template>
	  </el-table-column>
	  <el-table-column label="是否有效" prop="code" :show-overflow-tooltip="true">
	    <template slot-scope="scope">
	      {{scope.row.isValid}}
	    </template>
	  </el-table-column>
	  <el-table-column label="说明" prop="code" :show-overflow-tooltip="true">
	    <template slot-scope="scope">
	      {{scope.row.macMemo}}
	    </template>
	  </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" title="授权" size="mini" icon="el-icon-edit" @click="doAuth($index,scope.row)">授权</el-button>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>
<script>
import qs from "qs";
import util from '@/libs/util.js'
import {GetUserMaclist,SaveAndUpTab} from "@/api/sys/sys";
export default {
  data() {
    return {
      keyWord: '',//关键字检索
      loading: false,//加载表格状态
      tableData: [],//表数据
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      let that = this
      that.loading = true
      GetUserMaclist(qs.stringify({userName:that.keyWord})).then(async res => {
      	that.loading = false
          if(typeof(res)!='undefined'&&res.code==0){
      		that.tableData = res.data;
          }else if(res.code==3){
			  that.tableData = []
		  }
        })
        .catch(err => {
          console.log('err111: ', err)
        })
    },
    doSerch() {
      this.initData();
    },
	doAuth(idx,data){
		let that = this
		let {GUID} = data
		SaveAndUpTab(qs.stringify({tabName:'SYS_UserMac',jsonStr:JSON.stringify({GUID,isValid:1})})).then(async res => {
			if(typeof(res)!='undefined'&&res.code==0){
				that.$message({message: res.msg,type: 'success'})
				setTimeout(()=>{this.initData();},1500)
			}
		})
		.catch(err => {
			console.log('err111: ', err)
		})
	}
  }
};
</script>
