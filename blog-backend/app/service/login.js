/**
 * Created by tanker on 17/10/19.
 */
module.exports= app =>{
    class LoginService extends app.Service{
        constructor(ctx){
            super(ctx)
        }
        *validate(){
            const req = this.ctx.request.body
            const results = yield this.app.mysql.select('user', { // 搜索 post 表
                where: { username: req.username, password: req.password }, // WHERE 条件
            });
            return results
        }
    }
    return LoginService
}