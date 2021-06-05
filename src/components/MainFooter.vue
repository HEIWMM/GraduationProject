<template>
  <div class="mian-footer">
    <el-row class="tewnty-four-hour">
      <el-col :span="1">0</el-col>
      <el-col :span="1">1</el-col>
      <el-col :span="1">2</el-col>
      <el-col :span="1">3</el-col>
      <el-col :span="1">4</el-col>
      <el-col :span="1">5</el-col>
      <el-col :span="1">6</el-col>
      <el-col :span="1">7</el-col>
      <el-col :span="1">8</el-col>
      <el-col :span="1">9</el-col>
      <el-col :span="1">10</el-col>
      <el-col :span="1">11</el-col>
      <el-col :span="1">12</el-col>
      <el-col :span="1">13</el-col>
      <el-col :span="1">14</el-col>
      <el-col :span="1">15</el-col>
      <el-col :span="1">16</el-col>
      <el-col :span="1">17</el-col>
      <el-col :span="1">18</el-col>
      <el-col :span="1">19</el-col>
      <el-col :span="1">20</el-col>
      <el-col :span="1">21</el-col>
      <el-col :span="1">22</el-col>
      <el-col :span="1">23</el-col>
    </el-row>
    <div class="mark-time" ref="markTime"></div>
    <el-row>
      <el-col :span="8">
        <div class="piece-time"></div>
      </el-col>
      <el-col :span="11">
        <div class="piece-time work-time"></div>
      </el-col>
      <el-col :span="5">
        <div class="piece-time"></div>
      </el-col>
    </el-row>
    <div
      v-for="item in subTasks"
      v-show="item.beginTime !== ''"
      :key="item.beginTime"
      :style="{
        position: 'absolute',
        zIndex: 9,
        height: '18px',
        width: getTaskBlockStyle(
          item.date,
          item.beginTime,
          item.endTime,
          'width'
        ),
        backgroundColor: '#FF0033',
        top: '18px',
        left: getTaskBlockStyle(
          item.date,
          item.beginTime,
          item.endTime,
          'left'
        ),
      }"
    ></div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "MainFooter",
  data() {
    return {
      timer: null,
    };
  },
  mounted() {
    this.getMarkTime();
    this.timer = setInterval(() => {
      this.getMarkTime();
    }, 10000);
  },
  computed: {
    subTasks() {
      return this.$store.state.subTasks.filter(item=>{
        return item.date === moment().format('YYYY-M-D')
      });
    },
  },
  methods: {
    getMarkTime() {
      let { hours, minutes } = moment().toObject();
      let val = parseInt(((hours * 60 + minutes) / (24 * 60)) * 100);
      //console.log("偏移值", { val, hours, minutes });
      this.$refs.markTime.style.left = val + "%";
    },
    getTimeWidth(date, time) {
      console.log("time", time);
      console.log("moment", moment("2021-5-13-20:56:09").toObject());
      let { hours, minutes } = moment(date + "-" + time).toObject();
      let val = parseInt(((hours * 60 + minutes) / (24 * 60)) * 100);
      return val;
    },
    getTaskBlockStyle(date, start, end, style) {
      console.log({ start, end });
      let left = start === "" ? 0 : this.getTimeWidth(date, start);
      let width = end === "" ? 0 : this.getTimeWidth(date, end) - left;
      console.log({ width, left });
      console.log('终点', this.getTimeWidth(date, end))
      if (style === "left") {
        return left + "%";
      } else if (style === "width") {
        return width + "%";
      }
    },
  },
  destroyed() {
    clearTimeout(this.timer);
  },
};
</script>  
<style lang="scss" scoped>
.mian-footer {
  position: relative;
  text-align: center;
  .mark-time {
    position: absolute;
    z-index: 9;
    height: 36px;
    width: 0;
    border-left: 3px solid #FF0033;
    top: 0;
    left: 50%;
  }
  .piece-time {
    height: 18px;
    background-color: #757575;
  }
  .work-time {
    background-color: #c0c0c0;
  }
}
.tewnty-four-hour {
  .el-col:nth-child(odd) {
    height: 18px;
    line-height: 18px;
    background-color: #c0c0c0;
  }
  .el-col:nth-child(even) {
    height: 18px;
    line-height: 18px;
    background-color: #fff;
  }
}
</style>