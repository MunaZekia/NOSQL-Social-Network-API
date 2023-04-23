const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,

}
= require('../../controllers/userControllers');

router.route('/').get(getAllUsers) 
.post(createUser);

router.route('/:id').get(getSingleUser)
.put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId') 
.post(addFriend) .delete(deleteFriend);

module.exports = router;
// why is router capitalized in the last line, because it is a class
