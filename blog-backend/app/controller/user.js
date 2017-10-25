'use strict';

module.exports = app => {
    class UserController extends app.Controller {
        * getAll() {
            let _this = this
            const userData = yield this.ctx.service.user.index()
            console.log(userData)
            this.ctx.body = {
                data: userData,
                code: 0,
                msg: '获取成功'
            }
            this.ctx.status = 201;
        }

        *create() {
            let _this = this
            this.ctx.validate({
                username: 'string',
            })
            const data = yield  this.ctx.service.user.create()
            if (data) {
                this.ctx.body = {
                    code: 0,
                    msg: '新增用户成功'
                }
            }
        }
        *update() {
           let _this = this
            this.ctx.validate({
                username: 'string',
                userId: 'string'
            })
            const data = yield this.ctx.service.user.update()
            if(data) {
               this.ctx.body = {
                   code: 0,
                   msg: '修改用户成功'
               }
            }
        }

        *delete() {
            this.ctx.validate({
                id:'string'
            })
            const data = yield  this.ctx.service.user.delete()
            if (data) {
                this.ctx.body = {
                    code: 0,
                    msg: '删除用户成功'
                }
            }
        }
    }
    return UserController;
}