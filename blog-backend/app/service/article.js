/**
 * Created by tanker on 17/10/12.
 */

module.exports = app =>{
    class ArticleService extends app.Service{
        constructor(ctx){
            super(ctx)
        }
        *submit(){
            const _this = this
            const  requset=_this.ctx.request.body
            const uuidV1=require('uuid/v1')
            const create_date =  new Date()
            const update_date =  new Date()
            const result = yield app.mysql.insert('article',{
                id:uuidV1(),
                article_content:requset.articleContent,
                article_name: requset.articleName,
                user_id: requset.userId,
                create_date:create_date,
                update_date:update_date
            })
            return result
        }
        *update(){
            const req = this.ctx.request.body
            const row = {
                update_date: new Date(),
                article_content:req.articleContent,
                article_name: req.articleName,
                user_id: req.userId,
                id: req.articleId
            }
            const result = yield app.mysql.update('article', row)
            return result
        }
        *delete(){
            const req = this.ctx.request.body
            const result = yield app.mysql.delete('article',{
                id:req.articleId
            })
            return result
        }
        *getOne(){
            const articleId = this.ctx.query.articleId
            const result = app.mysql.select('article',{
                where:{id:articleId}
            })
            if(result){
                return result
            }
        }
        *getAll() {
            const result  = yield app.mysql.select('article')
            if(result){
                const ids = result.map( v => v.user_id)
                const userNameMap = {}
                const users =yield app.mysql.select('user',{
                    where:{id:ids},
                })
                users.forEach(user => userNameMap[user.id] = user.username)
                const newResult = result.map(v=>({
                    articleName:v.article_name,
                    userId: v.user_id,
                    userName: userNameMap[v.user_id],
                    articleId: v.id,
                    createDate: v.create_date,
                    updateDate: v.update_date
                }))
                return newResult
            }
        }
    }
    return ArticleService
}