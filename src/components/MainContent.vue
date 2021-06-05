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
        <el-table-column prop="taskName" label="任务">
          <template slot-scope="scope">
            <i
              style="color: #ff0033"
              class="el-icon-star-on"
              v-show="scope.row.isTop"
            ></i>
            {{ scope.row.taskName }}
          </template>
        </el-table-column>
        <el-table-column prop="importantDegree" label="重要度">
        </el-table-column>
        <el-table-column prop="emergencyDegree" label="紧急度/倒计时">
          <template slot-scope="scope">
            {{
              `${scope.row.emergencyDegree}/${dealEmergencyStr(
                scope.row.planEnd
              )}`
            }}
          </template>
        </el-table-column>
        <el-table-column prop="taskStatus" label="状态"></el-table-column>
      </el-table>
    </div>

    <el-row type="flex" align="middle" justify="space-between">
      <el-col :span="8">
        <span>{{
          `今日专注${this.todayMsg.times}次，${this.todayMsg.timeCount}分钟，完成${this.todayMsg.numberOf}个任务`
        }}</span>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="addOneTask">加入一个任务</el-button>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="showStatistical">{{
          tableType === "complet" ? "显示全部任务" : "显示归档任务"
        }}</el-button>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="cancellation">注销</el-button>
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
        <el-col :span="5">
          <el-switch
            v-model="isEditLog"
            active-text="预览"
            inactive-text="编辑"
          >
          </el-switch>
        </el-col>
        <el-col :span="5" :offset="2">
          <el-input v-model="task.taskPeople" placeholder="需求人"></el-input>
        </el-col>
        <el-col :span="5" :offset="1">
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
        <el-col :span="3" :offset="1">
          <el-checkbox v-model="task.isTop">置顶</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!-- <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            v-model="task.logContents"
            resize="none"
          >
          </el-input> -->
          <mavon-editor
            :defaultOpen="isEditLog ? 'preview' : 'edit'"
            v-model="task.logContents"
            :toolbarsFlag="false"
          />
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
              :disabled="item.disabled"
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
    <SubTaskDialog
      @changeIsShow="changeIsShow"
      :subTask="subTask"
      :rowIndex="rowIndex"
      :isShowSubTask="isShowSubTask"
    />
  </div>
</template>
<script>
import SubTaskDialog from "./SubTaskDialog";
import { getItem, clearAllItem } from "../utils/storageTools";
import moment from "moment";
import _ from "lodash";
export default {
  name: "MainContent",
  props: ["typeValue"],
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
        { lable: "删除", value: "删除", disabled: true },
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
      isShowSubTask: false,
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
      rowId: "", // 主任务的表格行数
      isShowTask: false,
      isEditLog: false,
      todayMsg: {
        times: 0,
        timeCount: 0,
        numberOf: 0,
      },
      tableType: "all",
    };
  },
  computed: {
    subTaskData() {
      let arr = _.cloneDeep(this.$store.state.subTasks);
      return arr.reverse();
    },
    taskData: {
      // 写的太复杂了不太好
      get() {
        function sortByTop(arr) {
          let objArr = [];
          arr.map((item) => {
            if (item.isTop === true) {
              objArr.unshift(item);
            } else {
              objArr.push(item);
            }
          });
          return objArr;
        }
        if (this.tableType === "complet") {
          if (this.$props.typeValue === "学习") {
            let arr = this.$store.state.tasks.filter((item) => {
              return (
                item.taskStatus === "已完成" && item.taskTypeName === "学习"
              );
            });
            return sortByTop(arr);
          } else if (this.$props.typeValue === "工作") {
            let arr = this.$store.state.tasks.filter((item) => {
              return (
                item.taskStatus === "已完成" && item.taskTypeName === "工作"
              );
            });
            return sortByTop(arr);
          } else {
            let arr = this.$store.state.tasks.filter((item) => {
              return item.taskStatus === "已完成";
            });
            return sortByTop(arr);
          }
        } else {
          if (this.$props.typeValue === "学习") {
            let arr = this.$store.state.tasks.filter((item) => {
              return item.taskTypeName === "学习";
            });
            return sortByTop(arr);
          } else if (this.$props.typeValue === "工作") {
            let arr = this.$store.state.tasks.filter((item) => {
              return item.taskTypeName === "工作";
            });
            return sortByTop(arr);
          } else {
            return sortByTop(this.$store.state.tasks);
          }
        }
      },
    },
  },
  watch: {
    dialogFormVisible(newVal) {
      if (newVal === false) {
        this.isShowTask === false;
        this.statusOptions[2].disabled = true;
      }
    },
    subTaskData(newVal) {
      console.log("deng", newVal);
      this.todayMsg.times = 0;
      this.todayMsg.timeCount = 0;
      this.todayMsg.numberOf = 0;
      newVal.map((item) => {
        if (item.date === moment().format("yyyy-M-D")) {
          this.todayMsg.times += 1;
          this.todayMsg.timeCount += item.minuteCount;
          this.todayMsg.numberOf += 1;
        }
      });
    },
  },
  methods: {
    dealEmergencyStr(date) {
      let now = moment();
      return moment(date).diff(now, "days");
    },
    cancellation() {
      clearAllItem();
      this.$router.replace("/login");
    },
    showStatistical() {
      this.tableType = this.tableType === "complet" ? "all" : "complet";
    },
    changeIsShow() {
      this.isShowSubTask = false;
    },
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
      this.isShowSubTask = true;
    },
    openTaskDetail(row) {
      this.dialogFormVisible = true; // 打开弹窗
      this.rowId = row._id;
      console.log("双击", row);
      let task = this.$store.state.tasks.filter((item) => {
        return item._id === this.rowId;
      });

      for (let key in task[0]) {
        this.task[key] = task[0][key];
      }
      this.statusOptions[2].disabled = false;
      this.isShowTask = true;
    },
    setRowIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    addTask() {
      if (this.task.taskStatus === "删除") {
        this.$store
          .dispatch("delDataSys", {
            id: this.rowId,
            type: "task",
          })
          .then((res) => {
            this.$store.commit("delTask", {
              id: this.rowId,
              type: "task",
            });
            console.log("删除成功", res);
          });
        this.dialogFormVisible = false;
        return;
      }
      if(moment(this.task.planBegin).isAfter(this.task.planEnd)){
         this.$message.error('日期有误,结束日期小于开始日期');
         return
      }
      if (this.isShowTask === true) {
        console.log(this.task);
        this.$store.commit("changeTaskVal", {
          id: this.rowId,
          task: this.task,
        });
        this.dialogFormVisible = false;
        return;
      }
      this.dialogFormVisible = false; // 关闭弹窗
      let task = {
        ...this.task,
      };
      task.logContents.replace("\n", "\\n");
      console.log("日志内容", "oooo\\npoo");
      console.log("addTask", task);
      this.$store.dispatch("addTaskSys", task).then(() => {
        this.$store
          .dispatch("getDataSys", {
            name: getItem("name"),
          })
          .then((res) => {
            console.log("添加后刷新返回的数据", res);
          });
      });
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
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: 0 12px 5px -10px rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1);
  ::v-deep td {
    padding: 3px 0;
  }
  ::v-deep .el-table__body tr:hover > td {
    color: #fff;
    background-color: #4b6cb1 !important;
  }
}
.el-table::-webkit-scrollbar-track-piece {
  //滚动条凹槽的颜色，还可以设置边框属性
  background-color: #f1f1f1;
}
.el-table::-webkit-scrollbar {
  //滚动条的宽度
  width: 7px;
  height: 10px;
}
.el-table::-webkit-scrollbar-thumb {
  //滚动条的设置
  background-color: #c1c1c1;
  background-clip: padding-box;
  min-height: 28px;
  border-radius: 8px;
}
.el-table::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
</style>
