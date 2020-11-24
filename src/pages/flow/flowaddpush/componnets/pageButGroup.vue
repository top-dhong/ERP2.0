<template>
	<div>
		<el-button v-if="item.isShow" v-for="(item,idx) in pops" @click="tapOK(item.tapAction,item.actionPar,idx)" :key="idx" :type="item.type" :class="item.class" :loading="item.loading" :disabled="(Flg=='VIEW'&&item.iconName!='print')">
		  <d2-icon :name="item.iconName" />
		  {{item.text}}
		</el-button>
	</div>
</template>

<script>
	import util from '@/libs/util.js'
	import qs from "qs";
	import { SaveFlowData,FlowRetake } from "@/api/flow/flow";
	export default {
	  props: {
		pops: {
		  type: Array
		},
		flowData:{
			type: Object
		},
		popRef:null,
		FlowGUID:{
			type: String
		},
		tagName:{
			type: String
		},
		Flg:"",
		// dullTableCof:{
		// 	type: Array,
		// 	required: false,
		// 	default: []
		// },
		//当前参数由父页面传入 用于记录父页面不可提交因素  长度为空则可以提交 与参数校验并行
		//不要直接push  应该先includes 再push
		//["当前字段不能带小数!"]
		chkArrStr:{
			type: Array,
			required: false,
			default: []
		}
	  },
	  methods: {
		tapOK(action,param,idx){
			let that = this
			 console.log('11=>action='+action,param)
			 this[action](param,idx)
		},
		//梳理数据
		filter(data) {
		  let param = util.deepClone(data)
		  delete param['flowBaseData']["projectName"];
		  delete param['flowBaseData']["Create_UserName"];
		  delete param['flowBaseData']["Create_DeptName"];
		  delete param['flowBaseData']["BusTypeName"];
		  //param['annexData'] = util.filterArray(param['annexData'])
		  //param['relaFlowObj'] = util.filterArray(param['relaFlowObj'])
		  delete param['hisOpinionData'];
		  delete param['flowCoreData']["hrs_V"];
		  delete param['flowCoreData']["CYUserSelectValue"];
		  return param;
		},
		//暂存/提交流程
		submit(param,idx) {
		  let that = this
		  let doType = param.doType
		  console.log('that.flowData==>', that.flowData)
		  if(that.chkArrStr&&that.chkArrStr.length>0){
			  that.$message({ message: that.chkArrStr[0], type: 'error' })
			  return
		  }
		  that.popRef.validate((valid,vField) => {
		    if (valid) {
		      that.pops[idx].loading = true
		      //附件列表放入其它参数
		      //console.log(that.flowData.annexData);
		      that.flowData.annexData = that.flowData.annexData.map(item => {
		        item["LinkTable"] = 'WF_WorkFlowContentM';
		        item["LinkKey"] = that.flowData.flowBaseData.GUID;
		        return item;
		      });
			  //根据配置注入数据  所有表格数据默认增加  MGUID Workflowguid  空的GUID
			  // that.dullTableCof.forEach((tabCof)=>{
				  
			  // })
			  let tabs = that.flowData.flowTabsData;
			  for(let per in tabs){
				   let table = tabs[per]
				  table = table.map(item => {
				    item["GUID"] = item["GUID"]||'';
				    item["MGUID"] = that.flowData.flowBaseData.GUID;
					item["Workflowguid"] = that.flowData.flowBaseData.WorkflowGUID;
				    return item;
				  });
			  }
		      let flowDataNew = that.filter(that.flowData)
		      flowDataNew["doType"] = doType;
			  if('提交'==doType&&!that.flowData.opinionData){
				  that.$message({ message: '请填写签字意见!', type: 'error' })
				  return
			  }
		      SaveFlowData(qs.stringify({ FlowData: JSON.stringify(flowDataNew) })).then(async res => {
		        that.pops[idx].loading = false
		        if (typeof (res) != 'undefined' && res.code == 0) {
					that.$message({ message: res.msg, type: 'success' })
					if('提交'==doType){that.closeCurPage()}
		        }
		      })
		        .catch(err => {
		          that.pops[idx].loading = false
		          console.log('err: ', err)
		        })
		    } else {
		      console.log('error submit!!');
		      that.$message({ message: ((vField[Object.keys(vField)[0]][0].message)||'请根据提示完善表单'), type: 'error' })
		      return false;
		    }
		  });
		},
		//显示三个弹窗其中一个
		showThreeModal(param){
			console.log("param1=>",param)
			this.$emit("showThreeModal", param.modal);
			//this.modal = param.modal
		},
		//收回流程
		tapFlowRetake(param,idx) {
		  let that = this
		  let par = { FlowGUID: that.FlowGUID }
		  that.pops[idx].loading = true
		  FlowRetake(qs.stringify(par)).then(async res => {
			that.pops[idx].loading = false
			if (typeof (res) != 'undefined' && res.code == 0) {
			  that.$message({ message: '操作成功!', type: 'success' })
			  //setTimeout(15e2,()=>{})  
			  //that.$store.dispatch('d2admin/page/close', {tagName: 'flow-flowaddpush-WorkRequestTemp1'})
			}
		  })
			.catch(err => {
			  console.log('err: ', err)
			  that.pops[idx].loading = false
			})
			
		},
		//显示驳回弹窗
		showFlowRebut(){
			this.$emit("showFlowRebut");
		},
		//显示打印弹窗
		showPrint(){
			this.$emit("showPrint");
		},
		//显示实际付款弹窗
		showRea(){
			this.$emit("showRea");
		},
		//显示资金登记弹窗
		showMoney(){
			this.$emit("showMoney");
		},
		//关闭当前页面
		closeCurPage(){
			setTimeout(()=>{this.$store.dispatch('d2admin/page/close', {tagName: this.tagName,vm:this})},1500)
		}
	  }
	};
</script>