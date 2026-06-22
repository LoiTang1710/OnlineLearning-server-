import { Sequelize } from "sequelize";

const sequelize = new Sequelize('online_learning_db', 'sa', 'Root@123456', {
  host: 'localhost',
  dialect: 'mssql',
  logging: false,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    }
  }
})

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log(`Successfully connect SQL Server`)
  }
  catch (error) {
    console.log(`Failed to connection SQL Error`)
    console.error(error)
  }
}

export const SQL = { sequelize, connectDB }
