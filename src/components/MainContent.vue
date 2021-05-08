<template>
  <div class="main-content">
    <div class="table1">
      <el-table
        :row-class-name="setRowIndex"
        @row-dblclick="openTaskDetail"
        :data="taskData"
        stripe
        style="width: 100%"
      >
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
        <el-button type="primary" @click="addOneTask">加入一个任务</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary">显示归档任务</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start" class="table2">
      <el-col :span="15" style="display: flex">
        <el-table
          :row-class-name="setRowIndex"
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
          <el-input v-model="task.taskName" placeholder="新任务"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="3">任务日志</el-col>
        <el-col :span="5" :offset="3">
          <el-input v-model="task.taskPeople" placeholder="需求人"></el-input>
        </el-col>
        <el-col :span="5" :offset="2">
          <el-select v-model="task.importantDegree" placeholder="重要度">
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
          <el-checkbox v-model="task.isTop">置顶</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            v-model="task.logContents"
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
            v-model="task.taskTypeName"
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
          <el-select
            v-model="task.taskStatus"
            placeholder="状态"
            @blur="selectBlur"
          >
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
            v-model="task.emergencyDegree"
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
            v-model="task.planBegin"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="3" :offset="1">
          <span>计划结束时间：</span>
        </el-col>
        <el-col :span="4">
          <el-date-picker
            v-model="task.planEnd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="3" :offset="1">
          <span>当前风险度：</span>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="task.riskDegree"
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
    <SubTaskDialog :subTask="subTask" :rowIndex="rowIndex" />
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
      task: {
        taskName: "", // 这里以下就是表单需要提交的内容
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
      },
      rowIndex: 0,
      rowIndex2: 0, // 主任务的表格行数
      isShowTask: false,
    };
  },
  computed: {
    subTaskData() {
      return this.$store.state.subTasks;
    },
    taskData: {
      get() {
        return this.$store.state.tasks;
      },
    },
  },
  watch: {
    dialogFormVisible(newVal) {
      if (newVal === false) {
        this.isShowTask === false;
      }
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
      this.rowIndex = row.index; // 获取行数
      this.subTask = {
        ...row,
      };
      console.log(this.dialogFormVisible2, this.subTask);
      this.$children[4].dialogFormVisible = true; // 直接修改子组件的值，来控制是否显示子组件弹窗
      this.$children[4].focusOnMatters = row.focusOnMatters;
      this.$children[4].processRecord = row.processRecord;
    },
    openTaskDetail(row) {
      this.dialogFormVisible = true; // 打开弹窗
      this.rowIndex2 = row.index;
      let task = {
        ...this.$store.state.tasks[row.index],
      };
      for (let key in task) {
        this.task[key] = task[key];
      }
      this.isShowTask = true;
    },
    setRowIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    addTask() {
      if (this.isShowTask === true) {
        console.log(this.task);
        this.$store.commit("changeTaskVal", {
          index: this.rowIndex2,
          task: this.task,
        });
        this.dialogFormVisible = false;
        return;
      }
      this.dialogFormVisible = false; // 关闭弹窗
      let task = {
        ...this.task,
      };
      this.$store.commit("addTask", task);
      console.log("addTask", task);
      this.resetContent(task);
    },
    addOneTask() {
      this.resetContent(this.task);
      this.dialogFormVisible = true;
    },
    resetContent(task) {
      for (let key in task) {
        if (typeof task[key] === "string" || typeof task[key] === "object") {
          this.task[key] = "";
        } else if (typeof task[key] === "number") {
          this.task[key] = 0;
        }
      }
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
