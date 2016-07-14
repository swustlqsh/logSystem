/**
 * Created by 刘娟娟 on 2016/7/13.
 */
const API_URL=require('../../config').API_URL;
export default{
    findUserById(app, userId, cb){
        app.$http.get(API_URL + '/user/findById/' + userId).then((res)=> {
            if (res.data.code == 200) {
                cb(res.data.data);
            } else if (res.data.code == 555) {
                console.log(res.data.data)
            }
        }, (err)=> {
            console.log(err);
        })
    },

    findDairyByUser(app, data, cb){
        app.$http.post(API_URL + '/dairy/findByUser/' ,data).then((res)=> {
            if (res.data.code == 200) {
                cb(res.data);
            } else if (res.data.code == 555) {
                console.log(res.data.data)
            }
        }, (err)=> {
            console.log(err);
        })
    }
}