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
      <div class="handle-box">
        <el-input placeholder="菜单名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <el-button type="success" class="addButton" icon="el-icon-roundaddfill">新增菜单
      </el-button>

      <el-table :data="oneLevelMenu" style="width: 100%" row-key="menuId" border lazy :load="loadNextLevelMenu"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="menuName" label="菜单标题" width="180">
        </el-table-column>
        <el-table-column prop="icon" label="图标" width="180">
        </el-table-column>
        <el-table-column  label="类型">
          <template #default="scope">
            <el-tag v-if="scope.row.type === 0" type="success">目录</el-tag>
            <el-tag v-else-if="scope.row.type ===1"  type="warning">菜单</el-tag>
            <el-tag v-else-if="scope.row.type ===2"  type="info">按钮</el-tag>

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
  </div>
</template>

<script>
  import menu from '../../api/menu'
  export default {

    data() {
      return {
        oneLevelMenu: []
      };
    },

    mounted() {

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
        console.log(tree.type == 0);
        let level;
        if (tree.type == 0) {
          level = 2
        } else {
          level = 3
        }
        menu.getMenuLevelTwoOrThree(tree.menuId, level).then(res => {
          console.log(res.data.result);
          resolve(res.data.result)
        })

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