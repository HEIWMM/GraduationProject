<template>
  <el-dialog
    title="专注时间记录"
    :visible.sync="dialogFormVisible"
    class="focus-on-shot-window"
  >
    <el-row type="flex" align="middle">
      <el-col :span="3">开始时间</el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="beginTime"
          type="datetime"
          placeholder="选择日期时间"
          disabled
        >
        </el-date-picker
      ></el-col>
      <el-col :span="3" :offset="1">结束时间</el-col>
      <el-col :span="9">
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择日期时间"
          disabled
        >
        </el-date-picker
      ></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">已经结束</el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="5">专注事项</el-col>
      <el-col :span="18" :offset="1">
        <el-input
          v-model="focusOnMatters"
          placeholder="请输入专注事项"
        ></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="processRecord"
          resize="none"
        >
        </el-input>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$props.dialogFormVisible2 = false">取消</el-button>
      <el-button type="primary" @click="confirmTask">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "SubTaskDialog",
  props: ["dialogFormVisible2", "subTask"],
  data() {
    return {
      dialogFormVisible: false,
      focusOnMatters: "",
      processRecord: "",
      beginTime: new Date(),
      endTime: new Date(),
    };
  },
  mounted() {
    console.log(this.$props);
  },
  methods: {
    confirmTask() {
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.focus-on-shot-window {
  .el-row {
    margin-bottom: 10px;
  }
  ::v-deep .el-input__inner,
  .el-input {
    width: 100%;
  }
  ::v-deep .el-dialog {
    width: 70%;
  }
}
</style>