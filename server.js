const { default: mongoose } = require('mongoose')
const createApp = require('./src/app/app')
const dotenv = require('dotenv')

dotenv.config()

const app = createApp()
const PORT = process.env.PORT || 3000



mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('Connected to database')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
