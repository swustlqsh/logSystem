/**
 * Created by 刘娟娟 on 2016/7/13.
 */
const API_URL=require('../../config').API_URL;
export default{
    findVisits(app, userId, cb){
        app.$http.get(API_URL + '/userVisit/findVisits/' + userId).then((res)=> {
            if (res.data.code == 200) {
                cb(res.data.data);
            } else if (res.data.code == 555) {
                console.log(res.data.data)
            }
        }, (err)=> {
            console.log(err);
        })
    },
    find(app, userId, cb){
        app.$http.get(API_URL + '/user/findById/' + userId).then((res)=> {
            if (res.data.code == 200) {
                cb(res.data.data);
            }
            else if (res.data.code == 555) {
                console.log(res.data.data)
            }
        }, (err)=> {
            console.log(err);
        })
    },
    findTeamUser(app, cb){
        app.$http.get(API_URL + '/user/teamUser/').then((res)=> {
            if (res.data.code == 200) {
                cb(res.data.data);
            } else if (res.data.code == 555) {
                console.log(res.data.data)
            }
        }, (err)=> {
            console.log(err);
        })
    },
    save(app, obj){
        app.$http.post(API_URL+'/userVisit/insert/', obj).then((res)=> {
            if (res.data.code == 200) {
                alert('保存成功！')
            } else if (res.data.code == 555) {
                console.log(res.data.data)
            }
        }, (err)=> {
            console.log(err)
        })
    }
}