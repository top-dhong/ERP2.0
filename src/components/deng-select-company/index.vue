<template>
    <span>
        <el-select v-model="currentValue" placeholder="请选择" style="width: 100%" :disabled="disabled" @change="tapChange">
          <el-option v-for="item in text2Options" :key="item.GUID" :label="item.CodeName" :value="item.GUID">
          </el-option>
        </el-select>
    </span>
</template>

<script>
	import util from '@/libs/util.js'
	import {GetCompanyCW,GetCompanyGL} from "@/api/flow/flow";
	import qs from "qs";
	export default {
	  props: {
		// 值
		value: {
		  type: String,
		  required: false,
		  default: ""
		},
		// 是否可用
		disabled: {
		  type: Boolean,
		  required: false,
		  default: false
		},
		// CW GL
		comType: {
		  type: String,
		  required: false,
		  default: "CW"
		}
	  },
	  data() {
		return {
		  text2Options:[],
		  currentValue:""
		};
	  },
	  watch: {
		value(value) {
		  this.currentValue = value;
		}
	  },
	  created() {
		console.log(11111)
		this.currentValue = this.value;
		this.initData()
	  },
	  methods: {
		initData(){
			let that = this
			let tmpType = that.comType
			if('CW'==tmpType){
				GetCompanyCW(qs.stringify({})).then(async res => {
					if (typeof (res) != 'undefined' && res.code == 0) {
						that.text2Options =  res.data
					}
				})
				.catch(err => {
					console.log('err: ', err)
				})
			}else if('GL'==tmpType){
				GetCompanyGL().then(async res => {
					if (typeof (res) != 'undefined' && res.code == 0) {
						that.text2Options =  res.data
					}
				})
				.catch(err => {
					console.log('err: ', err)
				})
			}
			
		},
		tapChange(GUID){
			this.$emit("setSelected", GUID);
		}
	  }
	};
</script>