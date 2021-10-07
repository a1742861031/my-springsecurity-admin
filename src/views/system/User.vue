<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="searchUserInfo.userName" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-input v-model="searchUserInfo.nickName" placeholder="账号" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>

      <el-button type="success" class="addButton" icon="el-icon-roundaddfill" @click="handleAdd">新增用户</el-button>
      <el-table :data="pageInfo.list" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="userName" label="账号" width="80" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>

        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="启用" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="success">🌈已启用</el-tag>
            <el-tag v-else type="danger">☔被停用</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row.userId)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="pageInfo.pageNum"
          :page-size="query.pageSize" :total="pageInfo.total" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>
    <!-- 弹出框 -->
    <el-dialog :title="title" v-model="dialogVisible" width="30%" @closed="handleClose">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userInfo.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="userInfo.status" :active-value=1 :inactive-value=0>
          </el-switch>
          {{userInfo.status}}
        </el-form-item>

        <el-form-item label="角色">
          <el-radio :label="role.roleId" v-model="userInfo.roleId" v-for="role in roleList" :key="role.roleId">
            {{role.roleName}}</el-radio>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEditOrUpdate">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import {
    ref,
    reactive
  } from "vue";
  import {
    ElMessage,
    ElMessageBox
  } from "element-plus";
  import user from "../../api/User";
  import role from '../../api/Role'
  export default {
    data() {
      return {
        dialogVisible: false,
        query: {
          pageNum: 1,
          pageSize: 5,
        },
        title: '',
        searchUserInfo: {},
        pageInfo: {},
        userInfo: {
          userId: '',
          userName: '',
          nickName: '',
          phone: '',
          email: '',
          status: '',
          roleId: '',
          roleName: '',
        },
        roleList: {}

      };
    },
    created() {
      this.getUserList();
      this.getRoleList();
    },
    methods: {
      handlePageChange(val) {
        this.query.pageNum = val;
        this.getUserList();
      },
      getUserList() {
        user.getUserList(this.query, this.searchUserInfo).then((res) => {
          this.pageInfo = res.data;
        });
      },
      getRoleList() {
        role.getRoleList().then(res => {
          this.roleList = res.roleList;
        })
      },
      saveEditOrUpdate() {
        if(this.title==="编辑用户")
           this.updateUser();
        else{
          
        }
      },
      handleSearch() {
        this.getUserList();
      },
      updateUser() {
        user.updateUser(this.userInfo).then(res => {
          this.$message.success("更新用户成功");
          this.dialogVisible = false;
          this.getUserList();
          this.userInfo = {};
        })
      },
      handleEdit(id) {
        this.dialogVisible = true;
        this.title = "编辑用户"
        this.getUserInfo(id);
      },
      handleAdd(){
        this.dialogVisible = true;
        this.title = "新增用户";
      },
      getUserInfo(userId) {
        user.getUserInfoById(userId).then(res => {
          this.userInfo.status = res.item.status == 1 ? true : false;
          this.userInfo = res.item;
        })
      },
      getRole(roleId) {
        role.getRoleInfoById(roleId).then(res => {
          this.userInfo.roleName = res.role.roleName;
          console.log(this.userInfo);
        })
      },
      handleClose(){
        this.userInfo = {}
      }
    },
  };
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .addButton {
    margin-bottom: 10px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .red {
    color: #ff0000;
  }

  .mr10 {
    margin-right: 10px;
  }

  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>