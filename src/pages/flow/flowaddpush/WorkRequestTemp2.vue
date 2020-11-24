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
                <el-form-item label="相关审批人：" class="te-item" prop="flowCoreData.hrs" :rules="[{ required: true, message: '相关审批人不能为空',trigger:'blur'}]">
                  <deng-select-user :value="flowData.flowCoreData.hrs_V" :CYUserSelectValue="flowData.flowCoreData.CYUserSelectValue" @submitdata="sethrs"></deng-select-user>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="请示类型：" class="te-item" prop="flowCoreData.text1" :rules="[{ required: true, message: '请示类型不能为空',trigger:'blur'}]">
                  <el-radio-group v-model="flowData.flowCoreData.text1">
                    <el-radio-button label="人事类请示"></el-radio-button>
                    <el-radio-button label="行政非费用类请示"></el-radio-button>
                    <el-radio-button label="行政费用类请示"></el-radio-button>
                    <el-radio-button label="合同模板或专用模板请示或营销相关"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="营销相关：" class="te-item" prop="flowCoreData.text5" :rules="[{ required: true, message: '营销相关不能为空',trigger:'blur'}]">
                  <el-radio-group v-model="flowData.flowCoreData.text5">
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="终审选择：" class="te-item" prop="flowCoreData.text4" :rules="[{ required: true, message: '终审选择不能为空',trigger:'blur'}]">
                  <el-radio-group v-model="flowData.flowCoreData.text4">
                    <el-radio-button label="总裁"></el-radio-button>
                    <el-radio-button label="董事长"></el-radio-button>
                    <el-radio-button label="部门负责人"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="请示内容：" class="te-item" prop="flowCoreData.memo" :rules="[{ required: true, message: '请示内容不能为空',trigger:'blur'}]">
                  <el-input type="textarea" :autosize="{ minRows: 6}" v-model="flowData.flowCoreData.memo" placeholder="请输入请示内容..." clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 加载流程其它数据模块 -->
            <page-flow-foot :flow-data="flowData"></page-flow-foot>
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
	  @showThreeModal="showThreeModal" 
	  @showFlowRebut="showFlowRebut" 
	  @showPrint="showPrint"
	  @showRea="showRea"
	  @showMoney="showMoney"
	  />
    </template>
    <!-- 驳回弹窗 -->
    <page-dialog-rebut :pops="modalRebut" :FlowGUID="FlowGUID"/>
    <!-- 合并 三个 转办/传阅/沟通-->
    <page-dialog-three :pops="modal" :flowData="flowData"/>
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
  name: "flow-flowaddpush-WorkRequestTemp2",
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
		tPState: { F: "新建", FEDT: "编辑", FVIEW: "明细" },//页面状态  新建编辑明细文本
		FlowTypeGUID: "",//页面暂存  提交数据使用
		FlowGUID: "",//流程ID
		Flg: "",//""新建  "EDT"编辑  "VIEW"明细
		flowTypeName: "",
		flowData: {
			flowBaseData: {},
			flowCoreData: { CYUserSelectValue: [], hrs_V: "" },
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
    that.FlowTypeGUID = that.$route.query.GUID;
    that.flowTypeName = that.$route.query.name;
    that.FlowGUID = that.$route.query.FlowGUID;
    that.Flg = that.$route.query.Flg || ""
    if (that.Flg) {
      if ("EDT" == that.Flg) {
        //初始化页面数据
        that.OpenFlow({ FlowGUID: that.FlowGUID }).then((res) => {
          that.flowData.flowBaseData = res.data.flowBaseData;
          that.flowData.flowCoreData = res.data.flowCoreData;

          that.flowData.flowTabsData = res.data.flowTabsData;
          that.flowData.annexData = res.data.annexData;
          that.flowData.relaFlowObj = res.data.relaFlowObj;
          that.flowData.hisOpinionData = res.data.hisOpinionData;
          let tmpArrHrs = that.flowData.flowCoreData.hrs.split(',')

          let tmpArrHrsV = that.flowData.flowCoreData.hrs_V.split(',')
          let CYUserSelectValue = []
          for (let ii = 0; ii < tmpArrHrs.length; ii++) {
            CYUserSelectValue.push({ GUID: tmpArrHrs[ii], UserName: tmpArrHrsV[ii] })
          }
          that.flowData.flowCoreData.CYUserSelectValue = CYUserSelectValue
        });
      } else if ("VIEW" == that.Flg) {

      }
    } else {
      //初始化页面新建模板数据
      that.initData({ FlowTypeGUID: that.FlowTypeGUID }).then((res) => {
        that.flowData.flowBaseData = res.data.flowBaseData;
        that.flowData.flowCoreData = res.data.flowCoreData;
        if (!that.flowData.flowCoreData) {
          that.flowData.flowCoreData = {}
        }
        if (!that.flowData.flowCoreData.hrs_V) {
          that.flowData.flowCoreData.hrs_V = ""
        }
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
    //后台要的数据结构 '@123=小明,234=李琴'  如果为空则为@
    sethrs(users) {
      console.log('users=>', users)
      let tmpArr = users.map((item) => { return `${item.GUID}=${item.UserName}` })
      this.flowData.flowCoreData.hrs = '@' + tmpArr.join(',')
      //this.flowData.flowCoreData.hrs = util.ArryToJoinStr(users,false,'GUID')
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