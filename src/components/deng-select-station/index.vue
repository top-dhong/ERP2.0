<template>
    <span>
        <el-dialog title="岗位选择" :visible.sync="dialogVisible">
			<!-- <el-input v-model="value" style="max-width: 240px;">
			    <el-button slot="append">
			        <i class="fa fa-search"></i>
			    </el-button>
			</el-input> -->
          <el-table :data="data" @row-click="setStation" empty-text="请选取所属部门">
            <el-table-column property="StationName" label="岗位名称" width="150"></el-table-column>
            <!-- <el-table-column property="Guid" label="职能" width="200"></el-table-column> -->
            <el-table-column property="rankName" label="职级"></el-table-column>
          </el-table>
        </el-dialog>
       <!-- 允许用户输入 -->
       <el-input v-model="currentValue" v-bind="bind" style="max-width: 240px;">
           <el-button  @click="dialogVisible=true" slot="append">
               <i class="fa fa-list"></i>
           </el-button>
       </el-input>
    </span>
</template>

<script>
	import util from '@/libs/util.js'
	import {GetStationlist} from "@/api/elpack/elpack";
	import qs from "qs";
	export default {
	  name: "deng-select-station",
	  props: {
		// 值
		value: {
		  type: String,
		  required: false,
		  default: ""
		},
		// 占位符
		placeholder: {
		  type: String,
		  required: false,
		  default: "请选择"
		},
		// 弹出界面的方向
		placement: {
		  type: String,
		  required: false,
		  default: "right"
		},
		// 是否可清空
		clearable: {
		  type: Boolean,
		  required: false,
		  default: true
		},
		// 是否在选择后自动关闭
		autoClose: {
		  type: Boolean,
		  required: false,
		  default: true
		},
		orgGuid:{
			type: String,
			required: false,
			default: ""
		}
	  },
	  data() {
		return {
		  // 绑定弹出框
		  data:[],
		  // 组件内输入框的值
		  currentValue: "",
		  dialogVisible:false,
		  value:''
		};
	  },
	  computed: {
		// 输入框上绑定的设置
		bind() {
		  return {
			placeholder: this.placeholder,
			clearable: this.clearable,
			orgGuid:this.orgGuid,
			readonly:true,
			...this.$attrs
		  };
		}
	  },
	  watch: {
		value(value) {
		  this.currentValue = value;
		},
		orgGuid(value) {
			this.initData()
		  //this.currentValue = value;
		},
		//模拟每次打开组件就刷新数据 防止改了数据
		// dialogVisible(value){
		// 	if(value){this.initData()}
		// }
	  },
	  created() {
		this.currentValue = this.value;
		this.initData()
	  },
	  methods: {
		setStation(data) {
		  this.$emit("input", data.StationName);
		  this.$emit("setStation",data)
		  if (data.StationName && this.autoClose) {
			this.dialogVisible = false;
		  }
		},
		initData(){
			let that = this
			let orgGuid = that.orgGuid;//'A236D645E1E14B7DB8C8CAB826F42A6D';
			console.log(1,orgGuid)
			if(!orgGuid){
				console.log(1,'请先选取所属部门')
				//that.$message({message: '请先选取所属部门',type: 'error'})
				return
			}
			GetStationlist(qs.stringify({orgGuid})).then(async res => {
			    if(typeof(res)!='undefined'&&res.code==0){
					that.data = res.data
			    }
			  })
			  .catch(err => {
			    console.log('err111: ', err)
			  })
		}
	  }
	};
</script>