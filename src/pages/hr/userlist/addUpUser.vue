<template>
  <d2-container>
    <template slot="header">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>人事管理</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/hr/userlist' }">人员信息</el-breadcrumb-item>
		</el-breadcrumb>
	</template>
     <div>
		 <el-row>
			 <el-col :span="16">
				 <el-form :model="data" ref="data" label-position="left" label-width="100px" class="demo-ruleForm" size="mini">
				 	<el-row><h5><i class="el-icon-info"></i>基本信息</h5></el-row>
				 	<el-row>
				 	          <el-col :span="8">
				 	              <el-form-item label="工号" class="te-item" prop="UserID" :rules="[{ required: true, message: '工号不能为空',trigger:'blur'}]">
				 	                  <el-input v-model="data.UserID" :readonly="(mk==2)"></el-input>
				 	              </el-form-item>
				 	          </el-col>
				 	          <el-col :span="8">
				 	              <el-form-item label="姓名" class="te-item" prop="UserName" :rules="[{ required: true, message: '姓名不能为空',trigger:'blur'}]">
				 	                  <el-input v-model="data.UserName" clearable></el-input>
				 	              </el-form-item>
				 	          </el-col>
				 			  <el-col :span="8">
				 			      <el-form-item label="性别" class="te-item" prop="Gender" :rules="[{ required: true, message: '性别不能为空',trigger:'blur'}]">
				 			          <el-select v-model="data.Gender" placeholder="请选择">
				 			              <el-option value="男"/>
				 			              <el-option value="女"/>
				 			            </el-select>
				 			      </el-form-item>
				 			  </el-col>
				 	          <!-- <el-col :span="8">
				 	              <el-form-item label="英文名" class="te-item" prop="Ethnic" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 	                  <el-input v-model="data.Ethnic"></el-input>
				 	              </el-form-item>
				 	          </el-col> -->
				 	          <el-col :span="8">
				 	              <el-form-item label="名族" class="te-item" prop="Ethnic">
				 	                  <el-input v-model="data.Ethnic"></el-input>
				 	              </el-form-item>
				 	          </el-col>
				 			  <el-col :span="8">
				 			      <el-form-item label="籍贯" class="te-item" prop="Hometown">
				 			          <el-input v-model="data.Hometown"></el-input>
				 			      </el-form-item>
				 			  </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="政治面貌" class="te-item" prop="PoliticalFace">
				 		            <el-select v-model="data.PoliticalFace" placeholder="请选择">
				 		                <el-option value="群众"/>
				 		                <el-option value="团员"/>
										<el-option value="党员"/>
				 		              </el-select>
				 		        </el-form-item>
				 		    </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="最高学历" class="te-item" prop="Education">
				 		            <el-select v-model="data.Education" placeholder="请选择">
				 		                <el-option value="小学"/>
				 		                <el-option value="中学"/>
				 		            	<el-option value="专科"/>
										<el-option value="本科"/>
										<el-option value="硕士"/>
										<el-option value="博士"/>
				 		              </el-select>
				 		        </el-form-item>
				 		    </el-col>
				 				  <el-col :span="8">
				 				      <el-form-item label="婚姻状况" class="te-item" prop="MaritalStatus">
				 				          <el-select v-model="data.MaritalStatus" placeholder="请选择">
				 				              <el-option value="已婚"/>
				 				              <el-option value="未婚"/>
				 				            </el-select>
				 				      </el-form-item>
				 				  </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="出生日期" class="te-item" prop="BirthDay" :rules="[{ required: true, message: '出生日期不能为空',trigger:'blur'}]">
				 		            <el-date-picker v-model="data.BirthDay" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
				 		        </el-form-item>
				 		    </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="身份证号" class="te-item" prop="IDCard" :rules="[{ required: true, message: '身份证号不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.IDCard"></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 				  <el-col :span="8">
				 				      <el-form-item label="身份证住址" class="te-item" prop="IDCardAddress">
				 				          <el-input v-model="data.IDCardAddress"></el-input>
				 				      </el-form-item>
				 				  </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="家庭住址" class="te-item" prop="LiveAddress">
				 		            <el-input v-model="data.LiveAddress"></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="邮箱地址" class="te-item" prop="Email">
				 		            <el-input v-model="data.Email"></el-input>
				 		        </el-form-item>
				 		    </el-col>
							<el-col :span="8">
							    <el-form-item label="所属部门" class="te-item" prop="OrgName" :rules="[{ required: true, message: '所属部门不能为空',trigger:'blur'}]">
							        <!-- <el-input v-model="data.OrgName"></el-input> -->
									<deng-select-org v-model="data.OrgName" @setOrg="setOrg"></deng-select-org>
							    </el-form-item>
							</el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="岗位" class="te-item" prop="StationName" :rules="[{ required: true, message: '岗位不能为空',trigger:'blur'}]">
				 		            <!-- <el-input v-model="data.StationName"></el-input> -->
									<deng-select-station v-model="data.StationName" :orgGuid="data.OrgGUID" @setStation="setStation"/>
				 		        </el-form-item>
				 		    </el-col>
				 		    
							  <el-col :span="8">
								  <el-form-item label="安全级别" class="te-item" prop="SecurityLevel" :rules="[{ required: true, message: '安全级别不能为空',trigger:'blur'}]">
									  <el-input v-model="data.SecurityLevel"></el-input>
								  </el-form-item>
							  </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="手机号" class="te-item" prop="MobileNum" :rules="[{ required: true, message: '手机号不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.MobileNum"></el-input>
				 		        </el-form-item>
				 		    </el-col>
							<el-col :span="8">
							    <el-form-item label="分机号" class="te-item" prop="PhoneNum">
							        <el-input v-model="data.PhoneNum"></el-input>
							    </el-form-item>
							</el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="直接上级" class="te-item" prop="SuperiorName" :rules="[{ required: true, message: '直接上级不能为空',trigger:'blur'}]">
				 		            <!-- <el-input v-model="data.SuperiorName"></el-input> -->
									<deng-select-user :currentValue="data.SuperiorName"  @submitdata="submitdata" :canMark="'one'"></deng-select-user>
				 		        </el-form-item>
				 		    </el-col>
<!-- 							  <el-col :span="8">
								  <el-form-item label="第二直接上级" class="te-item" prop="Superior2Name">
									  <el-input v-model="data.Superior2Name"></el-input>
								  </el-form-item>
							  </el-col>
 -->				 		    <el-col :span="8">
				 		        <el-form-item label="人员状态" class="te-item" prop="UserStatus" :rules="[{ required: true, message: '人员状态不能为空',trigger:'blur'}]">
				 		            <el-select v-model="data.UserStatus" placeholder="请选择">
				 		                <el-option value="试用"/>
				 		                <el-option value="临时"/>
										<el-option value="转正"/>
										<el-option value="离职"/>
										<el-option value="实习"/>
										<el-option value="储备"/>
				 		              </el-select>
				 		        </el-form-item>
				 		    </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="入职时间" class="te-item" prop="EntryDate" :rules="[{ required: true, message: '入职时间不能为空',trigger:'blur'}]">
				 		            <el-date-picker v-model="data.EntryDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间"/>
				 		        </el-form-item>
				 		    </el-col>
				 				  <el-col :span="8">
				 				      <el-form-item label="合同截止时间" class="te-item" prop="ConEndDate" :rules="[{ required: true, message: '合同截止时间不能为空',trigger:'blur'}]">
				 				          <el-date-picker v-model="data.ConEndDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
				 				      </el-form-item>
				 				  </el-col>
				 		    <el-col :span="8">
				 		        <el-form-item label="转正日期" class="te-item" prop="RegularDate" :rules="[{ required: true, message: '转正日期不能为空',trigger:'blur'}]">
				 		            <el-date-picker v-model="data.RegularDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
				 		        </el-form-item>
				 		    </el-col>
				 		   <!-- <el-col :span="8">
				 		        <el-form-item label="紧急联系人" class="te-item" prop="CreateOrg" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.CreateOrg"></el-input>
				 		        </el-form-item>
				 		    </el-col>
				 				  <el-col :span="8">
				 				      <el-form-item label="紧急联系电话" class="te-item" prop="CreateMan" :rules="[{ required: true, message: '创建人不能为空',trigger:'blur'}]">
				 				          <el-input v-model="data.CreateMan"></el-input>
				 				      </el-form-item>
				 				  </el-col> -->
				 		    <!-- <el-col :span="8">
				 		        <el-form-item label="人员属性" class="te-item" prop="UserStatus" :rules="[{ required: true, message: '创建时间不能为空',trigger:'blur'}]">
				 		            <el-select v-model="data.UserStatus" placeholder="请选择">
				 		                <el-option value="管培生"/>
				 		                <el-option value="合同工"/>
										<el-option value="劳务工"/>
				 		              </el-select>
				 		        </el-form-item>
				 		    </el-col> -->
				 		   <!-- <el-col :span="8">
				 		        <el-form-item label="简历" class="te-item" prop="CreateOrg" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.CreateOrg"></el-input>
				 		        </el-form-item>
				 		    </el-col> -->
						  <!-- <el-col :span="8">
							  <el-form-item label="剩余年假小时数" class="te-item" prop="HolidayHour" :rules="[{ required: true, message: '创建人不能为空',trigger:'blur'}]">
								  <el-input v-model="data.HolidayHour"></el-input>
							  </el-form-item>
						  </el-col> -->
				 		    <!-- <el-col :span="8">
				 		        <el-form-item label="流程密级" class="te-item" prop="CreateDate" :rules="[{ required: true, message: '流程密级不能为空',trigger:'blur'}]">
				 		            <el-select v-model="data.CreateDate" placeholder="请选择">
				 		                <el-option value="普通"/>
				 		                <el-option value="保密"/>
				 		            	<el-option value="机密"/>
				 		              </el-select>
				 		        </el-form-item>
				 		    </el-col> -->
				 		    <!-- <el-col :span="8">
				 		        <el-form-item label="外部员工/无需工号" class="te-item" prop="CreateOrg" :rules="[{ required: true, message: '创建部门不能为空',trigger:'blur'}]">
				 		            <el-input v-model="data.CreateOrg"></el-input>
				 		        </el-form-item>
				 		    </el-col> -->
				 		</el-row>
					<el-row><h5><i class="el-icon-info"></i>工作经历</h5></el-row>
					<el-row><h5><i class="el-icon-info"></i>教育经历</h5></el-row>
				 	
				 </el-form>
				 
			 </el-col>
		 </el-row>
        </div>
    <template slot="footer">
		<el-button @click="tapSubmit" :loading="loading" type="success" >
		  <d2-icon name="check-square-o"/>
		  提交
		</el-button>
	</template>
  </d2-container>
  </template>
  <script>
  	import util from "@libs/util"
  	import {GetSingleUser,SaveAndUpUserinfo} from "@/api/hr/hr";
  	import qs from "qs";
      export default {
  		name:"hr-userlist-addUpUser",
  		components: { 
  			'dengSelectUser': () => import(`@cps/deng-select-user`),
			'dengSelectOrg': () => import(`@cps/deng-select-org`),
			'dengSelectStation': () => import(`@cps/deng-select-station`)
  		},
          data() {
              return {
				  mk:'',
  				data:{
					GUID:'',//修改标识   为空就是添加  不为空就修改
					UserID:'',//不能是数据库已存在ID
					UserName:'',
					Gender:'',
					Ethnic:'',
					Hometown:'',
					PoliticalFace:'',
					Education:'',
					MaritalStatus:'',
					BirthDay:'',
					IDCard:'',
					IDCardAddress:'',
					LiveAddress:'',
					Email:'',
					OrgGUID:'',//入库部门组织ID
					OrgName:'',
					StationGUID:'',
					StationName:'',
					SecurityLevel:'',
					MobileNum:'',//手机号
					PhoneNum:'',//分机号
					Superior:'',
					SuperiorName:'',
					//Superior2Name:'',
					UserStatus:'',
					EntryDate:'',
					ConEndDate:'',
					RegularDate:'',
					//CreateDate:'',
				},
				loading:false//提交按钮状态
              };
          },
  		created () {
  			let guid = this.$route.query.guid;
			this.mk = this.$route.query.mk;
			console.log(1,this.$route.query)
			this.fomartData();
			if(1==this.mk){delete this.data['GUID']; this.data['UserPwsd'] = 'f62fba985281ef7a9b35431da09d91ea';}else
			if(2==this.mk){this.initData(guid)}
			
			//屏蔽f5
			document.onkeydown  = function  (e){
				var e = e || event;
				var nums = [116]; //f5:116  f12:123
				for(var i in nums){
					if(e.keyCode == nums[i]){
						return false;
					}
				}
			} 
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
  			},
			//新建清空字段
			fomartData(){
				this.data = {
					GUID:'',//修改标识   为空就是添加  不为空就修改
					UserID:'',//不能是数据库已存在ID
					UserName:'',
					Gender:'',
					Ethnic:'',
					Hometown:'',
					PoliticalFace:'',
					Education:'',
					MaritalStatus:'',
					BirthDay:'',
					IDCard:'',
					IDCardAddress:'',
					LiveAddress:'',
					Email:'',
					OrgGUID:'',//入库部门组织ID
					OrgName:'',
					StationGUID:'',
					StationName:'',
					SecurityLevel:'',
					MobileNum:'',//手机号
					PhoneNum:'',//分机号
					Superior:'',
					SuperiorName:'',
					//Superior2Name:'',
					UserStatus:'',
					EntryDate:'',
					ConEndDate:'',
					RegularDate:'',
					//CreateDate:'',
					}
			},
			//梳理数据
			//需要克隆对象  此处必须做clone处理  因为后端是根据前段传入的字段直接解析生成sql
			filter(data){
				//let param = Object.create(data);
				let param = util.deepClone(data)
				delete param['StationName'];
				delete param['SuperiorName'];
				delete param['OrgName'];
				return param;
			},
			tapSubmit(){
				let that = this
				that.loading = true
				console.log(1,that.data)
				let param = that.filter(that.data)
				that.$refs['data'].validate((valid) => {
						if (valid) {
							SaveAndUpUserinfo(qs.stringify({jsonStr:JSON.stringify(param)})).then(async res => {
								that.loading = false
							    if(typeof(res)!='undefined'&&res.code==0){
									that.data = res.data;
									that.$message({message: res.msg,type: 'success'})
							    }
							  })
							  .catch(err => {
							    console.log('err111: ', err)
							  })
						}else {
							that.loading = false
						   that.$message({message: "请根据提示完善单据！",type: 'error'})
							return false;
						}
					})
				
				
			},
			//切换所属部门  所属部门更改  清空岗位（岗位需要重新选取）
			setOrg(data){
				console.log(1,data)
				if(this.data.OrgGUID!=data.GUID){
					this.data.StationGUID='';
					this.data.StationName='';
					}
				this.data.OrgGUID = data.GUID
				this.data.OrgName = data.OrgName
			},
			//选取岗位
			setStation(data){
				console.log(1,data)
				this.data.StationGUID = data.GUID
				this.data.StationName = data.StationName
			},
			//选取直接上级
			submitdata(data){
				console.log(1111,data)
				this.data.Superior = data[0].GUID;
				this.data.SuperiorName = data[0].userName;
			},
          }
      }
  </script>
  <style>
  	.te-item{
  		margin-left: 0.9375rem;
  	}
  	
  </style>