
const router = require('express').Router();

const {
    AllUsers,
    OneUser,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
  } = require('../../controllers/users-controller');

router.route('/').get(AllUsers).post(createUsers);

router.route('/:id').get(OneUser).put(updateUsers).delete(deleteUsers);

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router; 