/**
 * Created by 刘娟娟 on 2016/7/13.
 */
import {API_URL} from '../../config'
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

    findDairyByUser(app, userId, cb){
        app.$http.get(API_URL + '/dairy/findByUser/' + userId).then((res)=> {
            if (res.data.code == 200) {
                cb(res.data.data);
            } else if (res.data.code == 555) {
                console.log(res.data.data)
            }
        }, (err)=> {
            console.log(err);
        })
    }
}