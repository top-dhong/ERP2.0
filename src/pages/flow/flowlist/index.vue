<template>
  <d2-container>
    <flow-page-header
      slot="header"
      @submit="handleSubmit"
      ref="header"/>
    <el-row>
        <el-col :span="4">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-tree
          ref="tree"
          :data="data"
          :props="defaultProps"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          show-checkbox>
          </el-tree>
        </el-col>
        <el-col :span="20">

            <flow-page-main
              :table-data="table"
              :loading="loading"/>
            <flow-page-footer
              slot="footer"
              :current="page.pageCurrent"
              :size="page.pageSize"
              :total="page.pageTotal"
              @change="handlePaginationChange"/>
        </el-col>
      </el-row>
  </d2-container>
</template>

<script>
  import Vue from 'vue'
  import { FlowList } from '@api/flow/flow'
  export default {
    name: 'flow-flowlist',
    components: {
      'FlowPageHeader': () => import('./componnets/PageHeader'),
      'FlowPageMain': () => import('./componnets/PageMain'),
      'FlowPageFooter': () => import('./componnets/PageFooter')
    },
    data () {
      return {
        filterText:'',
        table: [],
        loading: false,
        page: {
          pageCurrent: 1,
          pageSize: 10,
          pageTotal: 0
        },
        data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
        }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
        }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    created(){
      this.handleSubmit()
    },
    methods: {
      handlePaginationChange (val) {
        this.$notify({
          title: '分页变化',
          message: `当前第${val.current}页 共${val.total}条 每页${val.size}条`
        })
        this.page = {
          pageCurrent: val.current,
          pageSize: val.size,
          pageTotal: val.total
        }
        // nextTick 只是为了优化示例中 notify 的显示
        this.$nextTick(() => {
          this.$refs.header.handleFormSubmit()
        })
      },
      handleSubmit (form) {
        this.loading = true
        console.log('',this.page)
        FlowList({
          ...form,
          ...this.page
        })
          .then(res => {
            this.loading = false
            this.table = res.list
            this.page.pageTotal = res.page.total
          })
          .catch(err => {
            this.loading = false
            this.$notify({
              title: '模拟表格数据请求异常'
            })
            console.log('err', err)
          })
      },
      handleNodeClick(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    }
  }
</script>
