if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize')
      , sequelize = null
  
    if (process.env.HEROKU_POSTGRESQL_PURPLE_URL) {
      // the application is executed on Heroku ... use the postgres database
      sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_PURPLE_URL, {
        dialect:  'postgres',
        protocol: 'postgres',
        port:     5432,
        host:     "ec2-75-101-147-226.compute-1.amazonaws.com",
        logging:  true //false
      })
    } else {
      // the application is executed on the local machine ... use mysql
      sequelize = new Sequelize('visio', 'root', 'troy--95', {
        host: 'localhost',
        dialect: 'mysql'
      })
    }
  
    global.db = {
      Sequelize: Sequelize,
      sequelize: sequelize,
      User:      sequelize.import(__dirname + '/user') 
      // add your other models here
    }
  
    /*
      Associations can be defined here. E.g. like this:
      global.db.User.hasMany(global.db.SomethingElse)
    */
  }
  
  module.exports = global.db