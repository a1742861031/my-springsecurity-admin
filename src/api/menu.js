import request from '../utils/request';
export default {
    //获取三级菜单
    getMenuTree() {
        return request({
            url: `/menu/tree`,
            method: 'get',
        });
    },
    //获取一级菜单
    getMenuLevelOne() {
        return request({
            url: `/menu/1`,
            method: 'get',
        });
    },
    //获取二级或菜单
    getMenuLevelTwoOrThree(parentId, level) {
        return request({
            url: `/menu/${level}/${parentId}`,
            method: 'get',
        });
    },
    //新增菜单
    addMenu(menuinfo) {
        return request({
            url: `/menu`,
            method: 'post',
            data: menuinfo
        });
    },
    //通过id获取菜单信息
    getMenuInfoById(menuId) {
        return request({
            url: `/menu/menuInfo/${menuId}`,
            method: 'get',
        });
    },
    //更新菜单信息
    updateMenu(menuInfo) {
        return request({
            url: `/menu`,
            method: 'put',
            data: menuInfo
        });
    },
    deleteMenu(menuId) {
        return request({
            url: `/menu/${menuId}`,
            method: 'delete',
        });
    }
}
