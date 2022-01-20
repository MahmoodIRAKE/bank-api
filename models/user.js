const { Schema, model } = require("mongoose");



const userSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    cash: { type: Number, required: true, default: 0 },
    credit: { type: Number, required: true, default: 0 },
    userInfo: { name: String, age: Number, city: String }
});

const User = model("users", userSchema);
module.exports = User;