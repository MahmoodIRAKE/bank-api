const User = require("../models/user");

const findUserById = async (id) => await User.findById(id); // return document
const findUserByIdOne = async (id) => await User.findOne({ id: id })
const isUserExist = async (id) => await User.exists({ id: id });

const createNewUser = async (user) => {
    const isUser = await isUserExist(user.id)
    if (isUser) throw Error("User Is already Exist");
    const newUser = new User(user);
    await newUser.save()
    return newUser
}

const shiftUser = async (id) => {
    await User.deleteOne({ id: id })
    const isUser = await isUserExist(id)
    if (!isUser) return "Deleted"
    else throw Error("operation didnt execute");
}
const updateUser = async (id, req) => {
    // dont user req, res;
    const isUser = await isUserExist(id)
    if (!isUser) throw Error("no such user")
    let user = await findUserByIdOne(id);
    if (!Object.keys(transactions).includes(req.body.action)) throw Error("The Action Requested Is Invalid")
    const updateUser1 = await transactions[req.body.action](id, req, user);
    console.log(updateUser1)
    await updateUser1.forEach((user) => {
        user.save()
    });
    return updateUser1

}
const transactions = {
    withdraw: async (id, req, user) => {
        let cashWithDraw = -1 * req.body.cash;
        if (user.cash < -1 * cashWithDraw) throw Error("You Dont Have Enough Money")
        const updateUser = await User.findOneAndUpdate({ id: id }, { $inc: { cash: cashWithDraw } }, { new: true })
        return [updateUser];
    },
    deposite: async (id, req) => {
        let cashWithDraw = req.body.cash;
        const updateUser = await User.findOneAndUpdate({ id: id }, { $inc: { cash: cashWithDraw } }, { new: true })
        return [updateUser];
    },
  
    updateCredit: async (id, req) => {
        let creditAmount = req.body.credit;
        const updateUser = await User.findOneAndUpdate({ id: id }, { $inc: { credit: creditAmount } }, { new: true })
        return [updateUser];
    },
    transfer: async (id, req, user) => {
        if (user.cash + user.credit < req.body.amount) throw Error("You Dont Have Enough Money")
        let amountFromCash = Math.min(req.body.amount, user.cash);
        let amountFromCredit = Math.min(req.body.amount - amountFromCash, user.credit);
        let reciverId = req.body.target;
        const updateUser2 = await User.findOneAndUpdate({ id: reciverId }, { $inc: { cash: req.body.amount } }, { new: true })
        if (!updateUser2) throw Error("Invalid Destination To Transfer")
        const updateUser1 = await User.findOneAndUpdate({ id: id }, { $inc: { cash: -1 * amountFromCash, credit: -1 * amountFromCredit } }, { new: true })
        return [updateUser1, updateUser2];
    }
}
const findAllUsers = async () => await User.find();

module.exports = {
    findUserById, isUserExist, createNewUser, shiftUser,
    findUserByIdOne, findAllUsers, updateUser
}