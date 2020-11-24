<template>
  <el-form
    :inline="true"
    :model="form"
    :rules="rules"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
	<el-form-item>
	  <el-button
	    type="success"
	    @click="flowAdd">
	    <d2-icon name="plus"/>
	    新建1
	  </el-button>
	</el-form-item>
	<el-form-item>
	  <el-button
	    type="info"
	    @click="handleFormSubmit">
	    <d2-icon name="clock-o"/>
	    催办
	  </el-button>
	</el-form-item>
	<el-form-item>
	  <el-button
	    type="warning"
	    @click="handleFormSubmit">
	    <d2-icon name="ban"/>
	    作废
	  </el-button>
	</el-form-item>
	<el-form-item>
	  <el-button
	    type="danger"
	    @click="handleFormSubmit">
	    <d2-icon name="trash-o"/>
	    删除
	  </el-button>
	</el-form-item>
	<el-form-item>
	  <el-button
	    @click="handleFormSubmit">
	    <d2-icon name="pencil"/>
	    干预
	  </el-button>
	</el-form-item>
	<el-form-item>
	  <el-button
	    type="primary"
	    @click="handleFormSubmit">
	    <d2-icon name="cloud-download"/>
	    导出
	  </el-button>
	</el-form-item>
	<!-- <el-form-item>
	  <el-button
	    type="primary"
	    @click="handleFormSubmit">
	    <d2-icon name="sign-out"/>
	    退出
	  </el-button>
	</el-form-item> -->

  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        type: '1',
        user: 'FairyEver',
        key: '',
        note: ''
      },
      rules: {
        type: [ { required: true, message: '请选择一个状态', trigger: 'change' } ],
        user: [ { required: true, message: '请输入用户', trigger: 'change' } ]
      }
    }
  },
  methods: {
	flowAdd(){
		console.log(12131)
		  this.$emit('flowAdd')
		//this.$router.push({path:'./flowadd'})
	},
    handleFormSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$notify.error({
            title: '错误',
            message: '表单校验失败'
          })
          return false
        }
      })
    },
    handleFormReset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
