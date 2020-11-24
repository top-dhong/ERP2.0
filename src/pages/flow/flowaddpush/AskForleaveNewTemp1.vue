<!-- page 请假流程 -->
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
            <!-- amt1,project,text2,text11,Flow_Grade,memo -->
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="是否计算周末："
				  label-width="auto"
                  class="te-item"
                  prop="flowCoreData.text11"
                  :rules="[{ required: true, message: '是否计算周末不能为空',trigger:'blur'}]"
                >
                  <el-checkbox v-model="flowData.flowCoreData.text11" true-label="1" false-label="0" :disabled="(Flg=='VIEW')">(勾选后才可以请跨节假日或周末的假)</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="te-item">
                <template>
                  <ele-table-editor
                    ref="table"
                    :rules="rules"
                    :columns="columns"
                    :newColumnValue="newColumnValue"
                    :tableAttrs="{stripe:true,border:true,'empty-text':'请点击新增按钮添加事件'}"
					:isShowDelete="(Flg!='VIEW')"
					:isShowAdd="(Flg!='VIEW')"
                    v-model="WF_WorkflowContentD__N"
                  />
                </template>
              </el-col>
            </el-row>
            <br />
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="请假总时长(h)："
				  label-width="130px"
                  class="te-item"
                  prop="flowCoreData.amt1"
                  :rules="[{ required: true, message: '请假总时长不能为空',trigger:'blur'}]"
                >
                  <el-input v-model="flowData.flowCoreData.amt1" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
            		 	<el-col :span="16">
            		 		<el-form-item label="公司名称：" class="te-item" prop="flowCoreData.text2" :rules="[{ required: true, message: '公司名称不能为空',trigger:'blur'}]">
            		 			<el-input v-model="flowData.flowCoreData.text2" placeholder="请输入公司名称" clearable></el-input>
            		 		</el-form-item>
            		 	</el-col>
            </el-row>-->
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="请假事由："
				  label-width="130px"
                  class="te-item"
                  prop="flowCoreData.memo"
                  :rules="[{ required: true, message: '请假事由不能为空',trigger:'blur'}]"
                >
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 6}"
                    v-model="flowData.flowCoreData.memo"
                    placeholder="请输入请假事由..."
					:readonly="(Flg=='VIEW')"
                    clearable
                  ></el-input>
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
import { InitFlowInfo, OpenFlow ,GetWorkDay} from "@/api/flow/flow";
let _self = null;
export default {
  name: "flow-flowaddpush-AskForleaveNewTemp1",
  mixins: [myMixin],
  components: {
    'pageFlowHead': () => import(`./componnets/pageHeader`),
    'pageFlowFoot': () => import(`./componnets/pageFooter`),
    // 'dengSelectUser': () => import(`@cps/deng-select-user`),
    'pageDialogRebut': () => import(`./componnets/pageDialogRebut`),
	'pageDialogThree': () => import(`./componnets/pageDialogThree`),
	'pageDialogPrint': () => import(`./componnets/pageDialogPrint`),
	'pageDialogRea': () => import(`./componnets/pageDialogRea`),
	'pageDialogMoney': () => import(`./componnets/pageDialogMoney`),
	'pageButGroup': () => import(`./componnets/pageButGroup`),
	'eleTableEditor': () => import(`ele-table-editor`) //https://github.com/dream2023/ele-table-editor
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
			flowCoreData: { text11:"0" },
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
		
		// 表格数据
		WF_WorkflowContentD__N: [],
		newColumnValue: {
		  //GUID:util.newGUID(),
		  //MGUID:"121",
		  text1: "事假",
		  text12: "8",
		  text14: "0",
		  text4: "",
		  text7: "上午",
		  text5: "",
		  text8: "下午",
		  text13: "8"
		},
		// 校检规则
		rules: {
		  text4: { required: true, message: "开始日期不能为空", trigger: "blur" },
		  text5: { required: true, message: "结束日期不能为空", trigger: "blur" }
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
		    prop: "text1",
		    label: "请假类型",
		    width: "110",
		    align: "center",
		    content: {
		      type: "el-select",
		      // 如果 key 不是 text 和 value
		      // 可以使用 prop 指定 key
		      options: [
		        { name: "事假", id: "事假" },
		        { name: "年假", id: "年假" },
		        { name: "病假", id: "病假" },
		        { name: "婚假", id: "婚假" },
		        { name: "丧假", id: "丧假" },
		        { name: "生育假", id: "生育假" },
		        { name: "工伤假", id: "工伤假" },
		        { name: "考试假", id: "考试假" }
		      ],
		      attrs: {
		        size: "mini",
		        width: "110"
		      },
		      // prop 将 text 对应 name, value 对应 id
		      prop: {
		        text: "name",
		        value: "id"
		      },
		      change(val, row, index) {
		        console.log("切换请假类型");
		        //获取用户剩余年假
		        _self.GetUserHoliday(row);
		      }
		    }
		  },
		  {
		    prop: "text12",
		    label: "班次类型",
		    //align:"center",
		    content: {
		      type: "el-radio-group",
		      // 对于 el-select, el-checkbox-group, el-radio-group 三个组件
		      // 可以指定  options 数组进行选项的渲染
		      options: [
		        // option 的值可以为对象
		        // 此处对以上三个组件做了封装, 显示的key为 text, 值key为 value
		        { text: "8小时", value: "8" },
		        { text: "11小时", value: "11" }
		      ],
		      change(val, row, index) {
		        _self.GetWorkDay(row, index);
		      }
		    }
		  },
		  {
		    prop: "text14",
		    label: "可休年假(h)",
		    width: "90",
		    align: "center"
		  },
		  {
		    prop: "text4",
		    label: "开始日期",
		    width: "160",
		    align: "center",
		    // 当有 content 属性时, 可以指定相应的组件
		    content: {
		      // type 可以为全局注册的组件名或者组件引用
		      type: "el-date-picker",
		      // attrs 是组件的属性  type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" style="width: 160px;"
		      attrs: {
		        type: "date",
		        placeholder: "选择开始日期",
		        "value-format": "yyyy-MM-dd",
		        size: "mini"
		      },
		      change(val, row, index) {
		        _self.GetWorkDay(row, index);
		      }
		      // 此外还有
		      //style: {width: '166px;'}, // 组件的样式
		      // class: {}, // 组件的class
		      // on: {}, // 组件的事件
		      // slots: {}, // 插槽
		      // scopedSlots: {}, 作用域插槽
		    }
		  },
		  {
		    prop: "text7",
		    label: "开始时段",
		    //align:"center",
		    content: {
		      type: "el-radio-group",
		      // 对于 el-select, el-checkbox-group, el-radio-group 三个组件
		      // 可以指定  options 数组进行选项的渲染
		      options: [
		        // option 的值可以为对象
		        // 此处对以上三个组件做了封装, 显示的key为 text, 值key为 value
		        "上午",
		        "下午"
		      ],
		      change(val, row, index) {
		        _self.GetWorkDay(row, index);
		      }
		    }
		  },
		  {
		    prop: "text5",
		    label: "结束日期",
		    width: "160",
		    align: "center",
		    // 当有 content 属性时, 可以指定相应的组件
		    content: {
		      // type 可以为全局注册的组件名或者组件引用
		      type: "el-date-picker",
		      // attrs 是组件的属性  type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" style="width: 160px;"
		      attrs: {
		        type: "date",
		        placeholder: "选择结束日期",
		        "value-format": "yyyy-MM-dd",
		        size: "mini"
		      },
		      change(val, row, index) {
		        _self.GetWorkDay(row, index);
		      }
		      // 此外还有
		      //style: {width: '166px;'}, // 组件的样式
		      // class: {}, // 组件的class
		      // on: {}, // 组件的事件
		      // slots: {}, // 插槽
		      // scopedSlots: {}, 作用域插槽
		    }
		  },
		  {
		    prop: "text8",
		    label: "结束时段",
		    //align:"center",
		    content: {
		      type: "el-radio-group",
		      // 对于 el-select, el-checkbox-group, el-radio-group 三个组件
		      // 可以指定  options 数组进行选项的渲染
		      options: [
		        // option 的值可以为对象
		        // 此处对以上三个组件做了封装, 显示的key为 text, 值key为 value
		        "上午",
		        "下午"
		      ],
		      change(val, row, index) {
		        _self.GetWorkDay(row, index);
		      }
		    }
		  },
		  {
		    prop: "text13",
		    label: "请假时长(h)",
		    width: "90",
		    align: "center"
		  }
		]
	};
  },
  created() {
    let that = this
	_self = this;
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
		  //取表的数据
		  that.WF_WorkflowContentD__N = that.flowData.flowTabsData.WF_WorkflowContentD__N
        });
      }
    } else {
      //初始化页面新建模板数据
      that.initData({ FlowTypeGUID: that.FlowTypeGUID }).then((res) => {
        that.flowData.flowBaseData = util.assignObj(that.flowData.flowBaseData, res.data.flowBaseData);
        //that.flowData.flowCoreData = util.assignObj(that.flowData.flowCoreData, res.data.flowCoreData);
        that.flowData.flowBaseData = util.doCoreObj(that.flowData.flowBaseData,that.flowData.flowBaseData);
        //that.flowData.flowCoreData = util.doCoreObj(that.flowData.flowCoreData,that.flowData.flowCoreData);
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
    },
	//计算单条请假事件总时长
	GetWorkDay(row) {
	  let that = this;
	  let params = {
	    startDate: row.text4,
	    startDateTub: row.text7,
	    endDate: row.text5,
	    endDateTub: row.text8,
	    isJumpWeek: that.flowData.flowCoreData.text11,
	    hourOneDay: row.text12
	  };
	  //console.log('GetWorkDay==>',params)
	  if (row.text4 && row.text7 && row.text5 && row.text8 && row.text12) {
	    GetWorkDay(qs.stringify(params))
	      .then(async res => {
	        if (typeof res != "undefined" && res.code == 0) {
	          row.text13 = res.data;
	          that.calculAll();
	        }
	      })
	      .catch(err => {
	        console.log("err111: ", err);
	      });
	  }
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