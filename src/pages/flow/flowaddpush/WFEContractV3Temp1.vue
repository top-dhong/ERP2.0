<!-- page 合同审批(工程类) -->
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
			  <el-col :span="8">
			    <el-form-item label="标段：" class="te-item" prop="flowCoreData.text7" :rules="[{ required: true, message: '标段不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入标段" v-model="flowData.flowCoreData.text7" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="框架合同(或单价)：" class="te-item" prop="flowCoreData.text35" :rules="[{ required: true, message: '营销相关不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text35" :disabled="(Flg=='VIEW')">
			        <el-radio label="是"></el-radio>
			        <el-radio label="否"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="合同性质：" class="te-item" prop="flowCoreData.text12" :rules="[{ required: true, message: '合同性质不能为空',trigger:'blur'}]">
			      <el-select v-model="flowData.flowCoreData.text12" placeholder="请选择" style="width: 100%" :disabled="(Flg=='VIEW')">
			        <el-option label="执行合同" value="执行合同"/>
					<el-option label="补充合同" value="补充合同"/>
					<el-option label="框架合同" value="框架合同"/>
			      </el-select>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="16">
			    <el-form-item label="合同名称：" class="te-item" prop="flowCoreData.text6" :rules="[{ required: true, message: '合同名称人不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入合同名称" v-model="flowData.flowCoreData.text6" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="合同编号：" class="te-item" prop="flowCoreData.text9" :rules="[{ required: true, message: '合同编号不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入合同编号" v-model="flowData.flowCoreData.text9" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="8">
			    <el-form-item label="合同金额：" class="te-item" prop="flowCoreData.amt1" :rules="[{ required: true, message: '合同金额人不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入合同金额" v-model="flowData.flowCoreData.amt1" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="16">
			    <el-form-item label="大写：" class="te-item" prop="flowCoreData.amt10" :rules="[{ required: true, message: '金额大写不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入金额大写" v-model="flowData.flowCoreData.amt10" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="8">
			    <el-form-item label="合同终止日期：" class="te-item" prop="flowCoreData.date7" :rules="[{ required: true, message: '合同终止日期不能为空',trigger:'blur'}]">
			      <el-date-picker style="width:100%;" v-model="flowData.flowCoreData.date7" :readonly="(Flg=='VIEW')" type="date" placeholder="请选择"/>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="合同分类：" class="te-item" prop="flowCoreData.text14" :rules="[{ required: true, message: '营销相关不能为空',trigger:'blur'}]">
			       <deng-select-project></deng-select-project>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="8">
			    <el-form-item label="是否单独执行：" class="te-item" prop="flowCoreData.yesno" :rules="[{ required: true, message: '是否单独执行不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.yesno" :disabled="(Flg=='VIEW')">
			        <el-radio label="是"></el-radio>
			        <el-radio label="否"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="乙方单位：" class="te-item" prop="flowCoreData.text18" :rules="[{ required: true, message: '营销相关不能为空',trigger:'blur'}]">
			       <deng-select-project></deng-select-project>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="工程类型：" class="te-item" prop="flowCoreData.yesno" :rules="[{ required: true, message: '工程类型不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.yesno" :disabled="(Flg=='VIEW')">
			        <el-radio label="安装工程"></el-radio>
			        <el-radio label="非安装工程"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="8">
			    <el-form-item label="开户银行：" class="te-item" prop="flowCoreData.text19" :rules="[{ required: true, message: '开户银行不能为空',trigger:'blur'}]">
			       <el-input placeholder="请输入开户银行" v-model="flowData.flowCoreData.text19" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="户名：" class="te-item" prop="flowCoreData.text20" :rules="[{ required: true, message: '户名不能为空',trigger:'blur'}]">
			       <el-input placeholder="请输入户名" v-model="flowData.flowCoreData.text20" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="账号：" class="te-item" prop="flowCoreData.text21" :rules="[{ required: true, message: '账号不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入账号" v-model="flowData.flowCoreData.text21" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="6">
			    <el-form-item label="对方经办人：" class="te-item" prop="flowCoreData.text22" :rules="[{ required: true, message: '对方经办人不能为空',trigger:'blur'}]">
			       <el-input placeholder="请输入对方经办人" v-model="flowData.flowCoreData.text22" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item label="经办人职务：" class="te-item" prop="flowCoreData.text23" :rules="[{ required: true, message: '经办人职务不能为空',trigger:'blur'}]">
			       <el-input placeholder="请输入经办人职务" v-model="flowData.flowCoreData.text23" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item label="联系电话：" class="te-item" prop="flowCoreData.text24" :rules="[{ required: true, message: '联系电话不能为空',trigger:'blur'}]">
			      <el-input placeholder="请输入联系电话" v-model="flowData.flowCoreData.text24" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			  
			  <!-- 相关部门会审 -->
			  
			  
			  
			  
			   
			</el-row>
			<el-row>
			  <el-col :span="8">
			    <el-form-item label="合同类型：" class="te-item" prop="flowCoreData.text50" :rules="[{ required: true, message: '合同类型不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text50" :disabled="(Flg=='VIEW')">
			        <el-radio label="收入合同"></el-radio>
			        <el-radio label="支付合同"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="核价类型：" class="te-item" prop="flowCoreData.text31" :rules="[{ required: true, message: '核价类型不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text31" :disabled="(Flg=='VIEW')">
			        <el-radio label="工程核价"></el-radio>
			        <el-radio label="经营核价"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item label="是否人事：" class="te-item" prop="flowCoreData.text32" :rules="[{ required: true, message: '是否人事不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text32" :disabled="(Flg=='VIEW')">
			        <el-radio label="是"></el-radio>
			        <el-radio label="否"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="8">
			    <el-form-item label="是否营销租赁：" class="te-item" prop="flowCoreData.text37" :rules="[{ required: true, message: '是否营销租赁不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text37" :disabled="(Flg=='VIEW')">
			        <el-radio label="是"></el-radio>
			        <el-radio label="否"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			  <el-col :span="16">
			    <span style="color:red;">如果是营销发起流程并且是与租赁相关的事宜时,请勾选"是"</span>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="24">
			    <el-form-item label="合同主要内容：" class="te-item" prop="flowCoreData.text25" :rules="[{ required: true, message: '请合同主要内容不能为空',trigger:'blur'}]">
			      <el-input type="textarea" :autosize="{ minRows: 6}" v-model="flowData.flowCoreData.text25" placeholder="请输入请..." :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="24">
			    <el-form-item label="质量要求：" class="te-item" prop="flowCoreData.text26" :rules="[{ required: true, message: '质量要求不能为空',trigger:'blur'}]">
			      <el-input type="textarea" :autosize="{ minRows: 6}" v-model="flowData.flowCoreData.text26" placeholder="请输入..." :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="24">
			    <el-form-item label="保修要求：" class="te-item" prop="flowCoreData.text27" :rules="[{ required: true, message: '保修要求不能为空',trigger:'blur'}]">
			      <el-input type="textarea" :autosize="{ minRows: 6}" v-model="flowData.flowCoreData.text27" placeholder="请输入..." :readonly="(Flg=='VIEW')" clearable></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="22">
			    <el-form-item label="付款方式：" class="te-item" prop="flowCoreData.text28" :rules="[{ required: true, message: '付款方式不能为空',trigger:'blur'}]">
			      <el-radio-group v-model="flowData.flowCoreData.text28" :disabled="(Flg=='VIEW')">
			        <el-radio label="现今"></el-radio>
			        <el-radio label="转账"></el-radio>
					<el-radio label="银行"></el-radio>
					<el-radio label="本票"></el-radio>
					<el-radio label="电汇"></el-radio>
					<el-radio label="银承"></el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-col>
			  <el-col :span="2">
				<el-button style="width: 80%;margin-left: 10px;" size="mini" icon="el-icon-date" title="合同套打">合同套打
				</el-button>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="24">
			    <el-form-item label="矫正后合同附件：" class="te-item" prop="flowCoreData.FJ" :rules="[{ required: true, message: '营销相关不能为空',trigger:'blur'}]">
			    </el-form-item>
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
export default {
	//https://github.com/dream2023/ele-table-editor
  name: "flow-flowaddpush-WFEContractV3Temp1",
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
	'pageButGroup': () => import(`./componnets/pageButGroup`)
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
		}
	};
  },
  created() {
    let that = this
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

