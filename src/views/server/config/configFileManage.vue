<template>
  <el-main>
    <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
    <elx-editable
      ref="commonNormativeConfigTable"
      :data.sync="tableList"
      border
      style="width: 100%"
      @blur-active="updateConfigFileInfo"
    >
      <elx-editable-column prop="ipAddress" label="IP地址" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.ipAddress}}</span>
        </template>
      </elx-editable-column>
      <elx-editable-column
        prop="configDesc"
        label="配置描述"
        align="center"
        :edit-render="{name: 'ElInput'}"
      >
        <template slot-scope="scope">
          <span>{{scope.row.configDesc}}</span>
        </template>
      </elx-editable-column>
      <elx-editable-column
        prop="configCode"
        label="配置码"
        align="center"
        :edit-render="{name: 'ElInput'}"
      >
        <template slot-scope="scope">
          <span>{{scope.row.configCode}}</span>
        </template>
      </elx-editable-column>
      <elx-editable-column prop="info" label="服务器描述" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.info}}</span>
        </template>
      </elx-editable-column>
      <elx-editable-column
        prop="configFilePath"
        label="配置文件路径"
        align="center"
        :edit-render="{name: 'ElInput'}"
      >
        <template slot-scope="scope">
          <span>{{scope.row.configFilePath}}</span>
        </template>
      </elx-editable-column>
      <elx-editable-column prop="createTime" label="创建时间" align="center" width="170"></elx-editable-column>
      <elx-editable-column prop="id" label="删除" width="130px" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="deleteConfigFileInfo(scope.row.id)">删除</el-button>
        </template>
      </elx-editable-column>
    </elx-editable>
    <pagination
      v-show="total > pageSize"
      :total="total"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="getApplicationList()"
    />

    <el-dialog title="添加配置文件" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="配置码" :label-width="formLabelWidth">
          <el-input v-model="form.configCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" :label-width="formLabelWidth">
          <el-select v-model="form.serverId" placeholder="请选择服务器IP" filterable >
            <el-option
              v-for="item in serverList"
              :label="item.ipAddress"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件路径" :label-width="formLabelWidth">
          <el-input v-model="form.configFilePath" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="配置描述" :label-width="formLabelWidth">
          <el-input v-model="form.configDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveConfigFileInfo">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import {
  getConfigFileListByPage,
  saveOrUpdateConfigFileInfo,
  getServerListByUserId,
  deleteConfigFileInfoById
} from "@/api/config";
import Pagination from "@/components/Pagination/index";
export default {
  name: "config-file-manage",
  components: {
    Pagination
  },
  data() {
    return {
      tableList: [],
      serverList: [],
      pageNum: 1,
      pageSize: 10,
      total: 1,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        configCode: "",
        serverId: "",
        configFilePath:'',
        configDesc:''
      }
    };
  },
  created() {
    this.getConfigFileListByPage();
    this.getServerListByUserId();
  },
  methods: {
    getConfigFileListByPage() {
      getConfigFileListByPage({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(response => {
        this.tableList = response.data.records;
        this.total = response.data.total;
      });
    },
    getServerListByUserId() {
      getServerListByUserId().then(response => {
        this.serverList = response.data;
      });
    },
    updateConfigFileInfo(row) {
      let params = {
        id: row.id,
        configFilePath: row.configFilePath,
        configDesc: row.configDesc,
        configCode: row.configCode
      };
      this.saveOrUpdateConfigFileInfo(params);
    },
    saveConfigFileInfo(){
      this.dialogFormVisible=false;
      this.saveOrUpdateConfigFileInfo(this.form);
    },
    saveOrUpdateConfigFileInfo(params){
      saveOrUpdateConfigFileInfo(params).then(response => {
        if (response.success) {
          this.$message({
            message: response.data,
            type: "success"
          });
        } else {
          this.$message({
            message: response.errorMessage,
            type: "error"
          });
        }
        this.getConfigFileListByPage();
      });
    },
    deleteConfigFileInfo(id) {
      deleteConfigFileInfoById({'id':id}).then(response => {
        if (response.success) {
          this.$message({
            message: response.data,
            type: "success"
          });
        } else {
          this.$message({
            message: response.errorMessage,
            type: "error"
          });
        }
        this.getConfigFileListByPage();
      })
    }
  }
};
</script>

<style lang="sass" scoped>
</style>
