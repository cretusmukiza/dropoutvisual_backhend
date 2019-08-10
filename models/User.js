const Sequelize=require('sequelize')
const db=require('../database/db.js')
module.exports=db.sequelize.define(
    'user',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        email:{
            type:Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
        },        
    },{
        timestamps:true,
        underscored:true
    }
)