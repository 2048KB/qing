<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div> -->
    <!-- <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <p >您好，{{ username }}</p>
    <p>所属角色：{{ role }}</p>
    <p>上次登录时间：{{ lastLogin }}</p>
    <p>上次登录IP：{{ lastIP }}</p>


    <el-row>
      <el-col :span="15">
        <div class="grid-content bg-purple">

          <el-card class="box-card detail-card detail-card--user">
            <div slot="header" class="clearfix">
              <span>职业信息</span>
              <el-button style="float: right; padding: 3px 0" type="text">
                <div class="icon"></div>
              </el-button>
            </div>

            <div class="detail-card--body detail-card__body--user">
              <el-row>
                <el-col :span="6">
                  <div class="th">
                    <div class="img"><img src="../../assets/images/qq-18.png" alt=""></div>
                    <el-button type="primary">更换头像</el-button>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="meta">
                    <p>张美荣</p>
                    <p>ID:888888</p>
                    <p>2018-08-23</p>
                    <p>L新疆维吾尔族自治区塔克拉玛干市克拉亲镇回龙观小区3单元12楼1221室 sse nobis nemo natus deleniti nam quibusdam reprehenderit, quaerat vero eos harum ipsum nihil impedit, delectus, magni debitis odio officia velit voluptas?</p>
                    <div>
                      <el-button type="success" plain>15012345678</el-button>
                      <el-button type="success" plain>北京朝阳门分店</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card detail-card detail-card--zhxx">
            <div slot="header" class="clearfix">
              <span>账户信息</span>
            </div>

            <div class="detail-card__body">
              <!-- row1 -->
              <div class="clearfix row row1">
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">4300.33</div>
                    <div class="title">总资产</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">4300.33</div>
                    <div class="title">账户余额</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">4300.33</div>
                    <div class="title">冻结金额</div>
                  </el-col>
                </div>
              </div>
              <hr class="style-one">
              <!-- row2 -->
              <div class="clearfix row row2">
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">4300.33</div>
                    <div class="title">总资产</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">4300.33</div>
                    <div class="title">总资产</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">4300.33</div>
                    <div class="title">总资产</div>
                  </el-col>
                </div>
              </div>
            </div>

          </el-card>

          <el-card class="box-card detail-card detail-card--yqxx">
            <div slot="header" class="clearfix">
              <span>邀请信息</span>
            </div>

            <div class="detail-card__body">
              <div class="clearfix row">
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">430</div>
                    <div class="title">累计邀请会员</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">43.33</div>
                    <div class="title">本月邀请会员</div>
                  </el-col>
                </div>
                <div class="item">
                  <el-col :span="8">
                    <div class="sum">33</div>
                    <div class="title">本月邀请顾客</div>
                  </el-col>
                </div>
              </div>
            </div>
          </el-card>

          <el-card class="box-card detail-card detail-card--yj">
            <div slot="header" class="clearfix">
              <span>当月佣金明细</span>
            </div>

            <div class="detail-card__body detail-card__body--yj">
              <el-table :data="tableData3" stripe style="width: 100%">
                <el-table-column prop="date" width="160" label="日期"></el-table-column>
                <el-table-column prop="name" width="100" label="邀请人姓名"></el-table-column>
                <el-table-column prop="yqphone" width="120" label="邀请人手机号"> </el-table-column>
                <el-table-column prop="yqname" width="120" label="邀请会员昵称"> </el-table-column>
                <el-table-column prop="vipphone" width="120" label="邀请会员手机号"> </el-table-column>
                <el-table-column prop="cashtype" width="100" label="佣金类别"> </el-table-column>
                <el-table-column prop="cashsum" width="120" label="奖励金额（元）"> </el-table-column>
              </el-table>

              <div class="block pagination">
                <el-pagination
                  layout="prev, pager, next"
                  :total="1000">
                </el-pagination>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card detail-card detail-card--userinfo">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
              <el-button style="float: right; padding: 3px 0" type="text">
                <div class="icon"></div>
              </el-button>
            </div>
            <div class="detail-card__body detail-card__body--userinfo">
              <p><i class="qq qq-23"></i>18363575265</p>
              <p><i class="qq qq-24"></i>1994-06-01</p>
              <p><i class="qq qq-25"></i>新疆维吾尔族自治区塔克拉玛干市克拉亲镇回龙观小区3单元12楼1221室</p>
              <p><i class="qq qq-26"></i>123456789@qq.com</p>
              <p><i class="qq qq-27"></i>123456789</p>
              <p><i class="qq qq-28"></i>370304198012014716</p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  data() {
    return {
      username: 'admin',
      role: '123',
      lastLogin: '2018-04-11 15:50:00',
      lastIP: '119.163.107.106',
      tableData3: [{
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'
      }, {
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'      },
        {
          date: '2018-05-30 10:00:00',
          name: '王小虎',
          yqphone: '18676545234',
          yqname: '贵州茅台',
          vipphone: '12876534567',
          cashtype: '一级奖',
          cashsum: '660.32'
      }, {
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'
      }, {
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'
      }, {
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'
      }, {
        date: '2018-05-30 10:00:00',
        name: '王小虎',
        yqphone: '18676545234',
        yqname: '贵州茅台',
        vipphone: '12876534567',
        cashtype: '一级奖',
        cashsum: '660.32'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    console.log(this.$API)

    this.$API.addstore({
      data: {
        admin: 1,
        pwd: 2
      }
    }).then((res) => {
      console.log('====== API RESPONSE ======')
      console.log(res)
      console.log('====== END API RESPONSE ======')
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.grid-content {
  padding: 10px;
}

.detail-card {
  margin-bottom: 30px;
}

.el-card__header {
  background: red !important;
}
</style>
