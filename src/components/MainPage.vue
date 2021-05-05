<template>
  <el-container>
    <el-header>
      <el-input
        v-model="input"
        placeholder="请输入需要开始的任务"
        clearable
        class="taskInput"
      ></el-input>
      <el-select v-model="value" placeholder="请选择" class="taskType">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input-number
        v-model="num"
        @change="handleChange"
        :min="1"
        :max="10"
        label="描述文字"
      ></el-input-number>
      <el-button type="primary" @click="dialogFormVisible = true"
        >开始任务</el-button
      >
      <el-button type="primary">正向计时</el-button>
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
            v-model="value3"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          >
          </el-date-picker
        ></el-col>
        <el-col :span="6" :offset="1">
          <el-button type="primary">多坚持5分钟</el-button>
        </el-col>
        <el-col :span="3" :offset="1">专注中</el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="5">专注事项</el-col>
        <el-col :span="18" :offset="1">
          <el-input v-model="input2" placeholder="请输入专注事项"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea"
            resize="none"
          >
          </el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import MainContent from "./MainContent";
import MainFooter from "./MainFooter";
export default {
  name: "MainPage",
  components: {
    MainContent,
    MainFooter,
  },
  mounted(){
    
  },
  data() {
    return {
      input: "",
      input2: "",
      textarea: "",
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
      value: "",
      num: 1,
      dialogFormVisible: false,
      value3: "",
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
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
