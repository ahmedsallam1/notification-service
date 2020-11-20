import mongoose from 'mongoose';

export default async () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB connnection successful!')
    })
    .catch((error) => console.log(error));
}