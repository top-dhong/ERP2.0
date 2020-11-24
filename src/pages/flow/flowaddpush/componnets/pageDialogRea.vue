<template>
    <el-dialog title="实际付款" :visible.sync="pops.dialogVisible" @open="tapOpen">
      <el-form :model="form">
        <el-form-item>
          <ele-table-editor ref="tableRea" :rules="rules" :columns="columns" :newColumnValue="newColumnValue" :tableAttrs="{stripe:true,border:true,'empty-text':'请点击新增按钮添加付款信息'}" v-model="form.tableData" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pops.dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="pops.btnLoading" @click="tapOK">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
	import util from '@/libs/util.js'
	import qs from "qs";
	import { ShowPayMent, SavePayMent} from "@/api/flow/flow";
	export default {
	  props: {
		pops: {
		  type: Object
		},
		FlowGUID:{
		  type: String
		},
		flowData:{
			type: Object
		}
	  },
	  components: {
	  	'eleTableEditor': () => import(`ele-table-editor`)
	  },
	  data() {
		return {
		  form: { tableData: [] },
		  newColumnValue: {
		  	GUID: "",
		  	PayNo: "-",
		  	AccountNo: "",
		  	Paydate: "",
		  	PayOver: ""
		  },
		  // 校检规则
		  rules: {
		  	PayNo: { required: true, message: "网银/支票号码不能为空", trigger: "blur" },
		  	AccountNo: { required: true, message: "银行账号不能为空", trigger: "blur" },
		  	Paydate: { required: true, message: "签收/付款日期不能为空", trigger: "blur" },
		  	PayOver: { required: true, message: "实际付款金额不能为空", trigger: "blur" }
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
		    prop: "PayNo",
		    label: "网银/支票号码",
		    // 当有 content 属性时, 可以指定相应的组件
		    content: {
		  	// type 可以为全局注册的组件名或者组件引用
		  	type: 'el-input',
		  	// attrs 是组件的属性
		  	attrs: {
		  	  size: "mini"
		  	}
		    },
		    width: "120",
		    align: "center"
		  },
		  {
		    prop: "AccountNo",
		    label: "银行账号",
		    // 当有 content 属性时, 可以指定相应的组件
		    content: {
		  	// type 可以为全局注册的组件名或者组件引用
		  	type: 'el-input',
		  	// attrs 是组件的属性
		  	attrs: {
		  	  size: "mini"
		  	}
		    },
		    width: "120",
		    align: "center"
		  },
		  {
		    prop: "Paydate",
		    label: "签收/付款日期",
		    width: "160",
		    align: "center",
		    // 当有 content 属性时, 可以指定相应的组件
		    content: {
		  	// type 可以为全局注册的组件名或者组件引用
		  	type: "el-date-picker",
		  	// attrs 是组件的属性  type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" style="width: 160px;"
		  	attrs: {
		  	  type: "date",
		  	  placeholder: "签收/付款日期",
		  	  "value-format": "yyyy/MM/dd 0:00:00",
		  	  size: "mini"
		  	}
		    }
		  },
		  {
		    prop: "PayOver",
		    label: "实际付款金额(¥)",
		    // 当有 content 属性时, 可以指定相应的组件
		    content: {
		  	// type 可以为全局注册的组件名或者组件引用
		  	type: 'el-input',
		  	// attrs 是组件的属性
		  	attrs: {
		  	  size: "mini"
		  	}
		    },
		    width: "120",
		    align: "center"
		  }
		  ]
		};
	  },
	  computed: {
		bind() {
		  return {
			...this.$attrs
		  };
		}
	  },
	  methods: {
		tapOpen(){
			this.initData()
		},
		initData(){
			let that = this
			let par = { FlowGUID: that.FlowGUID }
			ShowPayMent(qs.stringify(par)).then(async res => {
				if (typeof (res) != 'undefined' && res.code == 0) {
					that.form.tableData = res.data
				}
			})
			.catch(err => {
			console.log('err: ', err)
			})
		},
		tapOK(){
			let that = this
			that.form.tableData = that.form.tableData.map(item => {
			  item["MGUID"] = that.FlowGUID;
			  item["WorkFlowGUID"] = that.flowData.flowBaseData.WorkflowGUID;
			  return item;
			});
			console.log('tapReaOK  that.form: ', that.form)
			//参数校验
			// that.$refs["tableRea"].validate(valid => {
			//     if (valid) {
			let par = {}
			par.tableData = that.form.tableData
			console.log(1111, par)
			if (par.tableData.length == 0) {
			  that.$message({ message: '请新增至少一条数据!', type: 'error' })
			  return;
			}
			that.pops.btnLoading = true
			SavePayMent(qs.stringify({ jsonStr: JSON.stringify(par) })).then(async res => {
			  that.pops.btnLoading = false
			  if (typeof (res) != 'undefined' && res.code == 0) {
			    that.$message({ message: '操作成功!', type: 'success' })
			  }
			})
			  .catch(err => {
			    console.log('err: ', err)
			    that.pops.btnLoading = false
			  })
		}
	  }
	};
</script>