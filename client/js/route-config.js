/**
 * Created by 刘娟娟 on 2016/6/28.
 */
export function configRouter(router){
    router.map({
        '*':{
            component:resolve=> {
                require(['../views/Login.vue'], resolve);
            }
        },
        '/login':{
            name:'login',
            component:resolve=>{
                require(['../views/Login.vue'],resolve);
            }
        },
        'user/:userId':{
            name:'user',
            component:resolve=>{
                require(['../views/App.vue'],resolve);
            },
            subRoutes:{
                '/': {
                    component:resolve=>{
                        require(['../views/List.vue'],resolve);
                    }
                },
                'dairy':{
                    name:'dairy',
                    component:resolve=>{
                        require(['../views/Dairy.vue'],resolve);
                    }
                }
            }
        }
    })
}