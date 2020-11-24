<template>
  <d2-container>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="add(1)"
      >新增顶级</el-button>
      <el-button
        type="success"
        icon="el-icon-circle-plus-outline"
      		:disabled="!currentId"
        size="mini"
        @click="add(2)"
      >新增子级</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        :disabled="!currentId"
        size="mini"
        @click="del"
      >删除</el-button>
    </el-button-group>
    <el-popover
      placement="top-start"
      title="温馨提示"
      width="400"
      trigger="click"
    >
      <li>请不要在`功能`类型节点下建子节点</li>
      <el-button
        slot="reference"
        size="mini"
        icon="el-icon-info"
        style="float:right"
      ></el-button>
    </el-popover>
    <el-row>
      <el-col
        :span="8"
        style="margin-top:15px;height: 50rem"
      >
	  <el-scrollbar style="height: 100%;">
			<el-tree
			  ref="tree"
			  v-loading="loading1"
			  class="filter-tree"
			  node-key="guid"
			  default-expand-all
			  highlight-current
			  :expand-on-click-node="false"
			  :data="menuList"
			  :props="defaultProps"
			  @node-click="getMenuData"
			></el-tree>
		</el-scrollbar>
      </el-col>
      <el-col
        :span="16"
        style="margin-top:15px;"
      >
        <el-card shadow="always" style="margin-left: 5px;">
          <el-form
            label-position="right"
            label-width="80px"
            :model="menuform"
            ref="menuform"
          >
            <el-form-item
              label="父级节点"
              prop="pguid"
            >
              <el-input
                v-model="menuform.pguid"
                :disabled="true"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="当前节点"
              prop="guid"
            >
              <el-input
                v-model="menuform.guid"
                :disabled="true"
              ></el-input>
            </el-form-item>
			
            <el-form-item
              label="菜单名称"
              prop="funcName"
			  :rules="[{ required: true, message: '菜单名称不能为空',trigger:'blur'}]"
            >
              <el-input
                v-model="menuform.funcName"
                placeholder="请输入菜单名称"
				clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="路径"
              prop="path"
			  :rules="[{ required: false, message: '路径不能为空',trigger:'blur'},{ pattern: /^[A-Za-z0-9-/]+$/, message: '只能输入英文丶数字或`/`' }]"
            >
              <el-input
                v-model="menuform.path"
                placeholder="请输入路径"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="图标"
              prop="icon"
            >
              <d2-icon-select
                v-model="menuform.icon"
                :user-input="true"
              />
            </el-form-item>
            <el-form-item
              label="排序"
              prop="orderNo"
			  :rules="[{ required: true, message: '排序不能为空',trigger:'blur'},{ pattern: /^[0-9]+$/, message: '只能输入正整数' }]"
            >
              <el-input
                v-model="menuform.orderNo"
                placeholder="请输入排序"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="是否生效"
              prop="isValid"
            >
              <el-switch
                v-model="menuform.isValid"
              ></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
				:loading="loading"
                @click="submit"
              >提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import {GetMenuList,OperMenu} from "@/api/sys/menu";
import qs from "qs";
import util from '@/libs/util.js'
export default {
  data() {
    return {
		dotype:1,//操作类型  type     del:2    upde:1    add:0
		loading:false,
		currentId: "",
		menuList: [],
		defaultProps: {
			label: "funcName"
		},
		menuform: {
			guid: "",
			pguid: "",
			funcName: "",
			path: "",
			icon: "",
			orderNo: "",
			isValid:true
		},
		loading1:false//左侧树形菜单加载状态
    };
  },
  methods: {
    GetMenuList() {
		let that = this
		this.loading1 = true
      GetMenuList().then(data => {
		  this.loading1 = false
		if(typeof(data)!='undefined'&&data.code==0){
			let attr = {    //定义数据属性名称
				guid: 'guid',
				pguid: 'pguid',
				funcName: 'funcName',
				path:'path',
				icon:'icon',
				orderNo:'orderNo',
				isValid:'isValid'
			}
			let attr2 = { //指定 rootId id parentId 的键值
				rootId:"",
				id:"guid",
				parentId:"pguid"
			}
			//let list = [{guid:1,pguid:"",funcName:'根菜单'},{guid:2,pguid:1,funcName:'子菜单1'},{guid:3,pguid:1,funcName:'子菜单2'}]
			that.menuList = util.listToTreePlus(data.data,attr,attr2);
		}
      });
    },
    getMenuData(data) {
	  this.menuform = data
      this.currentId = data.guid;
    },
    //type     del:2    upde:1    add:0
    add(mark) {
    	let that = this
    	if(1==mark){//新增顶级
    		that.menuform = {
				guid: "",
				pguid: "",
				funcName: "",
				path: "",
				icon: "",
				orderNo: "",
				isValid:true
    		};
    	that.currentId = "";
    	}else if(2==mark){//新增子级
    		that.menuform = {
    			pguid: that.currentId,
				funcName: "",
				path: "",
				icon: "",
				orderNo: "",
				isValid:true
    		};
    	}
    	that.dotype = 0;
    },
    edit() {
	  that.dotype = 1;
    },
    del() {
		let that = this
		if(!that.currentId){
			that.$message({message: '请选取你要删除的数据',type: 'info'})
			return
		}
		that.$confirm(`确认删除功能菜单[${that.menuform.funcName}]？`, "确认信息", {
			distinguishCancelAndClose: true,
			confirmButtonText: "删除",
			cancelButtonText: "取消"
		}).then(() => {
			let jsonStr = {type:2,guid:that.currentId};
			OperMenu(qs.stringify({jsonStr:JSON.stringify(jsonStr)})).then(async res => {
				that.$message({message: res.msg,type: 'success'})
				setTimeout(function(){that.GetMenuList();},1500)
				that.currentId = "";
			});
      });
    },
    submit() {
		let that = this
		that.$refs.menuform.validate((valid) => {
			if (valid) {
				that.loading = true
				let jsonStr = {type:that.dotype,...that.menuform};
				OperMenu(qs.stringify({jsonStr:JSON.stringify(jsonStr)})).then(async res => {
					that.loading = false
					that.$message({message: res.msg,type: 'success'})
					setTimeout(function(){that.GetMenuList();},1500)
				});
			}
		});
    },
    batchEdit() {
      this.editFormDialogVisible = !this.editFormDialogVisible;
    },
    openInterfaceDialog() {
      this.relateInterfaceDialogVisible = !this.relateInterfaceDialogVisible;
    }
  },
  created() {
    this.GetMenuList();
  }
};
</script>
