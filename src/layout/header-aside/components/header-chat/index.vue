<template>
  <el-button class="d2-mr btn-text can-hover" type="text">
    <el-popover :width="172" trigger="click">
      <img src="image/qr@2x.jpg" style="width: 172px;">
      <span slot="reference" class="btn-group__btn btn-group__btn--link">
        <d2-icon name="weixin"/>
      </span>
      <p style="font-size: 12px; margin-top: 0px; margin-bottom: 0px;">
        世豪ERP手机端，绑定微信，安全方便快捷，更多功能正在陆续开发中...
      </p>
    </el-popover>
  </el-button>
</template>

<script>
export default {
  name: 'd2-header-chat'
}
</script>
