<template>
  <d2-container>
    <template slot="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>流程管理</el-breadcrumb-item>

        <el-breadcrumb-item>{{ tPState["F" + Flg] }}流程</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: '/flow/flowadd' }">新建流程</el-breadcrumb-item> -->
        <el-breadcrumb-item>{{
          flowTypeName || "工作请示（地产）"
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <div>
      <el-row>
        <el-alert
          v-if="!FlowTypeGUID && !Flg"
          title="数据加载出错,请勿刷新页面,请关闭当前页面后重新打开"
          type="error"
          :closable="false"
          center
          show-icon
        />
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form
            :model="flowData"
            ref="flowData"
            label-position="left"
            label-width="110px"
            class="demo-ruleForm"
            size="mini"
          >
            <!-- 加载流程基本数据模块 -->
            <page-flow-head :flow-data="flowData"></page-flow-head>
            <!-- 核心内容  "hrs": "", "text1": "", "text3": "", "text4": "", "text5": "", "memo": "" -->
            <el-row
              ><h5><i class="el-icon-camera"></i>核心内容</h5></el-row
            >
            <el-row>
              <el-col :span="16">
                <el-form-item
                  label="相关审批人："
                  class="te-item"
                  prop="flowCoreData.hrs"
                  :rules="[
                    {
                      required: true,
                      message: '相关审批人不能为空',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <!-- <el-input v-model="flowData.flowCoreData.hrs" clearable></el-input> -->
                  <deng-select-user
                    :value="flowData.flowCoreData.hrs_V"
                    :CYUserSelectValue="flowData.flowCoreData.CYUserSelectValue"
                    @submitdata="sethrs"
                  ></deng-select-user>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
							<el-form-item label="text3" class="te-item">
								<el-input v-model="flowData.flowCoreData.text3" clearable></el-input>
							</el-form-item>
						</el-col> -->
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="请示类型："
                  class="te-item"
                  prop="flowCoreData.text1"
                  :rules="[
                    {
                      required: true,
                      message: '请示类型不能为空',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-radio-group v-model="flowData.flowCoreData.text1">
                    <el-radio-button label="人事类请示"></el-radio-button>
                    <el-radio-button label="行政非费用类请示"></el-radio-button>
                    <el-radio-button label="行政费用类请示"></el-radio-button>
                    <el-radio-button
                      label="合同模板或专用模板请示或营销相关"
                    ></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="营销相关："
                  class="te-item"
                  prop="flowCoreData.text5"
                  :rules="[
                    {
                      required: true,
                      message: '营销相关不能为空',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-radio-group v-model="flowData.flowCoreData.text5">
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label="终审选择："
                  class="te-item"
                  prop="flowCoreData.text4"
                  :rules="[
                    {
                      required: true,
                      message: '终审选择不能为空',
                      trigger: 'blur',
                    },
                  ]"
                >
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
                <el-form-item
                  label="请示内容："
                  class="te-item"
                  prop="flowCoreData.memo"
                  :rules="[
                    {
                      required: true,
                      message: '请示内容不能为空',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 8 }"
                    v-model="flowData.flowCoreData.memo"
                    placeholder="请输入请示内容..."
                    clearable
                  ></el-input>
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
      <el-button @click="submit('暂存')" type="primary" :loading="loading1">
        <d2-icon name="floppy-o" />
        暂存
      </el-button>
      <el-button @click="submit('提交')" type="success">
        <d2-icon name="check-square-o" />
        提交
      </el-button>
      <el-button @click="test" type="info">
        <d2-icon name="envelope-o" />
        传阅
      </el-button>
      <el-button @click="test" type="warning">
        <d2-icon name="comment-o" />
        沟通
      </el-button>
      <el-button @click="test" class="btn-mya">
        <d2-icon name="comment-o" />
        转办
      </el-button>
      <el-button @click="test" class="btn-mya">
        <d2-icon name="comment-o" />
        驳回
      </el-button>
      <el-button @click="print" type="danger">
        <d2-icon name="print" />
        打印
      </el-button>
      <el-button @click="test" class="btn-mya">
        <d2-icon name="credit-card" />
        实际付款
      </el-button>
      <el-button @click="test" class="btn-myb">
        <d2-icon name="pencil-square-o" />
        资金登记
      </el-button>
    </template>
  </d2-container>
</template>
<script>
//http://www.mtsoftware.cn/download.html
import util from "@/libs/util.js";
import $ from "jquery";
import qs from "qs";
import myMixin from "./js/public.js";
import { mapActions } from "vuex";
import { InitFlowInfo, SaveFlowData, OpenFlow } from "@/api/flow/flow";
import { getLodop } from "@/libs/LodopFuncs";
export default {
  name: "flow-flowaddpush-WorkRequestTemp5",
  mixins: [myMixin],
  components: {
    pageFlowHead: () => import(`./componnets/pageHeader`),
    pageFlowFoot: () => import(`./componnets/pageFooter`),
    dengSelectUser: () => import(`@cps/deng-select-user`),
  },
  data() {
    return {
      tPState: { F: "新建", FEDT: "编辑", FVIEW: "明细" }, //页面状态  新建编辑明细文本
      FlowTypeGUID: "", //页面暂存  提交数据使用
      FlowGUID: "", //流程ID
      Flg: "", //""新建  "EDT"编辑  "VIEW"明细
      flowTypeName: "",
      flowData: {
        flowBaseData: {},
        flowCoreData: {},
        relaFlowObj: [],
		annexData: [],
		hisOpinionData:[],
        agree: "同意",
        opinionData: "",
      },
      loading1: false,
    };
  },
  created() {
    let that = this;
    that.FlowTypeGUID = that.$route.query.GUID;
    that.flowTypeName = that.$route.query.name;
    that.FlowGUID = that.$route.query.FlowGUID;
    that.Flg = that.$route.query.Flg || "";
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
          let tmpArrHrs = that.flowData.flowCoreData.hrs.split(",");
          let tmpArrHrsV = that.flowData.flowCoreData.hrs_V.split(",");
          let CYUserSelectValue = [];
          for (let ii = 0; ii < tmpArrHrs.length; ii++) {
            CYUserSelectValue.push({
              GUID: tmpArrHrs[ii],
              UserName: tmpArrHrsV[ii],
            });
          }
          that.flowData.flowCoreData.CYUserSelectValue = CYUserSelectValue;
          //还有流转意见
        });
      } else if ("VIEW" == that.Flg) {
      }
    } else {
      //初始化页面新建模板数据
      that.initData({ FlowTypeGUID: that.FlowTypeGUID }).then((res) => {
        that.flowData.flowBaseData = res.data.flowBaseData;
        that.flowData.flowCoreData = res.data.flowCoreData;
      });
    }

    console.log("FlowTypeGUID:", that.FlowTypeGUID);
    //禁用f5
    that.stopF5Refresh();
    //禁用浏览器刷新
    //window.addEventListener('beforeunload', e => that.beforeunloadHandler(e))
  },
  methods: {
    ...mapActions("d2admin/flow", ["initData", "OpenFlow"]),
    //梳理数据
    filter(data) {
      let param = util.deepClone(data);
      delete param["flowBaseData"]["projectName"];
      delete param["flowBaseData"]["Create_UserName"];
      delete param["flowBaseData"]["Create_DeptName"];
      delete param["flowBaseData"]["BusTypeName"];
      param["annexData"] = util.filterArray(param["annexData"]);
      param["relaFlowObj"] = util.filterArray(param["relaFlowObj"]);
      //flowCoreData.hrs_V     flowCoreData.CYUserSelectValue
      return param;
    },
    submit(doType) {
      let that = this;
      debugger;
      console.log("that.flowData==>", that.flowData);
      that.$refs["flowData"].validate((valid) => {
        if (valid) {
          that.loading1 = true;
          //附件列表放入其它参数
          //console.log(that.flowData.annexData);
          that.flowData.annexData = that.flowData.annexData.map((item) => {
            item["LinkTable"] = "WF_WorkFlowContentM";
            item["LinkKey"] = that.flowData.flowBaseData.GUID;
            return item;
          });
          let flowDataNew = that.filter(that.flowData);
          flowDataNew["doType"] = doType;
          SaveFlowData(qs.stringify({ FlowData: JSON.stringify(flowDataNew) }))
            .then(async (res) => {
              that.loading1 = false;
              if (typeof res != "undefined" && res.code == 0) {
                that.$message({ message: res.msg, type: "success" });
              }
            })
            .catch((err) => {
              that.loading1 = false;
              console.log("err: ", err);
            });
        } else {
          console.log("error submit!!");
          that.$message({ message: "请根据提示完善表单", type: "error" });
          return false;
        }
      });
    },
    test() {
      this.$message({ message: `敬请期待！`, type: "info" });
    },
    print() {
      //window.print();
      //console.log(1,this.$refs.print)
      //this.$print(this.$refs.print) // 使用
      let LODOP = getLodop();
      debugger;
      let strHtml = document.getElementsByClassName(
        "d2-container-full__body"
      )[0].innerHTML; //$('.d2-container-full__body').innerText
      LODOP.ADD_PRINT_HTM(10, 10, "100%", "100%", strHtml);
      // LODOP.PRINT_DESIGN()//打开设置
      LODOP.PREVIEW(); //预览
      //LODOP.PRINT()  //直接打印
    },
    //导出选取的人员信息
    //后台要的数据结构 '@123=小明,234=李琴'  如果为空则为@
    sethrs(users) {
      console.log("users=>", users);
      let tmpArr = users.map((item) => {
        return `${item.GUID}=${item.UserName}`;
      });
      this.flowData.flowCoreData.hrs = "@" + tmpArr.join(",");
      //this.flowData.flowCoreData.hrs = util.ArryToJoinStr(users,false,'GUID')
    },
  },
};
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
</style>