<template>
  <d2-container>
    <template slot="header">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>流程管理</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/flow/flowadd' }">新建流程</el-breadcrumb-item>
		   <el-breadcrumb-item>{{flowTypeName||'会议纪要'}}</el-breadcrumb-item>
		</el-breadcrumb>
	</template>
     <div>
		 <el-row>
			 <el-col :span="16">
				 <el-form :model="flowData" ref="flowData" label-position="left" label-width="100px" class="demo-ruleForm" size="mini">
				 	<!-- 加载流程基本数据模块 -->
				 	<page-flow-head :flow-base-data="flowData.flowBaseData" @setflow-base-data="setflowBaseData"></page-flow-head>
				 	<!-- 核心内容 -->
				 	<el-row><h5><i class="el-icon-camera"></i>核心内容22222</h5></el-row>
				 	<el-row>
				 		<el-col :span="8">
				 			<el-form-item label="str1" class="te-item" prop="flowCoreData.str1" :rules="[{ required: true, message: 'str1不能为空',trigger:'blur'}]">
				 				<el-input v-model="flowData.flowCoreData.str1" clearable></el-input>
				 			</el-form-item>
				 		</el-col>
				 		<el-col :span="8">
				 			<el-form-item label="str2" class="te-item">
				 				<el-input v-model="flowData.flowCoreData.str2" clearable></el-input>
				 			</el-form-item>
				 		</el-col>
				 		<el-col :span="8">
				 			<el-form-item label="str3" class="te-item">
				 				<el-input v-model="flowData.flowCoreData.str3" clearable></el-input>
				 			</el-form-item>
				 		</el-col>
				 	</el-row>
				 	<el-row>
				 		<el-col :span="8">
				 			<el-form-item label="date1" class="te-item">
								<el-radio-group v-model="flowData.flowCoreData.date1">
									<el-radio-button label="是"></el-radio-button>
									<el-radio-button label="否"></el-radio-button>
								</el-radio-group>
				 			</el-form-item>
				 		</el-col>
				 		<el-col :span="8">
				 			<el-form-item label="date2" class="te-item">
								<el-radio-group v-model="flowData.flowCoreData.date2">
									<el-radio-button label="工程"></el-radio-button>
									<el-radio-button label="非工程"></el-radio-button>
								</el-radio-group>
				 			</el-form-item>
				 		</el-col>
				 		<el-col :span="8">
				 			<el-form-item label="hrs1" class="te-item">
				 				<el-select v-model="flowData.flowCoreData.hrs1">
				 					<el-option value="地产公司">地产公司</el-option>
				 					<el-option value="物业公司">物业公司</el-option>
				 					<el-option value="商业公司">商业公司</el-option>
				 				</el-select>
				 			</el-form-item>
				 		</el-col>
				 	</el-row>
				 	<!-- 加载流程其它数据模块 -->
				 	<page-flow-foot 
				 	:fileList="flowData.fileList" @setfileList="setfileList" 
				 	:broFlows="flowData.broFlows" @setbroFlows="setbroFlows" 
				 	:agree="flowData.agree" @setagree="setagree" 
				 	:agreeMemo="flowData.agreeMemo" @setagreeMemo="setagreeMemo"></page-flow-foot>
				 	
				 </el-form>
			 </el-col>
		 </el-row>
        </div>
    <template slot="footer">
		<el-button @click="submit('暂存')" type="primary" >
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
	import {InitFlowInfo,SaveFlowData} from "@/api/flow/flow";
	import qs from "qs";
    export default {
		name:"flow-flowaddpush-uWF_MeetRecordTemp",
		components: { 
			'pageFlowHead': () => import(`./componnets/pageHeader`),
			'pageFlowFoot': () => import(`./componnets/pageFooter`)
		},
        data() {
            return {
				FlowTypeGUID:"",//页面暂存  提交数据使用
				flowTypeName:"",
				flowData:{
					flowBaseData:{
						FlowTitle:"",	
						BillID:"",
						CreateMan:"",
						CreateDate:"",
						CreateOrg:"",
						CreateCorp:"",
						ProjectGUID:"",
						BusType:"",
						Grade:"一般",
						Status:"",
						Corpname:""
					},
					flowCoreData:{
						str1: "",
						str2: "",
						str3: "",
						date1: "",
						date2:"",
						hrs1:"",
						hrs2:"",
						num1:"",
						mhrs1:""
					},
					broFlows: [],
					fileList: [{
						name: 'food.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}, {
						name: 'food2.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}],
					agree:"同意",
					agreeMemo:""
				},
				payApplyVisible:true
            };
        },
		created () {
			console.log('this.$route', this.$route)
			//console.log('取得核心模块:',this.GLOBAL.GFLOWTEMP)
			let FlowTypeGUID = this.$route.query.data.guid;//"71E814B978F340BFAEFBCB814F4C7987"
			this.FlowTypeGUID = FlowTypeGUID;
			this.flowTypeName = this.$route.query.data.flowTypeName
			this.initData(FlowTypeGUID)
		},
        methods: {
			//初始化页面数据
			initData(FlowTypeGUID){
				let that = this
				let par = {FlowTypeGUID}
				InitFlowInfo(qs.stringify(par)).then(async res => {
				    if(typeof(res)!='undefined'&&res.code==0){
						that.flowData.flowBaseData = res.data.flowBaseData;
						try{
							that.flowData.flowCoreData = JSON.parse(res.data.flowCoreData);//后台返回字符串  需要转对象
						}catch(e){
							that.payApplyVisible = false
							that.$message({message: e.message,type: 'error'})
						}
				    }else{
						that.$message({message: res.msg,type: 'error'})
				    }
				  })
				  .catch(err => {
				    console.log('err111: ', err)
				  })
			},
			//梳理数据
			filter(par){
				delete par['flowBaseData']["projectName"];
				return par;
			},
            submit(sType) {
				let that = this
				let par = that.filter(that.flowData)
				par["sType"] = sType;
				par["FlowTypeGUID"] = that.FlowTypeGUID;
				console.log(par)
				//sType   暂存/提交  FlowTypeGUID：“121212121”
                that.$refs['flowData'].validate((valid) => {
                    if (valid) {
						let param = {jsonStr:par}
						console.log(1,param)
						SaveFlowData(qs.stringify(JSON.stringify(param))).then(async res => {
						    if(typeof(res)!='undefined'&&res.code==0){
								that.$message({message: res.msg,type: 'success'})
						    }else{
								that.$message({message: res.msg,type: 'error'})
						    }
						  })
						  .catch(err => {
						    console.log('err111: ', err)
						  })
                    } else {
                        console.log('error submit!!');
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
			setflowBaseData(v){
				this.flowData.flowBaseData = v
			},
			setfileList(v){
				this.flowData.fileList = v
			},
			setbroFlows(v){
				this.flowData.broFlows = v
			},
			setagree(v){
				console.log('setagree',v)
				this.flowData.agree = v
			},
			setagreeMemo(v){
				console.log('setagreeMemo',v)
				this.flowData.agreeMemo = v
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