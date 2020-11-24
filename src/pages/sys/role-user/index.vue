<template>
  <d2-container>
		<el-form
		slot="header"
		  :inline="true"
		  size="mini"
		  style="margin-bottom: -18px;">
			<el-form-item>
			  <el-button
			    type="success"
				title="新建"
			    @click="tapAdd"
				:disabled="!formData.LinkGUID"
				>
			    <d2-icon name="plus"/>
			    新建
			  </el-button>
			</el-form-item>
			<!-- <el-form-item>
			  <el-button
			    type="danger"
				@click="test">
			    <d2-icon name="trash-o"/>
			    删除
			  </el-button>
			</el-form-item> -->
			<el-popover
			  placement="top-start"
			  title="温馨提示"
			  width="400"
			  trigger="click"
			>
			  <li>暂无提示</li>
			  <el-button
			    slot="reference"
			    size="mini"
			    icon="el-icon-info"
			    style="float:right"
			  ></el-button>
			</el-popover>
		</el-form>
	  <el-row>
	    <el-col :span="6" style="height: 40.125rem;">
			<el-select v-model="RoleProperties">
				<el-option value="GLB" label="全局">全局</el-option>
				<el-option value="PRO" label="项目">项目</el-option>
				<el-option value="DPT" label="部门">部门</el-option>
				<el-option value="FCOM" label="法人公司">法人公司</el-option>
				<el-option value="MCOM" label="管理公司">管理公司</el-option>
			</el-select>
			<el-scrollbar style="height: 100%;">
				<el-tree 
				  :data="treeData"
				  v-loading="loading2"
				  node-key="GUID"
				  :highlight-current="true"
				  :check-on-click-node="true"
				  :default-expanded-keys="defaultExpandeKeys"
				  @node-click="handleCheck"
				  :props="defaultProps">
				</el-tree>
			</el-scrollbar>
		</el-col>
	    <el-col :span="18" style="padding-left: 5px;"> 
			<div>
				  <el-table
				    :data="table"
				    v-loading="loading"
				    size="mini"
				    stripe
				    style="width: 100%;margin-top: 5px;">
						<el-table-column
						  type="selection"
						  width="55">
						</el-table-column>
					  <el-table-column label="姓名" width="150" show-overflow-tooltip>
					    <template slot-scope="scope">
					  	{{scope.row.UserName}}
					    </template>
					  </el-table-column>
						<el-table-column label="角色名称" width="150" show-overflow-tooltip>
						  <template slot-scope="scope">
							{{scope.row.RoleName}}
						  </template>
						</el-table-column>
						<el-table-column label="角色备注" show-overflow-tooltip>
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
			</div>
		</el-col>
	  </el-row>
	  <!-- 新增/修改对话框 -->
	  <el-dialog title="新增/修改" :visible.sync="dialogAddVisible">
	  	<el-form :model="formData" ref="formData" label-position="left" label-width="100px" class="demo-ruleForm">
			<el-form-item label="人员：">
				<deng-select-user v-model="formData.UserName" @submitdata="submitdata" :canMark="'one'"></deng-select-user>
			</el-form-item>
			<el-form-item label="角色：" prop="RoleGUID" :rules="[{ required: true, message: '角色不能为空',trigger:'blur'}]">
			  <el-select v-model="formData.RoleGUID">
				   <el-option
				        v-for="item in optionsPRoleName"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value"/>
			  </el-select>
			</el-form-item>
			<!-- <el-form-item label="备注：" prop="RoleMemo">
			  <el-input type="textarea" v-model="formData.RoleMemo" :maxlength="10" placeholder="请输入备注" maxlength="30" show-word-limit>
			  </el-input>
			</el-form-item> -->
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
import { GetSysRoleProperylist,GetSysRoleUserlist,GetSysRolelist,SaveAndUpTab,DeleteTab } from "@/api/sys/sys";
export default {
	components: {
		'dengSelectUser': () => import(`@cps/deng-select-user`)
	},
	data () {
		return {
			RoleProperties:'GLB',
			loading2:false,//加载树形菜单
			treeData: [],
			defaultProps: {
			  children: 'children',
			  label: 'RoleName'
			},
			defaultExpandeKeys:[],
			table: [],
			loading: false,//表格数据加载状态
			dialogAddVisible:false,
			formData:{//新增/修改数据对象   备注是挂在角色里面的  在角色定义中进行维护
				RoleGUID:'',//传入后端
				UserGUID:'',//传入后端
				LinkGUID:''//传入后端  用这个字段控制新建按钮是否显示
			},
			loading1:false,
			optionsPRoleName:[]
		}
	},
	mounted(){
		this.initData()
		this.getTreeData()
	},
	watch:{
		RoleProperties(){
			this.formData.LinkGUID = "";//切换   tab 清空LinkGUID
			this.getTreeData()
		}
	},
	methods: {
		initData(){
			let that = this
			GetSysRolelist().then(async res => {
			    if(typeof(res)!='undefined'&&res.code==0){
					that.optionsPRoleName = res.data;
			    }
			  })
			  .catch(err => {
			    console.log('err111: ', err)
			  })
		},
		//初始化页面数据
		getTreeData(){
			let that = this
			that.loading2 = true
			GetSysRoleProperylist(qs.stringify({RoleProperties:that.RoleProperties})).then(async res => {
				that.loading2 = false
			    if(typeof(res)!='undefined'&&res.code==0){
					let tmpTreeData = res.data
					if(0==tmpTreeData.length)return
					let attr ={//无根节点ID  
						id:'GUID',
						parentId:'PGUID'
					}
					that.treeData = util.listToTreeOne(tmpTreeData,attr)
			    }else if(typeof(res)!='undefined'&&res.code==3){
					that.treeData = []
			    }
			  })
			  .catch(err => {
			    console.log('err111: ', err)
			  })
		},
		//加载table数据
		getData(GUID){
			let that = this
			that.loading = true;
			that.formData.LinkGUID = GUID//点击tree  设置LinkGUID
			let param = { GUID,RoleProperties:that.RoleProperties}
			GetSysRoleUserlist(qs.stringify(param)).then(async res => {
				that.loading = false
			    if(typeof(res)!='undefined'&&res.code==0){
					let tableList = res.data
					if(0==tableList.length)return
					that.table = tableList
			    }else if(typeof(res)!='undefined'&&res.code==3){
					that.table = []
			    }
			  })
			  .catch(err => {
				that.loading = false
			    console.log('err111: ', err)
			  })
		},
		//tree点击节点触发事件
		handleCheck(e){
			let that = this
			console.log(1,e)
			that.getData(e.GUID)
		},
		tapAdd(){
			let that = this
			that.dialogAddVisible = true
			that.formData ={
				RoleGUID:'',//传入后端
				UserGUID:'',//传入后端
				UserName:'',
				LinkGUID:that.formData.LinkGUID//传入后端
				}
		},
		tapEditer(d){
			this.formData = d
			console.log('tapEditer=>',d)
			this.dialogAddVisible = true
		},
		tapDelete(data){
			let that = this
			that.$confirm(`确认删除[${data.UserName}]？`, "确认信息", {
			distinguishCancelAndClose: true,
			confirmButtonText: "删除",
			cancelButtonText: "取消"
			}).then(() => {
				let param = {tabName:' WF_Define_RoleUser',GUID:data.GUID};
				DeleteTab(qs.stringify(param)).then(async res => {
					if(typeof(res)!='undefined'&&res.code==0){
						that.$message({message: res.msg,type: 'success'})
						setTimeout(function(){that.initData();that.getData(that.formData.LinkGUID);},1500)
					}
				})
				.catch(err => {
					console.log('err111: ', err)
				})
			});
		},
		//新建/编辑选取人员
		submitdata(users){
			console.log(1111,users)
			this.formData.UserGUID = users[0].GUID
			this.formData.UserName = users[0].UserName
		},
		//梳理数据
		//需要克隆对象  此处必须做clone处理  因为后端是根据前段传入的字段直接解析生成sql
		filter(data){
			//let param = Object.create(data);
			let param = util.deepClone(data)
			delete param['UserName'];
			delete param['RoleName'];
			delete param['RoleMemo'];
			return param;
		},
		filterLinkGUID(data){
			//let param = Object.create(data);
			let param = util.deepClone(data)
			delete param['LinkGUID'];
			return param;
		},
		//提交新增数据
		tapSubmit(){
			let that = this
			that.loading1 = true
			let param = that.filter(that.formData)
			//如果是全局   干掉LinkGUID   
			if('GLB'==that.RoleProperties){
				param = that.filterLinkGUID(param)
			}
			console.log(1,param)
			that.$refs.formData.validate((valid) => {
			    if (valid) {
					SaveAndUpTab(qs.stringify({tabName:'WF_Define_RoleUser',jsonStr:JSON.stringify(param)})).then(async res => {
						that.loading1 = false
						if(typeof(res)!='undefined'&&res.code==0){
							that.$message({message: res.msg,type: 'success'})
							setTimeout(()=>{that.initData();that.getData(that.formData.LinkGUID);that.dialogAddVisible=false;},1500)
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
		},
		test(){
			this.$message({message: "敬请期待!",type: 'info'})
		}
	}
}
</script>
<style>
	.el-tree{
		height: 40.125rem;
	}
</style>