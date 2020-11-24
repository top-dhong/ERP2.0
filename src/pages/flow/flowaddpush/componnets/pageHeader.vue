<template>
  <div>
    <el-row>
      <el-col style="text-align: center">
        <span style="font-size: 24px"><b>{{ flowData.flowBaseData.WorkflowName }}</b></span>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 18px">
      <el-col>
        <span><b><i class="el-icon-info"></i>基本内容</b></span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="流程主题：" class="te-item" prop="flowBaseData.Subject" :rules="[
            { required: true, message: '流程主题不能为空', trigger: 'blur' },
          ]">
          <el-input placeholder="请输入流程主题" v-model="flowData.flowBaseData.Subject" :maxlength="45" autocomplete="off" :readonly="(Flg=='VIEW')" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="紧急程度：" class="te-item" prop="flowBaseData.Flow_Grade" :rules="[
            { required: true, message: '紧急程度不能为空', trigger: 'blur' },
          ]">
          <el-select v-model="flowData.flowBaseData.Flow_Grade" placeholder="请选择" style="width: 100%" :disabled="(Flg=='EDT'||Flg=='VIEW')">
            <el-option v-for="item in Flow_GradeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="流程编号：" class="te-item" prop="flowBaseData.BillID" :rules="[
            { required: true, message: '流程编号不能为空', trigger: 'blur' },
          ]">
          <el-input v-model="flowData.flowBaseData.BillID" readonly></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="流程状态：" class="te-item" prop="flowBaseData.State_Num" :rules="[
            { required: true, message: '流程状态不能为空', trigger: 'blur' },
          ]">
          <el-select v-model="flowData.flowBaseData.State_Num" placeholder="请选择" style="width: 100%" :disabled="(Flg=='EDT'||Flg=='VIEW')">
            <el-option v-for="item in State_NumOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="创建人员：" class="te-item" prop="flowBaseData.Create_UserName" :rules="[
            { required: true, message: '申请人员不能为空', trigger: 'blur' },
          ]">
          <el-input v-model="flowData.flowBaseData.Create_UserName" readonly></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="创建部门：" class="te-item" prop="flowBaseData.Create_DeptName" :rules="[
            { required: true, message: '申请部门不能为空', trigger: 'blur' },
          ]">
          <el-input v-model="flowData.flowBaseData.Create_DeptName" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="创建时间：" class="te-item" prop="flowBaseData.Create_Date" :rules="[
            { required: true, message: '申请时间不能为空', trigger: 'blur' },
          ]">
          <el-input v-model="flowData.flowBaseData.Create_Date" readonly></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="项目名称：" class="te-item" prop="flowBaseData.Project" :rules="[
            { required: true, message: '项目名称不能为空', trigger: 'blur' },
          ]">
          <deng-select-project v-model="flowData.flowBaseData.ProjectName" @setProject="setProject" :readonly="(Flg=='VIEW')"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属公司：" class="te-item" prop="flowBaseData.BusTypeName" :rules="[
            { required: true, message: '所属业态不能为空', trigger: 'blur' },
          ]">
          <el-input v-model="flowData.flowBaseData.BusTypeName" readonly></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    flowData: Object,
    Flg: "",
  },
  components: {
    dengSelectProject: () => import(`@cps/deng-select-project`),
  },
  data() {
    return {
      Flow_GradeOptions: [
        {
          value: "0",
          label: "一般",
        },
        {
          value: "1",
          label: "紧急",
        },
      ],
      State_NumOptions: [
        {
          value: "Circulation",
          label: "进行中",
        },
        {
          value: "Draft",
          label: "草稿",
        },
        {
          value: "Invalid",
          label: "作废",
        },
        {
          value: "End ",
          label: "归档",
        },
      ],
    };
  },
  methods: {
    setProject(v) {
      console.log(1, v);
      this.flowData.flowBaseData.Project = v.GUID;
      this.flowData.flowBaseData.ProjectName = v.ProjectName;
    },
  },
};
</script>

<style>
.te-item {
  margin-left: 0.9375rem;
}
</style>