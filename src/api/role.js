import request from '../utils/request';
export default {
    getRoleInfoById(roleId) {
        return request({
            url: `/role/${roleId}`,
            method: 'get',
        });
    },
    getRoleList() {
        return request({
            url: `/role`,
            method: 'get',
        });
    }
}
