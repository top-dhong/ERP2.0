<template>
  <d2-container>
    <el-button-group>
 
	  <el-button
	    type="success"
	    icon="el-icon-circle-plus-outline"
	    size="mini"
	    @click="tapSave"
		:disabled="!currentLeftId||btndisabled"
	  >保存</el-button>
    </el-button-group>
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
      >操作提示</el-button>
    </el-popover>
    <el-row>
      <el-col
        :span="6"
        style="margin-top:15px;height: 50rem"
      >
	  <el-scrollbar style="height: 100%;">
			<el-table
			      :data="leftTableData"
				  v-loading="loading"
				  highlight-current-row
				  @row-click="leftTableClick($event,false)"
			      style="width: 100%">
			      <el-table-column label="序号" width="60" show-overflow-tooltip>
			        <template slot-scope="scope">
			      	{{scope.row.OrderNo}}
			        </template>
			      </el-table-column>
				  <el-table-column label="权限组" width="180" show-overflow-tooltip>
				    <template slot-scope="scope">
				  	{{scope.row.GroupName}}
				    </template>
				  </el-table-column>
			    </el-table>
		</el-scrollbar>
      </el-col>
      <el-col
        :span="8"
        style="margin-top:15px;margin-left: 5px;height: 50rem"
      >
      <el-scrollbar style="height: 100%;">
      			<el-tree
      			  ref="tree"
				  v-loading="loading2"
      			  class="filter-tree"
      			  node-key="GUID"
      			  highlight-current
				   show-checkbox
      			  :expand-on-click-node="false"
      			  :data="treeData"
      			  :props="defaultProps"
      			></el-tree>
      		</el-scrollbar>
      </el-col>
	  <el-col
	    :span="8"
	    style="margin-top:15px;margin-left: 5px;height: 50rem"
	  >
	  <el-scrollbar style="height: 100%;">
	  			<el-tree
	  			  ref="tree2"
	  				  v-loading="loading3"
	  			  class="filter-tree"
	  			  node-key="GUID"
	  			  highlight-current
	  				   show-checkbox
	  			  :expand-on-click-node="false"
	  			  :data="treeData2"
	  			  :props="defaultProps2"
	  			></el-tree>
	  		</el-scrollbar>
	  </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import qs from "qs";
import util from '@/libs/util.js'
import {GetSysGroup,GetUserGroupAuthList,SaveAuthList} from "@/api/sys/sys";
export default {
	components: {
		'dengSelectUser': () => import(`@cps/deng-select-user`)
	},
	  data() {
		return {
		  currentLeftId: "",//当前选取的左侧id
		  loading:false,
		  leftTableData: [],//左侧数据
		  loading2:false,
		  treeData:[],//右侧数据
		  leftData:{},//左侧数据修改
		  rightData:{},//右侧数据修改
		  defaultProps: {
		    label: "FuncName"
		  },
		  btndisabled:false//保存按钮提交过程禁用
		  
		};
	  },
	  methods: {
		initData() {
			let that = this
			that.currentLeftId = "";//每次刷新数据重置左侧选取的id 这里联动隐藏右侧增加按钮是否可点击
			that.loading = true
			GetSysGroup().then(async res => {
				that.loading = false
				if(typeof(res)!='undefined'&&res.code==0){
					that.leftTableData = res.data;
				
				}
			  })
			  .catch(err => {
				console.log('err111: ', err)
			  })
		},
		//点击左侧表格
		//bool:  是否强制刷新
		leftTableClick(data,bool) {
			let that = this
			that.loading2 = true
			let param = {GUID:data.GUID}
			if(!bool&&that.currentLeftId==data.GUID){that.loading2 = false;return}
			GetUserGroupAuthList(qs.stringify(param)).then(async res => {
				that.loading2 = false
				that.currentLeftId = data.GUID
				if(typeof(res)!='undefined'&&res.code==0){
					let a1 = {    //定义数据属性名称
						GUID: 'GUID',
						PGUID: 'PGUID',
						FuncName:'FuncName',
						MenuType:'MenuType'
					}
					let a2 = { //指定 rootId id parentId 的键值
						rootId:"",
						id:"GUID",
						parentId:"PGUID"
					}
					let arr = [];
					res.data.map((item)=>{if(item.checked=='True'){arr.push(item.GUID)}})
					that.treeData = util.listToTreePlus(res.data,a1,a2);
					console.log(1,arr)
					that.$refs.tree.setCheckedKeys(arr);//获取已经设置的资源后渲染
				}else if(res.code==3){
					that.treeData = [];
				}
			  })
			  .catch(err => {
				console.log('err111: ', err)
			  })
		},
		//提交保存数据
		tapSave(){
			let that = this
			let res = that.$refs.tree.getCheckedNodes()
			let MenuList = []
			res.forEach((item) => {
				MenuList.push({GUID:item.GUID,MenuType:item.MenuType})
			})
			let GroupGUID = that.currentLeftId
			let par = {GroupGUID,MenuList}
			console.log(1,JSON.stringify(par))
			that.btndisabled = true
			SaveAuthList(qs.stringify({jsonStr:JSON.stringify(par)})).then(async res => {
				that.btndisabled = false
				if(typeof(res)!='undefined'&&res.code==0){
					that.$message({message: res.msg,type: 'success'})
				}
			  })
			  .catch(err => {
					that.btndisabled = false
					console.log('err111: ', err)
			  })
		},
		test(){
			this.$message({message: "敬请期待!",type: 'info'})
		}
	  },
	  created() {
		this.initData();
	  }
	};
</script>
