/**
 * Created by tanker on 17/10/19.
 */
'use strict'

module.exports= app =>{
    class LoginController extends app.Controller{
        *validate(){
            this.ctx.validate({
                username:'string',
                password:'string'
            })
            const data = yield this.ctx.service.login.validate()
            if(data){
                this.ctx.body={
                    validate:'true',
                    data:data,
                    code:'0'
                }
            }else{
                this.ctx.body={
                    validate:'false',
                    code:'0'
                }
            }
        }
    }
    return LoginController
}