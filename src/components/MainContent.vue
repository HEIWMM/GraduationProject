<template>
  <div class="main-content">
    <div class="table1">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="task" label="任务"> </el-table-column>
        <el-table-column prop="ImportantDegree" label="重要度">
        </el-table-column>
        <el-table-column prop="EmergencyDegree" label="紧急度/倒计时">
        </el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
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
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="task" label="日期"> </el-table-column>
          <el-table-column prop="ImportantDegree" label="开始时间">
          </el-table-column>
          <el-table-column prop="EmergencyDegree" label="结束时间">
          </el-table-column>
          <el-table-column prop="status" label="分钟数"></el-table-column>
          <el-table-column prop="status" label="专注事项"></el-table-column>
          <el-table-column prop="status" label="进展记录"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="textarea"
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
          <el-select v-model="importantValue" placeholder="重要度">
            <el-option
              v-for="item in options"
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
            v-model="taskType"
            filterable
            placeholder="任务类别"
            @blur="selectBlur"
          >
            <el-option
              v-for="item in options"
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
          <el-select v-model="taskType" placeholder="状态" @blur="selectBlur">
            <el-option
              v-for="item in options"
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
          <el-select v-model="taskType" placeholder="紧急度" @blur="selectBlur">
            <el-option
              v-for="item in options"
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
          <el-date-picker v-model="value1" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3" :offset="1">
          <span>计划结束时间：</span>
        </el-col>
        <el-col :span="4">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3" :offset="1">
          <span>当前风险度：</span>
        </el-col>
        <el-col :span="4">
          <el-select v-model="taskType" placeholder="风险度" @blur="selectBlur">
            <el-option
              v-for="item in options"
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
        <el-button type="primary" @click="dialogFormVisible = false"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MainContent",
  data() {
    return {
      tableData: [
        {
          task: "任务1",
          ImportantDegree: "10",
          EmergencyDegree: "10",
          status: "待处理",
        },
        {
          task: "任务2",
          ImportantDegree: "8",
          EmergencyDegree: "8",
          status: "已完成",
        },
        {
          task: "任务1",
          ImportantDegree: "10",
          EmergencyDegree: "10",
          status: "待处理",
        },
        {
          task: "任务2",
          ImportantDegree: "8",
          EmergencyDegree: "8",
          status: "已完成",
        },
        {
          task: "任务1",
          ImportantDegree: "10",
          EmergencyDegree: "10",
          status: "待处理",
        },
        {
          task: "任务2",
          ImportantDegree: "8",
          EmergencyDegree: "8",
          status: "已完成",
        },
        {
          task: "任务1",
          ImportantDegree: "10",
          EmergencyDegree: "10",
          status: "待处理",
        },
      ],
      textarea: "",
      dialogFormVisible: false,
      taskName: "",
      taskPeople: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      isTop: false,
      logContents: "",
      taskType: "",
      importantValue: "",
    };
  },
  methods: {
    selectBlur(e) {
      if (e.target.value) {
        console.log(e.target.value);
        this.taskType = e.target.value;
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
    margin-top: 10vh!important;
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
