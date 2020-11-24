<template>
  <d2-container>
    <el-button-group>
      <el-button
        v-if="canAdd"
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="add(1)"
      >新增顶级</el-button>
	  <el-button
	    v-if="canAdd"
	    type="success"
	    icon="el-icon-circle-plus-outline"
		:disabled="!currentId"
	    size="mini"
	    @click="add(2)"
	  >新增子级</el-button>
      <!-- <el-button
        type="primary"
        icon="el-icon-edit"
        :disabled="!currentId"
        size="mini"
        @click="edit"
      >编辑</el-button> -->
      <el-button
        type="danger"
        icon="el-icon-delete"
        :disabled="!currentId"
        size="mini"
        @click="del"
      >删除</el-button>
      <!-- <el-button
        v-permission="['p_menu_edit']"
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="batchEdit"
      >批量编辑</el-button> -->
    </el-button-group>
    <el-popover
      placement="top-start"
      title="温馨提示"
      width="400"
      trigger="click"
    >
      <li>点击`新增顶级`添加根节点</li>
	  <li>选中相应节点,点击`新增子级`,添加当前节点的子节点</li>
	  <li>选中相应节点,点击`编辑`,编辑当前节点</li>
	  <li>选中相应节点,点击`删除`,删除当前节点</li>
      <el-button
        slot="reference"
        size="mini"
        icon="el-icon-info"
        style="float:right"
      >操作提示</el-button>
    </el-popover>
    <el-row>
      <el-col
        :span="8"
        style="margin-top:15px;height: 50rem"
      >
	  <el-scrollbar style="height: 100%;">
			<el-tree
			  ref="tree"
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
			:rules="rules"
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
              label="流程名称"
              prop="typename"
            >
              <el-input
                v-model="menuform.typename"
                placeholder="请输入流程名称"
              ></el-input>
            </el-form-item>
			<el-form-item
			  label="流程类型"
			  prop="flowtypeAttribute"
			>
			  <el-select
			    class="filter-item"
			    v-model="menuform.flowtypeAttribute"
			    placeholder="请选择流程类型"
			  >
			    <el-option
			      v-for="item in flowtypeAttributeOptions"
			      :key="item.velue"
			      :label="item.label"
			      :value="item.value"
			    ></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item
			  label="流程类别"
			  prop="newTypeName"
			>
			  <el-select
			    class="filter-item"
			    v-model="menuform.newTypeName"
				@change="chgnewTypeName"
			    placeholder="请选择流程类别"
			  >
			    <el-option
			      v-for="item in newTypeNameOptions"
			      :key="item.velue"
			      :label="item.name"
			      :value="item.value"
			    ></el-option>
			  </el-select>
			</el-form-item>
            <el-form-item
              label="排序号"
              prop="orderno"
            >
              <el-input
                v-model="menuform.orderno"
                placeholder="请输入排序号"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
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
import qs from "qs";
import {GetFlowType,OperFlowType,GetFlowDefinePath} from "@/api/flow/flow";
export default {
  data() {
    return {
      formEdit: false,
      currentId: "",
      menuList: [],
      defaultProps: {
        label: "typename"
      },
	  dotype:1,//操作类型  type     del:2    upde:1    add:0
      menuform: {
        guid: "",
        pguid: 0,
        typename: "",
		newTypeName:"",
        flowtypeAttribute:'',
        orderno: 0
      },
	  flowtypeAttributeOptions: [
	    {
	      value: "流程类别",
	      label: "流程类别"
	    },
	    {
	      value: "流程名称",
	      label: "流程名称"
	    },
	    {
	      value: "根节点",
	      label: "根节点"
	    }
	  ],
	  newTypeNameOptions:[],
      editFormDialogVisible: false,
      relateInterfaceDialogVisible: false,
      canAdd: this.hasPermissions(["p_menu_edit"]),
	  // 表单校验
	  rules: {
	    typename: [
	      {
	        required: true,
	        message: '请选择流程名称',
	        trigger: 'blur'
	      }
	    ],
	    flowtypeAttribute: [
	      {
	        required: true,
	        message: '请选择流程类型',
	        trigger: 'blur'
	      }
	    ],
		newTypeName: [
		  {
		    required: true,
		    message: '请选择流程类别',
		    trigger: 'blur'
		  }
		],
	    orderno: [
	      {
	        required: true,
	        message: '请输入排序号',
	        trigger: 'blur'
	      }
	    ]
	  }
    };
  },
  methods: {
    initData() {
		let that = this
		GetFlowType(qs.stringify({})).then(async res => {
            if(typeof(res)!='undefined'&&res.code==0){
				that.menuList = res.data;
				//初始化流程类别可选下拉列表
				GetFlowDefinePath(qs.stringify({})).then(async res => {
				    if(typeof(res)!='undefined'&&res.code==0){
						that.newTypeNameOptions = res.data;
					}else{
						that.$message({message: res.msg,type: 'error'})
					}
				})
            }else{
				that.$message({message: res.msg,type: 'error'})
            }
          })
          .catch(err => {
            console.log('err111: ', err)
          })
    },
    getMenuData(data) {
		let that = this
		let guid = data.guid;
        that.menuform = data;
        that.currentId = guid;
    },
	chgnewTypeName(e){
		this.menuform.pguid = e;
	},
	//type     del:2    upde:1    add:0
    add(mark) {
		let that = this
		if(1==mark){//新增顶级
			that.menuform = {
				guid:"",
				pguid: ""
			};
		that.currentId = "";
		}else if(2==mark){//新增子级
			that.menuform = {
				pguid: that.currentId
			};
		}
		that.dotype = 0;
		that.formEdit = true;
    },
    edit() {
		let that = this
		that.dotype = 1;
		that.formEdit = true;
    },
    del() {
		let that = this
		if(!that.currentId){
			that.$message({message: '请选取你要删除的数据',type: 'info'})
			return
		}
		that.dotype = 2;
		that.$confirm(`确认删除[${that.menuform.typename}]？`, "确认信息", {
		distinguishCancelAndClose: true,
		confirmButtonText: "删除",
		cancelButtonText: "取消"
		}).then(() => {
			let jsonStr = {type:that.dotype,guid:that.currentId};
			OperFlowType(qs.stringify({jsonStr:JSON.stringify(jsonStr)})).then(async res => {
			if(typeof(res)!='undefined'&&res.code==0){
				that.$message({message: res.msg,type: 'success'})
				setTimeout(function(){that.initData();},1500)
				that.currentId = "";
			}else{
				that.$message({message: res.msg,type: 'error'})
			}
			})
			.catch(err => {
				console.log('err111: ', err)
			})
		});
    },
    submit() {
		let that = this
		that.$refs.menuform.validate((valid) => {
			if(valid){
				let jsonStr = {type:that.dotype,...that.menuform};
				OperFlowType(qs.stringify({jsonStr:JSON.stringify(jsonStr)})).then(async res => {
					if(typeof(res)!='undefined'&&res.code==0){
						that.$message({message: res.msg,type: 'success'})
						setTimeout(function(){that.initData();},1500)
					}else{
						that.$message({message: res.msg,type: 'error'})
					}
				})
				.catch(err => {
					console.log('err111: ', err)
				})
			}
		})
		
    },
    reset() {
      this.menuform = {
        guid: this.currentId,
        pguid: this.menuform.pguid,
        typename: "",
        flowtypeAttribute:'',
        orderno: 0
      };
    },
    batchEdit() {
      this.editFormDialogVisible = !this.editFormDialogVisible;
    },
    openInterfaceDialog() {
      this.relateInterfaceDialogVisible = !this.relateInterfaceDialogVisible;
    }
  },
  created() {
    this.initData();
  }
};
</script>
