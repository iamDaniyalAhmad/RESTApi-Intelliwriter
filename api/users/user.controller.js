const { create, getUser,getUserbyEmail } = require('./user.service')
const { sign } = require('jsonwebtoken')

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10)
        // body.password = hashSync(body.password,salt)
        if (body.password != body.cPassword) {
            return res.status(500).json({
                success: 0,
                message: "Password Does not Match"
            })
        }

        getUserbyEmail(body.email,(erro,result)=>{
            if (erro) {
                console.log(erro)
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error"
                })
            }
            if(!result){
                create(body, (err, results) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            success: 0,
                            message: "Database Connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                    })
                })
                
                
            }else{
                return res.status(409).json({
                    success: 0,
                    message: "user already exists"
                })
            }
            
        })

        
    },
    login: (req, res) => {
        const body = req.body
        getUser(body.email, body.password, (err, results) => {
            if (err) {
                console.log(err)
            }

            if (!results) {
                return res.json({
                    success: 0,
                    data: "invalid email or password"
                })
            }

            results.password = undefined
            const jsontoken = sign({ result: results }, "nodewithsql", {
                expiresIn: "1h"
            })

            return res.json({
                success: 1,
                message: "login successfully",
                token: jsontoken
            })

        })
    }
}