<template>
    <span>
        <el-dialog title="相关流程" :visible.sync="dialogVisible">
			<el-form
			  :inline="true"
			  size="mini"
			  style="margin-bottom: -18px;">
			  <el-form-item>
			    <el-input v-model="BillID" placeholder="流程编号" clearable/>
			  </el-form-item>
			  <el-form-item>
			    <el-input v-model="Subject" placeholder="流程主题" clearable/>
			  </el-form-item>
			<el-form-item>
			  <el-button
				@click="tapSearch"
				type="primary" >
				<d2-icon name="search"/>
				查询
			  </el-button>
			</el-form-item>
			</el-form>
			<!-- <el-input v-model="BillID" style="max-width: 40%;margin-bottom: 10px;" size="small" placeholder="流程编号" clearable>
			</el-input>
			<el-input v-model="Subject" style="max-width: 40%;margin-bottom: 10px;" size="small" placeholder="流程主题" clearable>
			    <el-button slot="append" @click="tapSearch">
			        <i class="fa fa-search"></i>
			    </el-button>
			</el-input> -->
          <el-table :data="data" v-loading="loading2" size="small" stripe border height="500">
            <el-table-column property="Subject" label="流程主题" width="300"></el-table-column>
            <el-table-column property="Create_UserName" label="创建人" width="100"></el-table-column>
            <el-table-column property="Create_Date" label="创建时间"></el-table-column>
			<el-table-column property="State_Num" label="状态"></el-table-column>
			<el-table-column label="操作">
			  <template slot-scope="scope">
			    <el-button type="success" size="mini" @click="setData(scope.$index, scope.row)">选择</el-button>
			  </template>
			</el-table-column>
          </el-table>
        </el-dialog>
		<el-button size="small" type="primary" @click="showDialogVisible=true" :disabled="disabled">添加流程</el-button>
    </span>
</template>

<script>
	import util from '@/libs/util.js'
	import {FlowQry} from "@/api/flow/flow";
	import qs from "qs";
	export default {
	  name: "deng-select-flow",
	  props: {
		// 是否在选择后自动关闭
		autoClose: {
		  type: Boolean,
		  required: false,
		  default: true
		},
		disabled:{
			type: Boolean,
			required: false,
			default: false
		}
	  },
	  data() {
		return {
		  // 绑定弹出框
		  data:[],
		  dialogVisible:false,
		  BillID:'',
		  Subject:'',
		  loading2:false
		};
	  },
	  methods: {
		setData(idx,data) {
		  //this.$emit("input", data.StationName);
		  this.$emit("setData",data)
		  if (data.GUID && this.autoClose) {
			this.dialogVisible = false;
		  }
		},
		tapSearch(){
			let that = this
			if(that.loading2){return}
			let Subject = that.Subject
			let BillID = that.BillID
			if(!Subject&&!BillID){
				that.$message({message: "请输入流程主题或流程编号",type: 'error'})
			}else{
				that.loading2 = true
				FlowQry(qs.stringify({BillID,Subject})).then(async res => {
					that.loading2 = false
				    if(typeof(res)!='undefined'&&res.code==0){
						that.data = res.data
				    }
				  })
				  .catch(err => {
					  that.loading2 = false
				    console.log('err111: ', err)
				  })
			}
		}
	  }
	};
</script>