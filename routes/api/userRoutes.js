const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getAllUsers)
.post(createUser);

// /api/users/:id
router.route('/:userId').put(updateUser).get(getSingleUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.post(addFriend).delete(deleteFriend);
/*
router.delete("/:userId", (req, res)=>{
    console.log("what did i get?", req.query.userId)
    try{
        deleteUser(req);
    } catch(err){
        console.log(err)
    }
    
})
*/
module.exports = router;