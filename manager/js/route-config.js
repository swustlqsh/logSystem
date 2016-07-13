/**
 * Created by 刘娟娟 on 2016/6/28.
 */
export function configRouter(router){
    router.map({
        '/login':{
            component:require('../views/login.vue')
        },
        '/list':{
            component:require('../views/index.vue'),
            subRoutes:{
                '/':{
                    component:require('../views/List.vue')
                },
                '/auth/:userId':{
                    name:'auth',
                    component:require('../views/Auth.vue')
                }
            }
        }
        
    })
}