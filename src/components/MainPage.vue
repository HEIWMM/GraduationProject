<template>
  <el-container>
    <el-header>
      <el-input
        v-model="focusItem"
        placeholder="请输入需要开始的任务"
        clearable
        class="taskInput"
      ></el-input>
      <el-select v-model="typeValue" placeholder="全部" class="taskType">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input-number
        v-model="timeCount"
        @change="handleChange"
        :min="0"
        :max="50"
        label="描述文字"
      ></el-input-number>
      <el-button
        type="primary"
        @click="
          () => {
            startTask('reverse');
          }
        "
        >{{ statusStr }}</el-button
      >
      <el-button
        type="primary"
        @click="
          () => {
            startTask('positive');
          }
        "
        :disabled="status !== 0"
        >正向计时</el-button
      >
    </el-header>
    <el-main>
      <MainContent />
    </el-main>
    <el-footer height="36px">
      <MainFooter />
    </el-footer>
    <el-dialog
      title="专注时间记录"
      :visible.sync="dialogFormVisible"
      class="focus-on-shot-window"
    >
      <el-row type="flex" align="middle">
        <el-col :span="3">开始时间</el-col>
        <el-col :span="9" :offset="1">
          <el-date-picker
            v-model="pickBeginTime"
            type="datetime"
            placeholder="选择日期时间"
            :disabled="status !== 0"
          >
          </el-date-picker
        ></el-col>
        <el-col :span="6" :offset="1" v-show="true && status === 1">
          <el-button type="primary" @click="handOnFive">多坚持5分钟</el-button>
        </el-col>
        <el-col :span="3" :offset="1">{{ statusStr }}</el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="5">专注事项</el-col>
        <el-col :span="18" :offset="1">
          <el-input v-model="focusItem" placeholder="请输入专注事项"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <!-- contentValue -->
        <el-col :span="24">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="contentValue"
            resize="none"
          >
          </el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmTask">{{ btnStr }}</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import moment from "moment";
import axios from 'axios'

import MainContent from "./MainContent";
import MainFooter from "./MainFooter";
var timer1, timer2, timer3;
export default {
  name: "MainPage",
  components: {
    MainContent,
    MainFooter,
  },
  mounted() {
    console.log("testValue", this.$store.state.tasks[0].importantDegree);
  },
  data() {
    return {
      status: 0, // 0-->未开始专注,1-->开始专注,2-->开始休息,3-->任务结束
      statusStr: "开始任务",
      btnStr: "确认",
      isFocus: false,
      focusItem: "",
      contentValue: "",
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
      typeValue: "",
      timeCount: 10,
      dialogFormVisible: false,
      pickBeginTime: moment(),
      taskType: "reverse",
      endTime: "",
      processTime: "",
    };
  },
  methods: {
    addSubTask() {
      this.endTime = moment();
      this.processTime = this.endTime.diff(this.pickBeginTime, "seconds");
      let subTask = {
        date: this.pickBeginTime.format("YYYY-M-D"),
        beginTime: this.pickBeginTime.format("HH:mm:ss"),
        endTime: this.endTime.format("HH:mm:ss"),
        minuteCount: this.endTime.diff(this.pickBeginTime, "minutes"),
        focusOnMatters: this.focusItem,
        processRecord: this.contentValue,
      };
      this.$store.commit("addSubTask", subTask);
    },
    changeStatus() {
      let str = "开始任务";
      let str2 = "确认";
      if (this.status !== 2) {
        this.status++;
      } else {
        this.status = 0;
      }
      switch (this.status) {
        case 0:
          str = "开始任务";
          str2 = "确认";
          break;
        case 1:
          str = "专注中";
          str2 = "停止";
          break;
        case 2:
          str = "休息中";
          str2 = "停止";
          break;
      }
      this.statusStr = str;
      this.btnStr = str2;
    },
    handleChange(value) {
      this.timeCount = value;
      console.log(value);
    },
    startTask(type) {
      this.dialogFormVisible = true;
      if (this.status === 0) {
        this.pickBeginTime = moment();
        console.log(type);
        this.taskType = type;
        console.log(this.taskType === "reverse");
      }
    },
    doTask() {
      if (this.taskType === "positive") {
        console.log("当前状态", this.status);
        console.log("正向计时");
        if (this.status === 1) {
          let endTime = moment();
          let processTime = endTime.diff(this.pickBeginTime, "seconds");
          timer3 = setTimeout(() => {
            console.log("开始正向计时的休息时间");
            this.$nextTick(() => {
              this.addSubTask();
              console.log("正向任务结束--经历的时间：", this.processTime);
              this.changeStatus();
            });
          }, (processTime / 5) * 1000); //休息时间
        }
        if (this.status === 2) {
          clearTimeout(timer3);
          this.addSubTask();
          console.log("正向任务结束--经历的时间：", this.processTime);
        }
        return;
      }
      if (this.taskType === "reverse") {
        console.log("当前状态", this.status);
        if (this.status === 0) {
          console.log("创建反向记时器");
          timer1 = setTimeout(() => {
            this.$nextTick(() => {
              this.changeStatus();
              timer2 = setTimeout(() => {
                this.$nextTick(() => {
                  console.log("反向任务结束--经历的时间：", this.processTime);
                  this.addSubTask();
                  this.changeStatus();
                });
              }, (this.timeCount / 5) * 60 * 1000); // 休息时间
            });
          }, this.timeCount * 60 * 1000); // 专注时间
        } else {
          //console.log(timer1, timer2);
          if (this.status === 1) {
            let endTime = moment();
            let processTime = endTime.diff(this.pickBeginTime, "seconds");
            timer3 = setTimeout(() => {
              console.log("开始反向计时的休息时间");
              this.$nextTick(() => {
                this.addSubTask();
                console.log("反向任务结束--经历的时间：", this.processTime);
                this.changeStatus();
              });
            }, (processTime / 5) * 1000); //休息时间
          }
          if (this.status === 2) {
            clearTimeout(timer3);
            this.addSubTask();
            console.log("反向任务结束--经历的时间：", this.processTime);
          }
          clearTimeout(timer1);
          clearTimeout(timer2);
        }
      }
    },
    confirmTask() {
      console.log("反向");
      this.dialogFormVisible = false;
      this.doTask(); // 开始专注任务
      this.changeStatus(); // 改变状态
    },
    handOnFive() {
      console.log('handon')
      axios.get('/api/mon').then(res=>{console.log(res)})
    }
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
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
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}
.el-footer {
  background-color: #b3c0d1;
  height: 36px;
}
.el-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .taskInput {
    // margin-right: 5px;
    width: 35%;
  }
  .taskType {
    width: 15%;
    // margin-right: 5px;
  }
}
.el-input-number {
  width: 15%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: calc(100% - 96px) !important;
  .main-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
