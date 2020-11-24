<!-- page 工程费用借款 -->
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
			  <el-col :span="24">
			    <el-form-item label="公司名称：" class="te-item" prop="flowCoreData.text2" :rules="[{ required: true, message: '公司名称不能为空',trigger:'blur'}]">
			      <deng-select-company :value="flowData.flowCoreData.text2" :comType="'CW'" @setSelected="setSelected($event,'text2')" :disabled="(Flg=='VIEW')"/>
			    </el-form-item>
			  </el-col>
			</el-row>
			<!-- 合同及请款信息 -->
			<el-row>
			  <el-col :span="11">
			    <el-form-item label="合同名称：" class="te-item" prop="flowCoreData.text6" :rules="[{ required: true, message: '合同名称不能为空',trigger:'blur'}]">
			      <deng-select-contract :value="flowData.flowCoreData.text6" @selectOK="selectOK($event,'text6')" :readonly="(Flg=='VIEW')"/>
			    </el-form-item>
			  </el-col>
			  <el-col :span="11">
			    <el-form-item label="合同编号：" class="te-item" prop="flowCoreData.text7" :rules="[{ required: true, message: '合同编号不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入合同编号" v-model="flowData.flowCoreData.text7" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="2">
					<el-button style="width: 80%;margin-left: 10px;" size="mini" icon="el-icon-date" title="合同金额调整记录">
					</el-button>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="7">
			    <el-form-item label="合同原金额：" class="te-item" prop="flowCoreData.amt15" :rules="[{ required: true, message: '合同原金额不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入合同原金额" v-model="flowData.flowCoreData.amt15" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="7">
			    <el-form-item label="调整后金额：" class="te-item" prop="flowCoreData.amt15" :rules="[{ required: true, message: '调整后金额不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入调整后金额" v-model="flowData.flowCoreData.amt15" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="累计支付(¥)：" class="te-item" prop="flowCoreData.text29" :rules="[{ required: true, message: '已累计支付不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入已累计支付" v-model="flowData.flowCoreData.text29" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="2">
					<el-button style="width: 80%;margin-left: 10px;" size="mini" icon="el-icon-date" title="合同付款记录">
					</el-button>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="6">
			    <el-form-item label="合同结算金额：" class="te-item" prop="flowCoreData.amt13" :rules="[{ required: true, message: '合同结算金额不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入合同结算金额" v-model="flowData.flowCoreData.amt13" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item label="期初支付(¥)：" class="te-item" prop="flowCoreData.text33" :rules="[{ required: true, message: '期初支付不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入期初支付" v-model="flowData.flowCoreData.text33" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item label="累计已请(¥)：" class="te-item" prop="flowCoreData.text34" :rules="[{ required: true, message: '累计已请不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入累计已请" v-model="flowData.flowCoreData.text34" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item label="剩余可清金额：" class="te-item" prop="flowCoreData.text36" :rules="[{ required: true, message: '剩余可清金额不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入剩余可清金额" v-model="flowData.flowCoreData.text36" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="11">
			    <el-form-item label="成本结算流程：" class="te-item" prop="flowCoreData.text46" :rules="[{ required: true, message: '合同名称不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入合同编号" v-model="flowData.flowCoreData.text46" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="11">
			    <el-form-item label="财务决算流程：" class="te-item" prop="flowCoreData.text47" :rules="[{ required: true, message: '合同编号不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入合同编号" v-model="flowData.flowCoreData.text47" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="2">
					<el-button style="width: 80%;margin-left: 10px;" size="mini" icon="el-icon-date" title="合同变更记录">
					</el-button>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="6">
			    <el-form-item label="请填写金额(¥)：" class="te-item" prop="flowCoreData.text6" :rules="[{ required: true, message: '金额不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入金额" v-model="flowData.flowCoreData.text7" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="18">
			    <el-form-item label="大写：" class="te-item" prop="flowCoreData.text7" :rules="[{ required: true, message: '金额大写不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入金额大写" v-model="flowData.flowCoreData.text7" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>
			<!-- 还有其他字段 从deng-select-contract组件中加载 -->
			<el-row>
			  <el-col :span="24">
			    <el-form-item label="款项类别：" class="te-item" prop="flowCoreData.text17" :rules="[{ required: true, message: '请示类型不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text17" :disabled="(Flg=='VIEW')">
			        <el-radio label="预付款"></el-radio>
					<el-radio label="进度款"></el-radio>
					<el-radio label="验收款"></el-radio>
					<el-radio label="结算款"></el-radio>
					<el-radio label="质保金"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
		  </el-row>
		  <el-row>
			  <el-col :span="6">
			    <el-form-item label="样板房支付：" class="te-item" prop="flowCoreData.text17" :rules="[{ required: true, message: '请示类型不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text17" :disabled="(Flg=='VIEW')">
			        <el-radio label="是"></el-radio>
					<el-radio label="否"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item label="商业相关：" class="te-item" prop="flowCoreData.text48" :rules="[{ required: true, message: '请示类型不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text48" :disabled="(Flg=='VIEW')">
			        <el-radio label="是"></el-radio>
			        <el-radio label="否"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			</el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="相关审批人：" class="te-item" prop="flowCoreData.hrs" :rules="[{ required: true, message: '相关审批人不能为空',trigger:'blur'}]">
                  <deng-select-user :value="flowData.flowCoreData.hrs_V" :CYUserSelectValue="flowData.flowCoreData.CYUserSelectValue_hrs||[]" @submitdata="sethrs($event,'hrs')" :readonly="(Flg=='VIEW')"/>
                </el-form-item>
              </el-col>
		  </el-row>
		  <el-row>
			  <el-col :span="24">
			    <el-form-item label="项目专业选择：" class="te-item" prop="flowCoreData.text45" :rules="[{ required: true, message: '请示类型不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text45" :disabled="(Flg=='VIEW')">
			        <el-radio label="建筑"></el-radio>
					<el-radio label="景观"></el-radio>
					<el-radio label="装修"></el-radio>
					<el-radio label="结构"></el-radio>
					<el-radio label="机电"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
            </el-row>
            <!-- 抵房信息 -->
            <el-row style="margin-bottom: 18px">
              <el-col>
                <span><b><i class="el-icon-s-unfold"></i>抵房信息</b></span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="相关抵房协议：" class="te-item" prop="flowCoreData.text2" :rules="[{ required: true, message: '公司名称不能为空',trigger:'blur'}]">
                  <deng-select-company :value="flowData.flowCoreData.text2" :comType="'CW'" @setSelected="setSelected($event,'text2')" :disabled="(Flg=='VIEW')"/>
                </el-form-item>
              </el-col>
            </el-row>
			<el-row>
			  <el-col :span="8">
			    <el-form-item label="是否抵房：" class="te-item" prop="flowCoreData.text32" :rules="[{ required: true, message: '是否抵房不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text32" :disabled="(Flg=='VIEW')">
			        <el-radio label="是"></el-radio>
					<el-radio label="否"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="抵房金额(¥)：" class="te-item" prop="flowCoreData.text2" :rules="[{ required: true, message: '公司名称不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入抵房金额" v-model="flowData.flowCoreData.text7" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="抵房余额(¥)：" class="te-item" prop="flowCoreData.text2" :rules="[{ required: true, message: '公司名称不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入抵房金额" v-model="flowData.flowCoreData.text7" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="6">
			    <el-form-item label="本次抵房(¥)：" class="te-item" prop="flowCoreData.text6" :rules="[{ required: true, message: '本次抵房金额不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入本次抵房金额" v-model="flowData.flowCoreData.text7" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="18">
			    <el-form-item label="大写：" class="te-item" prop="flowCoreData.text7" :rules="[{ required: true, message: '金额大写不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入金额大写" v-model="flowData.flowCoreData.text7" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>
			<!-- 房源信息 -->
			<el-row>
			  <el-col :span="24" class="te-item">
			    <template>
			      <ele-table-editor
			        ref="table"
			        :rules="rules"
			        :columns="columns"
			        :newColumnValue="newColumnValue"
			        :tableAttrs="{stripe:true,border:true}"
					:isShowDelete="false"
					:isShowAdd="false"
			        v-model="WF_WorkFlowContentD__DF"
			      />
			    </template>
			  </el-col>
			</el-row>
			<!-- 冲账明细 -->
			<el-row style="margin-bottom: 18px">
			  <el-col>
			    <span><b><i class="el-icon-s-unfold"></i>冲账明细</b></span>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="24" class="te-item">
			    <template>
			      <ele-table-editor
			        ref="table2"
			        :rules="rules2"
			        :columns="columns2"
			        :newColumnValue="newColumnValue2"
			        :tableAttrs="{stripe:true,border:true}"
					:isShowDelete="(Flg!='VIEW')"
					:isShowAdd="(Flg!='VIEW')"
			        v-model="WF_WorkFlowContentD__CZ"
			      />
			    </template>
			  </el-col>
			</el-row>
			<!-- 扣款信息 -->
			<el-row style="margin-bottom: 18px">
			  <el-col>
			    <span><b><i class="el-icon-s-unfold"></i>扣款信息</b></span>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="24" class="te-item">
			    <template>
			      <ele-table-editor
			        ref="table3"
			        :rules="rules3"
			        :columns="columns3"
			        :newColumnValue="newColumnValue3"
			        :tableAttrs="{stripe:true,border:true}"
					:isShowDelete="(Flg!='VIEW')"
					:isShowAdd="(Flg!='VIEW')"
			        v-model="WF_WorkFlowContentD__KK"
			      />
			    </template>
			  </el-col>
			</el-row>
			<!-- 账户填入 -->
			<el-row style="margin-bottom: 18px">
			  <el-col>
			    <span><b><i class="el-icon-s-unfold"></i>账户填入</b></span>
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
            <page-flow-foot :flow-data="flowData" :Flg="Flg"/>
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
		:dullTableCof="[]"
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
  </d2-container>
</template>
<script>
//http://www.mtsoftware.cn/download.html
import util from '@/libs/util.js';
import qs from "qs";
import myMixin from './js/public.js';
import { mapActions } from "vuex";
import { InitFlowInfo, OpenFlow } from "@/api/flow/flow";
let _self = null;
export default {
	//https://github.com/dream2023/ele-table-editor
  name: "flow-flowaddpush-WorkRequestTemp1",
  mixins: [myMixin],
  components: {
    'pageFlowHead': () => import(`./componnets/pageHeader`),
    'pageFlowFoot': () => import(`./componnets/pageFooter`),
    'dengSelectUser': () => import(`@cps/deng-select-user`),
    'pageDialogRebut': () => import(`./componnets/pageDialogRebut`),
	'pageDialogThree': () => import(`./componnets/pageDialogThree`),
	'pageDialogPrint': () => import(`./componnets/pageDialogPrint`),
	'pageDialogRea': () => import(`./componnets/pageDialogRea`),
	'pageDialogMoney': () => import(`./componnets/pageDialogMoney`),
	'pageButGroup': () => import(`./componnets/pageButGroup`),
	'deng-select-company':() => import(`@cps/deng-select-company`),
	'deng-select-contract':() => import(`@cps/deng-select-contract`),
	'eleTableEditor': () => import(`ele-table-editor`)
  },
  data() {
    return {
		tagName:"",
		FlowTypeGUID: "",//页面暂存  提交数据使用
		FlowGUID: "",//流程ID
		Flg: "",//""新建  "EDT"编辑  "VIEW"明细
		flowTypeName: "",
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
		// 表格数据(房源信息)
		WF_WorkFlowContentD__DF: [],
		newColumnValue: {
		  //GUID:util.newGUID(),
		  //MGUID:"121",
		  text6:"",text1:"",text2:"",amt3:"",amt1:"",MGUID:"",GUID:""
		},
		// 校检规则
		rules: {
		},
		// 表格列
		columns: [
		  {
		    // el-table-column 的属性
		    label: "...",
		    type: "index",
		    align: "center"
		  },
		  {
		    prop: "text6",
		    label: "房源项目",
		    width: "110",
		    align: "center"
		  },
		  {
		    prop: "text1",
		    label: "房间号",
		    align:"center"
		  },
		  {
		    prop: "text2",
		    label: "状态",
		    width: "160",
		    align: "center"
		  },
		  {
		    prop: "amt3",
		    label: "房间总价",
		    align:"center"
		  },
		  {
		    prop: "amt1",
		    label: "抵房金额",
		    width: "90",
		    align: "center"
		  }
		],
		// 表格数据(冲账明细)
		WF_WorkFlowContentD__CZ: [],
		newColumnValue2: {
		  //GUID:util.newGUID(),
		  //MGUID:"121",
		  text1:"",text2:"",text3:"",amt1:"",amt3:"",amt2:"",text4:"",GUID:"",MGUID:""
		},
		// 校检规则
		rules2: {
		},
		// 表格列
		columns2: [
		  {
		    // el-table-column 的属性
		    label: "...",
		    type: "index",
		    align: "center"
		  },
		  {
		    prop: "text1",
		    label: "借款人",
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
				_self.WF_WorkFlowContentD__CZ[idx].text7 = us[0].GUID
				_self.WF_WorkFlowContentD__CZ[idx].text5 = us[0].UserName
			  }
		    }
		  },
		  {
		    prop: "text3",
		    label: "借款流程主题",
		    width: "160",
		    align: "center",
		    // 当有 content 属性时, 可以指定相应的组件
		    content: {
		      // type 可以为全局注册的组件名或者组件引用
		      type: "el-input",
		      // attrs 是组件的属性  type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" style="width: 160px;"
		      attrs: {
		        type: "text",
		        size: "mini"
		      }
		    }
		  },
		  {
		    prop: "amt1",
		    label: "借款金额(¥)",
		    align:"center",
		    content: {
		      type: "el-input",
		      attrs: {
		        size: "mini",
		        width: "110",
				readonly:true
		      }
		    }
		  },
		  {
		    prop: "amt3",
		    label: "归还金额(¥)",
		    width: "90",
		    align: "center",
		    content: {
		      type: "el-input",
		      attrs: {
		        size: "mini",
		        width: "110"
		      }
		    }
		  },
		  {
		    prop: "amt2",
		    label: "冲账金额(¥)",
		    width: "90",
		    align: "center",
		    content: {
		      type: "el-input",
		      attrs: {
		        size: "mini",
		        width: "110",
				readonly:true
		      }
		    }
		  }
		],
		// 表格数据(扣款信息)
		WF_WorkFlowContentD__KK: [],
		newColumnValue3: {
		  //GUID:util.newGUID(),
		  //MGUID:"121",
		  text1:"",text2:"",amt1:"",memotext:"",GUID:"",MGUID:""
		},
		// 校检规则
		rules3: {
		},
		// 表格列
		columns3: [
		  {
		    // el-table-column 的属性
		    label: "...",
		    type: "index",
		    align: "center"
		  },
		  {
		    prop: "text1",
		    label: "扣款来源",
		    width: "110",
		    align: "center",
		    content: {
		      type: "el-input",
		      attrs: {
		        size: "mini",
		        width: "110",
				readonly:true
		      }
		    }
		  },
		  {
		    prop: "text2",
		    label: "扣款项名称",
		    align:"center",
		    content: {
		      type: "el-select",
		      attrs: {
		        size: "mini",
		        width: "110",
		      },
				// 用于指定选项
				options: [ { text: '北京', value: 'beijing' }, { text: '上海', value: 'shanghai'} ],
				// 同上, 用于当 options的key不是 text 和 value 时指定key和value
				prop: {
				  text: 'text',
				  value: 'value'
				}
		    }
		  },
		  {
		    prop: "amt1",
		    label: "扣款金额(¥)",
		    width: "160",
		    align: "center",
		    // 当有 content 属性时, 可以指定相应的组件
		    content: {
		      // type 可以为全局注册的组件名或者组件引用
		      type: "el-input",
		      // attrs 是组件的属性  type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" style="width: 160px;"
		      attrs: {
		        type: "text",
		        placeholder: "扣款金额",
		        size: "mini"
		      }
		    }
		  },
		  {
		    prop: "memotext",
		    label: "备注",
		    align:"center",
		    content: {
		      type: "el-input",
		      attrs: {
		        size: "mini",
		        width: "110"
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
		  that.WF_WorkFlowContentD__DF = that.flowData.flowTabsData.WF_WorkFlowContentD__DF
		  that.WF_WorkFlowContentD__CZ = that.flowData.flowTabsData.WF_WorkFlowContentD__CZ
		  that.WF_WorkFlowContentD__KK = that.flowData.flowTabsData.WF_WorkFlowContentD__KK
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

