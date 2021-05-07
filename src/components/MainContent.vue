<template>
  <div class="main-content">
    <div class="table1">
      <el-table :data="taskData" stripe style="width: 100%">
        <el-table-column prop="taskName" label="任务"> </el-table-column>
        <el-table-column prop="importantDegree" label="重要度">
        </el-table-column>
        <el-table-column prop="emergencyDegree" label="紧急度/倒计时">
        </el-table-column>
        <el-table-column prop="taskStatus" label="状态"></el-table-column>
      </el-table>
    </div>

    <el-row type="flex" align="middle" justify="space-between">
      <el-col :span="12">
        <span>今日专注0次，0分钟，完成0个任务</span>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="dialogFormVisible = true"
          >加入一个任务</el-button
        >
      </el-col>
      <el-col :span="6">
        <el-button type="primary">显示归档任务</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start" class="table2">
      <el-col :span="15" style="display: flex">
        <el-table
          @row-dblclick="openSubtaskDetail"
          :data="subTaskData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="beginTime" label="开始时间"> </el-table-column>
          <el-table-column prop="endTime" label="结束时间"> </el-table-column>
          <el-table-column prop="minuteCount" label="分钟数"></el-table-column>
          <el-table-column
            prop="focusOnMatters"
            label="专注事项"
          ></el-table-column>
          <el-table-column
            prop="processRecord"
            label="进展记录"
          ></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="clipboardValue"
          resize="none"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-dialog
      title="加入任务"
      :visible.sync="dialogFormVisible"
      class="focus-on-shot-window"
    >
      <el-row>
        <el-col :span="24">
          <el-input v-model="taskName" placeholder="新任务"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="3">任务日志</el-col>
        <el-col :span="5" :offset="3">
          <el-input v-model="taskPeople" placeholder="需求人"></el-input>
        </el-col>
        <el-col :span="5" :offset="2">
          <el-select v-model="importantDegree" placeholder="重要度">
            <el-option
              v-for="item in importantOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="3">
          <el-checkbox v-model="isTop">置顶</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            v-model="logContents"
            resize="none"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="3">
          <span>任务类别：</span>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="taskTypeName"
            filterable
            placeholder="任务类别"
            @blur="selectBlur"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" :offset="1">
          <span>状态：</span>
        </el-col>
        <el-col :span="4">
          <el-select v-model="taskStatus" placeholder="状态" @blur="selectBlur">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" :offset="1">
          <span>紧急度：</span>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="emergencyDegree"
            placeholder="紧急度"
            @blur="selectBlur"
          >
            <el-option
              v-for="item in emergencyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="3">
          <span>计划开始时间：</span>
        </el-col>
        <el-col :span="4">
          <el-date-picker
            v-model="planBegin"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="3" :offset="1">
          <span>计划结束时间：</span>
        </el-col>
        <el-col :span="4">
          <el-date-picker v-model="planEnd" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3" :offset="1">
          <span>当前风险度：</span>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="riskDegree"
            placeholder="风险度"
            @blur="selectBlur"
          >
            <el-option
              v-for="item in riskOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addTask">确定</el-button>
      </div>
    </el-dialog>
    <SubTaskDialog
      :dialogFormVisible2="dialogFormVisible2"
      :subTask="subTask"
    />
  </div>
</template>
<script>
import SubTaskDialog from "./SubTaskDialog";
export default {
  name: "MainContent",
  components: {
    SubTaskDialog,
  },
  data() {
    return {
      typeOptions: [
        {
          value: "学习",
          label: "学习",
        },
        {
          value: "工作",
          label: "工作",
        },
      ],
      statusOptions: [
        { lable: "待处理", value: "待处理" },
        { lable: "已完成", value: "已完成" },
        { lable: "删除", value: "删除" },
      ],
      emergencyOptions: [
        { lable: "时间宽裕", value: "时间宽裕" },
        { lable: "时间足够", value: "时间足够" },
        { lable: "时间有限", value: "时间有限" },
        { lable: "时间紧张", value: "时间紧张" },
        { lable: "马上完成", value: "马上完成" },
      ],
      importantOptions: [
        { lable: "意义很小", value: "意义很小" },
        { lable: "意义较小", value: "意义较小" },
        { lable: "意义一般", value: "意义一般" },
        { lable: "意义重要", value: "意义重要" },
        { lable: "极其重要", value: "极其重要" },
      ],
      riskOptions: [
        { lable: "高风险", value: "高风险" },
        { lable: "中风险", value: "中风险" },
        { lable: "低风险", value: "低风险" },
      ],
      subTask: {
        beginTime: "",
        date: "",
        endTime: "",
        focusOnMatters: "",
        minuteCount: "",
        processRecord: "",
      },
      clipboardValue: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      taskName: "", // 这一下就是表单需要提交的内容
      taskPeople: "",
      isTop: false,
      logContents: "",
      taskTypeName: "",
      importantDegree: "",
      taskStatus: "",
      emergencyDegree: "",
      riskDegree: "",
      planBegin: "",
      planEnd: "",
    };
  },
  computed: {
    subTaskData() {
      console.log("subTasks", this.$store.state.subTasks);
      let taskArray = this.$store.state.subTasks;
      return taskArray.reverse();
    },
    taskData() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    selectBlur(e) {
      if (e.target.value) {
        console.log(e.target.value);
        this.taskType = e.target.value;
      }
    },
    openSubtaskDetail(row, column, e) {
      console.log("双击", row, column, e);
      this.subTask = {
        ...row
      }
      console.log(this.subTask)
    },
    addTask() {
      this.dialogFormVisible = false; // 关闭弹窗
      let task = {
        taskName: this.taskName,
        taskPeople: this.taskPeople,
        isTop: this.isTop,
        logContents: this.logContents,
        taskTypeName: this.taskTypeName,
        importantDegree: this.importantDegree,
        taskStatus: this.taskStatus,
        emergencyDegree: this.emergencyDegree,
        riskDegree: this.riskDegree,
        planBegin: this.planBegin,
        planEnd: this.planEnd,
      };
      this.$store.commit("addTask", task);
      console.log("addTask", task);
    },
  },
};
</script>
<style lang="scss" scoped>
.main-content {
  .table1 {
    height: 50%;
    display: flex;
  }
  .table2 {
    height: 40%;
  }
  .el-row {
    margin-bottom: 5px;
  }
  ::v-deep .el-textarea {
    height: 100%;
  }
  ::v-deep .el-textarea__inner {
    height: 100%;
  }
  ::v-deep .el-dialog {
    margin-top: 10vh !important;
    width: 80%;
  }
  ::v-deep .el-input__inner,
  .el-input {
    width: 100%;
  }
}

.el-table {
  overflow-y: scroll;
  ::v-deep td {
    padding: 3px 0;
  }
}
</style>
