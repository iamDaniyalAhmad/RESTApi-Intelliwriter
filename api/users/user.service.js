const pool = require('../../config/database')


module.exports = {
    create: (data,callback) =>{
        pool.query(`insert into user(Name,Email,Password,ConfirmPassword) values(?,?,?,?)`,
        [
            data.name,
            data.email,
            data.password,
            data.cPassword
        ],
        (error,results,fields) => {
            if(error){
                returncallback(error)
            }
            return callback(null,results)
        }
    
    )
    },
    getUserbyEmail:(email,callback) =>{
        pool.query(`select * from user where email = ?`,
            [email],
            (error,results,fields) =>{
                if(error){
                    return callback(error)
                }
                return callback(null,results[0])
            }
        )
    },
    getUser: (email,password,callback) =>{
        pool.query(
            `select * from user where email = ? and password = ?`,
            [email,password],
            (error,results,fields) =>{
                if(error) {
                    return callback(error)
                }

                return callback(null,results[0])
            }
        )
    }
}