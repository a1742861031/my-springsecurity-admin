<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 菜单管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">


      <el-table :data="oneLevelMenu" style="width: 100%" row-key="menuId" border lazy :load="loadNextLevelMenu"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="menuName" label="菜单标题" width="180">
        </el-table-column>
        <el-table-column prop="icon" label="图标" width="180">
        </el-table-column>
        <el-table-column label="类型">
          <template #default="scope">
            <el-tag v-if="scope.row.type === 0" type="success">目录</el-tag>
            <el-tag v-else-if="scope.row.type ===1" type="warning">菜单</el-tag>
            <el-tag v-else-if="scope.row.type ===2" type="info">按钮</el-tag>

          </template>
        </el-table-column>
        <el-table-column prop="url" label="路径">
        </el-table-column>
        <!-- <el-table-column prop="address" label="是否可用">
        </el-table-column> -->
        <el-table-column prop="permission" label="权限标识">
        </el-table-column>
        <el-table-column prop="sort" label="排序">
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row.menuId)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="openDeleteDialog(scope.row.menuId)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加角色对话框开始 -->
    <el-dialog title="添加菜单" v-model="addDialogVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="菜单名">
          <el-input v-model="addForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="addForm.url"></el-input>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="addForm.permission"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="addForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio v-model="addForm.type" :label=0>目录</el-radio>
          <el-radio v-model="addForm.type" :label=1>菜单</el-radio>
          <el-radio v-model="addForm.type" :label=2>按钮</el-radio>
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-cascader :options="oneLevelMenu" v-model="selectedParentMenu"
            :props="{ multiple: false, checkStrictly: true ,value:'menuId',label:'menuName',lazy:true,lazyLoad:lazyLoadNextLevel}">
          </el-cascader>
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
    <el-dialog title="编辑菜单" v-model="editDialogVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="菜单名">
          <el-input v-model="editForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="editForm.url"></el-input>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="editForm.permission"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio v-model="editForm.type" :label=0>目录</el-radio>
          <el-radio v-model="editForm.type" :label=1>菜单</el-radio>
          <el-radio v-model="editForm.type" :label=2>按钮</el-radio>
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-cascader :options="oneLevelMenu" v-model="editForm.parentId"
            :props="{ multiple: false, checkStrictly: true ,value:'menuId',label:'menuName',lazy:true,lazyLoad:lazyLoadNextLevel}">
          </el-cascader>
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
  import menu from '../../api/menu'
  export default {

    data() {
      return {
        oneLevelMenu: [],
        addDialogVisible: false,
        addForm: {},
        selectedParentMenu: [],
        editForm: {},
        editDialogVisible: false
      };
    },


    created() {
      this.getOneLevelMenu();
    },

    methods: {
      //获取一级菜单
      getOneLevelMenu() {
        menu.getMenuLevelOne().then(res => {
          this.oneLevelMenu = res.data.result;
        })
      },
      loadNextLevelMenu(tree, treeNode, resolve) {
        let level;
        if (tree.type == 0) {
          level = 2
        } else {
          level = 3
        }
        menu.getMenuLevelTwoOrThree(tree.menuId, level).then(res => {
          resolve(res.data.result)
        })
      },
      lazyLoadNextLevel(node, resolve) {
        menu.getMenuLevelTwoOrThree(node.value, 2).then(res => {
          resolve(res.data.result)
        })
      },
      handleEdit(menuId) {
        menu.getMenuInfoById(menuId).then(res => {
          this.editForm = res.data.menu;
          this.editDialogVisible = true;
          this.getOneLevelMenu();
        })
      },
      saveAdd() {
        this.addForm.parentId = this.selectedParentMenu.pop();
        menu.addMenu(this.addForm).then(res => {
          this.$message.success("新增菜单成功");
          this.addDialogVisible = false;
          this.getOneLevelMenu();
        })
      },

      saveEdit() {
        if (this.editForm.parentId) {
          this.editForm.parentId = this.editForm.parentId.pop();
        }
        menu.updateMenu(this.editForm).then(res => {
          this.$message.success("修改成功");
          this.editDialogVisible = false;
          this.getOneLevelMenu();
        })
      },
      deleteMenu(menuId) {
        menu.deleteMenu(menuId).then(res => {
          this.$message.success("删除角色信息成功");
          this.getMenuLevelOne();
        })
      },
      openDeleteDialog(menuId) {
        this.$confirm('此操作将永久删除该菜单及该菜单下的元素?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteMenu(menuId);
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