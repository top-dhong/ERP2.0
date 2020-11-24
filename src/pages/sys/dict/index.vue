<template>
  <d2-container>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="leftEdit(1,{})"
      >新增左侧</el-button>
	  <el-button
	    type="success"
	    icon="el-icon-circle-plus-outline"
	    size="mini"
	    @click="rightEdit(1,{})"
		:disabled="!currentLeftId"
	  >新增右侧</el-button>
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
        :span="8"
        style="margin-top:15px;height: 50rem"
      >
	  <el-scrollbar style="height: 100%;">
			<el-table
			      :data="leftTableData"
				  v-loading="loading"
				  highlight-current-row
				  @row-click="leftTableClick($event,false)"
			      style="width: 100%">
			      <el-table-column label="序号" width="50" show-overflow-tooltip>
			        <template slot-scope="scope">
			      	{{scope.row.OrderNo}}
			        </template>
			      </el-table-column>
				  <el-table-column label="字典分类" show-overflow-tooltip>
				    <template slot-scope="scope">
				  	{{scope.row.DictClassName}}
				    </template>
				  </el-table-column>
				  <el-table-column label="字典编码" show-overflow-tooltip>
				    <template slot-scope="scope">
				  	{{scope.row.DictClassCode}}
				    </template>
				  </el-table-column>
				  <el-table-column label="操作">
					<template slot-scope="scope">
					  <el-dropdown size="small" class="d2-mr">
						<span class="btn-text"><el-button icon="el-icon-setting" size="mini"></el-button></span>
						<el-dropdown-menu slot="dropdown">
						  <el-dropdown-item @click.native="leftEdit(2, scope.row)">
							<d2-icon name="pencil" class="d2-mr-5"/>
							编辑
						  </el-dropdown-item>
						  <el-dropdown-item @click.native="leftDel(2, scope.row)">
							<d2-icon name="trash-o" class="d2-mr-5"/>
						  	删除
						  </el-dropdown-item>
						</el-dropdown-menu>
						</el-dropdown>
					</template>
				  </el-table-column>
			    </el-table>
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
          >
            <el-table
                  :data="rightTableData"
				  v-loading="loading2"
				  highlight-current-row
                  style="width: 100%">
                  <el-table-column label="序号" width="50">
                    <template slot-scope="scope">
                  	{{scope.row.OrderNo}}
                    </template>
                  </el-table-column>
            	  <el-table-column label="名称">
            	    <template slot-scope="scope">
            	  	{{scope.row.DictName}}
            	    </template>
            	  </el-table-column>
				  <el-table-column label="备注" show-overflow-tooltip>
				    <template slot-scope="scope">
				  	{{scope.row.DictMemo}}
				    </template>
				  </el-table-column>
				  <el-table-column label="操作">
					  <template slot-scope="scope">
					    <el-dropdown size="small" class="d2-mr">
					  	<span class="btn-text"><el-button icon="el-icon-setting" size="mini"></el-button></span>
					  	<el-dropdown-menu slot="dropdown">
					  	  <el-dropdown-item @click.native="rightEdit(scope.$index, scope.row)">
					  		<d2-icon name="pencil" class="d2-mr-5"/>
					  		编辑
					  	  </el-dropdown-item>
					  	  <el-dropdown-item @click.native="rightDel(scope.$index, scope.row)">
					  		<d2-icon name="trash-o" class="d2-mr-5"/>
					  	  	删除
					  	  </el-dropdown-item>
					  	</el-dropdown-menu>
					  	</el-dropdown>
					  </template>
				  </el-table-column>
                </el-table>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
	<!-- 左侧修改 -->
	<el-dialog title="新增/修改字典分类" :visible.sync="dialogLeftVisible">
		<el-form :model="leftData" ref="leftData" label-position="left" label-width="100px" class="demo-ruleForm">
		   <el-form-item label="序号：" prop="OrderNo" :rules="[{ required: true, message: '序号不能为空',trigger:'blur'},{ pattern: /^\d+$/,required: true, message: '序号格式不对',trigger:'blur'}]">
			 <el-input :rows="2" placeholder="请输入序号" v-model.number="leftData.OrderNo">
			 </el-input>
		   </el-form-item>
		    <el-form-item label="字典分类：" prop="DictClassName" :rules="[{ required: true, message: '字典分类不能为空',trigger:'blur'}]">
		      <el-input :rows="2" placeholder="请输入字典分类" v-model="leftData.DictClassName">
		      </el-input>
		    </el-form-item>
			<el-form-item label="字典编码：" prop="DictClassCode" :rules="[{ required: true, message: '字典编码不能为空',trigger:'blur'}]">
			  <el-input :rows="2" placeholder="请输入字典编码" v-model="leftData.DictClassCode">
			  </el-input>
			</el-form-item>
		  </el-form> 
		  <div slot="footer" class="dialog-footer">
		  	<el-button @click="dialogLeftVisible = false" title="点击阴影部分可快捷关闭窗口">取 消</el-button>
		     <el-button :loading="leftBtnoading" type="primary" @click="leftSubmit">提交</el-button>
		  </div>
	</el-dialog>
	<!-- 右侧修改 -->
	<el-dialog title="新增/修改字典" :visible.sync="dialogRightVisible">
		<el-form :model="rightData" ref="rightData" label-position="left" label-width="100px" class="demo-ruleForm">
		   <el-form-item label="序号：" prop="OrderNo" :rules="[{ required: true, message: '序号不能为空',trigger:'blur'},{ pattern: /^\d+$/,required: true, message: '序号格式不对',trigger:'blur'}]">
					 <el-input :rows="2" placeholder="请输入序号" v-model.number="rightData.OrderNo">
					 </el-input>
		   </el-form-item>
		    <el-form-item label="名称：" prop="DictName" :rules="[{ required: true, message: '名称不能为空',trigger:'blur'}]">
		      <el-input :rows="2" placeholder="请输入名称" v-model="rightData.DictName">
		      </el-input>
		    </el-form-item>
			<el-form-item label="备注：">
			  <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="rightData.DictMemo">
			  </el-input>
			</el-form-item>
		  </el-form> 
		  <div slot="footer" class="dialog-footer">
		  	<el-button @click="dialogRightVisible = false" title="点击阴影部分可快捷关闭窗口">取 消</el-button>
		     <el-button :loading="rightBtnoading" type="primary" @click="rightSubmit">提交</el-button>
		  </div>
	</el-dialog>
  </d2-container>
</template>

<script>
import qs from "qs";
import util from '@/libs/util.js'
import {GetDictClassList,GetDictList,SaveAndUpTab,DeleteTab,DeleteManyTab} from "@/api/sys/sys";
export default {
  data() {
    return {
      currentLeftId: "",//当前选取的左侧id
	  loading:false,
      leftTableData: [],//左侧数据
	  loading2:false,
	  rightTableData:[],//右侧数据
	  dialogLeftVisible:false,
	  dialogRightVisible:false,
	  leftData:{},//左侧数据修改
	  rightData:{},//右侧数据修改
	  leftBtnoading:false,
	  rightBtnoading:false
    };
  },
  methods: {
    initData() {
		let that = this
		that.currentLeftId = "";//每次刷新数据重置左侧选取的id 这里联动隐藏右侧增加按钮是否可点击
		that.loading = true
		GetDictClassList().then(async res => {
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
		let param = {DictClassGUID:data.GUID}
		if(!bool&&that.currentLeftId==data.GUID){that.loading2 = false;return}
		GetDictList(qs.stringify(param)).then(async res => {
			that.loading2 = false
			that.currentLeftId = data.GUID
		    if(typeof(res)!='undefined'&&res.code==0){
				that.rightTableData = res.data;
		    }else if(res.code==3){
				that.rightTableData = [];
			}
		  })
		  .catch(err => {
		    console.log('err111: ', err)
		  })
    },
	//左侧数据弹出并支持修改
	//mark   1:新增  2：修改
	leftEdit(mark,data){
		let that = this
		that.dialogLeftVisible = true
		that.leftData = data
	},
	//左侧数据修改提交
	leftSubmit(){
		let that = this
		that.leftBtnoading = true
		let {GUID,DictClassName,DictClassCode,OrderNo} = that.leftData
		that.$refs['leftData'].validate((valid) => {
			if (valid) {
				SaveAndUpTab(qs.stringify({tabName:'SYS_DictionaryClass',jsonStr:JSON.stringify({GUID,DictClassName,DictClassCode,OrderNo})})).then(async res => {
					that.leftBtnoading = false
					if(typeof(res)!='undefined'&&res.code==0){
						that.$message({message: res.msg,type: 'success'})
						setTimeout(function(){that.initData();that.dialogLeftVisible = false},1500)
					}
				})
				.catch(err => {
					console.log('err111: ', err)
				})
			}else{
				that.leftBtnoading = false
				that.$message({message: '请根据提示完善单据!',type: 'error'})
			}
		})
	},
	//右侧数据弹出并支持修改  DictClassGUID
	//mark   1:新增  2：修改
	rightEdit(mark,data){
		let that = this
		that.dialogRightVisible = true
		if(mark==1){ data.DictClassGUID = that.currentLeftId}
		that.rightData = data
	},
	//右侧数据修改提交
	rightSubmit(){
		let that = this
		that.rightBtnoading = true
		let {GUID,DictName,DictMemo,OrderNo} = that.rightData
		that.$refs['rightData'].validate((valid) => {
			if (valid) {
				if(GUID){
					SaveAndUpTab(qs.stringify({tabName:'SYS_Dictionary',jsonStr:JSON.stringify({GUID,DictName,DictMemo,OrderNo})})).then(async res => {
						that.rightBtnoading = false
						if(typeof(res)!='undefined'&&res.code==0){
							that.$message({message: res.msg,type: 'success'})
							that.currentLeftId = '';
							setTimeout(function(){that.dialogRightVisible = false},1500)
						}
					})
					.catch(err => {
						console.log('err111: ', err)
					})
				}else{
					let {DictClassGUID} = that.rightData;//这里需要传入主表的iD
					if(!DictClassGUID){
						that.$message({message: "DictClassGUID不可为空，请关闭页面后重新进入",type: 'error'})
						that.rightBtnoading = false
						return
					}
					SaveAndUpTab(qs.stringify({tabName:'SYS_Dictionary',jsonStr:JSON.stringify({DictClassGUID,DictName,DictMemo,OrderNo})})).then(async res => {
						that.rightBtnoading = false
						if(typeof(res)!='undefined'&&res.code==0){
							that.$message({message: res.msg,type: 'success'})
							setTimeout(function(){that.leftTableClick({GUID:DictClassGUID},true);that.dialogRightVisible = false},1500)
						}
					})
					.catch(err => {
						console.log('err111: ', err)
					})
				}
			}else{
					that.rightBtnoading = false
					that.$message({message: '请根据提示完善单据!',type: 'error'})
				}
			})
	},
	//type     del:2    upde:1    add:0
    add(mark) {
		 
    },
    edit() {
	 
    },
	//左侧删除（不能使用但表删除方法 这里首先需要判断是否有子元素）
    leftDel(id,data) {
		let that = this
		let {GUID} = data
		//if(that.menuform.children.length>0){
			// that.$message({message: '请移除所有子节点后再删除当前节点',type: 'info'})
			// return
		//}
		that.$confirm(`确认删除[${data.DictClassName}]？`, "确认信息", {
		distinguishCancelAndClose: true,
		confirmButtonText: "删除",
		cancelButtonText: "取消"
		}).then(() => {
			let param = {MtabName:'SYS_DictionaryClass',CtabName:'SYS_Dictionary',MainGUID:'DictClassGUID',GUID};
			DeleteManyTab(qs.stringify(param)).then(async res => {
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
	//右侧删除
	rightDel(id,data) {
		let that = this
		let {GUID} = data
		that.$confirm(`确认删除[${data.DictName}]？`, "确认信息", {
		distinguishCancelAndClose: true,
		confirmButtonText: "删除",
		cancelButtonText: "取消"
		}).then(() => {
			let param = {tabName:'SYS_Dictionary',GUID};
			DeleteTab(qs.stringify(param)).then(async res => {
				if(typeof(res)!='undefined'&&res.code==0){
					that.$message({message: res.msg,type: 'success'})
					setTimeout(function(){that.leftTableClick({GUID:that.currentLeftId},true);that.initData();},1500)
				}
			})
			.catch(err => {
				console.log('err111: ', err)
			})
		}); 
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
