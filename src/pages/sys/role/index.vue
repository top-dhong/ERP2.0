<template>
  <d2-container>
    <template slot="header">
      <el-form :inline="true" size="mini" style="margin-bottom: -18px;">
		  <el-form-item>
		    <el-button type="success" title="新建" @click="tapAdd">
		      <d2-icon name="plus"/>
		      新建
		    </el-button>
		  </el-form-item>
      </el-form>
    </template>
    <!-- <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="add">
      新增
    </el-button>
    <el-button v-if="multipleSelection.length>0" type="danger" size="mini" icon="el-icon-delete" @click="batchDel">
      删除
    </el-button> -->
    <el-table :data="tableData" v-loading="loading" size="small" stripe highlight-current-row style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
	  <el-table-column label="角色名称" prop="RoleName">
	    <template slot-scope="scope">
	      {{scope.row.RoleName}}
	    </template>
	  </el-table-column>
	  <el-table-column label="角色属性">
	    <template slot-scope="scope">
			{{doProp(scope.row.RoleProperties)}}
	    </template>
	  </el-table-column>
      <el-table-column label="上级角色" prop="PName">
        <template slot-scope="scope">
          {{scope.row.PName}}
        </template>
      </el-table-column>
	  <el-table-column label="角色备注" prop="RoleMemo" :show-overflow-tooltip="true">
	    <template slot-scope="scope">
	      {{scope.row.RoleMemo}}
	    </template>
	  </el-table-column>
      <el-table-column width="90" fixed="right" label="操作" align="center">
		<template slot-scope="scope">
		  <el-dropdown size="small" class="d2-mr">
			<span class="btn-text"><el-button icon="el-icon-setting" size="mini"></el-button></span>
			<el-dropdown-menu slot="dropdown">
			  <el-dropdown-item @click.native="tapEditer(scope.row)">
				<d2-icon name="pencil" class="d2-mr-5"/>
				编辑
			  </el-dropdown-item>
			  <el-dropdown-item @click.native="tapDelete(scope.row)">
				<d2-icon name="trash-o" class="d2-mr-5"/>
			  	删除
			  </el-dropdown-item>
			</el-dropdown-menu>
			</el-dropdown>
		</template>
      </el-table-column>
    </el-table>
	<!-- 新增/修改对话框 -->
	<el-dialog title="新增/修改" :visible.sync="dialogAddVisible">
		<el-form :model="formData" ref="formData" label-position="left" label-width="100px" class="demo-ruleForm">
		    <el-form-item label="角色名称：" prop="RoleName" :rules="[{ required: true, message: '角色名称不能为空',trigger:'blur'}]">
		      <el-input v-model="formData.RoleName" maxlength="10" placeholder="请输入角色名称" clearable>
		      </el-input>
		    </el-form-item>
		    <el-form-item label="角色属性：" prop="RoleProperties" :rules="[{ required: true, message: '角色属性不能为空',trigger:'blur'}]">
		      <el-select v-model="formData.RoleProperties">
				  <el-option
				       v-for="item in optionsRoleProperties"
				       :key="item.value"
				       :label="item.label"
				       :value="item.value"/>
			  </el-select>
		    </el-form-item>
			<el-form-item label="上级角色：" prop="PGUID" :rules="[{ required: true, message: '上级角色不能为空',trigger:'blur'}]">
			  <el-select v-model="formData.PGUID">
				   <el-option
				        v-for="item in optionsPRoleName"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value"/>
			  </el-select>
			</el-form-item>
			<el-form-item label="角色备注：" prop="RoleMemo">
			  <el-input type="textarea" v-model="formData.RoleMemo" :maxlength="10" placeholder="请输入备注" maxlength="30" show-word-limit>
			  </el-input>
			</el-form-item>
		  </el-form> 
		  <div slot="footer" class="dialog-footer">
		  	<el-button @click="dialogAddVisible = false" title="点击阴影部分可快捷关闭窗口">取 消</el-button>
		     <el-button :loading="loading1" type="primary" @click="tapSubmit">提交</el-button>
		  </div>
	</el-dialog>
  </d2-container>
</template>
<script>
import qs from "qs";
import util from '@/libs/util.js'
import {GetRolelist,GetSysRolelist,SaveAndUpTab,DeleteTab} from "@/api/sys/sys";
export default {
  data() {
    return {
      loading: false,//加载表格状态
      tableData: [],//表数据
      multipleSelection: [],
      page: {
        current: 1,
        size: 100,
        total: 0
      },
      formData: {
		GUID:'',
		PGUID:'',
		RoleName:'',
		PName:'',
		RoleProperties:'',
		RoleMemo:''
      },
      dialogAddVisible: false,
	  loading1:false,//新增提交加载按钮状态
	  optionsRoleProperties:[
		  {value:'GLB',label:'全局角色'},
		  {value:'PRO',label:'项目角色'},
		  {value:'DPT',label:'部门角色'},
		  {value:'FCOM',label:'法人公司角色'},
		  {value:'MCOM',label:'管理公司角色'}
	  ],
	  optionsPRoleName:[]//
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      let that = this
      that.loading = true
      GetRolelist().then(async res => {
      	that.loading = false
          if(typeof(res)!='undefined'&&res.code==0){
      		that.tableData = res.data;
          }else if(res.code==3){
			  that.tableData = []
		  }
        })
        .catch(err => {
          console.log('err111: ', err)
        })
		GetSysRolelist().then(async res => {
		    if(typeof(res)!='undefined'&&res.code==0){
				that.optionsPRoleName = res.data;
		    }
		  })
		  .catch(err => {
		    console.log('err111: ', err)
		  })
    },
	//处理角色属性显示
    doProp(pop) {
		let str = ''
		this.optionsRoleProperties.forEach((item)=>{
			if(pop==item.value){str = item.label}
		})
		return str
    },
	tapAdd(){
		this.dialogAddVisible = true
		this.formData = {
			GUID:'',
			PGUID:'',
			RoleName:'',
			PName:'',
			RoleProperties:'',
			RoleMemo:''
		}
		//this.$refs.formData.resetFields();
	},
	tapEditer(data){
		let that = this
		that.dialogAddVisible = true
		that.formData = data
	},
	tapDelete(data){
		let that = this
		that.$confirm(`确认删除[${data.RoleName}]？`, "确认信息", {
		distinguishCancelAndClose: true,
		confirmButtonText: "删除",
		cancelButtonText: "取消"
		}).then(() => {
			let param = {tabName:'WF_Define_Role',GUID:data.GUID};
			DeleteTab(qs.stringify(param)).then(async res => {
				if(typeof(res)!='undefined'&&res.code==0){
					that.$message({message: res.msg,type: 'success'})
					setTimeout(function(){that.initData();},1500)
				}
			})
			.catch(err => {
				console.log('err111: ', err)
			})
		});
	},
	//梳理数据
	//需要克隆对象  此处必须做clone处理  因为后端是根据前段传入的字段直接解析生成sql
	filter(data){
		//let param = Object.create(data);
		let param = util.deepClone(data)
		delete param['PName'];
		return param;
	},
	//提交新增数据
	tapSubmit(){
		let that = this
		that.loading1 = true
		console.log(1,that.formData)
		let param = that.filter(that.formData)
		that.$refs.formData.validate((valid) => {
		    if (valid) {
				SaveAndUpTab(qs.stringify({tabName:'WF_Define_Role',jsonStr:JSON.stringify(param)})).then(async res => {
					that.loading1 = false
					if(typeof(res)!='undefined'&&res.code==0){
						that.$message({message: res.msg,type: 'success'})
						setTimeout(()=>{this.initData();that.dialogAddVisible=false;},1500)
					}
				})
				.catch(err => {
					console.log('err111: ', err)
				})
			}else{
				that.loading1 = false
				that.$message({message: "请根据提示完善单据！",type: 'error'})
				 return false;
			}
		})
	}
  }
};
</script>
