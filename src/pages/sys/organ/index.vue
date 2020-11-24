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
              label="组织名称"
              prop="OrgName"
			  :rules="[{ required: true, message: '组织名称不能为空',trigger:'blur'}]"
            >
              <el-input
                v-model="menuform.OrgName"
                placeholder="请输入组织名称"
				@input="pyCODE"
				clearable
              ></el-input>
            </el-form-item>
			<el-form-item
			  label="组织编码"
			  prop="OrgCode"
			  :rules="[{ required: true, message: '组织编码不能为空',trigger:'blur'}]"
			>
			  <el-input
			    v-model="menuform.OrgCode"
			    placeholder="请输入组织编码"
				readonly
			  ></el-input>
			</el-form-item>
			<!-- <el-form-item
			  label="组织简称"
			  prop="orgName"
			  :rules="[{ required: true, message: '组织简称不能为空',trigger:'blur'}]"
			>
			  <el-input
			    v-model="menuform.orgName"
			    placeholder="请输入组织简称"
			  ></el-input>
			</el-form-item> -->
			<el-form-item label="负责人" prop="LeaderName" :rules="[{ required: true, message: '负责人不能为空',trigger:'blur'}]">
				<deng-select-user v-model="menuform.LeaderName" @submitdata="submitdata" :currentValue="menuform.leaderName" :canMark="'one'"></deng-select-user>
			</el-form-item>
			<el-form-item
			  label="组织属性"
			  prop="OrgType"
			  :rules="[{ required: true, message: '组织属性不能为空',trigger:'blur'}]"
			>
			  <el-select
			    class="filter-item"
			    v-model="menuform.OrgType"
				@change="chgorgType"
			    placeholder="请选择组织属性"
			  >
			    <el-option
			      v-for="item in orgTypeOptions"
			      :key="item.velue"
			      :label="item.name"
			      :value="item.value"
			    ></el-option>
			  </el-select>
			</el-form-item>
            <!-- <el-form-item
              label="排序号"
              prop="orderno"
			  :rules="[{ required: true, message: '排序号不能为空',trigger:'blur'}]"
            >
              <el-input
                v-model="menuform.orderno"
                placeholder="请输入排序号"
              ></el-input>
            </el-form-item>
			<el-form-item
			  label="是否作废"
			  prop="orderno"
			>
			  <el-input
			    v-model="menuform.orderno"
			    placeholder="请输入排序号"
				readonly
			  ></el-input>
			</el-form-item> -->
			<el-form-item label="切换上级" prop="CorpGuid">
				<deng-select-user @submitdata="submitdata" :canMark="'one'"></deng-select-user>
			</el-form-item>
            <el-form-item>
              <el-button :loading="loading3" type="primary" @click="submit">提交</el-button>
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
import vPinyin from "@/libs/vue-py.js";
import {GetSysOrglist,SaveAndUpTab,DeleteTab} from "@/api/sys/sys";
export default {
  data() {
    return {
      formEdit: false,
      currentId: "",
      menuList: [],
      defaultProps: {
        label: "OrgName"
      },
	  dotype:1,//操作类型  type     del:2    upde:1    add:0
      menuform: {
        GUID: '',
        PGUID: '0',
        CorpGuid:'',
        OrgCode:'',
        OrgLeader:'',
		LeaderName:'',
        OrgName:'',
        OrgType:''
      },
	  orgTypeOptions:[
		  {value:'COM',name:'公司'},
		   {value:'DPT',name:'部门'}
	  ],
	  loading3:false
    };
  },
  components: {
  	'dengSelectUser': () => import(`@cps/deng-select-user`)
  },
  methods: {
    initData() {
		let that = this
		GetSysOrglist().then(async res => {
            if(typeof(res)!='undefined'&&res.code==0){
				let a1 = {    //定义数据属性名称
					GUID: 'GUID',
					PGUID: 'PGUID',
					CorpGuid:'CorpGuid',
					OrgCode:'OrgCode',
					OrgLeader:'OrgLeader',
					LeaderName:'LeaderName',
					OrgName:'OrgName',
					OrgType:'OrgType'
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
	chgorgType(e){
		this.menuform.OrgType = e;
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
		that.dotype = 0;
		that.formEdit = true;
    },
    edit() {
		let that = this
		that.dotype = 1;
		that.formEdit = true;
    },
	//梳理数据
	//需要克隆对象  此处必须做clone处理  因为后端是根据前段传入的字段直接解析生成sql
	filter(data){
		//let param = Object.create(data);
		let param = util.deepClone(data)
		delete param["LeaderName"];
		delete param["children"];
		delete param["type"];
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
		that.dotype = 2;
		that.$confirm(`确认删除[${that.menuform.OrgName}]？`, "确认信息", {
		distinguishCancelAndClose: true,
		confirmButtonText: "删除",
		cancelButtonText: "取消"
		}).then(() => {
			let param = {tabName:'HR_Org',GUID:that.currentId};
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
				that.loading3 = true
				SaveAndUpTab(qs.stringify({tabName:'HR_Org',jsonStr:JSON.stringify(jsonStr)})).then(async res => {
					that.loading3 = false
					if(typeof(res)!='undefined'&&res.code==0){
						that.$message({message: res.msg,type: 'success'})
						setTimeout(function(){that.initData();},1500)
					}
				})
				.catch(err => {
					console.log('err111: ', err)
				})
			}
		})
		
    },
	submitdata(e){
		console.log(1111,e)
		this.menuform.OrgLeader = e[0].GUID
		this.menuform.LeaderName = e[0].UserName
	},
	pyCODE() {
		this.menuform.OrgCode = vPinyin.trafficHub(this.menuform.OrgName);
	}
  },
  created() {
    this.initData();
  }
};
</script>
