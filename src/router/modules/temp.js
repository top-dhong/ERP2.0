//配置模版路由文件
const meta = { requiresAuth: true }

export default [
	{ path: 'flowaddpush/uWF_MeetRecordTemp', name: `flow-flowaddpush-uWF_MeetRecordTemp`, component: () => import('@/pages/flow/flowaddpush/uWF_MeetRecordTemp'), meta: { meta, cache: true,title: '会议纪要' } },
	{ path: 'flowaddpush/uWF_MeetApplayTemp', name: `flow-flowaddpush-uWF_MeetApplayTemp`, component: () => import('@/pages/flow/flowaddpush/uWF_MeetApplayTemp'), meta: { meta, cache: true,title: '会议室申请' } },
	{ path: 'flowaddpush/WorkRequestSYTemp', name: `flow-flowaddpush-WorkRequestSYTemp`, component: () => import('@/pages/flow/flowaddpush/WorkRequestSYTemp'), meta: { meta, cache: true,title: '工作请示（商业）' } },
	{ path: 'flowaddpush/WorkRequestTemp1', name: `flow-flowaddpush-WorkRequestTemp1`, component: () => import('@/pages/flow/flowaddpush/WorkRequestTemp1'), meta: { meta, cache: true,title: '工作请示（地产）1' } },
	{ path: 'flowaddpush/WorkRequestTemp2', name: `flow-flowaddpush-WorkRequestTemp2`, component: () => import('@/pages/flow/flowaddpush/WorkRequestTemp2'), meta: { meta, cache: true,title: '工作请示（地产）2' } },
	{ path: 'flowaddpush/WorkRequestTemp3', name: `flow-flowaddpush-WorkRequestTemp3`, component: () => import('@/pages/flow/flowaddpush/WorkRequestTemp3'), meta: { meta, cache: true,title: '工作请示（地产）3' } },
	{ path: 'flowaddpush/WorkRequestTemp4', name: `flow-flowaddpush-WorkRequestTemp4`, component: () => import('@/pages/flow/flowaddpush/WorkRequestTemp4'), meta: { meta, cache: true,title: '工作请示（地产）4' } },
	{ path: 'flowaddpush/WorkRequestTemp5', name: `flow-flowaddpush-WorkRequestTemp5`, component: () => import('@/pages/flow/flowaddpush/WorkRequestTemp5'), meta: { meta, cache: true,title: '工作请示（地产）5' } },
	{ path: 'flowaddpush/ProjPlanAddEditTemp', name: `flow-flowaddpush-ProjPlanAddEditTemp`, component: () => import('@/pages/flow/flowaddpush/ProjPlanAddEditTemp'), meta: { meta, cache: true,title: '项目计划新建及调整' } },
	{ path: 'flowaddpush/AskForleaveNewTemp1', name: `flow-flowaddpush-AskForleaveNewTemp1`, component: () => import('@/pages/flow/flowaddpush/AskForleaveNewTemp1'), meta: { meta, cache: true,title: '请假流程（地产新）1' } },
	{ path: 'flowaddpush/AskForleaveNewTemp2', name: `flow-flowaddpush-AskForleaveNewTemp2`, component: () => import('@/pages/flow/flowaddpush/AskForleaveNewTemp2'), meta: { meta, cache: true,title: '请假流程（地产新）2' } },
	{ path: 'flowaddpush/TFmWF_ComDocPostTemp', name: `flow-flowaddpush-TFmWF_ComDocPostTemp`, component: () => import('@/pages/flow/flowaddpush/TFmWF_ComDocPostTemp'), meta: { meta, cache: true,title: '公司发文（地产）' } },
	{ path: 'flowaddpush/TFrmWF_MeetMemoTemp', name: `flow-flowaddpush-TFrmWF_MeetMemoTemp`, component: () => import('@/pages/flow/flowaddpush/TFrmWF_MeetMemoTemp'), meta: { meta, cache: true,title: '会议纪要流程' } },
	{ path: 'flowaddpush/TfrmTravelRequestTemp', name: `flow-flowaddpush-TfrmTravelRequestTemp`, component: () => import('@/pages/flow/flowaddpush/TfrmTravelRequestTemp'), meta: { meta, cache: true,title: '差旅申请' } },
    { path: 'flowaddpush/WorkConsultTemp1', name: `flow-flowaddpush-WorkConsultTemp1`, component: () => import('@/pages/flow/flowaddpush/WorkConsultTemp1'), meta: { meta, cache: true,title: '工作沟通（测试）1' } },
	{ path: 'flowaddpush/WFStampSealTemp1', name: `flow-flowaddpush-WFStampSealTemp1`, component: () => import('@/pages/flow/flowaddpush/WFStampSealTemp1'), meta: { meta, cache: true,title: '加盖公章（地产）v3 1' } },
	{ path: 'flowaddpush/WFMeetMemoTemp1', name: `flow-flowaddpush-WFMeetMemoTemp1`, component: () => import('@/pages/flow/flowaddpush/WFMeetMemoTemp1'), meta: { meta, cache: true,title: '会议纪要1' } },
	{ path: 'flowaddpush/AttentProblemTemp1', name: `flow-flowaddpush-AttentProblemTemp1`, component: () => import('@/pages/flow/flowaddpush/AttentProblemTemp1'), meta: { meta, cache: true,title: '考勤异常流程(地产)1' } },
	{ path: 'flowaddpush/WFborrowFlowOtherV3Temp1', name: `flow-flowaddpush-WFborrowFlowOtherV3Temp1`, component: () => import('@/pages/flow/flowaddpush/WFborrowFlowOtherV3Temp1'), meta: { meta, cache: true,title: '借款流程(地产)1' } },
	{ path: 'flowaddpush/EngeerCostV4Temp1', name: `flow-flowaddpush-EngeerCostV4Temp1`, component: () => import('@/pages/flow/flowaddpush/EngeerCostV4Temp1'), meta: { meta, cache: true,title: '工程费用借款1' } },
    { path: 'flowaddpush/WorkfinishTemp1', name: `flow-flowaddpush-WorkfinishTemp1`, component: () => import('@/pages/flow/flowaddpush/WorkfinishTemp1'), meta: { meta, cache: true,title: '职能计划完成1' } },
    { path: 'flowaddpush/WFEContractV3Temp1', name: `flow-flowaddpush-WFEContractV3Temp1`, component: () => import('@/pages/flow/flowaddpush/WFEContractV3Temp1'), meta: { meta, cache: true,title: '合同审批(工程类)1' } },
    { path: 'flowaddpush/WFProjPlanChangeTemp1', name: `flow-flowaddpush-WFProjPlanChangeTemp1`, component: () => import('@/pages/flow/flowaddpush/WFProjPlanChangeTemp1'), meta: { meta, cache: true,title: '项目计划反馈1' } },
    { path: 'flowaddpush/WFProjPlanFinishTemp1', name: `flow-flowaddpush-WFProjPlanFinishTemp1`, component: () => import('@/pages/flow/flowaddpush/WFProjPlanFinishTemp1'), meta: { meta, cache: true,title: '项目计划完成1' } },
    { path: 'flowaddpush/WorkAdjustTemp1', name: `flow-flowaddpush-WorkAdjustTemp1`, component: () => import('@/pages/flow/flowaddpush/WorkAdjustTemp1'), meta: { meta, cache: true,title: '职能计划调整1' } },
    { path: 'flowaddpush/ContractApprovalTemp1', name: `flow-flowaddpush-ContractApprovalTemp1`, component: () => import('@/pages/flow/flowaddpush/ContractApprovalTemp1'), meta: { meta, cache: true,title: '合同审批(设计类)1' } },
    { path: 'flowaddpush/WFYCLXV2Temp1', name: `flow-flowaddpush-WFYCLXV2Temp1`, component: () => import('@/pages/flow/flowaddpush/WFYCLXV2Temp1'), meta: { meta, cache: true,title: '物业立项1' } },





]


