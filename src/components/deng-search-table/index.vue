<template>
    <span>
        <el-dialog :title="pops.title" :visible.sync="pops.dialogVisible">
			<el-form :inline="true" size="mini" style="margin-bottom: -18px">
				<el-form-item v-for="(item, index) of computedColumns">
				    <!-- 判断是否定义了 content 属性 -->
				    <template v-if="item.content">
				      <template v-for="(contentItem, i) of item.content">
				        <!-- conent 为字符串类型, 直接渲染 span 标签 -->
				        <span :key="i" v-if="typeof contentItem === 'string'">{{
				          contentItem
				        }}</span>
				        <!-- content 为其它类型, 则按照动态组件渲染 -->
				          <!-- 组件 -->
				          <component
				            :is="contentItem.type"
				            :style="contentItem.style"
				            :class="contentItem.class"
				            v-bind="getAttrs(contentItem)"
				            @input="
				              handleChange(
				                contentItem.valueKey || item.prop,
				                $event
				              )
				            "
				            @change="
				              emitChange(
				                contentItem.change,
				                $event
				              )
				            "
				            v-model="form[item.prop]"
				            v-on="contentItem.on"
				          >
				            <!-- 组件的插槽 -->
				
				            <!-- select, checkbox, radio等简化操作 options -->
				            <template
				              v-slot:default
				              v-if="
				                contentItem.options && optionTypes[contentItem.type]
				              "
				            >
				              <option-slot
				                v-for="(option, index) of contentItem.options"
				                :key="index"
				                :data="option"
				                :prop="contentItem.prop"
				                :optionAttrs="option.attrs"
				                :optionType="optionTypes[contentItem.type].type"
				                :optionText="optionTypes[contentItem.type].text"
				                :optionValue="optionTypes[contentItem.type].value"
				              ></option-slot>
				            </template>
				            <!-- 作用域插槽 -->
				            <template
				              v-for="(render, key) of contentItem.scopedSlots"
				              v-slot:[key]="data"
				            >
				              <extend-slot :data="data" :key="key" :render="render" />
				            </template>
				
				            <!-- 非作用域插槽 -->
				            <template
				              v-for="(render, key) of contentItem.slots"
				              v-slot:[key]
				            >
				              <extend-slot :key="key" :render="render" />
				            </template>
				          </component>
				      </template>
				    </template>
				    <template v-else>
				      <!-- 没有定义content则这显示对应的文本值 -->
				      <template v-if="item.prop">{{
				        item.lable
				      }}</template>
				    </template>
			  </el-form-item>
			  <el-form-item>
			    <el-button @click="search" type="primary">
			      <d2-icon name="search" />
			      查询
			    </el-button>
			  </el-form-item>
			</el-form>
          <el-table :data="tableData" size="mini"  >
            <el-table-column v-for="(p,idx) in pops.tablePop" width="90" align="center" :label="p.label">
              <template slot-scope="scope">
                {{ scope.row[p.filed] }}
              </template>
            </el-table-column>
			<el-table-column
			  width="90"
			  fixed="right"
			  label="操作"
			  align="center"
			>
			  <template slot-scope="scope">
				<el-button size="mini" type="primary" @click="tapOK(scope)">确 定</el-button>
			  </template>
			</el-table-column>
          </el-table>
		 
        </el-dialog>
    </span>
</template>

<script>
export default {
  name: "deng-search-table",
  props: {
		pops:{
		  type:Object,
		  required: true
		},
		tableData:{
			type: Array,
			default: false
		},
		// 禁用 (对所有input框禁用))
		disabled: {
		  type: Boolean,
		  default: false
		},
  },
  data() {
    return {
      // 绑定弹出框
      //dialogVisible:false,
	  form:{},
      // 所有图标
      data:[],
	  optionTypes: {
	    'el-select': {
	      type: 'el-option',
	      text: 'label',
	      value: 'value'
	    },
	    'el-checkbox-group': {
	      type: 'el-checkbox',
	      text: 'content',
	      value: 'label'
	    },
	    'el-radio-group': {
	      type: 'el-radio',
	      text: 'content',
	      value: 'label'
	    }
	  }
    };
  },
  computed: {
    // 对 pops.formItems 属性做处理
    // 1. 判断是否显示插槽 & 2.将content统一转为数组
    computedColumns () {
      return this.pops.formItems.map(item => {
        // 将  content 转为数组
        if (item.content) {
          item.content = this.changeToArray(item.content)
        }
        return item
      })
    }
  },
  created() {
    //this.currentValue = this.value;
  },
  methods: {
	// content 支持数组和对象类型
	// 统一转为数组
	changeToArray (content) {
		return Array.isArray(content) ? content : [content]
	},
	// 将数据绑定到 change 函数上
	emitChange (change, val ) {
	if (change) {
	  change(val)
	}
	},
	// 值变化
	handleChange (prop, value) {
		//this.validateOneValue(prop, value)
	},
	// 获取属性 (为了将disabled统一设置)
	getAttrs (item) {
		return Object.assign({}, { disabled: this.disabled }, item.attrs)
	},
	search() {
		this.$emit("searchOK", this.form);
	},
	tapOK(scope){
		this.$emit("tapOK", scope.row);
		this.pops.dialogVisible = false
	}
  }
};
</script>