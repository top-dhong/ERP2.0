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
	  <li>选中相应节点,编辑当前节点</li>
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
			v-loading="loading"
			  ref="tree"
			  class="filter-tree"
			  node-key="GUID"
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
              prop="PGUID"
            >
              <el-input
                v-model="menuform.PGUID"
                :disabled="true"
              ></el-input>
            </el-form-item>
			<el-form-item
			  label="当前节点"
			  prop="GUID"
			>
			  <el-input
			    v-model="menuform.GUID"
			    :disabled="true"
			  ></el-input>
			</el-form-item>
			<el-form-item
			  label="序号"
			  prop="OrderNo"
			  :rules="[{ required: true, message: '序号不能为空',trigger:'blur'}]"
			>
			  <el-input
			    v-model="menuform.OrderNo"
			    placeholder="请输入分类序号"
				clearable
			  ></el-input>
			</el-form-item>
            <el-form-item
              label="分类名称"
              prop="TypeName"
			  :rules="[{ required: true, message: '分类名称不能为空',trigger:'blur'}]"
            >
              <el-input
                v-model="menuform.TypeName"
                placeholder="请输入分类名称"
				clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
			  :loading="loaging2"
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
import util from '@/libs/util.js'
import {GetConTypelist} from "@/api/cost/cost";
import {SaveAndUpTab,DeleteTab} from "@/api/sys/sys";
export default {
  data() {
    return {
      currentId: "",
	  loading:false,
      menuList: [],//左侧树
      defaultProps: {
        label: "TypeName"
      },
      menuform: {
        GUID: '',
        PGUID: '0',
        OrderNo:'',
        TypeName:''
      },
	  loaging2:false
    };
  },

  methods: {
    initData() {
		let that = this
		that.loading = true
		GetConTypelist().then(async res => {
			that.loading = false
            if(typeof(res)!='undefined'&&res.code==0){
				let a1 = {    //定义数据属性名称
					GUID: 'GUID',
					PGUID: 'PGUID',
					OrderNo:'OrderNo',
					TypeName:'TypeName'
				}
				let a2 = { //指定 rootId id parentId 的键值
					rootId:"",
					id:"GUID",
					parentId:"PGUID"
				}
				that.menuList = util.listToTreePlus(res.data,a1,a2);
            }
          })
          .catch(err => {
            console.log('err111: ', err)
          })
    },
    getMenuData(data) {
		let that = this
		let GUID = data.GUID;
        that.menuform = data;
        that.currentId = GUID;
    },
	//type     del:2    upde:1    add:0
    add(mark) {
		let that = this
		if(1==mark){//新增顶级
			that.menuform = {
				GUID:"",
				PGUID: ""
			};
		that.currentId = "";
		}else if(2==mark){//新增子级
			that.menuform = {
				PGUID: that.currentId
			};
		}
    },
    edit() {
		let that = this
    },
	//梳理数据
	//需要克隆对象  此处必须做clone处理  因为后端是根据前段传入的字段直接解析生成sql
	filter(data){
		//let param = Object.create(data);
		let param = util.deepClone(data)
		//delete param["leaderName"];
		delete param["children"];
		//delete param["type"];
		return param;
	},
    del() {
		let that = this
		if(!that.currentId){
			that.$message({message: '请选取你要删除的数据',type: 'info'})
			return
		}
		if(that.menuform.children.length>0){
			that.$message({message: '请移除所有子节点后再删除当前节点',type: 'info'})
			return
		}
		that.$confirm(`确认删除[${that.menuform.TypeName}]？`, "确认信息", {
		distinguishCancelAndClose: true,
		confirmButtonText: "删除",
		cancelButtonText: "取消"
		}).then(() => {
			let param = {tabName:'CT_ConType',GUID:that.currentId};
			DeleteTab(qs.stringify(param)).then(async res => {
				if(typeof(res)!='undefined'&&res.code==0){
					that.$message({message: res.msg,type: 'success'})
					setTimeout(function(){that.initData();},1500)
					that.currentId = "";
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
			let jsonStr = that.filter(that.menuform);
			console.log(1,jsonStr)
			if(valid){
				that.loaging2 = true
				SaveAndUpTab(qs.stringify({tabName:'CT_ConType',jsonStr:JSON.stringify(jsonStr)})).then(async res => {
					that.loaging2 = false
					if(typeof(res)!='undefined'&&res.code==0){
						that.$message({message: res.msg,type: 'success'})
						setTimeout(function(){that.initData();},1500)
					}
				})
				.catch(err => {
					that.loaging2 = false
					console.log('err111: ', err)
				})
			}
		})
		
    }
  },
  created() {
    this.initData();
  }
};
</script>
