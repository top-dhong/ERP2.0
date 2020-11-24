<template>
    <el-dialog title="打印选项" :visible.sync="pops.dialogVisible">
      <el-form :model="flowData">
        <el-form-item label="打印内容:">
          <el-checkbox-group v-model="flowData.printChk">
            <el-checkbox label="打印表单"></el-checkbox>
            <!-- <el-checkbox label="打印附件"></el-checkbox> -->
            <el-checkbox label="打印流转意见"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pops.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="print">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
	import util from '@/libs/util.js'
	import Bus from "@assets/js/bus.js";
	export default {
	  props: {
		pops: {
		  type: Object
		},
		flowData:{
		  type: Object
		},
		printRef:null
	  },
	  methods: {
		print() {
		  let that = this
		  console.log(1, that.flowData.printChk)
		  let tmpChk = that.flowData.printChk;
		  if (tmpChk.length == 0) {
		    that.$message({ message: '至少勾选一项打印!', type: 'error' })
		  }
		  if (tmpChk.includes('打印流转意见') && tmpChk.length == 1) {
		    that.$message({ message: '不可只打印流转意见!', type: 'error' })
		  }
		  Bus.$emit("printBeforeFitWidth");
		  if (tmpChk.includes('打印表单')) {
		    setTimeout(() => {
		      that.$print(that.printRef)
		      Bus.$emit("printAfterFitWidth");
		    }, 200);
		  }
		  if (tmpChk.includes('打印附件')) {
		    console.log('打印附件')
		  }
		}
	  }
	};
</script>