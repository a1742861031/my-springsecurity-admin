import request from '../utils/request';
export default {
    getRoleInfoById(roleId) {
        return request({
            url: `/role/${roleId}`,
            method: 'get',
        });
    },
    getRoleList(searchRole) {
        return request({
            url: `/role`,
            method: 'get',
            params: searchRole
        });
    },
    addRole(roleInfo) {
        return request({
            url: `/role`,
            method: 'post',
            data: roleInfo,
        });
    },
    getRoleInfo(roleId) {
        return request({
            url: `/role/${roleId}`,
            method: 'get',
        });
    },
    //修改角色信息
    editRole(roleInfo) {
        return request({
            url: `/role`,
            method: 'put',
            data: roleInfo,
        });
    },
    //删除角色
    deleteRole(roleId) {
        return request({
            url: `/role/${roleId}`,
            method: 'delete',
        });
    }
}
