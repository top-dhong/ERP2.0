<template>
  <d2-container>
    <template slot="header">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/hr/userlist' }">人员信息</el-breadcrumb-item>
		   <el-breadcrumb-item>人员明细</el-breadcrumb-item>
		</el-breadcrumb>
	</template>
     <div>
		 <el-row>
			 <el-col :span="16">
				 <el-form :model="data" ref="data" label-position="left" label-width="100px" class="demo-ruleForm" size="mini">
				 	<el-row><h5><i class="el-icon-info"></i>基本信息</h5></el-row>
				 	<el-row>
				 	          <el-col :span="8">
				 	              <el-form-item label="登陆ID" class="te-item" prop="data.UserID" :rules="[{ required: true, message: '流程标题不能为空',trigger:'blur'}]">
				 	      			<el-input placeholder="请输入登陆ID" v-model="data.UserID" :maxlength="45" autocomplete="off" clearable></el-input>
				 	              </el-form-item>
				 	          </el-col>
				 	          <el-col :span="8">
				 	              <el-form-item label="姓名" class="te-item" prop="data.UserName" :rules="[{ required: true, message: '流程编号不能为空',trigger:'blur'}]">
				 	                  <el-input v-model="data.UserName" readonly></el-input>
				 	              </el-form-item>
				 	          </el-col>
				 			  <el-col :span="8">
				 			      <el-form-item label="性别" class="te-item" prop="data.Gender" :rules="[{ required: true, message: '流程编号不能为空',trigger:'blur'}]">
				 			          <el-input v-model="data.Gender" readonly></el-input>
				 			      </el-form-item>
				 			  </el-col>
				 	      </el-row>
				 	      <el-row>
				 	          <!-- <el-col :span="8">
				 	              <el-form-item label="英文名" class="te-item" prop="data.Ethnic" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 	                  <el-input v-model="data.Ethnic" readonly></el-input>
				 	              </el-form-item>
				 	          </el-col> -->
				 	          <el-col :span="8">
				 	              <el-form-item label="名族" class="te-item" prop="data.Ethnic" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 	                  <el-input v-model="data.Ethnic" readonly></el-input>
				 	              </el-form-item>
				 	          </el-col>
				 			  <el-col :span="8">
				 			      <el-form-item label="籍贯" class="te-item" prop="data.Hometown" :rules="[{ required: true, message: '创建人不能为空',trigger:'blur'}]">
				 			          <el-input v-model="data.Hometown" readonly></el-input>
				 			      </el-form-item>
				 			  </el-col>
				 	      </el-row>
				 		<el-row>
				 		    <el-col :span="8">
				 		        <el-form-item label="政治面貌" class="te-item" prop="data.PoliticalFace" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.PoliticalFace" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="最高学历" class="te-item" prop="data.Education" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.Education" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 				  <el-col :span="8">
				 				      <el-form-item label="婚姻状况" class="te-item" prop="data.MaritalStatus" :rules="[{ required: true, message: '创建人不能为空',trigger:'blur'}]">
				 				          <el-input v-model="data.MaritalStatus" readonly></el-input>
				 				      </el-form-item>
				 				  </el-col>
				 		</el-row>
				 		<el-row>
				 		    <el-col :span="8">
				 		        <el-form-item label="出生日期" class="te-item" prop="data.BirthDay" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.BirthDay" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="身份证号" class="te-item" prop="data.IDCard" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.IDCard" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 				  <el-col :span="8">
				 				      <el-form-item label="身份证住址" class="te-item" prop="data.IDCardAddress" :rules="[{ required: true, message: '创建人不能为空',trigger:'blur'}]">
				 				          <el-input v-model="data.IDCardAddress" readonly></el-input>
				 				      </el-form-item>
				 				  </el-col>
				 		</el-row>
				 		<el-row>
				 		    <el-col :span="8">
				 		        <el-form-item label="家庭住址" class="te-item" prop="data.LiveAddress" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.LiveAddress" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="邮箱地址" class="te-item" prop="data.Email" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.Email" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 				  <el-col :span="8">
				 				      <el-form-item label="岗位" class="te-item" prop="data.StationName" :rules="[{ required: true, message: '创建人不能为空',trigger:'blur'}]">
				 				          <el-input v-model="data.StationName" readonly></el-input>
				 				      </el-form-item>
				 				  </el-col>
				 		</el-row>
				 		<el-row>
				 		    <el-col :span="8">
				 		        <el-form-item label="所属部门" class="te-item" prop="data.OrgName" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.OrgName" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="工号" class="te-item" prop="data.UserID" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.UserID" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 				  <el-col :span="8">
				 				      <el-form-item label="安全级别" class="te-item" prop="data.SecurityLevel" :rules="[{ required: true, message: '创建人不能为空',trigger:'blur'}]">
				 				          <el-input v-model="data.SecurityLevel" readonly></el-input>
				 				      </el-form-item>
				 				  </el-col>
				 		</el-row>
				 		<el-row>
				 		    <el-col :span="8">
				 		        <el-form-item label="手机号" class="te-item" prop="data.PhoneNum" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.PhoneNum" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="直接上级" class="te-item" prop="data.SuperiorName" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.SuperiorName" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 				  <el-col :span="8">
				 				      <el-form-item label="第二直接上级" class="te-item" prop="data.Superior2Name" :rules="[{ required: true, message: '创建人不能为空',trigger:'blur'}]">
				 				          <el-input v-model="data.Superior2Name" readonly></el-input>
				 				      </el-form-item>
				 				  </el-col>
				 		</el-row>
				 		<el-row>
				 		    <el-col :span="8">
				 		        <el-form-item label="人员状态" class="te-item" prop="data.UserStatus" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.UserStatus" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="入职时间" class="te-item" prop="data.EntryDate" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.EntryDate" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 				  <el-col :span="8">
				 				      <el-form-item label="合同截止时间" class="te-item" prop="data.ConEndDate" :rules="[{ required: true, message: '创建人不能为空',trigger:'blur'}]">
				 				          <el-input v-model="data.ConEndDate" readonly></el-input>
				 				      </el-form-item>
				 				  </el-col>
				 		</el-row>
				 		<el-row>
				 		    <el-col :span="8">
				 		        <el-form-item label="转正日期" class="te-item" prop="data.RegularDate" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.RegularDate" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 		   <!-- <el-col :span="8">
				 		        <el-form-item label="紧急联系人" class="te-item" prop="data.CreateOrg" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.CreateOrg" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 				  <el-col :span="8">
				 				      <el-form-item label="紧急联系电话" class="te-item" prop="data.CreateMan" :rules="[{ required: true, message: '创建人不能为空',trigger:'blur'}]">
				 				          <el-input v-model="data.CreateMan" readonly></el-input>
				 				      </el-form-item>
				 				  </el-col> -->
				 		</el-row>
				 		<el-row>
				 		    <!-- <el-col :span="8">
				 		        <el-form-item label="人员属性" class="te-item" prop="data.UserStatus" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.UserStatus" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col> -->
				 		   <!-- <el-col :span="8">
				 		        <el-form-item label="简历" class="te-item" prop="data.CreateOrg" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.CreateOrg" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col> -->
						  <el-col :span="8">
							  <el-form-item label="剩余年假小时数" class="te-item" prop="data.CreateMan" :rules="[{ required: true, message: '创建人不能为空',trigger:'blur'}]">
								  <el-input v-model="data.CreateMan" readonly></el-input>
							  </el-form-item>
						  </el-col>
				 		</el-row>
				 		<el-row>
				 		    <el-col :span="8">
				 		        <el-form-item label="可查看流程密级" class="te-item" prop="data.CreateDate" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.CreateDate" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="外部员工/无需工号" class="te-item" prop="data.CreateOrg" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.CreateOrg" readonly></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 		</el-row>
					<el-row><h5><i class="el-icon-info"></i>工作经历</h5></el-row>
					<el-row><h5><i class="el-icon-info"></i>教育经历</h5></el-row>
				 	
				 </el-form>
				 
			 </el-col>
		 </el-row>
        </div>
  </d2-container>
</template>
<script>
	import util from "@libs/util"
	import {GetSingleUser} from "@/api/hr/hr";
	import qs from "qs";
    export default {
		name:"hr-userlist-detailUser",
		components: { 
			'dengSelectUser': () => import(`@cps/deng-select-user`)
		},
        data() {
            return {
				data:{}
            };
        },
		created () {
			let guid = this.$route.query.guid;
			this.initData(guid)
		},
        methods: { 
			//初始化数据
			initData(guid){
				let that = this
				GetSingleUser(qs.stringify({guid})).then(async res => {
				    if(typeof(res)!='undefined'&&res.code==0){
						that.data = res.data;
				    }
				  })
				  .catch(err => {
				    console.log('err111: ', err)
				  })
			}
        }
    }
</script>
<style>
	.te-item{
		margin-left: 0.9375rem;
	}
	
</style>