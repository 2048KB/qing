<template>
    <div class="organize-page">
      <div class="top-bar">
        <span class="add-member-buttom">
          <el-dropdown class="dropdown-bar" @command="handleCommand">
            <span class="el-dropdown-link">
              添加<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="area">区域</el-dropdown-item>
              <el-dropdown-item command="shop">美容店</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>

      <table-wrapper title="组织架构" :unifyWrapper="false">
        <span slot="right">共{{ shopCount }}个美容店</span>

        <div class="shop-wrapper">
          <div v-for="(item, key) in allShopObj">
            <!-- .replace(/([^\u0000-\u00FF])/g, '') -->
            <!-- editArea(key.split('-')[1], key)" -->
            <!-- <p>{{ key.replace(/\d+$/g, '') }}</p> -->
            <div class="title">
              <el-row>
                <el-col :span="8"><span class="area">{{ key.replace(/\d+$/g, '') }}</span></el-col>
                <el-col :span="8"><span class="count">{{ item.length }} 间美容店</span></el-col>
                <el-col :span="8">
                  <el-button type="primary"
                  @click="editArea(key.match(/\d+$/)[0], key.replace(/\d+$/g, ''))"
                  ><i class="qq qq-44"></i>编辑</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="body" v-for="shop in item">
              <el-row>
                <el-col :span="16">
                  <span class="item"><i class="qq qq-45"></i>
                  {{ shop.name }}</span>
                  <span class="flag flag-zhi" v-show="shop.type == 1">直</span>
                  <span class="flag flag-meng" v-show="shop.type == 2">盟</span>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary"
                    @click="editShop({ id: shop.id, name: shop.name, areaId: shop.areaId, type: shop.type })"
                  ><i class="qq qq-44"></i>编辑</el-button>
                </el-col>
              </el-row>
            </div>

          </div>
        </div>
      </table-wrapper>

      <!-- 编辑大区 -->
      <el-dialog title="编辑大区" :visible.sync="editAreaFormVisible">
        <el-form>
            <el-form-item :label-width="formLabelWidth">
              <span slot="label">大区名字 <span class="require">*</span> </span>
              <el-input v-model="editAreaName" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editAreaFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitEditArea" :loading="btnLoading">{{ commitBtnText }}</el-button>
        </div>
      </el-dialog>

      <!-- 添加大区 -->
      <el-dialog title="添加大区" :visible.sync="addAreaFormVisible" class="addAreaModal">
        <el-form :model="form">
            <el-form-item :label-width="formLabelWidth">
              <span slot="label">大区名字 <span class="require">*</span> </span>
              <el-input v-model="addAreaname" auto-complete="off" placeholder="请输入大区名字"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addAreaFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitAddArea" :loading="btnLoading">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加美容店 -->
      <el-dialog title="添加美容店" :visible.sync="addShopFormVisible">
        <el-form :model="form">
            <el-form-item :label-width="formLabelWidth">
              <span slot="label">美容店名称 <span class="require">*</span> </span>
              <el-input v-model="addShopname" auto-complete="off" placeholder="请输入美容店名字"></el-input>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth">
              <span slot="label">所属大区 <span class="require">*</span> </span>
              <el-select v-model="addShoparea" placeholder="请选择区域" @change="selectedStoreArea">
                <el-option
                  v-for="item in storeAreas"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth">
              <span slot="label">类别 <span class="require">*</span> </span>
              <el-radio-group v-model="addShoptype">
                <el-radio v-model="addShoptype" label="1">直营店</el-radio>
                <el-radio v-model="addShoptype" label="2">加盟店</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addShopFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitAddShop" :loading="btnLoading">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑门店 -->
      <el-dialog title="编辑美容店" :visible.sync="editShopFormVisible">
        <el-form>
            <el-form-item :label-width="formLabelWidth">
              <span slot="label">美容店名称 <span class="require">*</span> </span>
              <el-input v-model="editShopName" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth">
                <span slot="label">类别 <span class="require">*</span> </span>
                <el-radio v-model="editShopType" label="1">直营店</el-radio>
                <el-radio v-model="editShopType" label="2">加盟店</el-radio>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editShopFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitEditStop" :loading="btnLoading">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
  import TableWrapper from '@/components/TableWrapper'

  export default {
    data() {
      return {
        editAreaFormVisible: false,
        addAreaFormVisible: false,
        addShopFormVisible: false,
        editShopFormVisible: false,
        formLabelWidth: '120px',
        form: {
          name: '北极',
          region: 'test'
        },
        allShopObj: {},

        // 编辑大区
        editAreaId: '',
        editAreaName: '',

        // 编辑美容店
        editShopId: '',
        editShopName: '',
        editShopType: '',

        // 添加大区
        addAreaname: '',

        // 添加美容店
        addShoptype: '1',
        addShopname: '',
        addShoparea: '',
        storeAreas: [],
        selectedStoreAreaId: null,

        shopCount: 0,

        btnLoading: false,
        commitBtnText: '确定'
      }
    },

    created() {
      this.fetchListstoreandareas()
    },

    methods: {
      selectedStoreArea(index) {
        this.selectedStoreAreaId = index
      },

      showstoredetail() {
        this.$API.showstoredetail({}).then(res => {
          this.storeAreas = res.data.storeAreas
        })
      },

      fetchListstoreandareas() {
        // 重置shopCount
        this.shopCount = 0

        this.$API.liststoreandareas().then(res => {
          this.allShopObj = res.data

          // 计算门店数量
          for (let key in res.data) {
            this.shopCount += res.data[key].length
          }
        })
      },

      handleCommand(command) {
        if (command === 'area') {
          this.addArea()
        }

        if (command === 'shop') {
          this.addShop()
        }
      },

      commitEditArea() {
        this.setBtnLoading()
        this.$API.editstorearea({
          data: {
            id: this.editAreaId, //  int 整型  大区id
            name: this.editAreaName //  String  字符串 大区名称
          }
        }).then(res => {
          this.$message({
            message: res.msg || '成功',
            type: 'success'
          });
          this.editAreaFormVisible = false

          // 重新调接口拉数据
          this.fetchListstoreandareas()
        }).finally(() => {
          this.resetBtnLoading()
        })
      },

      // 编辑大区
      editArea(areaId, name) {
        this.editAreaId = areaId
        this.editAreaName = name
        this.editAreaFormVisible = true
      },

      commitAddShop() {
        this.setBtnLoading()
        this.$API.addstore({
          data: {
            name: this.addShopname, //  String  字符串 门店名称
            type: this.addShoptype, //  int 整型  门店类型：1直营店，2加盟店
            areaId: this.selectedStoreAreaId //  int 整型  所属区域id
          }
        }).then(res => {
          this.$message({
            message: res.msg || '成功',
            type: 'success'
          })
          this.addShopFormVisible = false

          // 重新调接口拉数据
          this.fetchListstoreandareas()
        }).finally(() => {
          this.resetBtnLoading()
        })
      },

      // 添加美容店
      addShop() {
        this.addShopFormVisible = true
        this.showstoredetail()
      },

      commitEditStop() {
        this.setBtnLoading()
        this.$API.editstore({
          data: {
            id: this.editShopId, //  int 整型  门店id
            name: this.editShopName, //  String  字符串 门店名称
            type: this.editShopType, //  int 整型  门店类型1直营店，2加盟店
            areaId: this.editShopAreaId //  int 整型  所属区域id
          }
        }).then(res => {
          this.$message({
            message: res.msg || '成功',
            type: 'success'
          })
          this.editShopFormVisible = false

          // 重新调接口拉数据
          this.fetchListstoreandareas()
        }).finally(() => {
          this.resetBtnLoading()
        })
      },

      // 编辑美容店
      editShop(obj) {
        this.editShopAreaId = obj.areaId
        this.editShopName = obj.name
        this.editShopId = obj.id
        this.editShopType = obj.type + ''
        this.editShopFormVisible = true
      },

      commitAddArea() {
        this.setBtnLoading()
        this.$API.addstorearea({
          data: {
            name: this.addAreaname
          }
        }).then(res => {
          this.$message({
            message: res.msg || '成功',
            type: 'success'
          })
          this.addAreaFormVisible = false

          // 重新调接口拉数据
          this.fetchListstoreandareas()
        }).finally(() => {
          this.resetBtnLoading()
        })
      },

      // 添加大区
      addArea() {
        this.addAreaFormVisible = true
      },

      updateYYSet() {
        this.dialogFormVisible = true
      },

      setBtnLoading() {
        this.btnLoading = true
        this.commitBtnText = '加载中...'
      },

      resetBtnLoading(code = 0, msg, text = '确 定') {
        this.btnLoading = false
        this.commitBtnText = text || '确 定'

        // if (+code < 0) {
        //   this.$message({
        //     message: msg || '服务异常，请稍后再试！',
        //     type: 'error'
        //   })
        // } else {
        //   this.$message({
        //     message: msg || '成功',
        //     type: 'success'
        //   });
        // }
      },
    },

    components: {
      TableWrapper
    }
  }
</script>

<style lang="scss" scoped>
  .add-member-buttom .el-dropdown {
    color: #34c4d4 !important;
  }

  .shop-wrapper {
    text-align: center;
    line-height: 36px;
  }

  .shop-wrapper .el-button {
    height: 36px;
    line-height: 36px;
    padding: 0px 12px 5px 10px;
  }

  .shop-wrapper .body,
  .shop-wrapper .title {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }

  .shop-wrapper .area {
    font-size: 16px;
    font-weight: bold;
  }

  .shop-wrapper .count {
    color: #34c4d4;
  }

  .shop-wrapper .item {
    font-weight: bold;
  }

  .shop-wrapper .flag {
    padding: 2px 3px;
    margin-left: 10px;
    border-radius: 2px;
  }

  .shop-wrapper .flag-zhi {
    border: 1px solid #34c4d4;
    color: #34c4d4;
  }

  .shop-wrapper .flag-meng {
    border: 1px solid #06aaff;
    color: #06aaff;
  }

/*  .el-input {
    width: auto !important;
  }
*/
  .el-input {
    width: 260px;
  }
</style>