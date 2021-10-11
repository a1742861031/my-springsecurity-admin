<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 角色管理
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="container">
        <div class="handle-box">
          <el-input placeholder="角色名" class="handle-input mr10" v-model="searchRole.roleName"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="getRoleList">搜索</el-button>
        </div>
        <el-button type="success" class="addButton" icon="el-icon-roundaddfill" @click="showAddDialog">新增角色
        </el-button>
        <el-table :data="roleList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
          <el-table-column prop="roleName" label="角色名" width="120" align="center"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template #default="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row.roleId)">编辑
              </el-button>
              <el-button type="text" icon="el-icon-delete" class="red" @click="openDeleteDialog(scope.row.roleId)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
    <!-- 添加角色对话框开始 -->
    <el-dialog title="增加角色" v-model="addDialogVisible" width="50%">
      <el-form label-width="70px">
        <el-form-item label="角色名">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
        <el-form-item label="拥有权限">

          <el-tree :data="tree" show-checkbox node-key="menuId" :props="addTreeProps" default-expand-all ref="addTree">
          </el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
      </template>

    </el-dialog>
    <!-- 添加角色对话框结束 -->
    <!-- 修改角色对话框开始 -->
    <el-dialog title="增加角色" v-model="editDialogVisible" width="50%" @closed="handleEditDialogClose">
      <el-form label-width="70px">
        <el-form-item label="角色名">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>
        <el-form-item label="拥有权限">
          <el-tree :data="tree" show-checkbox node-key="menuId" :props="editTreeProps" default-expand-all ref="editTree"
            :default-checked-keys="editForm.menuIds">
          </el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>

    </el-dialog>
    <!-- 修改角色对话框结束 -->
  </div>
</template>

<script>
  import role from '../../api/role'
  import menu from '../../api/menu'


  export default {
    data() {
      return {
        searchRole: {
          roleName: ''
        },
        addDialogVisible: false,
        editDialogVisible: false,
        roleList: [],
        tree: [],
        addTreeProps: {
          label: 'menuName',
          children: "children"
        },
        editTreeProps: {
          label: 'menuName',
          children: "children"
        },
        addForm: {
          roleName: '',
          description: '',
          menuIds: []
        },
        editForm: {},
      };
    },
    created() {
      this.getRoleList();
      this.getMenuTree();
    },

    mounted() {

    },
    methods: {
      getRoleList() {
        role.getRoleList(this.searchRole).then(res => {
          this.roleList = res.data.roleList;
        })
      },
      getMenuTree() {
        menu.getMenuTree().then(res => {
          this.tree = res.data.tree;
        })
      },
      showAddDialog() {
        this.addDialogVisible = true;
      },
      saveAdd() {
        this.addForm.menuIds = this.$refs.addTree.getCheckedKeys();
        role.addRole(this.addForm).then(res => {
          this.$message.success("新增角色成功");
          this.getRoleList();
          this.addDialogVisible = false;
        })
      },
      handleEdit(id) {
        this.editDialogVisible = true;
        role.getRoleInfo(id).then(res => {
          this.editForm = res.data.role;
        })
      },
      saveEdit() {
        this.editForm.menuIds = this.$refs.editTree.getCheckedKeys();
        this.$refs.editTree.getHalfCheckedKeys().forEach(item => {
          this.editForm.menuIds.push(item);
        })
        role.editRole(this.editForm).then(res => {
          this.$message.success("修改角色成功");
          this.getRoleList();
          this.editDialogVisible = false;
        })
      },
      deleteRole(roleId) {
        role.deleteRole(roleId).then(res => {
          this.$message.success("删除角色成功");
          this.getRoleList();
        })
      },
      handleEditDialogClose() {
        this.$refs.editTree.setCheckedKeys([]);
      },
      openDeleteDialog(roleId) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRole(roleId);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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

  .container {
    margin-top: 10px;
  }
</style>