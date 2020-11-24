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
			    @click="tapAdd">
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
			<el-form-item>
			  <el-button
			    type="primary"
				@click="handleDownloadXlsx"
				title="导出勾选的数据或查询的全部数据(最多200条)"
			    >
			    <d2-icon name="cloud-download"/>
			    导出
			  </el-button>
			</el-form-item>
			<el-popover
			  placement="top-start"
			  title="温馨提示"
			  width="400"
			  trigger="click"
			>
			  <li>导出勾选的数据或查询的全部数据(最多200条)</li>
			  <li>如果需导出更多数据,请联系管理员</li>
			  <li>重置会清空所有查询条件</li>
			  <el-button
			    slot="reference"
			    size="mini"
			    icon="el-icon-info"
			    style="float:right"
			  ></el-button>
			</el-popover>
		</el-form>
	  <el-row>
	    <el-col :span="4" style="height: 40.125rem;">
			<el-radio-group  style="margin-bottom: 5px;" size="mini">
			     <el-radio-button label="DeptClass" style="width: 12.5rem;">组织架构</el-radio-button>
			   </el-radio-group>
			<el-scrollbar style="height: 100%;">
				<el-tree 
				  :data="treeData"
				  v-loading="loading2"
				  node-key="id"
				  :highlight-current="true"
				  :check-on-click-node="true"
				  :default-expanded-keys="defaultExpandeKeys"
				  @node-click="handleCheck"
				  :props="defaultProps">
				</el-tree>
			</el-scrollbar>
		</el-col>
	    <el-col :span="20" style="padding-left: 5px;"> 
			<div>
				  <el-form
				    :inline="true"
				    size="mini"
				    style="margin-bottom: -18px;">
				    <el-form-item prop="keyWord">
				      <el-input
					  v-model="keyWord"
					  @keyup.enter.native="search"
				        placeholder="部门名称/岗位名称"
						clearable
						/>
				    </el-form-item>
					
					<el-form-item>
					  <el-button
						@click="search"
					    type="primary" >
					    <d2-icon name="search"/>
					    查询
					  </el-button>
					</el-form-item>
					<el-form-item>
					  <el-button
						@click="refresh"
					  >
					    <d2-icon name="refresh"/>
					    重置
					  </el-button>
					</el-form-item>
				  </el-form>
				  <el-table
				    :data="table"
				    v-loading="loading"
					 :default-sort = "{prop: 'UserID', order: 'ascending'}"
				    size="mini"
				    stripe
				    style="width: 100%;margin-top: 5px;"
					@selection-change="handleSelectionChange">
						<el-table-column
						  type="selection"
						  width="55">
						</el-table-column>
					  <el-table-column label="部门名称" width="150" show-overflow-tooltip>
					    <template slot-scope="scope">
					  	{{scope.row.OrgName}}
					    </template>
					  </el-table-column>
						<el-table-column label="岗位名称" width="150" show-overflow-tooltip>
						  <template slot-scope="scope">
							{{scope.row.StationName}}
						  </template>
						</el-table-column>
						<el-table-column label="职级" show-overflow-tooltip>
						  <template slot-scope="scope">
							{{scope.row.RankName}}
						  </template>
						</el-table-column>
						<el-table-column label="职级简称" show-overflow-tooltip>
						  <template slot-scope="scope">
							{{scope.row.RankAlias}}
						  </template>
						</el-table-column>
						<el-table-column label="层级" show-overflow-tooltip>
						  <template slot-scope="scope">
							{{scope.row.LevelName}}
						  </template>
						</el-table-column> 
						<el-table-column label="编制">
						  <template slot-scope="scope">
							{{scope.row.NeedCount}}
						  </template>
						</el-table-column>
						<el-table-column label="在编">
						  <template slot-scope="scope">
							{{scope.row.InCount}}
						  </template>
						</el-table-column>
					  <el-table-column label="缺编">
						<template slot-scope="scope">
						  {{scope.row.OutCount}}
						</template>
					  </el-table-column>
						<!-- <el-table-column label="岗位要求"show-overflow-tooltip>
						  <template slot-scope="scope">
							 
						  </template>
						</el-table-column> -->
					  <el-table-column label="专业" show-overflow-tooltip>
						<template slot-scope="scope">
						  {{scope.row.Profession}}
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
			<el-form-item label="岗位名称：" prop="StationName" :rules="[{ required: true, message: '岗位名称不能为空',trigger:'blur'}]">
			 <el-input v-model="formData.StationName" maxlength="30" placeholder="请输入岗位名称" clearable>
			 </el-input>
			</el-form-item>
			<el-form-item label="部门名称：" prop="OrgName" :rules="[{ required: true, message: '部门名称不能为空',trigger:'blur'}]">
	  	      <deng-select-org v-model="formData.OrgName" @setOrg="setOrg"></deng-select-org>
	  	    </el-form-item>
			<el-form-item label="职级：" prop="RankName" :rules="[{ required: true, message: '职级不能为空',trigger:'blur'}]">
			  <deng-select-rank v-model="formData.RankName" @setRank="setRank"></deng-select-rank>
			</el-form-item>
			<el-form-item label="编制：" prop="NeedCount" :rules="[{ required: true, message: '编制不能为空',trigger:'blur'}]">
			  <el-input v-model.number="formData.NeedCount" placeholder="请输入编制" clearable>
			  </el-input>
			</el-form-item>
			<el-form-item label="专业：" prop="Profession" :rules="[{ required: true, message: '专业不能为空',trigger:'blur'}]">
			  <el-input v-model="formData.Profession" maxlength="30" placeholder="请输入专业" clearable>
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
import { GetSysOrglist,SaveAndUpTab,DeleteTab } from "@/api/sys/sys";
import { GetStationExlist } from "@/api/hr/hr";
export default {
	name:"hr-station-ex-list",
	data () {
		return {
			keyWord:'',//姓名和电话
			OrgGUID:'',
			loading2:false,//加载树形菜单
			treeData: [],
			defaultProps: {
			  children: 'children',
			  label: 'lable'
			},
			defaultExpandeKeys:[],
			table: [],
			loading: false,//表格数据加载状态
			downloadColumns:[
				{ label: '部门名称', prop: 'OrgName' },
				{ label: '岗位名称', prop: 'StationName' },
				{ label: '职级', prop: 'RankName' },
				{ label: '职级简称', prop: 'RankAlias' },
				{ label: '层级', prop: 'LevelName' },
				{ label: '编制', prop: 'NeedCount' },
				{ label: '在编', prop: 'InCount' },
				{ label: '缺编', prop: 'OutCount' },
				{ label: '专业', prop: 'Profession' }
			],
			multipleSelection:[],//当前表格中勾选的数据
			dialogAddVisible:false,
			formData:{//新增/修改数据对象
				OrgGUID:'',//传入后端
				OrgName:'',
				StationName:'',
				//RankAlias:'',
				RankGUID:'',//传入后端
				RankName:'',
				//LevelName:'',
				NeedCount:'',
				// InCount:'',
				// OutCount:'',
				Profession:''
			},
			loading1:false
		}
	},
	components: {
		'dengSelectOrg': () => import(`@cps/deng-select-org`),
		'dengSelectRank': () => import(`@cps/deng-select-rank`)
	},
	mounted(){
		this.getData()
		this.getTreeData()
	},
	methods: {
		//初始化页面数据
		getTreeData(){
			let that = this
			that.loading2 = true
			GetSysOrglist().then(async res => {
				that.loading2 = false
			    if(typeof(res)!='undefined'&&res.code==0){
					let tmpTreeData = res.data
					if(0==tmpTreeData.length)return
					let attr = {    //定义数据属性名称
						id: 'GUID',
						parentId: 'PGUID',
						name: 'OrgName',
						rootId: ""
					}
					that.treeData = util.listToTree(tmpTreeData,attr)
			    }else if(typeof(res)!='undefined'&&res.code==3){
					that.treeData = []
			    }
			  })
			  .catch(err => {
			    console.log('err111: ', err)
			  })
		},
		//加载table数据
		getData(){
			let that = this
			that.loading = true;
			let param = { OrgGUID:that.OrgGUID,keyWord:that.keyWord}
			GetStationExlist(qs.stringify(param)).then(async res => {
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
		//切换所属部门  所属部门更改  清空岗位（岗位需要重新选取）
		setOrg(data){
			console.log(1,data)
			this.formData.OrgGUID = data.GUID
			this.formData.OrgName = data.OrgName
		},
		setRank(data){
			console.log(2,data)
			this.formData.RankGUID = data.GUID
			this.formData.RankName = data.RankName
		},
		//查询功能
		search(){
			this.getData()
		},
		//重置
		refresh(){
			this.OrgGUID = '';
			this.keyWord = '';
			this.getData()
		},
		//tree点击节点触发事件
		handleCheck(e){
			let that = this
			console.log(1,e)
			that.OrgGUID = e.id
			that.getData()
		},
		tapAdd(){
			this.dialogAddVisible = true
			this.formData ={
				OrgGUID:'',//传入后端
				OrgName:'',
				StationName:'',
				//RankAlias:'',
				RankGUID:'',//传入后端
				RankName:'',
				//LevelName:'',
				NeedCount:'',
				// InCount:'',
				// OutCount:'',
				Profession:''
				}
		},
		tapEditer(d){
			this.formData = d
			this.dialogAddVisible = true
		},
		tapDelete(data){
			let that = this
			that.$confirm(`确认删除[${data.StationName}]？`, "确认信息", {
			distinguishCancelAndClose: true,
			confirmButtonText: "删除",
			cancelButtonText: "取消"
			}).then(() => {
				let param = {tabName:'HR_Station',GUID:data.GUID};
				DeleteTab(qs.stringify(param)).then(async res => {
					if(typeof(res)!='undefined'&&res.code==0){
						that.$message({message: res.msg,type: 'success'})
						setTimeout(function(){that.getData();},1500)
					}
				})
				.catch(err => {
					console.log('err111: ', err)
				})
			});
		},
		handleSelectionChange (val) {
		  this.multipleSelection = val
		},
		//梳理数据
		//需要克隆对象  此处必须做clone处理  因为后端是根据前段传入的字段直接解析生成sql
		filter(data){
			//let param = Object.create(data);
			let param = util.deepClone(data)
			//delete param['StationName'];
			delete param['RankName'];
			delete param['OrgName'];
			delete param['RankAlias'];
			delete param['LevelName'];
			delete param['InCount'];
			delete param['OutCount'];
			return param;
		},
		//提交新增数据
		tapSubmit(){
			let that = this
			that.loading1 = true
			let param = that.filter(that.formData)
			console.log(1,param)
			that.$refs.formData.validate((valid) => {
			    if (valid) {
					SaveAndUpTab(qs.stringify({tabName:'HR_Station',jsonStr:JSON.stringify(param)})).then(async res => {
						that.loading1 = false
						if(typeof(res)!='undefined'&&res.code==0){
							that.$message({message: res.msg,type: 'success'})
							setTimeout(()=>{this.getData();that.dialogAddVisible=false;},1500)
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
		//获取需要导出的数据
		getExportData(fn){
			let that = this
			if(that.multipleSelection.length>0){
				fn(that.multipleSelection)
			}else{
				let param = { OrgGUID:that.OrgGUID,keyWord:that.keyWord}
				GetStationExlist(qs.stringify(param)).then(async res => {
				    if(typeof(res)!='undefined'&&res.code==0){
						let tableList = res.data
						if(0==tableList.length){fn([]);return;}
						fn(tableList)
						return
				    }else if(typeof(res)!='undefined'&&res.code==3){
						fn([]);return;
				    }else{
						fn([]);return;
				    }
				  })
				  .catch(err => {
				    console.log('err111: ', err)
				  })
			}
		},
		//导出数据  不勾选导出当前查询条数  勾选仅导出当前勾选的数据
		handleDownloadXlsx () {
			let that = this
			that.getExportData(function(data){
				if(0==data.length){
					this.$message({message: "未勾选数据或当前条件查询为无数据!",type: 'info'})
					return
				}
				console.log(1,data)
				that.$confirm(`确定导出${data.length}条数据, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$export.excel({
						title: 'flow_'+new Date().getTime()+'_'+data.length,
						columns: that.downloadColumns,
						data//that.downloadDataTranslate(data)
					})
					.then(() => {
						that.$message({message: "导出数据成功!",type: 'success'})
					})
				})
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