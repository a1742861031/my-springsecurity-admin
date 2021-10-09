import request from '../utils/request';

export default {
    getUserList(query, userInfo) {
        return request({
            url: `/user/${query.pageNum}/${query.pageSize}`,
            method: 'post',
            data: userInfo
        });
    },
    getUserInfoById(userId) {
        return request({
            url: `/user/${userId}`,
            method: 'get',
        });
    },
    updateUser(user) {
        return request({
            url: `/user`,
            method: 'put',
            data: user
        });
    },
    //新增用户
    addUser(user) {
        return request({
            url: `/user`,
            method: 'post',
            data: user
        });
    },
    //删除用户
    deleteUser(id) {
        return request({
            url: `/user/${id}`,
            method: 'delete',
        });
    }
  
}
