import mongoose from "mongoose";

const MonthlySchema = mongoose.Schema({


                           userid:String,
                           name:String,
                          investedValue:Number,
                          currentValue:Number,
                            add:Number,
                            withdraw:Number,
                            month:Date,
                            notes:String,  
    
})

const MonthlyModel = mongoose.model("monthly",MonthlySchema)

export default MonthlyModel;