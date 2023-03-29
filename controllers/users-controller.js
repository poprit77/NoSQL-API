
const {Users} = require('../models');

const usersController = {
    
    createUsers({body}, res) {
        Users.create(body)
        .then(UserData => res.json(UserData))
        .catch(err => res.status(400).json(err));
    },

    AllUsers(req, res) {
        Users.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(UserData => res.json(UserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    OneUser({params}, res) {
        Users.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(UserData => {
            if(!UserData) {
                res.status(404).json({message: 'the users are out to lunch'});
                return; 
            }
            res.json(UserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    updateUsers({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(UserData => {
            if(!UserData) {
                res.status(404).json({message: 'the users are out to lunch'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    deleteUsers({params}, res) {
        Users.findOneAndDelete({_id: params.id})
        .then(UserData => {
            if(!UserData) {
                res.status(404).json({message: 'the users are out to lunch'});
                return;
            }
            res.json(UserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(UserData => {
            if (!UserData) {
                res.status(404).json({message: 'the users are out to lunch'});
                return;
            }
        res.json(UserData);
        })
        .catch(err => res.json(err));
    },

    deleteFriend({ params }, res) {
        Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(UserData => {
            if(!UserData) {
                res.status(404).json({message: 'the users are out to lunch'});
                return;
            }
            res.json(UserData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = usersController; 