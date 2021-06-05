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
      <el-button v-show="isShowSubTask" @click="delSubtask">删除</el-button>
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmTask">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "SubTaskDialog",
  props: ["subTask", "rowIndex", "isShowSubTask"],
  data() {
    return {
      dialogFormVisible: false,
      // beginTime: "",
      date: "",
      // endTime: "",
      focusOnMatters: "",
      minuteCount: "",
      processRecord: "",
    };
  },
  computed: {
    beginTime(){
      return this.$props.subTask.date+'-'+this.$props.subTask.beginTime
    },
    endTime(){
      return this.$props.subTask.date+'-'+this.$props.subTask.endTime
    }
  },
  mounted() {},
  methods: {
    delSubtask() {
      this.$store
        .dispatch("delDataSys", {
          index: this.$props.rowIndex,
          type: "subtask",
        })
        .then((res) => {
          this.$store.commit("delTask", {
            index: this.$props.rowIndex,
            type: "subtask",
          });
          this.$emit("changeIsShow");
          this.dialogFormVisible = false;
          console.log("删除成功", res);
        });
    },
    confirmTask() {
      this.dialogFormVisible = false;
      this.$store.commit("changeSubTaskVal", {
        index: this.$props.rowIndex,
        keyArr: [
          {
            keyVal: "processRecord",
            Val: this.processRecord,
          },
          {
            keyVal: "focusOnMatters",
            Val: this.focusOnMatters,
          },
        ],
      });
      this.$nextTick(() => {
        this.flag = true;
      });
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