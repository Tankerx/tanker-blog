/**
 * Created by tanker on 17/10/12.
 */
'use strict'

module.exports = app => {
    class ArticleController extends app.Controller{
        *submit(){
            const _this=this
            this.ctx.validate({
                articleContent:'string',
                articleName: 'string',
                userId: 'string'
            })
                    // this.ctx.body = `body: ${JSON.stringify(_this.ctx.request.body)}`;
            const articleData = yield this.ctx.service.article.submit(_this.ctx.request.body)
            if (articleData) {
                this.ctx.body = {
                    code: 0,
                    msg: '文章保存成功'
                }
            }
            this.ctx.status = 201;
        }
        *update(){
            this.ctx.validate({
                articleContent:'string',
                articleName: 'string',
                userId: 'string',
                articleId: 'string'
            })
            const articleUpdate = yield this.ctx.service.article.update()
            if(articleUpdate){
                this.ctx.body = {
                    code:0,
                    msg:'文章更新成功'
                }
            }
        }
        *delete(){
            this.ctx.validate({
                articleId:'string'
            })
            const articleDelete = yield this.ctx.service.article.delete()
            if(articleDelete){
                this.ctx.body = {
                    code:0,
                    msg:'文章删除成功'
                }
            }
        }
        *getOne(){
            // this.ctx.validate({
            //     articleId:'string'
            // })
            const data = yield this.ctx.service.article.getOne()
            if(data){
                this.ctx.body ={
                    code:0,
                    data:data[0]
                }
            }
        }
        *getAllArticle(){
            const articleList  = yield this.ctx.service.article.getAll()
            if(articleList){
                this.ctx.body = {
                    code: 0,
                    msg: '获取文章列表成功',
                    articleList:articleList
                }
            }
        }
    }
    return ArticleController
}