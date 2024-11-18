import mongoose from "mongoose"

const QuerySchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    query : {
        type : String,
        required : true
    }
})

export const Query = mongoose.model("Query",QuerySchema);