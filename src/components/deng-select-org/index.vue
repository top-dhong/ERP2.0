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
            <el-button v-popover:pop slot="append">
                <i class="fa fa-list"></i>
            </el-button>
        </el-input>
    </span>
</template>

<script>
	import util from '@/libs/util.js'
	import {GetSysOrglist} from "@/api/sys/sys";
	//import qs from "qs";
	export default {
	  name: "deng-select-org",
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
		
	  },
	  data() {
		return {
		  pop: false,
		  data:[],
		  defaultProps: {
		  	label: "OrgName"
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
			readonly:true,
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
		console.log(11111)
		this.currentValue = this.value;
		//this.initData()
	  },
	  methods: {
		initData(){
			let that = this
			GetSysOrglist().then(async res => {
			    if(typeof(res)!='undefined'&&res.code==0){
					let a1 = {    //定义数据属性名称
						GUID: 'GUID',
						PGUID: 'PGUID',
						OrgCode:'OrgCode',
						OrgType:'OrgType',
						CorpGuid:'CorpGuid',
						OrgLeader:'OrgLeader',
						LeaderName:'LeaderName',
						OrgName:'OrgName'
					}
					let a2 = { //指定 rootId id parentId 的键值
						rootId:"",
						id:"GUID",
						parentId:"PGUID"
					}
					that.data = util.listToTreePlus(res.data,a1,a2)
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
			if(node.children.length>0)return//只能选取根节点
			that.$emit("input", node.OrgName);
			if (node.GUID && that.autoClose) {
				that.$emit("setOrg", node);
				that.pop = false;
			}
		}
	  }
	};
</script>