<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">你好，{{info.name}}</span>
    <el-dropdown-menu slot="dropdown">
      <!-- <el-dropdown-item @click.native="userMess">
        <d2-icon name="user" class="d2-mr-5"/>
        个人信息
      </el-dropdown-item> -->
      <el-dropdown-item @click.native="$open('http://mail.shihaoxr.com')">
        <d2-icon name="envelope" class="d2-mr-5"/>
        公司邮箱
      </el-dropdown-item>
      <el-dropdown-item @click.native="$open('http://my.shine-town.com:8060')">
        <d2-icon name="cloud" class="d2-mr-5"/>
        明源登陆
      </el-dropdown-item>
	  <el-dropdown-item @click.native="$open('http://182.150.22.176:7890/cgi-bin/')">
	    <d2-icon name="file" class="d2-mr-5"/>
	    文件共享
	  </el-dropdown-item>
	  <el-dropdown-item @click.native="AddFavorite">
	    <d2-icon name="gratipay" class="d2-mr-5"/>
	    加入收藏
	  </el-dropdown-item>
      <el-dropdown-item @click.native="openDialog">
        <d2-icon name="key" class="d2-mr-5"/>
        修改密码
      </el-dropdown-item>
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        退出登陆
      </el-dropdown-item>
    </el-dropdown-menu>
	<!-- 修改密码弹窗 -->
	<el-dialog title="修改密码" :visible.sync="dialogPassWordVisible">
		<template>
		  <div class="app-container common-list-page">
		    <el-form
		      :model="resetForm"
		      :rules="resetFormRules"
		      ref="resetForm"
		      status-icon
		      label-width="100px"
			  class="form-pass"
		    >
		      <el-form-item label="旧密码：" prop="oldPsd">
		        <el-input type="password" v-model="resetForm.oldPsd" auto-complete="off"></el-input>
		      </el-form-item>
		      <el-form-item label="新密码：" prop="newPsd">
		        <el-input type="password" v-model="resetForm.newPsd" auto-complete="off"></el-input>
		      </el-form-item>
		      <el-form-item label="确认密码：" prop="newpassword1">
		        <el-input type="password" v-model="resetForm.newpassword1" auto-complete="off"></el-input>
		      </el-form-item>
		      <el-form-item>
		        <el-button type="primary" @click.prevent="toAmend">确认修改</el-button>
		      </el-form-item>
		    </el-form>
		  </div>
		</template>
	</el-dialog>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from "vuex";
import * as sysService from "@/api/sys/sys";
import {ModifyPsd} from "@/api/sys/user";

import qs from "qs";
export default {
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  data(){
	  var validatePass = (rule, value, callback) => {
	    if (!value) {
	      callback(new Error("请输入新密码"));
	    } else if (value.toString().length < 6 || value.toString().length > 18) {
	      callback(new Error("密码长度为6-18位"));
	    } else {
	      callback();
	    }
	  };
	  var validatePass2 = (rule, value, callback) => {
	    if (value === "") {
	      callback(new Error("请再次输入密码"));
	    } else if (value !== this.resetForm.newPsd) {
	      callback(new Error("两次输入密码不一致!"));
	    } else {
	      callback();
	    }
	  };
	  return{
		  dialogPassWordVisible:false,
		  resetForm: {
		  //传给后台所需要的参数
		    oldPsd: "",
			newPsd: "",
			newpassword1:""
		  },
		  resetFormRules: {
			oldPsd: [
		        { required: true, message: "请输入旧密码", trigger: 'blur' }
		    ],  
		    newPsd: [
		        { required: true, validator: validatePass, trigger: 'blur' }
		    ],
		    newpassword1: [
		      { required: true, validator: validatePass2, trigger: "blur" }
		    ]
		  }
	  }
  },
  methods: {
    ...mapActions("d2admin/account", ["logout"]),
    /**
     * @description 登出
     */
    logOff() {
      this.logout({
        vm: this,
        confirm: true
      });
    },
    resetDb() {
      sysService.resetDb().then(() => {
        setTimeout(() => {
          location.reload();
        }, 1500);
      });
    },
	openDialog(){
		this.dialogPassWordVisible=true;
		this.$refs.resetForm.resetFields();
	},
	toAmend() {
		let that = this
		this.$refs.resetForm.validate(valid => {
			if (valid) {
				let jsonStr = that.resetForm
				ModifyPsd(qs.stringify({jsonStr:JSON.stringify(jsonStr)})).then(async res => {
				    if(typeof(res)!='undefined'&&res.code==0){
						that.$message({message: res.msg,type: 'success'})
						setTimeout(function(){that.dialogPassWordVisible=false;},1500)
				    }else{
						that.$message({message: res.msg,type: 'error'})
				    }
				  })
				  .catch(err => {
				    console.log('err111: ', err)
				  })
			}
		})
	},
	AddFavorite(e) {
		let sURL = location.href;
		let sTitle = document.title;
	    try {
	        window.external.addFavorite(sURL, sTitle);
	    } catch (e) {
	        try {
	            window.sidebar.addPanel(sTitle, sURL, "");
	        } catch (e) {
				this.$alert('加入收藏失败，请使用Ctrl+D进行添加',"提示");
	        }
	    }
	}
  }
};
</script>
<style lang="scss" scoped>
.form-pass {
  width: 60%;
  margin: 50px auto 0;
  text-align: center;
  button {
    margin: 20px 0 0;
  };
}
</style>