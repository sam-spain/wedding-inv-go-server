const Invitee = require("../models/invitee");

// @description Get all people invited
// @route       GET /api/v1/invitee
exports.getInvitees = async function getInvitees(req, res, next) {
    try{
        const invitees = await Invitee.find();
        res.status(200).json(invitees);
    } catch (err) {
        res.status(500).json(err);
    }
}

// @description Get person invited by ID
// @route       GET /api/v1/invitee/:id
exports.getInvitee = async function getInvitee(req, res, next) {
    try {
        const foundInvitee = await Invitee.findById(req.params.id);
        if(foundInvitee)
            res.status(200).json(foundInvitee);
        else res.status(404).json({message: 'No invitee with matching ID found.'});
    } catch (err) {
        res.status(500).json(err);
    }
}

// @description Invite new person
// @route       POST /api/v1/invitee
exports.createInvitee = async function createInvitee(req, res, next) {
    try {
        const newInvitee = await Invitee.create(req.body);
        res.status(201).json(newInvitee);
    } catch (err) {
        res.status(500).json(err);
    }
}

// @description Update existing invitee
// @route       PUT /api/v1/invitee/:id
exports.updateInvitee = async function updateInvitee(req, res, next) {
    try {
        const updatedInvitee = await Invitee.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          },
        );

        if (!updatedInvitee)
          return res
            .status(404)
            .json({message: 'Failed to find invitee to update.'});
        else return res.status(200).json({updatedInvitee});
      } catch (err) {
        return res.status(500).json(err);
      }
}

// @description Delete existing invitee
// @route       DELETE /api/v1/invitee/:id
exports.deleteInvitee = async function deleteInvitee (req, res, next) {
    try {
        const deletedInvitee = await Invitee.findByIdAndDelete(req.params.id);
        if (!deletedInvitee)
          return res
            .status(404)
            .json({message: 'Failed to find invitee to delete.'});
        else return res.status(204).json({});
      } catch (err) {
        return res.status(500).json(err);
      }
}