/**
 * Created by 刘娟娟 on 2016/7/13.
 */
const API_URL=require('../../config').API_URL;
export default{
    findTeam(app,cb){
        app.$http.get(API_URL+'/team/find?token='+sessionStorage.getItem('user')).then((res) => {
            if (res.data.code == 200) {
                cb(res.data.data);
            }else if(res.data.code == 555){
                console.log(res.data.data);
            }
        }, (err) => {
            console.log(err);
        });
    },
    updateTeam(app,obj,cb){
        app.$http.post(API_URL+'/team/update', obj).then((res) => {
            if (res.data.code == 201) {
                alert('此部门已存在，不可重复添加！')
            } else if(res.data.code == 555){
                console.log(res.data.data);
            }else if (res.data.code == 200) {
                cb(res.data.data);
            }
        }, (err) => {
            console.log(err);
        });
    },
    insertTeam(app,obj,cb){
        app.$http.post(API_URL+'/team/insert', obj).then((res)=> {
            if (res.data.code == 201) {
                alert('此部门已存在，不可重复添加！')
            }else if(res.data.code == 555){
                console.log(res.data.data);
            }else if (res.data.code == 200) {
               cb(res.data.data)
            }
        }, (err)=> {
            console.log(err);
        })
    },
    removeTeam(app,teamId,cb){
        app.$http.delete(API_URL+'/team/' + teamId).then((res)=> {
            if (res.data.code == 203) {
                alert('此部门下有员工，不可删除！')
            } else if(res.data.code == 555){
                console.log(res.data.data);
            }else if (res.data.code == 200) {
               cb(res.data.data);
            }
        }, (err)=> {
            console.log(err);
        })
    },
    findUsers(app,data,cb){
        app.$http.post(API_URL+'/user/findByTeam/', data).then((res) => {
            if (res.data.code == 200) {
                cb(res.data);
              } else if(res.data.code == 555){
                console.log(res.data.data);
            }
        }, (err) => {
            console.log(err);
        });
    },
    insertUser(app,userObj,cb){
        app.$http.post(API_URL+'/user/insert', userObj).then((res)=> {
            if (res.data.code == 201) {
                alert('此邮箱已注册，不可重复注册！')
            }else if (res.data.code == 200) {
                cb(res.data.data);
            }else if(res.data.code == 555){
                console.log(res.data.data);
            }
        }, (err)=> {
            console.log(err);
        })
    },
    updateUser(app,userObj,cb){
        app.$http.post(API_URL+'/user/update', userObj).then((res)=> {
            if (res.data.code == 201) {
                alert('此邮箱已注册，不可重复注册！')
            } else if (res.data.code == 200) {
               cb(res.data.data);
            }else if(res.data.code == 555){
                console.log(res.data.data);
            }
        }, (err)=> {
            console.log(err);
        })
    },
    removeUser(app,userId,cb){
        app.$http.delete(API_URL+'/user/' + userId).then((res)=> {
            if (res.data.code == 200) {
                cb(res.data.data);
            }else if(res.data.code == 555){
                console.log(res.data.data);
            }
        }, (err)=> {
            console.log(err);
        })
    }
}