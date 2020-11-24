<!-- page 借款流程v3 -->
<template>
  <d2-container>
    <div ref="printDom1">
      <el-row>
        <el-alert v-if="!FlowTypeGUID&&!Flg" title="数据加载出错,请勿刷新页面,请关闭当前页面后重新打开" type="error" :closable="false" center show-icon />
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form :model="flowData" ref="flowData" label-position="left" label-width="110px" class="demo-ruleForm" size="mini">
            <!-- 加载流程基本数据模块 -->
            <page-flow-head :flow-data="flowData" :Flg="Flg"></page-flow-head>
            <!-- 核心内容  "hrs": "", "text1": "", "text3": "", "text4": "", "text5": "", "memo": "" -->
            <el-row style="margin-bottom: 18px">
              <el-col>
                <span><b><i class="el-icon-camera"></i>核心内容</b></span>
              </el-col>
            </el-row>
			<el-row>
			  <el-col :span="12">
			    <el-form-item label="费用公司：" class="te-item" prop="flowCoreData.text2" :rules="[{ required: true, message: '费用公司不能为空',trigger:'blur'}]">
			      <deng-select-company :value="flowData.flowCoreData.text2" :comType="'CW'" @setSelected="setSelected($event,'text2')" :disabled="(Flg=='VIEW')"/>
			    </el-form-item>
			  </el-col>
              <el-col :span="12">
                <el-form-item label="借款人：" class="te-item" prop="flowCoreData.hrs" :rules="[{ required: true, message: '借款人不能为空',trigger:'blur'}]">
                  <deng-select-user :value="flowData.flowCoreData.hrs_V" :CYUserSelectValue="flowData.flowCoreData.CYUserSelectValue_hrs||[]" @submitdata="sethrs($event,'hrs')" :readonly="(Flg=='VIEW')"/>
                </el-form-item>
              </el-col>
            </el-row>
			<el-row>
			  <el-col :span="12">
			    <el-form-item label="还款日期：" class="te-item" prop="flowCoreData.date3" :rules="[{ required: true, message: '还款日期不能为空',trigger:'blur'}]">
			      <el-date-picker style="width:100%;" v-model="flowData.flowCoreData.date3" :readonly="(Flg=='VIEW')" type="date" placeholder="请选择"/>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="24">
			    <el-form-item label="款项用途：" class="te-item" prop="flowCoreData.text8" :rules="[{ required: true, message: '款项用途不能为空',trigger:'blur'}]">
			      <el-input type="textarea" placeholder="请输入..." :autosize="{ minRows: 4}" :minlength="5" v-model="flowData.flowCoreData.text8" maxlength="200" :readonly="(Flg=='VIEW')" show-word-limit></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="借款类型：" class="te-item" prop="flowCoreData.text9" :rules="[{ required: true, message: '借款类型不能为空',trigger:'blur'}]">
                  <el-radio-group v-model="flowData.flowCoreData.text9" :disabled="(Flg=='VIEW')">
                    <el-radio label="临时借款"></el-radio>
                    <el-radio label="部门备用金"></el-radio>
                    <el-radio label="董事长特批"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
			<el-row>
			  <el-col :span="24">
			    <el-form-item label="费用类型：" class="te-item" prop="flowCoreData.text14" :rules="[{ required: true, message: '费用类型不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text14" :disabled="(Flg=='VIEW')">
			        <el-radio label="营销费用"></el-radio>
			        <el-radio label="企划费用"></el-radio>
			        <el-radio label="日常无立项费用"></el-radio>
					<el-radio label="物业费用"></el-radio>
					<el-radio label="商业立项费用"></el-radio>
					<el-radio label="其他"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			</el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="付款方式：" class="te-item" prop="flowCoreData.text10" :rules="[{ required: true, message: '付款方式不能为空',trigger:'blur'}]">
                  <el-radio-group v-model="flowData.flowCoreData.text10" :disabled="(Flg=='VIEW')">
                    <el-radio label="转账"></el-radio>
                    <el-radio label="承兑"></el-radio>
					<el-radio label="银行扣划"></el-radio>
					<el-radio label="其他"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="财务确认预算：" class="te-item" prop="flowCoreData.text38" :rules="[{ required: true, message: '财务确认预算不能为空',trigger:'blur'}]">
                  <el-radio-group v-model="flowData.flowCoreData.text38" :disabled="(Flg=='VIEW')">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
			  <el-col :span="12">
			    <el-form-item label="预算审核人：" class="te-item" prop="flowCoreData.hrs5" :rules="[{ required: true, message: '预算审核人不能为空',trigger:'blur'}]">
			      <deng-select-user :value="flowData.flowCoreData.hrs5_V" :CYUserSelectValue="flowData.flowCoreData.CYUserSelectValue_hrs5||[]" @submitdata="sethrs($event,'hrs5')" :readonly="(Flg=='VIEW')"/>
			    </el-form-item>
			  </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="te-item">
                <template>
					<!-- <el-button type="danger" size="mini" @click="tapProject">立项添加</el-button>  -->
                  <ele-table-editor
                    ref="table"
					addBtnText="非立项添加"
					:tabExtraBtns="tabExtraBtns"
                    :rules="rules"
                    :columns="columns"
                    :newColumnValue="newColumnValue"
                    :tableAttrs="{stripe:true,border:true}"
            		:isShowDelete="(Flg!='VIEW')"
            		:isShowAdd="(Flg!='VIEW')"
                    v-model="WF_WorkFlowContentD__YS"
                  />
                </template>
              </el-col>
            </el-row>
			<el-row>
				<el-col :span="8">
				  <el-form-item label="本次借款：" class="te-item" prop="flowCoreData.amt2" :rules="[{ required: true, message: '本次借款不能为空',trigger:'blur'}]">
				    <el-input v-model="flowData.flowCoreData.amt2" :readonly="(Flg=='VIEW')" clearable></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="8">
				  <el-form-item label="前期已借：" class="te-item" prop="flowCoreData.amt6" :rules="[{ required: true, message: '前期已借不能为空',trigger:'blur'}]">
				    <el-input v-model="flowData.flowCoreData.amt6" :readonly="(Flg=='VIEW')" clearable></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="8">
				  <el-form-item>
					<el-tooltip class="item" effect="dark" placement="left-start">
						<div slot="content">若借款流程发起后未归档又立即<br/>发起了新的借款则之前的借款流<br/>程中显示的前期已借可能不准确<br/>，请财务在审核时仍要对比借款<br/>报表！</div>
						<el-button size="mini">查看借款明细</el-button>
					</el-tooltip>
				  </el-form-item>
				</el-col>
			</el-row>
			<el-row>
			  <el-col :span="24" class="te-item">
			    <template>
			      <ele-table-editor
			        ref="table_cw"
			        :rules="rules_cw"
			        :columns="columns_cw"
			        :newColumnValue="newColumnValue_cw"
			        :tableAttrs="{stripe:true,border:true}"
					:isShowDelete="(Flg!='VIEW')"
					:isShowAdd="(Flg!='VIEW')"
			        v-model="cw_bankaccount__N"
			      />
			    </template>
			  </el-col>
			</el-row>
            <!-- 加载流程其它数据模块 -->
            <page-flow-foot :flow-data="flowData" :Flg="Flg"></page-flow-foot>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <template slot="footer">
      <!-- 按钮组   聚合(text/点击事件/加载状态/显示状态/typeORclass/iconName) -->
      <page-but-group 
		:pops="butgroup" 
		:flowData="flowData" 
		:popRef="$refs.flowData" 
		:FlowGUID="FlowGUID" 
		:tagName="tagName"
		:Flg="Flg"
		:chkArrStr="chkArrStr"
		@showThreeModal="showThreeModal" 
		@showFlowRebut="showFlowRebut" 
		@showPrint="showPrint"
		@showRea="showRea"
		@showMoney="showMoney"
	  />
    </template>
    <!-- 驳回弹窗 -->
    <page-dialog-rebut :pops="modalRebut" :FlowGUID="FlowGUID" :tagName="tagName"/>
    <!-- 合并 三个 转办/传阅/沟通-->
    <page-dialog-three :pops="modal" :flowData="flowData" :tagName="tagName"/>
    <!-- 打印弹窗 -->
	<page-dialog-print :pops="modalPrint" :flowData="flowData" :printRef="$refs.printDom1"/>
    <!-- 实际付款 -->
	<page-dialog-rea :pops="modalRea" :FlowGUID="FlowGUID" :flowData="flowData"/>
    <!-- 资金登记 -->
	<page-dialog-money :pops="modalMoney" :FlowGUID="FlowGUID" :flowData="flowData"/>
	<deng-search-table :pops="searchTableModal" :tableData="searchTable" @searchOK="searchOK" @tapOK="tapOK"/>
  </d2-container>
</template>
<script>
//http://www.mtsoftware.cn/download.html
import util from '@/libs/util.js';
import qs from "qs";
import myMixin from './js/public.js';
import { mapActions } from "vuex";
import { InitFlowInfo, OpenFlow,CW_YCLXJK_YS} from "@/api/flow/flow";
let _self = null;
export default {
	//https://github.com/dream2023/ele-table-editor
  name: "flow-flowaddpush-WFborrowFlowOtherV3Temp1",
  mixins: [myMixin],
  components: {
    'pageFlowHead': () => import(`./componnets/pageHeader`),
    'pageFlowFoot': () => import(`./componnets/pageFooter`),
    //'dengSelectUser': () => import(`@cps/deng-select-user`),
    'pageDialogRebut': () => import(`./componnets/pageDialogRebut`),
	'pageDialogThree': () => import(`./componnets/pageDialogThree`),
	'pageDialogPrint': () => import(`./componnets/pageDialogPrint`),
	'pageDialogRea': () => import(`./componnets/pageDialogRea`),
	'pageDialogMoney': () => import(`./componnets/pageDialogMoney`),
	'pageButGroup': () => import(`./componnets/pageButGroup`),
	'eleTableEditor': () => import(`ele-table-editor`),
	'deng-select-company':() => import(`@cps/deng-select-company`),
	'deng-search-table':() => import(`@cps/deng-search-table`)
  },
  data() {
    return {
		tagName:"",
		FlowTypeGUID: "",//页面暂存  提交数据使用
		FlowGUID: "",//流程ID
		Flg: "",//""新建  "EDT"编辑  "VIEW"明细
		flowTypeName: "",
		//配置提交数据的时候   哪些表格需要导入的数据
		//dullTableCof:[{tabName:"cw_bankaccount__N",fileds:["MGUID","Workflowguid"]}],
		chkArrStr:[],
		flowData: {
			flowBaseData: {},
			flowCoreData: { CYUserSelectValue_hrs: [], hrs_V: "" },
			relaFlowObj: [],
			annexData: [],
			agree: "同意",
			opinionData: "",
			printChk: ["打印表单", "打印流转意见"]
		},
		//按钮组
		butgroup:[
			{
				text:"暂存",
				tapAction:"submit",//点击按钮触发事件
				actionPar:{doType:"暂存"},//点击按钮带的参数
				loading:false,
				isShow:true,
				type:"primary",//type和class至少设值一个
				class:"",
				iconName:"floppy-o"
			},
			{
				text:"提交",
				tapAction:"submit",//点击按钮触发事件
				actionPar:{doType:"提交"},//点击按钮带的参数
				loading:false,
				isShow:true,
				type:"success",//type和class至少设值一个
				class:"",
				iconName:"check-square-o"
			},
			{
				text:"传阅",
				tapAction:"showThreeModal",//点击按钮触发事件
				actionPar:{
					modal:{
							title:"传阅流程",
							canMark:"more",
							dialogVisible:true,
							tapOK:"tapFlowCirculate"
						}
					},//点击按钮带的参数
				loading:false,
				isShow:true,
				type:"info",//type和class至少设值一个
				class:"",
				iconName:"envelope-o"
			},
			{
				text:"收回",
				tapAction:"tapFlowRetake",//点击按钮触发事件
				actionPar:{},//点击按钮带的参数
				loading:false,
				isShow:true,
				type:"",//type和class至少设值一个
				class:"btn-myc",
				iconName:"download"
			},
			{
				text:"沟通",
				tapAction:"showThreeModal",//点击按钮触发事件
				actionPar:{
					modal:{
							title:"沟通流程",
							canMark:"more",
							dialogVisible:true,
							tapOK:"tapFlowConsult"
						}
					},//点击按钮带的参数
				loading:false,
				isShow:true,
				type:"warning",//type和class至少设值一个
				class:"",
				iconName:"commenting-o"
			},
			{
				text:"转办",
				tapAction:"showThreeModal",//点击按钮触发事件
				actionPar:{
					modal:{
							title:"转办流程",
							canMark:"one",
							dialogVisible:true,
							tapOK:"tapFlowTurnDo"
						}
					},//点击按钮带的参数
				loading:false,
				isShow:true,
				type:"",//type和class至少设值一个
				class:"btn-mya",
				iconName:"envelope-open-o"
			},
			{
				text:"驳回",
				tapAction:"showFlowRebut",//点击按钮触发事件
				actionPar:{},//点击按钮带的参数
				loading:false,
				isShow:true,
				type:"",//type和class至少设值一个
				class:"btn-myd",
				iconName:"comment-o"
			},
			{
				text:"打印",
				tapAction:"showPrint",//点击按钮触发事件
				actionPar:{},//点击按钮带的参数
				loading:false,
				isShow:true,
				type:"danger",//type和class至少设值一个
				class:"",
				iconName:"print"
			},
			{
				text:"实际付款",
				tapAction:"showRea",//点击按钮触发事件
				actionPar:{},//点击按钮带的参数
				loading:false,
				isShow:true,
				type:"",//type和class至少设值一个
				class:"btn-mya",
				iconName:"credit-card"
			},
			{
				text:"资金登记",
				tapAction:"showMoney",//点击按钮触发事件
				actionPar:{},//点击按钮带的参数
				loading:false,
				isShow:true,
				type:"",//type和class至少设值一个
				class:"btn-myb",
				iconName:"pencil-square-o"
			}
		],
		//驳回弹窗
		modalRebut:{
			title:"",
			CYUserSelectValue: [],
			dialogVisible: false,
			btnLoading:false
		},
		//合并弹窗 转办/传阅/沟通
		modal: {
			title: "",
			CYUserSelectValue: [],
			canMark: "more",
			dialogVisible: false,
			btnLoading: false,
			tapOK: ""
		},
		//打印相关参数
		modalPrint:{
			dialogVisible: false
		},
		//实际付款
		modalRea:{
			dialogVisible: false,
			btnLoading: false
		},
		//资金登记
		modalMoney:{
			dialogVisible: false,
			btnLoading: false
		},
		// 表格数据(预算控制)
		WF_WorkFlowContentD__YS: [],
		newColumnValue: {//text20  1立项添加   0非立项添加  amt5立项添加为1  非立项添加为0   text35 选立项添加弹窗把GUID赋值给他
		  //GUID:util.newGUID(),
		  //MGUID:"121",
		  Text11:"",text5:"",date2:"",text1:"",amt3:"",amt4:"",amt2:"",amt5:"0",amt1:"",text20:"0"
		},
		// 校检规则
		rules: {
		},
		// 表头其它按钮
		tabExtraBtns: [
		  {
			// text 按钮显示的文本
			text: '立项添加',
			// 按钮的属性
			attrs: {
			  type: 'primary',
			  size:"mini"
			  
			},
			// click事件
			click() {
			  /* eslint-disable */
			  //_self.searchTableModal = {title:"标题1",formItems,dialogVisible:true}
			  _self.searchTableModal.title="标题1111";
			  _self.searchTableModal.dialogVisible=true;
			  console.log('立项添加2222222222221')
			}
		  }
		],
		// 表格列
		columns: [
		  {
		    // el-table-column 的属性
		    label: "...",
		    type: "index",
		    align: "center"
		  },
		  {
		    prop: "Text11",
		    label: "费用项目",
		    width: "110",
		    align: "center",
		    content: {
		      type: "deng-select-costpor",
		      attrs: {
		        size: "mini",
		        width: "110",
				readonly:false//(_self.Flg=='VIEW')
		      },
			  'setSelected':(e,scope,idx)=>{
			    console.log('setSelected1111',e,scope,idx)
				_self.WF_WorkFlowContentD__YS[idx].text10 = e.GUID
				_self.WF_WorkFlowContentD__YS[idx].text11 = e.CodeName
				_self.canderYS(idx)
			  }
		    }
		  },
		  {
		    prop: "text5",
		    label: "使用人",
		    align:"center",
		    content: {
		      type: "deng-select-user",
		      attrs: {
		        size: "mini",
		        width: "110",
				canMark:"one",
				CYUserSelectValue:[],
				readonly:false//(_self.Flg=='VIEW')
		      },
			  'submitdata':(us,scope,idx)=>{
			    console.log('编辑表格中选人1111',us,scope,idx)
				_self.WF_WorkFlowContentD__YS[idx].text7 = us[0].GUID
				_self.WF_WorkFlowContentD__YS[idx].text5 = us[0].UserName
			  }
		    }
		  },
		  {
		    prop: "date2",
		    label: "预算年限",
		    width: "160",
		    align: "center",
		    // 当有 content 属性时, 可以指定相应的组件
		    content: {
		      // type 可以为全局注册的组件名或者组件引用
		      type: "el-date-picker",
		      // attrs 是组件的属性  type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" style="width: 160px;"
		      attrs: {
		        type: "date",
		        placeholder: "选择日期",
		        "value-format": "yyyy-MM-dd",
		        size: "mini"
		      },
			  'change':(val,row,idx)=>{
				  _self.canderYS(idx)
			  }
		    }
		  },
		  {
		    prop: "text1",
		    label: "预算科目",
		    align:"center",
		    content: {
		      type: "deng-select-subject",
		      attrs: {
		        size: "mini",
		        width: "110",
				readonly:false//(_self.Flg=='VIEW')
		      },
			  setSubject:(e,scope,idx)=>{
					console.log('setSubject',e,scope,idx)
					_self.WF_WorkFlowContentD__YS[idx].text2 = e.GUID
					_self.WF_WorkFlowContentD__YS[idx].text1 = e.CostName
					_self.canderYS(idx)
			  } 
		    }
		  },
		  {
		    prop: "amt3",
		    label: "年预算(¥)",
		    width: "90",
		    align: "center"
		  },
		  {
		    prop: "amt4",
		    label: "累计月预算(¥)",
		    width: "90",
		    align: "center"
		  },
		  {
		    prop: "amt2",
		    label: "累计已发生(¥)",
		    width: "90",
		    align: "center"
		  },
		  {
		    prop: "amt5",
		    label: "立项金额(¥)",
		    width: "90",
		    align: "center"
		  },
		  {
		    prop: "amt1",
		    label: "分摊金额(¥)",
		    width: "90",
		    align: "center",
		    content: {
		      type: "el-input",
		      attrs: {
		        size: "mini",
		        width: "110",
				readonly:false//(_self.Flg=='VIEW')
		      },
			  'change':(val,row,idx)=>{
				  _self.canderamt1(idx)
			  }
		    }
		  }
		],
		// 表格数据(账户填入)
		cw_bankaccount__N: [],
		newColumnValue_cw: {
		  //GUID:util.newGUID(),
		  //MGUID:"121",
		  BankName:"",AccountName:"",AccountNo:"",AccountMeony:"",AccountMeony:"",memo:"",GUID:"",MGUID:"",Workflowguid:""
		},
		// 校检规则
		rules_cw: {
		},
		// 表格列
		columns_cw: [
		  {
		    // el-table-column 的属性
		    label: "...",
		    type: "index",
		    align: "center"
		  },
		  {
		    prop: "BankName",
		    label: "银行",
		    width: "260",
		    align: "center",
		    content: {
		      type: "el-input",
		      attrs: {
		        size: "mini",
		        width: "260"
		      }
		    }
		  },
		  {
		    prop: "AccountName",
		    label: "账户名",
		    width: "260",
		    align: "center",
		    content: {
		      type: "el-input",
		      attrs: {
		        size: "mini",
		        width: "260"
		      }
		    }
		  },
		  {
		    prop: "AccountNo",
		    label: "账号",
		    width: "260",
		    align: "center",
		    content: {
		      type: "el-input",
		      attrs: {
		        size: "mini",
		        width: "260"
		      }
		    }
		  },
		  {
		    prop: "AccountMeony",
		    label: "金额",
		    width: "260",
		    align: "center",
		    content: {
		      type: "el-input",
		      attrs: {
		        size: "mini",
		        width: "260"
		      }
		    }
		  },
		  {
		    prop: "memo",
		    label: "备注",
		    width: "260",
		    align: "center",
		    content: {
		      type: "el-input",
		      attrs: {
		        size: "mini",
		        width: "260"
		      }
		    }
		  },
		],
		searchTableModal:{dialogVisible:false,title:'表格',formItems:[{lable:'姓名',prop:"aa",width: "110",content:{type:'el-input',attrs:{sizi:'mini',placeholder:'姓名'}}},{lable:'年龄',prop:'bb',content:{type:'el-input',attrs:{sizi:'mini',placeholder:'年龄'}}}],tablePop:[{label:'姓名',field:"name"},{label:'年龄',field:"age"}]},
		searchTable:[]
	};
  },
  created() {
    let that = this
	_self = that
	that.tagName = 'flow-'+that.$vnode.tag.split('-flow-')[1]
    that.FlowTypeGUID = that.$route.query.GUID;
    that.flowTypeName = that.$route.query.name;
    that.FlowGUID = that.$route.query.FlowGUID;
    that.Flg = that.$route.query.Flg || ""
    if (that.Flg) {
      if ("EDT" == that.Flg||"VIEW" == that.Flg) {
        //初始化页面数据
        that.OpenFlow({ FlowGUID: that.FlowGUID }).then((res) => {
          that.flowData.flowBaseData = util.assignObj(that.flowData.flowBaseData, res.data.flowBaseData);
          that.flowData.flowCoreData = util.assignObj(that.flowData.flowCoreData, res.data.flowCoreData);
          that.flowData.flowTabsData = util.assignObj(that.flowData.flowTabsData, res.data.flowTabsData);
          that.flowData.annexData = res.data.annexData||[];
          that.flowData.relaFlowObj = res.data.relaFlowObj||[];
          that.flowData.hisOpinionData = res.data.hisOpinionData||[];
          that.flowData.flowBaseData = util.doCoreObj(that.flowData.flowBaseData,that.flowData.flowBaseData);
          that.flowData.flowCoreData = util.doCoreObj(that.flowData.flowCoreData,that.flowData.flowCoreData);
		  that.WF_WorkFlowContentD__YS = that.flowData.flowTabsData.WF_WorkFlowContentD__YS
		  that.cw_bankaccount__N = that.flowData.flowTabsData.cw_bankaccount__N
        });
      }
    } else {
      //初始化页面新建模板数据
      that.initData({ FlowTypeGUID: that.FlowTypeGUID }).then((res) => {
        that.flowData.flowBaseData = util.assignObj(that.flowData.flowBaseData, res.data.flowBaseData);
        that.flowData.flowCoreData = util.assignObj(that.flowData.flowCoreData, res.data.flowCoreData);
        that.flowData.flowBaseData = util.doCoreObj(that.flowData.flowBaseData,that.flowData.flowBaseData);
        that.flowData.flowCoreData = util.doCoreObj(that.flowData.flowCoreData,that.flowData.flowCoreData);
      });
    }

    console.log('FlowTypeGUID:', that.FlowTypeGUID)
    //禁用f5
    that.stopF5Refresh()
    //禁用浏览器刷新
    //window.addEventListener('beforeunload', e => that.beforeunloadHandler(e))
  },
  methods: {
    ...mapActions("d2admin/flow", ["initData", "OpenFlow"]),
    test() {
      this.$message({ message: `敬请期待！`, type: 'info' })
    },
    //如果包含其它打印项(如附件) 弹出选择打印
    showPrint() {
      this.modalPrint.dialogVisible = true
    },
    //导出选取的人员信息
    //后台要的数据结构 '@123=小明,234=小红'  如果为空则为@
    sethrs(users,HRMark) {
		let that = this
		console.log('users=>', users)
		let tmpArr = users.map((item) => { return `${item.GUID}=${item.UserName}` })
		that.flowData.flowCoreData[`${HRMark}`] = '@' + tmpArr.join(',');
		that.flowData.flowCoreData[`CYUserSelectValue_${HRMark}`] = users;
    },
	//转办/传阅/沟通 弹窗显示
	showThreeModal(modal){
		let that = this
		console.log(111,modal)
		let Subject = that.flowData.flowBaseData.Subject
		//let title = modal.title+`[${Subject}]`
		that.modal = modal
		//that.modal.title = title;
		that.modal.dialogVisible = true
	},
    //弹出驳回弹窗
    showFlowRebut() {
      let that = this
	  let Subject = that.flowData.flowBaseData.Subject
	  that.modalRebut.title = `驳回流程[${Subject}]`;
	  that.modalRebut.dialogVisible = true
	  that.modalRebut.btnLoading = false
    },
    //实际付款弹窗
    showRea() {
      this.modalRea.dialogVisible = true
    },
    showMoney() {
      this.modalMoney.dialogVisible = true
    },
	setSelected(GUID,text){
		this.flowData.flowCoreData[text] = GUID
	},
	//立项添加
	tapProject(){
		
	},
	searchOK(e){
		console.log(1212121,e)
		this.searchTable = [{name:"zhangsan",age:'18'},{name:"zhangsan1",age:'181'},{name:"zhangsan2",age:'138'}]
	},
	tapOK(row){
		console.log(11,row)
	},
	//计算累计年预算/累计月预算/累计已发生
	//SubGUID预算科目   ProjectGUID费用项目  SDate预算年限  FlowGUID流程id
	canderYS(idx){
		let that = this
		let par = {ProjectGUID:(that.WF_WorkFlowContentD__YS[idx].text10),SubGUID:(that.WF_WorkFlowContentD__YS[idx].text2),SDate:util.dateFtt("yyyy-MM-dd",that.WF_WorkFlowContentD__YS[idx].date2,"-"),FlowGUID:that.FlowGUID}
		console.log(111,par)
		CW_YCLXJK_YS(qs.stringify(par)).then(async res => {
		        if (typeof (res) != 'undefined' && res.code == 0) {
					that.WF_WorkFlowContentD__YS[idx].amt3 = res.data.YearMoney||0;//年预算
					that.WF_WorkFlowContentD__YS[idx].amt4 = res.data.SumMonthMoney||0;//累计月预算
					that.WF_WorkFlowContentD__YS[idx].amt2 = res.data.LJMoney||0;//累计已发生
 		        }
		      })
		        .catch(err => {
		          console.log('err: ', err)
		        })
	},
	//分摊金额可输入值
	canderamt1(idx){
		let that = this
		let text20 = that.WF_WorkFlowContentD__YS[idx].text20;
		let amt1 = that.WF_WorkFlowContentD__YS[idx].amt1;
		let amt2 = that.WF_WorkFlowContentD__YS[idx].amt2;
		let amt4 = that.WF_WorkFlowContentD__YS[idx].amt4;
		let amt5 = that.WF_WorkFlowContentD__YS[idx].amt5;
		if("0"==text20){// 非立项添加
			if(amt1>(amt4-amt2)){
				that.$message({ message: "本次分摊预算大于累计月预算-累计已发生，不能提交！", type: 'error' })
				if(!that.chkArrStr.includes("本次分摊预算大于累计月预算-累计已发生，不能提交！")){
					that.chkArrStr.push("本次分摊预算大于累计月预算-累计已发生，不能提交！")
				}
			}else{
				
			}
		}else if("1"==text20){//立项添加
			if(amt1>amt5){
				that.$message({ message: "本次分摊预算大于立项金额，不能提交! ", type: 'error' })
				if(!that.chkArrStr.includes("本次分摊预算大于立项金额，不能提交! ")){
					that.chkArrStr.push("本次分摊预算大于立项金额，不能提交! ")
				}
			}
		}
	}
  }
}
</script>
<style>
.te-item {
  margin-left: 0.9375rem;
}
.btn-mya {
  color: #fff;
  background-color: #8b83d2;
  border-color: #8b83d2;
}
.btn-mya:hover {
  background-color: #9390f0;
  border-color: #8b83d2;
  color: #fff;
}
.btn-mya:focus {
  background-color: #8b83d2;
  border-color: #8b83d2;
}

.btn-myb {
  color: #fff;
  background-color: #55557f;
  border-color: #55557f;
}
.btn-myb:hover {
  background-color: #62667f;
  border-color: #55557f;
  color: #fff;
}
.btn-myb:focus {
  background-color: #55557f;
  border-color: #55557f;
}

.btn-myd {
  color: #fff;
  background-color: #27003b;
  border-color: #27003b;
}
.btn-myd:hover {
  background-color: #3b0131;
  border-color: #27003b;
  color: #fff;
}
.btn-myd:focus {
  background-color: #27003b;
  border-color: #27003b;
}

 

</style>

<style media='print'>
@page {
  size: auto;
  margin: 5mm 5mm 2mm 5mm;
}
</style>

