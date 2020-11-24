<template>
  <d2-container>
    <template slot="header">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>流程管理</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/flow/flowadd' }">新建流程</el-breadcrumb-item>
		   <el-breadcrumb-item>{{flowTypeName||'项目计划新建及调整'}}</el-breadcrumb-item>
		</el-breadcrumb>
	</template>
     <div>
		 <el-row>
		 			<el-alert v-if="!FlowTypeGUID" title="数据加载出错,请勿刷新页面,请关闭当前页面后重新打开" type="error" :closable="false" center show-icon/>
		 </el-row>
		 <el-row>
			 <el-col :span="16">
				 <el-form :model="flowData" ref="flowData" label-position="left" label-width="120px" class="demo-ruleForm" size="mini">
				 	<!-- 加载流程基本数据模块 -->
				 	<page-flow-head :flow-data="flowData"></page-flow-head>
				 	<!-- 核心内容  "hrs": "", "text1": "", "text3": "", "text4": "", "text5": "", "memo": "" -->
				 	<el-row><h5><i class="el-icon-camera"></i>核心内容</h5></el-row>
				 	<el-row>
						<el-col :span="8">
							<el-form-item label="编辑类型：" class="te-item" prop="flowCoreData.text7" :rules="[{ required: true, message: '编辑类型不能为空',trigger:'blur'}]">
								<el-radio-group v-model="flowData.flowCoreData.text7">
										<el-radio-button label="新建"></el-radio-button>
										<el-radio-button label="调整"></el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="16" v-show="flowData.flowCoreData.text7=='调整'">
							<el-form-item label="待调整计划组：" class="te-item" prop="flowCoreData.text8" :rules="[{ required: true, message: '待调整计划组不能为空',trigger:'blur'}]">
								<!-- <el-input v-model="flowData.flowCoreData.text8" clearable></el-input> -->
								<deng-select-plan-group v-model="flowData.flowBaseData.projectName" :ProjectGUID="flowData.flowBaseData.ProjectGUID" @setPlanGroup="setPlanGroup"/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item :label="(flowData.flowCoreData.text7=='调整'?'旧':'新')+'计划组类型：'" class="te-item" prop="flowCoreData.text8" :rules="[{ required: true, message: '计划组类型不能为空',trigger:'blur'}]">
								<el-input v-model="flowData.flowCoreData.text8" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-form-item :label="(flowData.flowCoreData.text7=='调整'?'旧':'新')+'计划组名称：'" class="te-item" prop="flowCoreData.text8" :rules="[{ required: true, message: '计划组名称不能为空',trigger:'blur'}]">
								<el-input v-model="flowData.flowCoreData.text8" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="计划清单：" class="te-item">
								<el-button type="primary" @click="test" plain size="mini">新增顶级</el-button>
								<el-button type="success" @click="test" plain size="mini">新增同级</el-button>
								<el-button type="warning" @click="test" plain size="mini">新增下级</el-button>
								<el-button type="danger" @click="test" plain size="mini">删除</el-button>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item class="te-item">
								<el-button type="primary" @click="test" plain size="mini">套用模板</el-button>
								<el-button type="success" @click="test" plain size="mini">清空</el-button>
								<el-button type="warning" @click="test" plain size="mini">导出</el-button>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							 <el-table
							      :data="tableData"
							      style="width: 100%;margin-bottom: 20px;"
							      row-key="id"
								  highlight-current-row
							      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
							    >
							      <el-table-column
							        v-for="(item,index) in tableList"
							        :key="index"
							        :label="item.label"
							        :prop="item.prop"
							      ></el-table-column>
							      <el-table-column label="操作" width="200">
							        <template slot-scope="scope">
							          <el-button
							            @click="handleClick(scope.row)"
							            type="primary"
							            size="mini"
							            v-if="!scope.row.date"
							          >编辑</el-button>
							          <el-button
							            @click="downloadImg(scope.row)"
							            type="text"
							            size="mini"
							            v-if="!scope.row.date"
							          >删除</el-button>
							        </template>
							      </el-table-column>
							    </el-table>
						</el-col>
					</el-row>
				 	<!-- 加载流程其它数据模块 -->
				 	<page-flow-foot :flow-data="flowData"></page-flow-foot>
				 	
				 </el-form>
			 </el-col>
		 </el-row>
        </div>
    <template slot="footer">
		<el-button @click="submit('暂存')" type="primary" :loading="loading1" >
		  <d2-icon name="floppy-o"/>
		  暂存
		</el-button>
		<el-button @click="submit('提交')" type="success" >
		  <d2-icon name="check-square-o"/>
		  提交
		</el-button>
		<el-button @click="test" type="info" >
		  <d2-icon name="envelope-o"/>
		  传阅
		</el-button>
		<el-button @click="test" type="warning" >
		  <d2-icon name="comment-o"/>
		  沟通
		</el-button>
		<el-button @click="print" type="danger" >
		  <d2-icon name="print"/>
		  打印
		</el-button>
		<el-button @click="test" class="btn-mya" >
		  <d2-icon name="credit-card"/>
		  实际付款
		</el-button>
		<el-button @click="test" class="btn-myb">
		  <d2-icon name="pencil-square-o"/>
		  资金登记
		</el-button>
	</template>
  </d2-container>
</template>
<script>
	import util from '@/libs/util.js'
	import qs from "qs";
	import myMixin from './js/public.js'
	import { mapActions } from "vuex";
	import {InitFlowInfo,SaveFlowData} from "@/api/flow/flow";
    export default {
		name:"flow-flowaddpush-ProjPlanAddEditTemp",
		mixins:[myMixin],
		components: { 
			'pageFlowHead': () => import(`./componnets/pageHeader`),
			'pageFlowFoot': () => import(`./componnets/pageFooter`),
			'dengSelectUser': () => import(`@cps/deng-select-user`),
			dengSelectPlanGroup: () => import(`@cps/deng-select-plan-group`)
		},
        data() {
            return {
				FlowTypeGUID:"",//页面暂存  提交数据使用
				flowTypeName:"",
				flowData:{
					flowBaseData: {},
					flowCoreData: {},
					relaFlowObj: [],
					annexData: [],
					agree:"同意",
					opinionData:""
				},
				loading1:false,
				
				tableList: [
				        {
				          label: "级别",
				          prop: "date"
				        },
				        {
				          label: "名称",
				          prop: "name"
				        },
				        {
				          label: "别名",
				          prop: "alias"
				        },
				        {
				          label: "操作员",
				          prop: "operator"
				        },
				        {
				          label: "状态",
				          prop: "state"
				        }
				      ],
				      tableData: [
				        {
				          id: 1,
				          date: "个人",
				          children: [
				            {
				              id: 11,
				              name: "第二根半价套餐",
				              alias: "是兄弟就来割",
				              operator: "铁手无情",
				              state: "无痛"
				            }
				          ]
				        },
				        {
				          id: 2,
				          date: "科室",
				          children: []
				        },
				
				        {
				          id: 3,
				          date: "全院",
				          children: [
				            {
				              id: 31,
				              name: "第二根半价套餐",
				              alias: "是兄弟就来割",
				              operator: "铁手无情",
				              state: "无痛"
				            },
				            {
				              id: 41,
				              name: "第二根半价套餐",
				              alias: "是兄弟就来割",
				              operator: "铁手无情",
				              state: "无痛"
				            }
				          ]
				        }
				      ]
            };
        },
		created () {
			let that = this
			console.log('that.$route', that.$route)
			that.FlowTypeGUID = that.$route.query.GUID;
			that.flowTypeName = that.$route.query.name
			//初始化页面数据
			that.initData({FlowTypeGUID:that.FlowTypeGUID}).then((res) => {
				that.flowData.flowBaseData = res.data.flowBaseData;
				that.flowData.flowCoreData = res.data.flowCoreData;
			});
			//禁用f5
			that.stopF5Refresh()
			//禁用浏览器刷新
			//window.addEventListener('beforeunload', e => that.beforeunloadHandler(e))
		},
        methods: {
			...mapActions("d2admin/flow", ["initData"]),
			//梳理数据
			filter(par){
				let param = util.deepClone(par)
				delete param['flowBaseData']["projectName"];
				delete param['flowBaseData']["Create_UserName"];
				delete param['flowBaseData']["Create_DeptName"];
				delete param['flowBaseData']["BusTypeName"];
				return param;
			},
            submit(doType) {
				let that = this
				let par = that.filter(that.flowData)
				par["doType"] = doType;
				//par["FlowTypeGUID"] = that.FlowTypeGUID;
                that.$refs['flowData'].validate((valid) => {
                    if (valid) {
						that.loading1 = true
						if(1)return
						SaveFlowData(qs.stringify({FlowData:JSON.stringify(par)})).then(async res => {
							that.loading1 = false
						    if(typeof(res)!='undefined'&&res.code==0){
								that.$message({message: res.msg,type: 'success'})
						    }
						  })
						  .catch(err => {
							that.loading1 = false
							console.log('err111: ', err)
						  })
                    } else {
                        console.log('error submit!!');
						that.$message({message: '请根据提示完善表单',type: 'error'})
                        return false;
                    }
                });
            },
			test(){
				this.$message({message: `敬请期待！`,type: 'info'})
			},
			print(){
				//window.print();
				//console.log(1,this.$refs.print)
				//this.$print(this.$refs.print) // 使用
			},
			//导出选取的人员信息
			sethrs(users){
				this.flowData.flowCoreData.hrs = util.ArryToJoinStr(users,false,'GUID')
			},
			setPlanGroup(e){
				console.log(1,e)
			}
        }
    }
</script>
<style>
	.te-item{
		margin-left: 0.9375rem;
	}
	.btn-mya{
		color: #fff;
		background-color: #8B83D2;
		border-color: #8B83D2;
	}
	.btn-mya:hover{
		background-color: #9390f0;
		border-color: #8B83D2;
		color:#fff;
	}
	.btn-mya:focus{
		background-color: #8B83D2;
		border-color: #8B83D2;
	}
	
	.btn-myb{
		color: #fff;
		background-color: #55557f;
		border-color: #55557f;
	}
	.btn-myb:hover{
		background-color: #62667f;
		border-color: #55557f;
		color:#fff;
	}
	.btn-myb:focus{
		background-color: #55557f;
		border-color: #55557f;
	}
</style>