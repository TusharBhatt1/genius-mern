const mongoose=require("mongoose")

const Chats=mongoose.model("Chats",{
    codeChats:[{
        user:String,
        genius:String
    }],
    imageChats:[{
        user:String,
        genius:String
    }]
})

module.exports=Chats