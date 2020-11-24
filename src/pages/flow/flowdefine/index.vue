<template>
  <d2-container>
	  <template slot="header"><el-button-group>
	    <el-button
	      type="primary"
	      icon="el-icon-warning"
	      size="mini"
	      @click="tapBtn(0)"
	    >基本信息</el-button>
	    <el-button
	      type="success"
	      icon="el-icon-news"
	      size="mini"
	      @click="tapBtn(1)"
	    >节点信息</el-button>
	    <el-button
	      type="warning"
	      icon="el-icon-sort"
	      size="mini"
	      @click="tapBtn(2)"
	    >流程路径</el-button>
	    <!-- <el-button
	      type="danger"
	      icon="el-icon-news"
	      size="mini"
	      @click="tapBtn(3)"
	    >流程图</el-button>
	    <el-button
	      type="default"
	      icon="el-icon-tickets"
	      size="mini"
	      @click="tapBtn(4)"
	    >流程日志</el-button> -->
	  </el-button-group>
	    <el-popover
	      placement="top-start"
	      title="温馨提示"
	      width="400"
	      trigger="click"
	    >
	      <li>暂无提示信息</li>
	      <el-button
	        slot="reference"
	        size="mini"
	        icon="el-icon-info"
	        style="float:right"
	      >操作提示</el-button>
	    </el-popover>
		
	  </template>
    
    
    <el-row>
      <el-col
        :span="8"
        style="margin-top:15px;height: 50rem"
      >
	  <el-form :inline="true" size="mini" style="background-color: #FFF;border-radius: 4px;">
	    <el-form-item label="分类名称" prop="filterText">
	      <el-input v-model="filterText" placeholder="流程分类名称" clearable/>
	    </el-form-item>
	  </el-form>
	  <el-scrollbar style="height: 100%;">
			<el-tree
			  ref="tree"
			  class="filter-tree"
			  node-key="guid"
			  default-expand-all
			  highlight-current
			  :expand-on-click-node="false"
			  :data="menuList"
			  :props="defaultProps"
			  :filter-node-method="filterNode"
			  @node-click="getMenuData"
			></el-tree>
		</el-scrollbar>
      </el-col>
	  <!-- 基本信息 -->
      <el-col
        :span="16"
		v-show="btnType==0"
        style="margin-top:15px;"
      >
        <el-card shadow="always" style="margin-left: 5px;">
          <el-form
            label-position="right"
            label-width="80px"
            :model="flowInfo"
            ref="flowInfo"
          >
            <el-form-item
              label="流程名称"
              prop="flowbasename"
			  :rules="[{ required: true, message: '流程名称不能为空',trigger:'blur'}]"
            >
              <el-input
                v-model="flowInfo.flowbasename"
				@input="pyCODE"
				clearable
              ></el-input>
            </el-form-item>
			<el-form-item
			  label="编号前缀"
			  prop="flowbaseprefix"
			  :rules="[{ required: true, message: '编号前缀不能为空',trigger:'change'}]"
			>
			  <el-input
			    v-model="flowInfo.flowbaseprefix"
				clearable
			  ></el-input>
			</el-form-item>
			<!-- <el-form-item
			  label="表单名称"
			  prop="formname"
			  :rules="[{ required: true, message: '表单名称不能为空',trigger:'change'}]"
			>
			  <el-autocomplete
			    v-model="flowInfo.formname"
				:fetch-suggestions="querySearch"
				value-key="formguid"
				@select="handleSelect"
			    placeholder="请选择表单名称"
			  ></el-autocomplete>
			</el-form-item> -->
			<el-form-item
			  label="表单名称"
			  prop="formguid"
			  :rules="[{ required: true, message: '表单名称不能为空',trigger:'blur'}]"
			>
			  <el-select
			    class="filter-item"
			    v-model="flowInfo.formguid"
			    placeholder="请选择表单名称"
			  >
			    <el-option
			      v-for="item in restaurants"
			      :key="item.formguid"
			      :label="item.value"
			      :value="item.formguid"
			    ></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item
			  label="所属专业"
			  prop="profess"
			  :rules="[{ required: true, message: '所属专业不能为空',trigger:'blur'}]"
			>
			  <el-select
			    class="filter-item"
			    v-model="flowInfo.profess"
			    placeholder="请选择所属专业"
			  >
			    <el-option
			      v-for="item in professOptions"
			      :key="item.velue"
			      :label="item.velue"
			      :value="item.value"
			    ></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item
			  label="所属业态"
			  prop="bustype"
			  :rules="[{ required: true, message: '所属业态不能为空',trigger:'blur'}]"
			>
			  <el-select
			    class="filter-item"
			    v-model="flowInfo.bustype"
			    placeholder="请选择所属业态"
			  >
			    <el-option
			      v-for="item in bustypeOptions"
			      :key="item.velue"
			      :label="item.velue"
			      :value="item.value"
			    ></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item
			  label="模版类型"
			  prop="templatetype"
			  :rules="[{ required: true, message: '模版类型不能为空',trigger:'blur'}]"
			>
			  <el-select
			    class="filter-item"
			    v-model="flowInfo.templatetype"
			    placeholder="请选择模版类型"
			  >
			    <el-option
			      v-for="item in templatetypeOptions"
			      :key="item.velue"
			      :label="item.name"
			      :value="item.value"
			    ></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item
			  label="流程密级"
			  prop="viewsecurity"
			  :rules="[{ required: true, message: '流程密级不能为空',trigger:'blur'}]"
			>
			  <el-select
			    class="filter-item"
			    v-model="flowInfo.viewsecurity"
			    placeholder="请选择流程密级"
			  >
			    <el-option
			      v-for="item in viewsecurityOptions"
			      :key="item.velue"
			      :label="item.name"
			      :value="item.value"
			    ></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item
			  label="流程性质"
			  prop="flowbaseattribute"
			  :rules="[{ required: true, message: '流程性质不能为空',trigger:'blur'}]"
			>
			  <el-select
			    class="filter-item"
			    v-model="flowInfo.flowbaseattribute"
			    placeholder="请选择流程性质"
			  >
			    <el-option
			      v-for="item in flowbaseattributeOptions"
			      :key="item.velue"
			      :label="item.name"
			      :value="item.value"
			    ></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item
			  label="显示序号"
			  prop="orderno"
			  :rules="[{ required: true, message: '序号不能为空',trigger:'blur'}]"
			>
			  <el-input
			    v-model="flowInfo.orderno"
			  ></el-input>
			</el-form-item>
			<el-form-item
			  label="允许打印次数"
			  prop="printtimes"
			  :rules="[{ required: true, message: '允许打印次数不能为空',trigger:'blur'}]"
			>
			  <el-input
			    v-model="flowInfo.printtimes"
			  ></el-input>
			</el-form-item>
			<el-form-item
			  label="是否启用审核要素"
			  prop="iscanUrgent"
			>
			  <el-switch
			    v-model="flowInfo.iscanUrgent"/>
			</el-form-item>
			<el-form-item
			  label="是否生效"
			  prop="isvalid"
			>
			  <el-switch
			    v-model="flowInfo.isvalid"/>
			</el-form-item>
			<el-form-item
			  label="是否允许人工创建"
			  prop="iscanmancreate"
			>
			  <el-switch
			    v-model="flowInfo.iscanmancreate"/>
			</el-form-item>
			<el-form-item
			  label="是否允许紧急"
			  prop="iscanUrgent"
			>
			  <el-switch
			    v-model="flowInfo.iscanUrgent"
			  ></el-switch>
			</el-form-item>
			<el-form-item
			  label="流转后禁删附件"
			  prop="iscanUrgent"
			>
			  <el-switch
			    v-model="flowInfo.iscanUrgent"
			  ></el-switch>
			</el-form-item>
			<el-form-item
			  label="所属公司"
			  prop="corp"
			  :rules="[{ required: true, message: '所属公司不能为空',trigger:'blur'}]"
			>
			  <el-select
			    class="filter-item"
			    v-model="flowInfo.corp"
			    placeholder="请选择所属公司"
			  >
			    <el-option
			      v-for="item in corpOptions"
			      :key="item.velue"
			      :label="item.label"
			      :value="item.value"
			    ></el-option>
			  </el-select>
			</el-form-item>
            <el-form-item>
              <el-button
                type="primary"
				:loading="loading"
                @click="submit"
              >提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
	  <!-- 节点信息 -->
	  <el-col
	    :span="16"
	  		v-show="btnType==1"
	    style="margin-top:15px;"
	  >
	  <el-card shadow="always" style="margin-left: 5px;">
	     <el-table :data="FlowNodeInfo" size="small" stripe highlight-current-row style="width: 100%;">
	       <el-table-column type="selection" width="55">
	       </el-table-column>
	       <el-table-column label="序号" prop="RecNo" show-overflow-tooltip>
	         <template slot-scope="scope">
	           {{scope.row.RecNo}}
	         </template>
	       </el-table-column>
	       <el-table-column label="节点名称" prop="NodeName" show-overflow-tooltip>
	         <template slot-scope="scope">
	          {{scope.row.NodeName}}
	         </template>
	       </el-table-column>
	     
	       <el-table-column label="节点类型" prop="NodeType" show-overflow-tooltip>
	         <template slot-scope="scope">
	          {{scope.row.NodeType}}
	         </template>
	       </el-table-column>
		   
		   <el-table-column label="编辑权限" prop="EditRight" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.EditRight}}
		     </template>
		   </el-table-column>
		   <el-table-column label="操作者" prop="NodeDoUser" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.NodeDoUser}}
		     </template>
		   </el-table-column>
		   <el-table-column label="是否内审" prop="IsInnerAudit" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.IsInnerAudit?'是':'否'}}
		     </template>
		   </el-table-column>
		   <el-table-column label="允许编辑附件" prop="IsAnnex" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.IsAnnex?'是':'否'}}
		     </template>
		   </el-table-column>
		   </el-table-column>
		   <el-table-column label="允许打印表单" prop="IsPrint" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.IsPrint?'是':'否'}}
		     </template>
		   </el-table-column>
		   <el-table-column label="允许沟通" prop="IsCommunicate" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.IsCommunicate?'是':'否'}}
		     </template>
		   </el-table-column>
		   <el-table-column label="允许待办" prop="IsTurnDo" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.IsTurnDo?'是':'否'}}
		     </template>
		   </el-table-column>
		   <el-table-column label="允许个人作废" prop="IsAllowInvalid" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.IsAllowInvalid?'是':'否'}}
		     </template>
		   </el-table-column>
		   <el-table-column label="允许驳回" prop="IsAllowBack" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.IsAllowBack?'是':'否'}}
		     </template>
		   </el-table-column>
		   <el-table-column label="强制沟通" prop="IsAddTag" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.IsAddTag?'是':'否'}}
		     </template>
		   </el-table-column>
		   <el-table-column label="环节时效(h)" prop="TimeOut" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.TimeOut}}
		     </template>
		   </el-table-column>
		   <el-table-column label="内审上限" prop="InnerAuditLevel" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.InnerAuditLevel}}
		     </template>
		   </el-table-column>
		   <el-table-column label="职责说明" prop="EditRight" show-overflow-tooltip>
		     <template slot-scope="scope">
		      {{scope.row.EditRight}}
		     </template>
		   </el-table-column>
		   
	       <el-table-column width="90" fixed="right" label="操作" align="center">
	         <template slot-scope="scope">
	           <el-button type="primary" title="编辑" size="mini" icon="el-icon-edit" circle @click="editNode(scope.row)"></el-button>
	           <el-button type="danger" title="删除" size="mini" icon="el-icon-delete" circle @click="delNode(scope.row.guid)"></el-button>
	         </template>
	       </el-table-column>
	     
	     </el-table>
		 </el-card>
	  </el-col>
	  <!-- 流程路径 -->
	  <el-col
	    :span="16"
		v-show="btnType==2"
	    style="margin-top:15px;"
	  >
	     <el-card shadow="always" style="margin-left: 5px;">
	        <el-table :data="FlowPath" size="small" stripe highlight-current-row style="width: 100%;">
	          <el-table-column type="selection" width="55">
	          </el-table-column>
	          <el-table-column label="序号" prop="orderno" show-overflow-tooltip>
	            <template slot-scope="scope">
	              {{scope.row.orderno}}
	            </template>
	          </el-table-column>
	          <el-table-column label="出发节点" prop="nodeguid" show-overflow-tooltip>
	            <template slot-scope="scope">
	             {{scope.row.nodeguid}}
	            </template>
	          </el-table-column>
	          <el-table-column label="到达节点" prop="tonodeguid" show-overflow-tooltip>
	            <template slot-scope="scope">
	             {{scope.row.tonodeguid}}
	            </template>
	          </el-table-column>
			   <el-table-column label="条件说明" prop="pathmemo" show-overflow-tooltip>
				 <template slot-scope="scope">
				  {{scope.row.pathmemo}}
				 </template>
			   </el-table-column>
			   <el-table-column label="出发条件" prop="pathsql" show-overflow-tooltip>
				 <template slot-scope="scope">
				  {{scope.row.pathsql}}
				 </template>
			   </el-table-column>
	          <el-table-column width="90" fixed="right" label="操作" align="center">
	            <template slot-scope="scope">
	              <el-button type="primary" title="编辑" size="mini" icon="el-icon-edit" circle @click="editFlowPath(scope.row)"></el-button>
	              <el-button type="danger" title="删除" size="mini" icon="el-icon-delete" circle @click="delFlowPath(scope.row.guid)"></el-button>
	            </template>
	          </el-table-column>
	        </el-table>
	     		 </el-card>
	  </el-col>
	  <!-- 流程图 -->
	  <el-col
	    :span="16"
	  		v-show="btnType==3"
	    style="margin-top:15px;"
	  >
			<el-card :active="true" shadow="always" style="margin-left: 5px;">
			 <el-steps  finish-status="success">
			   <el-step title="步骤 1"></el-step>
			   <el-step title="步骤 2"></el-step>
			   <el-step title="步骤 3"></el-step>
			   <el-step title="步骤 1"></el-step>
			   <el-step title="步骤 2"></el-step>
			   <el-step title="步骤 3"></el-step>
			 </el-steps>
			</el-card>
	  </el-col>
    </el-row>
	<!-- 节点编辑弹窗 -->
	<el-dialog :title="`编辑节点信息`" :visible.sync="dialogFormVisible">
	  <el-form :model="form"
	  ref="form"
	  >
	    <el-form-item label="序号" prop="RecNo" :label-width="formLabelWidth" :rules="[{ required: true, message: '序号不能为空',trigger:'blur'}]">
	      <el-input v-model="form.RecNo" autocomplete="off"></el-input>
	    </el-form-item>
		<el-form-item label="节点名称" prop="NodeName" :label-width="formLabelWidth" :rules="[{ required: true, message: '节点名称不能为空',trigger:'blur'}]">
		  <el-input v-model="form.NodeName" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="节点类型" prop="NodeType" :label-width="formLabelWidth" :rules="[{ required: true, message: '节点类型不能为空',trigger:'blur'}]">
		  <!-- <el-input v-model="form.NodeType" autocomplete="off"></el-input> -->
		  <el-select
		    class="filter-item"
		    v-model="form.NodeType"
		    placeholder="请选择节点类型"
		  >
		    <el-option
		      v-for="item in NodeTypeOptions"
		      :key="item.velue"
		      :label="item.name"
		      :value="item.value"
		    ></el-option>
		  </el-select>
		</el-form-item>
		<el-form-item label="编辑权限" prop="EditRight" :label-width="formLabelWidth" :rules="[{ required: true, message: '编辑权限不能为空',trigger:'blur'}]">
		  <el-input v-model="form.EditRight" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="操作者" prop="NodeDoUser" :label-width="formLabelWidth" :rules="[{ required: true, message: '操作者不能为空',trigger:'blur'}]">
		  <el-input v-model="form.NodeDoUser" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="是否内审" prop="IsInnerAudit" :label-width="formLabelWidth">
		  <el-switch v-model="form.IsInnerAudit"/>
		</el-form-item>
		<el-form-item label="允许编辑附件" prop="IsAnnex" :label-width="formLabelWidth">
		  <el-switch v-model="form.IsAnnex"/>
		</el-form-item>
		<el-form-item label="允许打印表单" prop="IsPrint" :label-width="formLabelWidth">
		  <el-switch v-model="form.IsPrint"/>
		</el-form-item>
		<el-form-item label="允许沟通" prop="IsCommunicate" :label-width="formLabelWidth">
		  <el-switch v-model="form.IsCommunicate"/>
		</el-form-item>
		<el-form-item label="允许转办" prop="IsTurnDo" :label-width="formLabelWidth">
		  <el-switch v-model="form.IsTurnDo"/>
		</el-form-item>
		<el-form-item label="允许个人作废" prop="IsAllowInvalid" :label-width="formLabelWidth">
		  <el-switch v-model="form.IsAllowInvalid"/>
		</el-form-item>
		<el-form-item label="允许驳回" prop="IsAllowBack" :label-width="formLabelWidth">
		  <el-switch v-model="form.IsAllowBack"/>
		</el-form-item>
		<el-form-item label="强制沟通" prop="IsAddTag" :label-width="formLabelWidth">
		  <el-switch v-model="form.IsAddTag"/>
		</el-form-item>
		<el-form-item label="环节时效" prop="TimeOut" :label-width="formLabelWidth" :rules="[{ required: true, message: '序号不能为空',trigger:'blur'}]">
		  <el-input v-model="form.TimeOut" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="内审上限" prop="InnerAuditLevel" :label-width="formLabelWidth">
		  <el-input v-model="form.InnerAuditLevel" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="职责说明" prop="EditRight" :label-width="formLabelWidth">
		  <el-input type="textarea" v-model="form.EditRight" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item>
		  <el-button @click="dialogFormVisible = false">取 消</el-button>
		  <el-button type="primary" :loading="loading2" @click="submitNode">确 定</el-button>
		</el-form-item>
	  </el-form>
	</el-dialog>
  </d2-container>
</template>

<script>
import qs from "qs";
import {GetFomInfo,GetFlowType,GetFlowInfo,GetFlowNodeInfo,operaFlowDefine,operaFlowNode,GetFlowPath} from "@/api/flow/flow";
import vPinyin from "@/libs/vue-py.js";
//let aaaa = vPinyin.trafficHub("你好1(哈哈c)");
export default {
  data() {
    return {
		loading:false,//基本信息提交状态
		loading2:false,//节点编辑表单提交状态
		checked1:"",
		fileList3:[],//附件列表
		restaurants: [],//表单列表
		typeOptions: [
		  {
			value: 1,
			label: "菜单"
		  },
		  {
			value: 2,
			label: "功能"
		  }
		],
		professOptions:[
			{
						value: "工程"
			},
			{
						value: "设计"
			},
			{
						value: "财务"
			},
			{
						value: "审计"
			},
			{
						value: "报建"
			},
			{
						value: "行政"
			},
			{
						value: "人力"
			},
			{
						value: "信息"
			},
			{
						value: "采购"
			}
		],
		bustypeOptions:[
			{
						value: "地产"
			},
			{
						value: "物业"
			},
			{
						value: "商业"
			},
			{
						value: "投资"
			}
		],
		templatetypeOptions:[
			{
						value: "自动模版",
						name:"自动模版"
			},
			{
						value: "人工模版",
						name:"人工模版"
			}
		],
		viewsecurityOptions:[
			{
				value: "0",
				name:"普通"
			},
			{
				value: "1",
				name:"保密"
			},
			{
				value: "2",
				name:"机密"
			}
		],
		flowbaseattributeOptions:[
			{
				value: "合同签订",
				name:"合同签订"
			},
			{
				value: "合同立项",
				name:"合同立项"
			},
			{
				value: "非合同立项",
				name:"非合同立项"
			},
			{
				value: "合同支付",
				name:"合同支付"
			},
			{
				value: "非合同支付",
				name:"非合同支付"
			},
			{
				value: "非经济事物",
				name:"非经济事物"
			}
		],
		corpOptions:[
			{
				value: "地产公司",
				name:"地产公司"
			},
			{
				value: "商业公司",
				name:"商业公司"
			},
			{
				value: "物业公司",
				name:"物业公司"
			}
		],
		filterText:'',
		searchForm: {},
		btnType:'0',//右侧窗口显示类型 可选值 0,1,2,3,4
		formEdit: false,
		currentId: 0,
		menuList: [],
		defaultProps: {
			label: "typename"
		},
		flowInfo: {},
		FlowNodeInfo:[],
		FlowPath:[],
		editFormDialogVisible: false,
		relateInterfaceDialogVisible: false,
		
	
		dialogTableVisible: false,
		dialogFormVisible: false,
		form: {
		},
		formLabelWidth: '120px',
		NodeTypeOptions: [
		  {
		    value: "创建",
		    name: "创建"
		  },
		  {
		    value: "审批",
		    name: "审批"
		  },
		  {
		    value: "抄送",
		    name: "抄送"
		  },
		  {
		    value: "结束",
		    name: "结束"
		  }
		]
    };
  },
  mounted() {
        //this.restaurants = this.loadAll();
      },
  watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        }
      },
  methods: {
    initData() {
		let that = this
		GetFlowType(qs.stringify({})).then(async res => {
            if(typeof(res)!='undefined'&&res.code==0){
               that.menuList = res.data;
				GetFomInfo().then(async res => {
					if(typeof(res)!='undefined'&&res.code==0){
						that.restaurants = res.data;
					}else{
						that.$message({message: res.msg,type: 'error'})
					}
				})
			  .catch(err => {
				console.log('err111: ', err)
			  })
            }else{
				that.$message({message: res.msg,type: 'error'})
            }
          })
          .catch(err => {
            console.log('err111: ', err)
          })
    },
	//根据tapBtn获取基本信息/节点信息等
    getMenuData(data) {
		let that = this
		let btnType = that.btnType
		let flowtypeguid = data.guid;
		if(0==btnType){
			GetFlowInfo(qs.stringify({flowtypeguid})).then(async res => {
			    if(typeof(res)!='undefined'&&res.code==0){
			       that.flowInfo = res.data;
				   //根据formguid 检索除formname
					// function createMFilter(a,qstr) {
					// 	return (a) => {
					// 		return (a.guid.indexOf(qstr) === 0);
					// 	};
					// }
				   //let results = that.restaurants.filter(createMFilter(that.restaurants,that.flowInfo.formguid));
				   //that.flowInfo['formname'] = results[0].value
				   console.log(1222,that.flowInfo)
			    }else if(typeof(res)!='undefined'&&res.code==3){//查询数据为空
					that.flowInfo = {}
			    }else{
					that.$message({message: res.msg,type: 'error'})
				}
			  })
			  .catch(err => {
			    console.log('err111: ', err)
			  })
		}else if(1==btnType){
			GetFlowNodeInfo(qs.stringify({flowtypeguid})).then(async res => {
			    if(typeof(res)!='undefined'&&res.code==0){
			       that.FlowNodeInfo = res.data;
			    }else if(typeof(res)!='undefined'&&res.code==3){//查询数据为空
					that.FlowNodeInfo = []
			    }else{
					that.$message({message: res.msg,type: 'error'})
			    }
			  })
			  .catch(err => {
			    console.log('err111: ', err)
			  })
		}else if(2==btnType){
			GetFlowPath(qs.stringify({flowtypeguid})).then(async res => {
			    if(typeof(res)!='undefined'&&res.code==0){
			       that.FlowPath = res.data;
			    }else if(typeof(res)!='undefined'&&res.code==3){//查询数据为空
					that.FlowPath = []
			    }else{
					that.$message({message: res.msg,type: 'error'})
			    }
			  })
			  .catch(err => {
			    console.log('err111: ', err)
			  })
		}
        that.currentId = flowtypeguid;
    },
	//切换tapBtn
	tapBtn(btnType){
		let that = this
		that.btnType = btnType
		//如果已经选中过  就直接加载数据
		if(that.currentId){
			that.getMenuData({guid:that.currentId})
		}
	},
	editNode(data){
		let that = this
		that.form = data
		console.log(1,data)
		that.dialogFormVisible = true;
		that.dialogTableVisible = true;
	},
	delNode(guid){
		console.log(guid)
	},
	//提交流程基本信息
	//流程定义中不能增加分类  从流程分类中进行维护  这里提交永远是修改
    submit() {
		let that = this
		that.$refs.flowInfo.validate(valid => {
			if (valid) {
				that.loading = true;
				let par = that.flowInfo;
				par['type'] = 1
				console.log(1,par)
				operaFlowDefine(qs.stringify({jsonStr:JSON.stringify(par)})).then(async res => {
					that.loading = false;
				    if(typeof(res)!='undefined'&&res.code==0){
						that.$message({message: res.msg,type: 'success'})
					}else{
						that.$message({message: res.msg,type: 'error'})
					}
				})
			}
		});
    },
	//提交节点信息
    submitNode(){
		let that = this
		that.$refs.form.validate(valid => {
			if (valid) {
				
				that.loading2 = true;
				let par = {jsonStr:that.form};
				console.log(1,par)
				if(1)return
				operaFlowNode(qs.stringify(par)).then(async res => {
					that.loading2 = false;
				    if(typeof(res)!='undefined'&&res.code==0){
						that.$message({message: res.msg,type: 'success'})
						setTimeout(function(){that.dialogFormVisible = false;},1500)
					}else{
						that.$message({message: res.msg,type: 'error'})
					}
				})
			}
		});
	},
    pyCODE() {
		this.flowInfo.flowbaseprefix = vPinyin.trafficHub(this.flowInfo.flowbasename);
    },
	filterNode(value, data) {
		if (!value) return true;
		return data.typename.indexOf(value) !== -1;
	},
	querySearch(queryString, cb) {
		let restaurants = this.restaurants;
		let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
		// 调用 callback 返回建议列表的数据
		console.log(1111,results)
		cb(results);
	},
	createFilter(queryString) {
		return (restaurant) => {
			return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
		};
	},
	handleSelect(item) {
		this.flowInfo.formguid = item.guid
		//this.flowInfo.formname = item.value
		console.log(1,item);
	},
	//上传附件
	handleChange(e){
		console.log(1,e)
	},
	loadAll() {
	        return [
	          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
	          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
	          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
	          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
	          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
	          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
	          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
	          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
	          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
	          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" }
	        ];
	      },
  },
  created() {
    this.initData();
  }
};
</script>
