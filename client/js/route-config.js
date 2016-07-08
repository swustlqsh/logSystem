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
            component:resolve=>{
                require(['../views/Login.vue'],resolve);
            }
        },
        'index':{
            component:resolve=>{
                require(['../views/App.vue'],resolve);
            },
            subRoutes:{
                '/': {
                    component:resolve=>{
                        require(['../views/List.vue'],resolve);
                    }
                },
                'add':{
                    component:resolve=>{
                        require(['../views/Add.vue'],resolve);
                    }
                }
            }
        }
    })
}