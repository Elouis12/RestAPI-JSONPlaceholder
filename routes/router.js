let express = require('express');
let router = express.Router();

let { getUserInfo, postUserInfo, deleteUserInfo } = require('../contollers/user');


router.get('/', getUserInfo);
router.post('/postuser', postUserInfo);
router.delete('/:id', deleteUserInfo);







module.exports = router;