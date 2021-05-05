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
      <el-col :span="1">10</el-col>
      <el-col :span="1">21</el-col>
      <el-col :span="1">22</el-col>
      <el-col :span="1">23</el-col>
    </el-row>
    <div class="mark-time"></div>
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
  </div>
</template>
<script>
export default {
  name: "MainFooter",
};
</script>  
<style lang="scss" scoped>
.mian-footer {
  position: relative;
  text-align: center;
  .mark-time{
    position: absolute;
    z-index: 9;
    height: 36px;
    width: 0;
    border-left: 3px solid red;
    top: 0;
    left: 50%;
  }
  .piece-time {
    height: 18px;
    background-color: #757575;
  }
  .work-time {
    background-color: #C0C0C0;
  }
}
.tewnty-four-hour {
  .el-col:nth-child(odd) {
    height: 18px;
    line-height: 18px;
    background-color: #C0C0C0;
  }
  .el-col:nth-child(even) {
    height: 18px;
    line-height: 18px;
    background-color: #fff;
  }
}
</style>