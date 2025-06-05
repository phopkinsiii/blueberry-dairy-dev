import mongoose from 'mongoose';

const Schema =mongoose.Schema;
const blogSchema = new Schema({
    title: {type: String, required: true, trim:true},
    content: {type: String, required: true, trim: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    image: {type: String},
    tags: [
        {type: String,
            trim: true,
        }],
    published: {type: Boolean, default: true},
    
}, {timestamps: true})

export default mongoose.model('Blog', blogSchema)

