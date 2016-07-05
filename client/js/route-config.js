/**
 * Created by 刘娟娟 on 2016/6/28.
 */
export function configRouter(router){
    router.map({
        '*':{
            component:require('../views/App.vue')
        },
        '/log':{
            component:require('../views/Log.vue')
        },
        '/calendar':{
            component:require('../views/Calendar.vue')
        },
        '/search':{
            component:require('../views/Search.vue')
        },
        '/list':{
            component:require('../views/User.vue')
        }
    })
}