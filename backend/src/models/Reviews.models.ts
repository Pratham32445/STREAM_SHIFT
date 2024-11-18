import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    desc : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true,
        enum : [1,2,3,4,5]
    }
})

const Review = mongoose.model("Review",ReviewSchema);

export default Review;