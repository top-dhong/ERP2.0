<template>
    <el-dialog :title="pops.title" :visible.sync="pops.dialogVisible" @open="tapOpen">
      <el-form :model="form">
        <el-form-item label="环节:">
          <el-select v-model="form.aaa" placeholder="请选择" style="width:100%">
            <el-option v-for="item in Options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="签字意见:">
          <el-input v-model="form.Opinion" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
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
	import { GetFlowRebutList, FlowRebut} from "@/api/flow/flow";
	export default {
	  props: {
		pops: {
		  type: Object
		},
		FlowGUID:{
		  type: String
		},
		tagName:{
			type:String
		}
	  },
	  data() {
		return {
		  Options:[],
		  form:{aaa:"",Opinion:""}
		};
	  },
	  methods: {
		  tapOpen(){
		  	this.initData()
		  },
		initData(){
			let that = this
			let par = { FlowGUID: that.FlowGUID }
			GetFlowRebutList(qs.stringify(par)).then(async res => {
				if (typeof (res) != 'undefined' && res.code == 0) {
					that.Options = res.data
				}
			})
			.catch(err => {
				console.log('err: ', err)
			})
		},
		tapCancel(){
			console.log(11111)
			this.$emit("tapCancel")
			//this.$emit("update:model.dialogVisible",false)
		},
		tapOK(){
			let that = this
			if(!that.form.aaa){
				that.$message({message: '请选择驳回环节!',type: 'error'})
				return
			}
			if(!that.form.Opinion){
				that.$message({message: '请填写签字意见!',type: 'error'})
				return
			}
			//that.$emit("tapOK",that.form)
			console.log('tapOK  tapFlowRebut=>', that.form)
			if (!that.form.aaa) {
			  that.$message({ message: '请选择驳回环节!', type: 'error' })
			  return
			}
			if (!that.form.Opinion) {
			  that.$message({ message: '请填写签字意见!', type: 'error' })
			  return
			}
			let tmpArr = that.form.aaa.split(',')
			let par = { FlowGUID: that.FlowGUID, NodeGUID: tmpArr[0], NodeDoUser: tmpArr[1], Opinion: that.form.Opinion }
			if (that.pops.btnLoading) return
			that.pops.btnLoading = true
			FlowRebut(qs.stringify(par)).then(async res => {
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
		//关闭当前页面
		closeCurPage(){
			setTimeout(()=>{this.$store.dispatch('d2admin/page/close', {tagName: this.tagName,vm:this})},1500)
		}
	  }
	};
</script>