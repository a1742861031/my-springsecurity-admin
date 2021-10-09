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
    getMenuLevelTwoOrThree(parentId,level) {
        return request({
            url: `/menu/${level}/${parentId}`,
            method: 'get',
        });
    },

}
