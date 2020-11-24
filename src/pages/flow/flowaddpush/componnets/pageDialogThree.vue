<template>
    <el-dialog :title="pops.title" :visible.sync="pops.dialogVisible">
    	<el-form :model="form">
    	  <el-form-item label="人员:">
    	    <deng-select-user :CYUserSelectValue="pops.CYUserSelectValue" :canMark="pops.canMark" @submitdata="sethrs"></deng-select-user>
    	  </el-form-item>
    	</el-form>
      <el-form :model="form">
        <el-form-item label="签字意见:">
          <el-input v-model="form.Opinion"  type="textarea" :rows="4" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pops.dialogVisible=false">取 消</el-button>
        <el-button type="primary" :loading="pops.btnLoading" @click="tapOK">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
	import util from '@/libs/util.js'
	import qs from "qs";
	import { FlowTurnDo, FlowCirculate, FlowConsult} from "@/api/flow/flow";
	export default {
	  props: {
		pops: {
		  type: Object
		},
		flowData:{
		  type: Object
		},
		tagName:{
			type:String
		}
	  },
	  components: {
	  	'dengSelectUser': () => import(`@cps/deng-select-user`)
	  },
	  data() {
		return {
		  form:{aaa:"",Opinion:""}
		};
	  },
	  watch: {
		CYUserSelectValue(value) {
		  this.CYUserSelect = value
		}
	  },
	  created() {
		//this.value = "12";//this.flowData.flowCoreData.hrs_V
		//this.currentValue = this.value;
		//this.CYUserSelect = this.CYUserSelectValue;
		//this.GetSysOrgList()
	  },
	  methods: {
		sethrs(users){
			console.log('users=>',users)
			let tmpArr = users.map((item)=>{ return `${item.GUID}` })
			this.form.aaa = tmpArr.join(',')
			this.CYUserSelectValue = users
		},
		tapOK(){
			let that = this
			if(!that.form.aaa){
				that.$message({message: '请选择人员!',type: 'error'})
				return
			}
			if(!that.form.Opinion){
				that.$message({message: '请填写签字意见!',type: 'error'})
				return
			}
			//that.$emit("tapOK",that.form)
			let fn = that.pops.tapOK
			this[fn](that.form)
		},
		//转办确认提交
		tapFlowTurnDo(form) {
		  let that = this
		  console.log('tapFlowTurnDo=>', form)
		  let par = { FlowGUID: that.flowData.flowBaseData.GUID, TurnDoUserGUID: form.aaa, Opinion: form.Opinion }
		  if (that.pops.btnLoading) return
		  that.pops.btnLoading = true
		  FlowTurnDo(qs.stringify(par)).then(async res => {
		    that.pops.btnLoading = false
		    if (typeof (res) != 'undefined' && res.code == 0) {
		      that.$message({ message: '操作成功!', type: 'success' })
		      that.pops.dialogVisible = false
		      that.closeCurPage()
		    }
		  })
		    .catch(err => {
		      console.log('err: ', err)
		      that.pops.btnLoading = false
		    })
		},
		//传阅确认提交
		tapFlowCirculate(form) {
		  let that = this
		  console.log('tapFlowCirculate=>', form)
		  let par = { FlowGUID: that.flowData.flowBaseData.GUID, CirculateUserGUID: form.aaa, Opinion: form.Opinion }
		  if (that.pops.btnLoading) return
		  that.pops.btnLoading = true
		  FlowCirculate(qs.stringify(par)).then(async res => {
		    that.pops.btnLoading = false
		    if (typeof (res) != 'undefined' && res.code == 0) {
		      that.$message({ message: '操作成功!', type: 'success' })
		      that.pops.dialogVisible = false
		    }
		  })
		    .catch(err => {
		      console.log('err: ', err)
		      that.pops.btnLoading = false
		    })
		},
		//沟通确认提交
		tapFlowConsult(form) {
		  let that = this
		  console.log('tapFlowConsult=>', form)
		  let par = { FlowGUID: that.flowData.flowBaseData.GUID, ConsultUserGUIDs: form.aaa, Opinion: form.Opinion }
		  if (that.pops.btnLoading) return
		  that.pops.btnLoading = true
		  FlowConsult(qs.stringify(par)).then(async res => {
		    that.pops.btnLoading = false
		    if (typeof (res) != 'undefined' && res.code == 0) {
		      that.$message({ message: '操作成功!', type: 'success' })
		      that.pops.dialogVisible = false
		    }
		  })
		    .catch(err => {
		      console.log('err: ', err)
		      that.pops.btnLoading = false
		    })
		},
		//关闭当前页面
		closeCurPage(){
			setTimeout(()=>{this.$store.dispatch('d2admin/page/close', {tagName: this.tagName,vm:this})},1500)
		}
	  }
	};
</script>