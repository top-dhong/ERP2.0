<template>
  <div>
    <el-dialog title="合同选择" :visible.sync="dialogVisible" @open="tapOpen" append-to-body>
      <el-row>
        <el-col :span="20">
          <el-form :inline="true" size="mini">
            <el-form-item label="会议主题：" prop="MeetTitle">
              <el-input v-model="MeetTitle" placeholder="请输入会议主题" clearable />
            </el-form-item>
			<el-form-item label="申请人：" prop="JoinMan">
			  <deng-select-user :value="JoinMan_V" :CYUserSelectValue="JoinMan_V_ARR" :canMark="'one'" @submitdata="sethrs($event,'JoinMan')"/>
			</el-form-item>
			<!-- <el-form-item prop="keyWord">
			  <el-input v-model="keyWord" placeholder="请输入员工姓名/工号" clearable />
			</el-form-item>
			<el-form-item prop="keyWord">
			  <el-input v-model="keyWord" placeholder="请输入员工姓名/工号" clearable />
			</el-form-item> -->
          </el-form>
        </el-col>
		<el-col :span="4">
			<el-button @click="search" type="primary">
			  <d2-icon name="search" /> 查询
			</el-button>
			</el-col>
        <el-col :span="24">
          <el-table stripe border height="440" :data="tableData" v-loading="loading">
            <el-table-column property="MeetTitle" width="200" label="会议主题"></el-table-column>
            <el-table-column property="MeetDate" width="100" label="会议时间"></el-table-column>
			<el-table-column property="LeadName" width="80" label="主持人"></el-table-column>
            <el-table-column property="MeetType" width="80" label="会议类型"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="success" size="mini" @click="selectOK(scope.row)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 允许用户输入 -->
    <el-input v-model="currentValue" v-bind="bind">
      <el-button @click="showDialog" slot="append">
        <i class="fa fa-list"></i>
      </el-button>
    </el-input>
  </div>
</template>

<script>
import util from "@/libs/util.js";
import { GetMeetInfo } from "@/api/elpack/elpack";
import qs from "qs";
export default {
  name: "deng-select-meet",
  props: {
    // 值
    value: {
      type: String,
      required: false,
      default: "",
    },
    // 占位符
    placeholder: {
      type: String,
      required: false,
      default: "请选择",
    },
	readonly:{
		type: Boolean,
		required: false,
		default: false,
	}
  },
  components: {
    'dengSelectUser': () => import(`@cps/deng-select-user`)
  },
  data() {
    return {
		loading:false,
		dialogVisible: false,
		keyWord: "",
		tableData: [],
		currentValue: "",
		
		MeetTitle:"",
		MeetGUID:"",
		Bdate:"",
		Edate:"",
		JoinMan:"",
		JoinMan_V:"",
		JoinMan_V_ARR:[]
	};
  },
  computed: {
    // 输入框上绑定的设置
    bind() {
      return {
        placeholder: this.placeholder,
        readonly: this.readonly,
        ...this.$attrs,
      };
    },
  },
  watch: {
    value(value) {
      this.currentValue = value;
    }
  },
  created() {
    this.currentValue = this.value;
    //this.initData();
  },
  methods: {
		tapOpen(){
			let par = {MeetTitle:"会议",MeetGUID:"",Bdate:"",Edate:"",JoinMan:""}
			this.initData(par);
		},
		initData(par) {
		  let that = this;
		  that.loading = true
		  GetMeetInfo(qs.stringify(par)).then(async (res) => {
			that.loading = false
			if (typeof res != "undefined" && res.code == 0) {
				that.tableData = res.data;
			}
		  });
		},
		//选取会议
		selectOK(item) {
		  let that = this;
			that.$emit("selectOK",item)
			that.dialogVisible = false
		},
		search() {
		  let that = this;
		  if (!that.keyWord) {
			that.$message({ message: `请输入员工姓名/工号`, type: "info" });
			return;
		  }
		  let par = {MeetTitle:"会议",MeetGUID:"",Bdate:"",Edate:"",JoinMan:""}
		  that.initData(par)
		},
		//导出选取的人员信息
		sethrs(users,HRMark) {
		  console.log('users=>', users)
		  let tmpArr = users.map((item) => { return `${item.GUID}` })
		  this[HRMark] = tmpArr.join(',')
		  let tmpArr2 = users.map((item) => { return `${item.UserName}` })
		  this.JoinMan_V = tmpArr2.join(',');
		  this.JoinMan_V_ARR = users;
		},
		showDialog(){
			if(!this.readonly){
				this.dialogVisible=true
			}
		}
  }
};
</script>

<style>
.el-tree {
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: scroll;
}

.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}

.el-dialog__body {
  padding: 10px 20px;
}

/* .el-dialog__header {
    padding: 10px 10px;
} */

.el-dialog__footer {
  padding: 10px 20px;
}

.el-divider-diy{
  margin: 3px 0;
}
</style>