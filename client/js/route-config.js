/**
 * Created by 刘娟娟 on 2016/6/28.
 */
export function configRouter(router){
    router.map({
        '*':{
            component:require('../views/Login.vue')
        },
        '/login':{
            component:require('../views/Login.vue')
        },
        'index':{
            component:require('../views/App.vue'),
            subRoutes:{
                '/': {
                    component:require('../views/List.vue')
                },
                'add':{
                    component:require('../views/Add.vue')
                }
            }
        }
    })
}