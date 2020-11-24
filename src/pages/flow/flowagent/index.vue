<template>
  <d2-container>
		<el-form
		slot="header"
		  :inline="true"
		  size="mini"
		  style="margin-bottom: -18px;">
			<el-form-item>
			  <el-button
			    type="success"
				title="新建"
			    @click="add">
			    <d2-icon name="plus"/>
			    新建
			  </el-button>
			</el-form-item>
			<el-popover
			  placement="top-start"
			  title="温馨提示"
			  width="400"
			  trigger="click"
			>
			  <li>暂无提示</li>
			  <el-button
			    slot="reference"
			    size="mini"
			    icon="el-icon-info"
			    style="float:right"
			  >操作提示</el-button>
			</el-popover>
		</el-form>
	  <el-row>
 
	    <el-col :span="20" style="padding-left: 5px;"> 
			<div>
				  <el-form :inline="true" :model="serchFrom" ref="serchFrom" size="mini" style="margin-bottom: -18px;">
				    <el-form-item label="被代理人" prop="UserName">
				      <el-input v-model="serchFrom.UserName" placeholder="请输入被代理人" style="width: 120px;" clearable/>
				    </el-form-item>
				  		<el-form-item label="代理人" prop="ToUserName">
				  		  <el-input v-model="serchFrom.ToUserName" placeholder="请输入代理人" style="width: 120px;" clearable/>
				  		</el-form-item>
				  		<el-form-item label="开始时间" prop="Bdate">
				  		  <el-date-picker v-model="serchFrom.Bdate" type="date" placeholder="选择开始时间" value-format="yyyy-MM-dd" style="width: 160px;"></el-date-picker>
				  		</el-form-item>
				  		<el-form-item label="结束时间" prop="Edate">
				  		 <el-date-picker v-model="serchFrom.Edate" type="date" placeholder="选择结束时间" value-format="yyyy-MM-dd" style="width: 160px;"></el-date-picker>
				  		</el-form-item>
				    <el-form-item>
				      <el-button type="primary" @click="doSerch">
				        <d2-icon name="search" /> 查询
				      </el-button>
				    </el-form-item>
				  </el-form>
				  <el-table :data="tableData" v-loading="loading" size="small" stripe highlight-current-row style="width: 100%;">
				    <el-table-column type="selection" width="55">
				    </el-table-column>
				    <el-table-column label="被代理人" prop="UserName">
				      <template slot-scope="scope">
				        {{scope.row.UserName}}
				      </template>
				    </el-table-column>
				  	<el-table-column label="代理人" prop="ToUsername">
				  		<template slot-scope="scope">
				  		  {{scope.row.ToUsername}}
				  		</template>
				  	</el-table-column>
				    <el-table-column label="开始时间" prop="BeginTime">
				      <template slot-scope="scope">
				        {{scope.row.BeginTime}}
				      </template>
				    </el-table-column>
				  	<el-table-column label="结束时间" prop="EndTime">
				  	  <template slot-scope="scope">
				  	    {{scope.row.EndTime}}
				  	  </template>
				  	</el-table-column>
				  	<!-- 授权方式暂不处理  后面可能会更改 -->
				    <el-table-column label="授权方式" :show-overflow-tooltip="true">
				      <template slot-scope="scope">
				        
				      </template>
				    </el-table-column>
				  </el-table>
			</div>
		</el-col>
	  </el-row>
	  <!-- 新建流程代理 -->
	  <el-dialog title="新建流程代理" :visible.sync="dialogFlowAgentVisible">
	  	<el-form :model="FlowAgentData" ref="FlowAgentData" label-position="left" label-width="100px" class="demo-ruleForm">
	  	    <el-form-item label="被代理人：" prop="ManGUID" :rules="[{ required: true, message: '被代理人不能为空',trigger:'blur'}]">
	  			<deng-select-user @submitdata="setUserName" :canMark="'one'"></deng-select-user>
	  	    </el-form-item>
			<el-form-item label="代理人：" prop="ToManGUID" :rules="[{ required: true, message: '代理人不能为空',trigger:'blur'}]">
				<deng-select-user @submitdata="setToUserName" :canMark="'one'"></deng-select-user>
			</el-form-item>
			<el-form-item label="开始时间：" prop="BeginTime" :rules="[{ required: true, message: '开始时间不能为空',trigger:'blur'}]">
			  <el-date-picker v-model="FlowAgentData.BeginTime" type="date" placeholder="选择开始时间" value-format="yyyy-MM-dd" style="width: 160px;"></el-date-picker>
			</el-form-item>
			<el-form-item label="结束时间：" prop="EndTime" :rules="[{ required: true, message: '结束时间不能为空',trigger:'blur'}]">
			  <el-date-picker v-model="FlowAgentData.EndTime" type="date" placeholder="选择结束时间" value-format="yyyy-MM-dd" style="width: 160px;"></el-date-picker>
			</el-form-item>
	  	     <!-- 其它.... -->
	  	  </el-form> 
	  	  <div slot="footer" class="dialog-footer">
	  	  	<el-button @click="dialogCYVisible = false" title="点击阴影部分可快捷关闭窗口">取 消</el-button>
	  	     <el-button type="primary" :loading="btnLoading" @click="doSubmit">提交</el-button>
	  	  </div>
	  </el-dialog>
  </d2-container>
</template>
<script>
import qs from "qs";
import util from '@/libs/util.js'
import {GetFlowAgentList} from "@/api/flow/flow";
import {SaveAndUpTab} from "@/api/sys/sys";
export default {
  data() {
    return {
		serchFrom: {
		  UserName:'',
		  ToUserName:'',
		  Bdate:'',
		  Edate:''
		},//关键字检索
		loading: false,//加载表格状态
		tableData: [],//表数据
		dialogFlowAgentVisible:false,//弹窗显示
		FlowAgentData:{//新建代理对象
			ManGUID:'',//被代理人
			UserName:'',//不提交至后台
			ToManGUID:'',//代理人
			ToUsername:'',//不提交至后台
			BeginTime:'',
			EndTime:'',
			WhenCreateOrg:'',
			WhenProjectGUID:'',
			WhenLegalCompany:''
		},
		btnLoading:false//控制提交按钮加载状态
    };
  },
  components: {
  	'dengSelectUser': () => import(`@cps/deng-select-user`)
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      let that = this
      that.loading = true
      GetFlowAgentList(qs.stringify({...that.serchFrom})).then(async res => {
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
	add(){
		let that = this
		that.dialogFlowAgentVisible = true;
		that.FlowAgentData = {}
	},
	//导出选取的人员信息
	setUserName(users){
		this.FlowAgentData.ManGUID = users[0].GUID
	},
	//导出选取的人员信息
	setToUserName(users){
		this.FlowAgentData.ToManGUID = users[0].GUID
	},
	//梳理数据
	//需要克隆对象  此处必须做clone处理  因为后端是根据前段传入的字段直接解析生成sql
	filter(data){
		//let param = Object.create(data);
		let param = util.deepClone(data)
		delete param["UserName"];
		delete param["ToUsername"];
		return param;
	},
	//提交新建数据
	doSubmit(){
		let that = this
		that.btnLoading = true
		let param = that.filter(that.FlowAgentData)
		console.log(1,param)
		that.$refs['FlowAgentData'].validate((valid) => {
				if (valid) {
					SaveAndUpTab(qs.stringify({tabName:'WF_Define_FlowAgent',jsonStr:JSON.stringify(param)})).then(async res => {
						that.btnLoading = false
						if(typeof(res)!='undefined'&&res.code==0){
							that.$message({message: res.msg,type: 'success'})
							setTimeout(()=>{that.initData();that.dialogFlowAgentVisible = false;},15e2)
						}
						})
						.catch(err => {
							console.log('err111: ', err)
					})
			  }else{
				  that.btnLoading = false
			  }
		  })
	}
  }
};
</script>
