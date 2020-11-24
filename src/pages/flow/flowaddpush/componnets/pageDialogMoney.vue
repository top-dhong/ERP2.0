<template>
    <el-dialog title="资金登记" :visible.sync="pops.dialogVisible"  @open="tapOpen">
      <el-form :model="form">
        <el-form-item label="公司简称:" label-width="140px">
          <el-select v-model="form.Company" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in Company_otions" :key="item.GUID" :label="item.CompayName" :value="item.CompayName">
            </el-option>
          </el-select>
          <!-- <el-input size="mini" v-model="form.Company" autocomplete="off"></el-input> -->
        </el-form-item>
        <!-- <el-form-item label="流程编号" label-width="140px">
    			<el-input v-model="form.BillID" autocomplete="off" readonly></el-input>
    		</el-form-item> -->
        <el-form-item label="经办部门:" label-width="140px">
          <el-input size="mini" v-model="form.CreateDept" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款单位/个人:" label-width="140px">
          <el-input size="mini" v-model="form.Payee" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="流程主题" label-width="140px">
    			<el-input v-model="form.Subject" autocomplete="off"></el-input>
    		</el-form-item> -->
        <el-form-item label="核定应付/冲账金额:" label-width="140px">
          <el-input size="mini" v-model="form.ShuldPay" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款方式:" label-width="140px">
          <el-input size="mini" v-model="form.Payment" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="终审意见:" label-width="140px">
          <!-- <el-input size="mini" v-model="form.LastOpi" autocomplete="off"></el-input> -->
          <el-input type="textarea" placeholder="请输入你的意见..." :autosize="{ minRows: 2}" :minlength="5" v-model="form.LastOpi" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="登记时间:" label-width="140px">
          <!-- <el-input size="mini" v-model="form.CreateDate" autocomplete="off"></el-input> -->
          <el-date-picker v-model="form.CreateDate" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="台账序号:" label-width="140px">
          <el-input size="mini" v-model="form.ContractID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="台账年份:" label-width="140px">
          <el-input size="mini" v-model="form.ContractIDYear" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="打印序号:" label-width="140px">
          <el-input type="number" size="mini" v-model="form.TzAuditNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否审批过:" label-width="140px">
          <el-radio-group size="mini" v-model="form.IsTzAudit">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注:" label-width="140px">
          <el-input type="textarea" placeholder="请输入你的意见..." :autosize="{ minRows: 2}" :minlength="5" v-model="form.PayMemo" maxlength="200" show-word-limit></el-input>
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
	import { ShowPayInfo, SavePayInfo } from "@/api/flow/flow";
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
	  data() {
		return {
		  form: {
		  	"GUID": "",
		  	"MGUID": "",
		  	"Company": "",
		  	"BillID": "",
		  	"CreateDept": "",
		  	"Payee": "",
		  	"Subject": "",
		  	"ShuldPay": "",
		  	"Payment": "",
		  	"LastOpi": "",
		  	"PayMemo": "",
		  	"CreateMan": "",
		  	"CreateDate": "2020/10/30 10:20:36",
		  	"ContractID": "",
		  	"ContractIDYear": "2020",
		  	"TzAuditNo": "",
		  	"IsTzAudit": "否",
		  },
		  Company_otions: []
		};
	  },
	  methods: {
		tapOpen(){
			this.initData()
		},
		initData(){
			let that = this
			let par = { GUID: that.FlowGUID, BillID: that.flowData.flowBaseData.BillID }
			ShowPayInfo(qs.stringify(par)).then(async res => {
			  if (typeof (res) != 'undefined' && res.code == 0) {
			    that.form = res.data || {}
			    that.Company_otions = res.data.children
			  }
			})
			  .catch(err => {
			    console.log('err: ', err)
			  })
		},
		filterMoneyOK(data) {
		  let param = util.deepClone(data)
		  delete param['children'];
		  return param;
		},
		tapOK(){
			let that = this
			console.log('tapMoneyOK  that.form: ', that.form)
			let par = that.filterMoneyOK(that.form);
			par.MGUID = that.FlowGUID
			par.BillID = that.flowData.flowBaseData.BillID
			par.Subject = that.flowData.flowBaseData.Subject
			par.CreateDept = that.flowData.flowBaseData.Create_DeptName
			if (!par.GUID) {
			  par.GUID = util.newGUID()
			}
			let param = { jsonStr: JSON.stringify(par) }
			console.log('filterMoneyOK  param: ', param)
			that.pops.btnLoading = true
			SavePayInfo(qs.stringify(param)).then(async res => {
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