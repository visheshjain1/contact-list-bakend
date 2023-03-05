import mongoose from 'mongoose';

const Connection = async () => {
    const URL = `mongodb://vishesh004:test@cluster0-shard-00-00.7uth9.mongodb.net:27017,cluster0-shard-00-01.7uth9.mongodb.net:27017,cluster0-shard-00-02.7uth9.mongodb.net:27017/PROJECT0?ssl=true&replicaSet=atlas-5em3jo-shard-0&authSource=admin&retryWrites=true&w=majority`

    try {
        // 1 - Current URL string parser is deprecated, and will be removed in a future version. 
        // 2 - Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version.

        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

export default Connection;