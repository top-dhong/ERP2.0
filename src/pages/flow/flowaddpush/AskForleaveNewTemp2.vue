<template>
  <d2-container>
    <template slot="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>流程管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/flow/flowadd' }">新建流程</el-breadcrumb-item>
        <el-breadcrumb-item>{{flowTypeName||'请假流程（地产新）'}}</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <div>
      <el-row>
        <el-alert
          v-if="!FlowTypeGUID"
          title="数据加载出错,请勿刷新页面,请关闭当前页面后重新打开"
          type="error"
          :closable="false"
          center
          show-icon
        />
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form
            :model="flowData"
            ref="flowData"
            label-position="left"
            label-width="130px"
            class="demo-ruleForm"
            size="mini"
          >
            <!-- 加载流程基本数据模块 -->
            <page-flow-head :flow-data="flowData"></page-flow-head>
            <!-- 核心内容  "hrs": "", "text1": "", "text3": "", "text4": "", "text5": "", "memo": "" -->
            <el-row>
              <h5>
                <i class="el-icon-camera"></i>核心内容
              </h5>
            </el-row>
            <!-- amt1,project,text2,text11,Flow_Grade,memo -->
            <el-row>
              <el-col :span="16">
                <el-form-item
                  label="是否计算周末："
                  class="te-item"
                  prop="flowCoreData.text11"
                  :rules="[{ required: true, message: '是否计算周末不能为空',trigger:'blur'}]"
                >
                  <el-checkbox v-model="flowData.flowCoreData.text11">(勾选后才可以请跨节假日或周末的假)</el-checkbox>
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
                    v-model="tableData"
                  />
                </template>
              </el-col>
            </el-row>
            <br />
            <el-row>
              <el-col :span="16">
                <el-form-item
                  label="请假总时长(h)："
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
                  class="te-item"
                  prop="flowCoreData.memo"
                  :rules="[{ required: true, message: '请假事由不能为空',trigger:'blur'}]"
                >
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 6}"
                    v-model="flowData.flowCoreData.memo"
                    placeholder="请输入请假事由..."
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
        <d2-icon name="floppy-o" />暂存
      </el-button>
      <el-button @click="submit('提交')" type="success">
        <d2-icon name="check-square-o" />提交
      </el-button>
      <el-button @click="test" type="info">
        <d2-icon name="envelope-o" />传阅
      </el-button>
      <el-button @click="test" type="warning">
        <d2-icon name="comment-o" />沟通
      </el-button>
      <el-button @click="print" type="danger">
        <d2-icon name="print" />打印
      </el-button>
      <el-button @click="test" class="btn-mya">
        <d2-icon name="credit-card" />实际付款
      </el-button>
      <el-button @click="test" class="btn-myb">
        <d2-icon name="pencil-square-o" />资金登记
      </el-button>
    </template>
  </d2-container>
</template>
<script>
import util from "@/libs/util.js";
import qs from "qs";
let _self = null;
import myMixin from "./js/public.js";
import { mapActions } from "vuex";
import {
  InitFlowInfo,
  SaveFlowData,
  GetWorkDay,
  GetUserHoliday
} from "@/api/flow/flow";
export default {
  name: "flow-flowaddpush-AskForleaveNewTemp2",
  mixins: [myMixin],
  components: {
    pageFlowHead: () => import(`./componnets/pageHeader`),
    pageFlowFoot: () => import(`./componnets/pageFooter`),
    dengSelectUser: () => import(`@cps/deng-select-user`),
    eleTableEditor: () => import(`ele-table-editor`) //https://github.com/dream2023/ele-table-editor
  },
  data() {
    return {
      FlowTypeGUID: "", //页面暂存  提交数据使用
      flowTypeName: "",
      flowData: {
        flowBaseData: {},
        flowCoreData: {},
        relaFlowObj: [],
        annexData: [],
        agree: "同意",
        opinionData: ""
      },
      loading1: false,
      // 表格数据
      tableData: [],
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
      ],
      UserHoliday: 0, //可休年假
      UserHolidayAll: 0 //表格中填写的休年假小时数
    };
  },
  watch: {
    //需要重新计算所有  请假天数??
    tableData(value) {
      console.log(1111, value);
      this.calculAll();
      // this.flowData.flowCoreData.text11 = value
    }
  },
  created() {
    let that = this;
    _self = this;
    that.FlowTypeGUID = that.$route.query.GUID;
    that.flowTypeName = that.$route.query.name;
    //初始化页面数据
    that.initData({ FlowTypeGUID: that.FlowTypeGUID }).then(res => {
      that.flowData.flowBaseData = res.data.flowBaseData;
      that.flowData.flowCoreData = res.data.flowCoreData;
      that.flowData.flowCoreData["text11"] = false; //初始化默认不跳过周末
      that.flowData.flowTabsData = {}; //res.data.flowTabsData;
    });
    //禁用f5
    that.stopF5Refresh();
    //禁用浏览器刷新
    //window.addEventListener('beforeunload', e => that.beforeunloadHandler(e))
  },
  methods: {
    ...mapActions("d2admin/flow", ["initData"]),
    //梳理数据
    filter(par) {
      let param = util.deepClone(par);
      delete param["flowBaseData"]["projectName"];
      delete param["flowBaseData"]["Create_UserName"];
      delete param["flowBaseData"]["Create_DeptName"];
      delete param["flowBaseData"]["BusTypeName"];
      return param;
    },
    //计算请假总时长
    calculAll() {
      let that = this;
      let count = 0;
      let count2 = 0;
      that.tableData.forEach(item => {
        count += item.text13 * 1;
        if ("年假" == item.text1) {
          count2 += item.text13 * 1;
        }
      });
      that.flowData.flowCoreData.amt1 = count;
      that.UserHolidayAll = count2;
      console.log(
        `可休年假=${that.UserHoliday}   当前选取年假=${that.UserHolidayAll}`
      );
      if (that.UserHolidayAll * 1 > that.UserHoliday * 1) {
        that.$message({
          message: "当前选取年假(h)已超过可休年假(h),请重新选取!",
          type: "error",
          duration: 5000
        });
      }
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
    GetUserHoliday(row) {
      let that = this;
      console.log("GetUserHoliday==>");
      if ("年假" != row.text1) {
        row.text14 = 0;
        return;
      }
      if (that.UserHoliday) {
        row.text14 = that.UserHoliday;
        return;
      }
      GetUserHoliday()
        .then(async res => {
          if (typeof res != "undefined" && res.code == 0) {
            that.UserHoliday = res.data.YearHoliHour;
            row.text14 = that.UserHoliday;
          }
        })
        .catch(err => {
          console.log("err111: ", err);
        });
    },
    submit(doType) {
      let that = this;
      let par = that.filter(that.flowData);
      par["doType"] = doType;
      if (that.tableData.length == 0) {
        that.$message({ message: "至少包含一条事件!", type: "error" });
        return false;
      }
      if (that.UserHolidayAll * 1 > that.UserHoliday * 1) {
        that.$message({
          message: "当前选取年假(h)已超过可休年假(h),请重新选取!",
          type: "error",
          duration: 5000
        });
        return false;
      }
      that.$refs["table"]
        .validate()
        .then(() => {
          console.log("success submit by table!!");
          //放入MGUID
          that.tableData = that.tableData.map(item => {
            item["GUID"] = util.newGUID();
            item["MGUID"] = that.flowData.flowBaseData.GUID;
            return item;
          });
          par.flowTabsData.WF_WorkflowContentD__N = that.tableData;
          //console.log(1,{FlowData:JSON.stringify(par)})
          console.log(1, par);
          //par["FlowTypeGUID"] = that.FlowTypeGUID;
          that.$refs["flowData"].validate(valid => {
            if (valid) {
              that.loading1 = true;
              SaveFlowData(qs.stringify({ FlowData: JSON.stringify(par) }))
                .then(async res => {
                  that.loading1 = false;
                  if (typeof res != "undefined" && res.code == 0) {
                    that.$message({ message: res.msg, type: "success" });
                  }
                })
                .catch(err => {
                  that.loading1 = false;
                  console.log("err111: ", err);
                });
            } else {
              console.log("error submit!!");
              that.$message({ message: "请根据提示完善表单", type: "error" });
              return false;
            }
          });
        })
        .catch(({ errors }) => {
          console.log("error submit by table!!");
          that.$message({ message: "请根据提示完善表单", type: "error" });
          return false;
        });
    },
    test() {
      this.$message({ message: `敬请期待！`, type: "info" });
    },
    print() {
      //window.print();
      //console.log(1,this.$refs.print)
      //this.$print(this.$refs.print) // 使用
    },
    //导出选取的人员信息
    //后台要的数据结构 '@123=小明,234=李琴'  如果为空则为@
    sethrs(users) {
      console.log("users=>", users);
      let tmpArr = users.map(item => {
        return `${item.GUID}=${item.UserName}`;
      });
      this.flowData.flowCoreData.hrs = "@" + tmpArr.join(",");
      //this.flowData.flowCoreData.hrs = util.ArryToJoinStr(users,false,'GUID')
    }
  }
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