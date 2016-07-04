/**
 * Created by 刘娟娟 on 2016/6/28.
 */
export function configRouter(router){
    router.map({
        '*':{
            component:require('../views/log.vue')
        },
        '/log':{
            component:require('../views/log.vue')
        },
        '/calendar':{
            component:require('../views/calendar.vue')
        },
        '/search':{
            component:require('../views/search.vue')
        },
        '/list':{
            component:require('../views/user.vue')
        }
    })
}