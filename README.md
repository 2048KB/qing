## Node 版本升级到8+ （直接升级到最新版本就好）
## 使用 vueAdmin-template 的构建流程，不使用 VUEX，不使用它的MOCK，不使用它的AJAX，自己封装了AJAX

```
# Clone project
git clone https://github.com/2048KB/qing.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# 启用本地mock
npm run mock

# build for production and view the bundle analyzer report
npm run build --report
```

## 新增页面编辑 router/index.js，指向对应的 `src/views/**.vue` 文件


## 接口请求（默认为 POST）可以通过传参数形式改为 GET，请求的封装在 utils/http.js(使用jquery ajax)
```js
  // API 请求
  // 1. 在src/api/api.js 里创建一条记录
  // 2. data 下创建一个对应的 JSON 数据 (src/api/index.js 会处理映射关系)
  // 3. 任何 VUE 实例/组件 能直接访问到所有的 API

  // 例如：（看 views/dashboard/index.vue）
    created() {
      this.$API.getUser({
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
```

## 开启本地 mock 需要新开一个窗口 `npm run mock`

```js
员工管理
客户管理
提现管理
订单管理
平台概况
佣金管理
运营设置
后台日志管理
组织架构管理
系统管理
```

-----------------------------------------------------------系统管理  管理员模块---------------------------------------------------
//管理员列表
{"msg":"查询成功","code":1,"data":{"conditions":null,"currPage":1,"page":[{"id":2,"lastLoginIp":"","lastLoginTime":null,"lockStatus":0,"mobile":"15738773742","name":"ztl","realityName":"张桃丽","remark":"","rightIds":[],"roleId":1,"roleName":"超级","roleType":""},{"id":1,"lastLoginIp":"","lastLoginTime":null,"lockStatus":0,"mobile":"13911764496","name":"admin","realityName":"admin","remark":"","rightIds":[],"roleId":1,"roleName":"超级","roleType":""}],"pageSize":5,"totalCount":2,"totalPageCount":1}}

//管理员增加或者更新的回显信息
{"msg":"查询成功","code":1,"data":{"listRole":[{"roleId":1,"name":"超级"},{"roleId":2,"name":"顾问"},{"roleId":3,"name":"美容师"},{"roleId":6,"name":"店长"},{"roleId":7,"name":"店长2"}],"roleId":1,"supervisor":{"createrId":0,"id":1,"isPasswordLocked":false,"lastLoginIp":"0:0:0:0:0:0:0:1","lastLoginTime":"2018-07-02 20:31:45","lockStatus":0,"loginCount":2362,"mobile":"13911764496","name":"admin","password":"ef3c274ebbb48e1b7fd5f5f81fcdf0fd","passwordContinueFails":0,"passwordLockedTime":"2018-07-06 11:38:43","realityName":"admin","remark":"","time":"2016-05-21 09:53:43"}}}

//系统日志列表
{"msg":"查询成功","code":1,"data":{"conditions":null,"currPage":1,"page":[{"id":9,"ip":"0:0:0:0:0:0:0:1","mobile":"15738773742","name":"ztl","realityName":"张桃丽","remark":"编辑管理员","time":"2018-07-06 15:35:33"}],"pageSize":5,"totalCount":1,"totalPageCount":1}}

//添加管理员
{"msg":"添加管理员信息成功","code":1}

//删除管理员
{"msg":"删除管理员成功","code":1}

//更新管理员
{"msg":"编辑管理员信息成功","code":1}

------------------------------------------------------------系统管理     角色模块---------------------------------------------------
//角色列表
{"msg":"查询成功","code":1,"data":{"conditions":null,"currPage":1,"page":[{"description":"超级管理员","id":1,"name":"超级管理员","number":2,"time":"2018-07-11 19:19:48"},{"description":"顾问","id":2,"name":"顾问","number":0,"time":"2018-07-06 10:24:50"},{"description":"美容师","id":3,"name":"美容师","number":0,"time":"2018-07-06 10:27:28"},{"description":"店长","id":6,"name":"店长","number":0,"time":"2018-07-11 19:23:45"}],"pageSize":5,"totalCount":4,"totalPageCount":1}}

//查询要更新的角色信息
{"msg":"查询成功","code":1,"data":{"description":"超级管理员","id":1,"name":"超级管理员","time":"2018-07-11 19:19:48"}}

//查询所有的权限
{"msg":"查询成功","code":1,"data":{"roleId":1,"rights":[1,2,3],"allRight":[{"顾问列表":[{"description":"查看顾问列表","id":1,"moduleId":1,"name":"查看"},{"description":"查看顾问详情","id":2,"moduleId":1,"name":"查看详情"},{"description":"添加顾问","id":3,"moduleId":1,"name":"添加顾问"},{"description":"编辑个人信息","id":4,"moduleId":1,"name":"编辑个人信息"},{"description":"编辑职业信息","id":5,"moduleId":1,"name":"编辑职业信息"}]},{"美容师列表":[{"description":"查看美容师列表","id":6,"moduleId":2,"name":"查看"},{"description":"查看美容师详情","id":7,"moduleId":2,"name":"查看详情"},{"description":"添加美容师","id":8,"moduleId":2,"name":"添加美容师"},{"description":"编辑个人信息","id":9,"moduleId":2,"name":"编辑个人信息"},{"description":"编辑职业信息","id":10,"moduleId":2,"name":"编辑职业信息"}]},{"注册会员列表":[{"description":"查看注册会员列表","id":11,"moduleId":3,"name":"查看"},{"description":"查看注册会员详情","id":12,"moduleId":3,"name":"查看详情"},{"description":"更改邀请","id":13,"moduleId":3,"name":"更改邀请"}]},{"顾客列表":[{"description":"查看顾客列表","id":14,"moduleId":4,"name":"查看"},{"description":"查看顾客详情","id":15,"moduleId":4,"name":"查看详情"},{"description":"更改邀请","id":16,"moduleId":4,"name":"更改邀请"}]},{"平台状况":[{"description":"查看平台概况","id":17,"moduleId":5,"name":"查看"}]},{"管理费列表":[{"description":"查看管理费列表","id":18,"moduleId":6,"name":"查看"}]},{"奖金表":[{"description":"查看奖金表","id":19,"moduleId":7,"name":"查看"}]},{"订单列表":[{"description":"查看订单列表","id":20,"moduleId":8,"name":"查看"},{"description":"查看订单列表详情","id":21,"moduleId":8,"name":"查看详情"}]},{"提现总表":[{"description":"查看提现总表","id":22,"moduleId":9,"name":"查看"},{"description":"审核提现总表","id":23,"moduleId":9,"name":"审核"}]},{"运营规则设置":[{"description":"查看运营规则","id":24,"moduleId":10,"name":"查看"},{"description":"编辑运营规则","id":25,"moduleId":10,"name":"编辑运营规则"}]},{"分销规则设置":[{"description":"查看分销规则","id":26,"moduleId":11,"name":"查看"},{"description":"编辑分销规则","id":27,"moduleId":11,"name":"编辑分销规则"}]},{"操作日志":[{"description":"查看操作日志","id":28,"moduleId":12,"name":"操作日志"}]},{"组织机构":[{"description":"查看组织机构","id":29,"moduleId":13,"name":"查看"},{"description":"添加大区","id":30,"moduleId":13,"name":"添加大区"},{"description":"添加美容店","id":31,"moduleId":13,"name":"添加美容店"},{"description":"编辑大区","id":32,"moduleId":13,"name":"编辑大区"},{"description":"编辑美容店","id":33,"moduleId":13,"name":"编辑美容店"}]},{"管理员列表":[{"description":"查看管理员列表","id":34,"moduleId":14,"name":"查看"},{"description":"添加管理员","id":35,"moduleId":14,"name":"添加管理员"},{"description":"编辑管理员","id":36,"moduleId":14,"name":"编辑管理员"},{"description":"删除管理员","id":37,"moduleId":14,"name":"删除"}]},{"角色列表":[{"description":"查看角色列表","id":38,"moduleId":15,"name":"查看"},{"description":"添加角色","id":39,"moduleId":15,"name":"添加角色"},{"description":"编辑角色","id":40,"moduleId":15,"name":"编辑角色"},{"description":"权限分配","id":41,"moduleId":15,"name":"权限分配"}]}],"roleName":"超级管理员"}}

//保存角色
{"msg":"保存角色信息成功","code":1}

//更新角色
{"msg":"更新角色信息成功","code":1}

//更新权限
{"msg":"编辑成功","code":1}

------------------------------------------------------------------运营设置------------------------------------------------------------------
//查询运营规则
{"msg":"查询成功","code":1,"data":{"withdrawTime":"7天","serviceAwardFee":"10","awardTime":"12:00:00"}}

//查询分销规则
{"msg":"查询成功","code":1,"data":{"RULE:3:2":"{\"bonus\":700,\"per\":1}","RULE:2:3":"{\"bonus\":2000,\"per\":1}","RULE:1:4":"{\"bonus\":600,\"per\":1}","RULE:3:1":"{\"bonus\":2700,\"per\":1}","RULE:1:3":"{\"bonus\":600,\"per\":1}","RULE:3:4":"{\"bonus\":700,\"per\":1}","RULE:2:5":"[{\"invite_from\":1,\"invite_to\":3,\"from\":1,\"to\":3,\"per\":1,\"bonus\":0},{\"invite_from\":4,\"invite_to\":7,\"from\":4,\"to\":7,\"per\":1,\"bonus\":100},{\"invite_from\":8,\"invite_to\":15,\"from\":8,\"to\":15,\"per\":1,\"bonus\":300},{\"invite_from\":16,\"invite_to\":-1,\"from\":16,\"to\":-1,\"per\":1,\"bonus\":600}]","RULE:1:6":"{\"bonus\":1200,\"per\":2}","RULE:2:4":"{\"bonus\":700,\"per\":1}","RULE:3:6":"{\"bonus\":0,\"per\":2}","RULE:3:5":"[{\"invite_from\":1,\"invite_to\":3,\"from\":1,\"to\":3,\"per\":1,\"bonus\":0},{\"invite_from\":4,\"invite_to\":7,\"from\":4,\"to\":7,\"per\":1,\"bonus\":100},{\"invite_from\":8,\"invite_to\":15,\"from\":8,\"to\":15,\"per\":1,\"bonus\":300},{\"invite_from\":16,\"invite_to\":-1,\"from\":16,\"to\":-1,\"per\":1,\"bonus\":600}]","RULE:2:6":"{\"bonus\":0,\"per\":2}"}}

//更新运营规则
{"msg":"更新成功","code":1}

//更新分销规则
{"msg":"更新成功","code":1}

---------------------------------------------------提现模块--------------------------------------------------------------------------
//查询提现列表
{"msg":"查询成功","code":1,"data":{"conditions":null,"currPage":1,"page":[{"amount":1000,"auditOpinion":"","auditSupervisorId":0,"auditTime":null,"availableBalance":900,"completeInfo":"","completeTime":null,"fee":0,"id":1,"mobile":"15738773742","name":"","nickName":"amber","realityName":"胡一菲","remark":"","serviceOrderNo":"12356498","status":-1,"time":"2018-07-09 20:21:46","type":1,"userId":2}],"pageSize":5,"totalCount":1,"totalPageCount":1}}

//查询提现详情
{"msg":"查询成功","code":1,"data":{"amount":1000,"auditOpinion":"拒绝提现","auditSupervisorId":0,"auditTime":"2018-07-12 18:11:17","availableBalance":900,"completeInfo":"","completeTime":null,"fee":0,"id":1,"mobile":"15738773742","name":"admin","nickName":"amber","realityName":"胡一菲","remark":"提现审核的备注","serviceOrderNo":"12356498","status":-1,"time":"2018-07-09 20:21:46","type":1,"userId":2}}

//提现审核
{"msg":"审核成功","code":1}

----------------------------------------------------------架构管理------------------------------------------------------------------------------------------------------
//查询区域和门店列表
{"msg":"查询成功","code":1,"data":{"怀柔区":[],"河北区":[{"areaId":1,"id":1,"name":"石家庄加盟店","time":"2018-07-06 19:43:09","type":2},{"areaId":1,"id":2,"name":"石家庄直营店","time":"2018-07-12 16:45:00","type":1}],"河南区":[{"areaId":3,"id":3,"name":"郑州加盟店","time":"2018-07-12 17:45:54","type":2},{"areaId":3,"id":4,"name":"周口直营店","time":"2018-07-12 20:04:43","type":1}],"燕京区":[]}}

//添加大区信息
{"msg":"保存大区信息成功","code":1}

//查询要编辑的大区的信息
{"id":1,"name":"河北区","time":"2018-07-06 19:07:30"}

//编辑大区信息
{"msg":"更新大区信息成功","code":1}

//添加门店信息
{"msg":"保存美容店信息成功","code":1}

//查询要更新的门店信息
{"msg":"查询成功","code":1,"data":{"areaId":3,"id":3,"name":"郑州加盟店","time":"2018-07-12 17:45:54","type":2}}

//更新门店信息
json6{"msg":"更新美容店信息成功","code":1}

