module.exports = app => {
    class UserService extends app.Service {
        constructor(ctx) {
            super(ctx)
        }

        *index() {
            const result = yield app.mysql.select('user');
            return result
        }
        *create() {
            const uuidV1=require('uuid/v1')
            const userName=this.ctx.request.body.username
            const password='123456'
            const result = yield app.mysql.insert('user', {
                    username:userName,
                    password:password,
                    id:uuidV1()
                })
            const insertSuccess = result.affectedRows === 1
            return insertSuccess
        }
        *update() {
            const req = this.ctx.request.body
            const row = {
                id:req.userId,
                username:req.username
            }
            const result = yield app.mysql.update('user',row)
            return result
        }
        *delete() {
            const id=this.ctx.request.body.id
            const password='123456'
            const result = yield app.mysql.delete('user', {
                id:id
            })
            return result
        }
    }
    return UserService
}