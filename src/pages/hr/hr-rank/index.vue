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
        <el-form-item label="搜索" prop="keyWord">
          <el-input v-model="keyWord" placeholder="职级名称" style="width: 200px;" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSerch">
            <d2-icon name="search" /> 查询
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
	  <el-table-column label="职级名称" prop="RankName">
	    <template slot-scope="scope">
	      {{scope.row.RankName}}
	    </template>
	  </el-table-column>
	  <el-table-column label="职级简称" :show-overflow-tooltip="true">
	    <template slot-scope="scope">
	      {{scope.row.RankAlias}}
	    </template>
	  </el-table-column>
      <el-table-column label="层级" prop="LevelName">
        <template slot-scope="scope">
          {{scope.row.LevelName}}
        </template>
      </el-table-column>
	  <el-table-column label="职级序列" prop="Sequence" :show-overflow-tooltip="true">
	    <template slot-scope="scope">
	      {{scope.row.Sequence}}
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
		    <el-form-item label="职级名称：" prop="RankName" :rules="[{ required: true, message: '职级名称不能为空',trigger:'blur'}]">
		      <el-input v-model="formData.RankName" maxlength="10" placeholder="请输入职级名称" clearable>
		      </el-input>
		    </el-form-item>
			<el-form-item label="职级简称：" prop="RankAlias">
			  <el-input v-model="formData.RankAlias" maxlength="10" placeholder="请输入职级简称" clearable>
			  </el-input>
			</el-form-item>
		    <el-form-item label="层级：" prop="LevelName" :rules="[{ required: true, message: '职级名称不能为空',trigger:'blur'}]">
		      <el-select v-model="formData.LevelName">
				  <el-option value="高">高</el-option>
				  <el-option value="中">中</el-option>
				  <el-option value="基">基</el-option>
			  </el-select>
		    </el-form-item>
			<el-form-item label="职级序列：" prop="Sequence" :rules="[{ required: true, message: '职级名称不能为空',trigger:'blur'}]">
			  <el-select v-model="formData.Sequence">
				  <el-option value="技术序列">技术序列</el-option>
				  <el-option value="管理序列">管理序列</el-option>
			  </el-select>
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
import {SaveAndUpTab,DeleteTab} from "@/api/sys/sys";
import {GetHR_rankList} from "@/api/hr/hr";
export default {
  data() {
    return {
      keyWord: '',//关键字检索
      loading: false,//加载表格状态
      tableData: [],//表数据
      multipleSelection: [],
      page: {
        current: 1,
        size: 100,
        total: 0
      },
      formData: {
         RankName:'',
		 LevelName:'',
		 RankAlias:'',
		 Sequence:''
      },
      dialogAddVisible: false,
	  loading1:false,//新增提交加载按钮状态
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      let that = this
      that.loading = true
      GetHR_rankList(qs.stringify({keyWord:that.keyWord})).then(async res => {
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
    },
    doSerch() {
      this.initData();
    },
	tapAdd(){
		this.dialogAddVisible = true
		this.formData = {
			GUID:'',
			RankName:'',
			LevelName:'',
			RankAlias:'',
			Sequence:''
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
		//that.dotype = 2;
		that.$confirm(`确认删除[${data.RankName}]？`, "确认信息", {
		distinguishCancelAndClose: true,
		confirmButtonText: "删除",
		cancelButtonText: "取消"
		}).then(() => {
			let param = {tabName:'HR_Rank',GUID:data.GUID};
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
	//提交新增数据
	tapSubmit(){
		let that = this
		that.loading1 = true
		console.log(1,that.formData)
		let param = that.formData
		that.$refs.formData.validate((valid) => {
		    if (valid) {
				SaveAndUpTab(qs.stringify({tabName:'HR_Rank',jsonStr:JSON.stringify(param)})).then(async res => {
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
