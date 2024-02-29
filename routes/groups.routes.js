const { Router } = require("express")
const { createGroup, getAllGroups, getSingleGroup, updateGroup, deleteGroup, addUserToGroup, removeUserFromGroup} = require("../controllers/groups.controller");
const router = Router();

router.post('/', createGroup )
router.get('/', getAllGroups)
router.get('/:id', getSingleGroup)
router.patch('/:id', updateGroup)
router.delete('/:id', deleteGroup)
router.post('/:id/add-user', addUserToGroup);
router.delete('/:id/remove-user/:userId', removeUserFromGroup);




module.exports = router;