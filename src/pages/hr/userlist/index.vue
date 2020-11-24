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
				        placeholder="姓名/手机号码"
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
					 <el-form-item prop="isValid">
					 	<el-checkbox-group v-model="status">
							<el-checkbox label="试用"></el-checkbox>
							<el-checkbox label="临时"></el-checkbox>
							<el-checkbox label="转正"></el-checkbox>
							<el-checkbox label="离职"></el-checkbox>
							<el-checkbox label="实习"></el-checkbox>
							<el-checkbox label="储备"></el-checkbox>
					 	  </el-checkbox-group>
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
					  <el-table-column prop="UserID" label="工号" show-overflow-tooltip>
					    <template slot-scope="scope">
					  	{{scope.row.UserID}}
					    </template>
					  </el-table-column>
						<el-table-column label="姓名" show-overflow-tooltip>
						  <template slot-scope="scope">
							{{scope.row.UserName}}
						  </template>
						</el-table-column>
					  
						<el-table-column label="性别" show-overflow-tooltip>
						  <template slot-scope="scope">
							{{scope.row.Gender}}
						  </template>
						</el-table-column>
						<el-table-column label="岗位" show-overflow-tooltip>
						  <template slot-scope="scope">
							{{scope.row.StationName}}
						  </template>
						</el-table-column>
						<el-table-column label="安全级别" show-overflow-tooltip>
						  <template slot-scope="scope">
							{{scope.row.SecurityLevel}}
						  </template>
						</el-table-column> 
						<el-table-column label="直接上级">
						  <template slot-scope="scope">
							{{scope.row.SuperiorName}}
						  </template>
						</el-table-column>
						<el-table-column label="手机号码" width="150" show-overflow-tooltip>
						  <template slot-scope="scope">
							{{scope.row.MobileNum}}
						  </template>
						</el-table-column>
					  <el-table-column label="员工状态">
						<template slot-scope="scope">
						  {{scope.row.UserStatus}}
						</template>
					  </el-table-column>
						<el-table-column label="入职时间" width="150"   >
						  <template slot-scope="scope">
							{{scope.row.EntryDate}}
						  </template>
						</el-table-column>
					  <el-table-column label="出生日期" width="150"  >
						<template slot-scope="scope">
						  {{scope.row.BirthDay}}
						</template>
					  </el-table-column>
					  <el-table-column width="90" fixed="right" label="操作" align="center">
						<template slot-scope="scope">
						  <el-dropdown size="small" class="d2-mr">
						    <span class="btn-text"><el-button icon="el-icon-setting" size="mini"></el-button></span>
						    <el-dropdown-menu slot="dropdown">
						      <el-dropdown-item @click.native="tapDetail(scope.row)">
						        <d2-icon name="info-circle" class="d2-mr-5"/>
						        详情
						      </el-dropdown-item>
						      <el-dropdown-item @click.native="tapEditer(scope.row)">
						        <d2-icon name="pencil" class="d2-mr-5"/>
						        编辑
						      </el-dropdown-item>
						    </el-dropdown-menu>
							</el-dropdown>
						</template>
					  </el-table-column>
				  </el-table>
			</div>
	 
			
		</el-col>
	  </el-row>
	  <flow-page-footer
	    slot="footer"
	    :current="page.pageCurrent"
	    :size="page.pageSize"
	    :total="page.pageTotal"
	    @change="handlePaginationChange"/>
  </d2-container>
</template>

<script>
import qs from "qs";
import util from '@/libs/util.js'
import { GetSysOrglist } from "@/api/sys/sys";
import { GetUserList } from "@/api/hr/hr";
export default {
	name:"hr-userlist",
	components: {
	  'FlowPageFooter': () => import('./componnets/PageFooter')
	},
	data () {
		return {
			page: {
				pageCurrent: 1,
				pageSize: 10,
				pageTotal: 0
			},
			keyWord:'',//姓名和电话
			status:['试用','转正','实习'],//员工状态  转正，试用，临时，实习
			orGguid:'',
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
				{ label: '工号', prop: 'UserID' },
				{ label: '姓名', prop: 'UserName' },
				{ label: '性别', prop: 'Gender' },
				{ label: '岗位', prop: 'StationName' },
				{ label: '安全级别', prop: 'SecurityLevel' },
				{ label: '直接上级', prop: 'SuperiorName' },
				{ label: '手机号码', prop: 'MobileNum' },
				{ label: '员工状态', prop: 'UserStatus' },
				{ label: '入职时间', prop: 'EntryDate' },
				{ label: '出生日期', prop: 'BirthDay' }
			],
			multipleSelection:[],//当前表格中勾选的数据
		}
	},
	watch:{
		status(val){
			this.getData()
			//this.getTreeData()
		}
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
			let jsonStr = {pageCurrent:that.page.pageCurrent,pageSize:that.page.pageSize,status:that.status.join(','),orGguid:that.orGguid,keyWord:that.keyWord}
			GetUserList(qs.stringify({jsonStr:JSON.stringify(jsonStr)})).then(async res => {
				that.loading = false
			    if(typeof(res)!='undefined'&&res.code==0){
					let tableList = res.data
					if(0==tableList.length)return
					that.table = tableList
					that.page['pageTotal'] = tableList[0].totalCount*1;
			    }else if(typeof(res)!='undefined'&&res.code==3){
					that.table = []
					that.page['pageTotal'] = 0
			    }
			  })
			  .catch(err => {
				that.loading = false
			    console.log('err111: ', err)
			  })
		},
		//分页功能
		handlePaginationChange (val) {
		  this.page = {
		    pageCurrent: val.current,
		    pageSize: val.size,
		    pageTotal: val.total
		  }
		  this.getData()
		},
		//查询功能
		search(){
			this.getData()
		},
		//重置
		refresh(){
			this.orGguid = '';
			this.keyWord = '';
			this.status = ['试用','转正','实习']
			this.getData()
		},
		//tree点击节点触发事件
		handleCheck(e){
			let that = this
			console.log(1,e)
			that.orGguid = e.id
			that.getData()
		},
		tapAdd(){
			this.$router.push({path:'./userlist/addUpUser',query:{mk:1}})
		},
		tapEditer(d){
			this.$router.push({path:'./userlist/addUpUser',query:{mk:2,guid:d.GUID}})
		},
		tapDetail(d){
			this.$router.push({path:'./userlist/detailUser',query:{mk:3,guid:d.GUID }})
		},
		handleSelectionChange (val) {
		  this.multipleSelection = val
		},
		//提交编辑数据
		tapSubmit(data){
			console.log(2,data)
		},
		//获取需要导出的数据
		getExportData(fn){
			let that = this
			if(that.multipleSelection.length>0){
				fn(that.multipleSelection)
			}else{
				let isValid = that.isValid?"-1":"0"
				let jsonStr = {pageCurrent:that.page.pageCurrent,pageSize:that.page.pageSize,status:that.status.join(','),orGguid:that.orGguid,keyWord:that.keyWord}
				GetUserList(qs.stringify({jsonStr:JSON.stringify(jsonStr)})).then(async res => {
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