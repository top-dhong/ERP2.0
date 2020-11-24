<template>
    <span>
        <el-popover ref="pop" v-model="pop" :placement="placement" width="300" trigger="click">
            <el-tree
			 :data="data"
			  :props="defaultProps"
			  :expand-on-click-node="false"
			   @node-click="handleNodeClick"></el-tree>
        </el-popover>
        <!-- 允许用户输入 -->
        <el-input v-model="currentValue" v-bind="bind">
            <el-button v-popover:pop slot="append" :disabled="readonly">
                <i class="fa fa-list"></i>
            </el-button>
        </el-input>
    </span>
</template>

<script>
	import util from '@/libs/util.js'
	import {GetProjectList} from "@/api/elpack/elpack";
	//import qs from "qs";
	export default {
	  name: "deng-select-project",
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
		  default: false
		},
		// 是否在选择后自动关闭
		autoClose: {
		  type: Boolean,
		  required: false,
		  default: true
		},
		// 图标
		icon: {
		  type: String,
		  required: false,
		  default: "list"
		},
		readonly: {
		  type: Boolean,
		  required: false,
		  default: false,
		}
	  },
	  data() {
		return {
		  pop: false,
		  data:[],
		  defaultProps: {
		  	label: "ProjectName"
		  },
		  currentValue:""
		};
	  },
	  computed: {
		// 输入框上绑定的设置
		bind() {
		  return {
			placeholder: this.placeholder,
			clearable: this.clearable,
			readonly: true,
			...this.$attrs
		  };
		}
	  },
	  watch: {
		value(value) {
		  this.currentValue = value;
		},
		clearable(value) {
			if(value){
				this.currentValue = "";
			}
		},
		//模拟每次打开组件就刷新数据 防止改了数据
		pop(value){
			if(value){this.initData()}
		}
	  },
	  created() {
		this.currentValue = this.value;
		//this.initData()
	  },
	  methods: {
		initData(){
			let that = this
			if(that.readonly){return}
			GetProjectList().then(async res => {
			    if(typeof(res)!='undefined'&&res.code==0){
					let a1 = {    //定义数据属性名称
						GUID: 'GUID',
						PGUID: 'PGUID',
						ProjectName:'ProjectName',
						ProjectCode:'ProjectCode',
						Projectcorp:'Projectcorp'
					}
					let a2 = { //指定 rootId id parentId 的键值
						rootId:"",
						id:"GUID",
						parentId:"PGUID"
					}
					that.data = util.listToTreePlus(res.data,a1,a2).tree
			    }else{
					that.$message({message: res.msg,type: 'error'})
			    }
			  })
			  .catch(err => {
			    console.log('err111: ', err)
			  })
		},
		handleNodeClick(node){
			let that = this
			that.$emit("input", node.ProjectName);
			//that.currentValue = node.ProjectName;
			if (node.GUID && that.autoClose) {
				that.$emit("setProject", node);
				that.pop = false;
			}
		},
		showDialog(){
			if(!this.readonly){
				this.pop=true
			}
		}
	  }
	};
</script>