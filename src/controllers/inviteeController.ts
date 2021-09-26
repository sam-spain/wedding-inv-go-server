import { InviteeModel } from "../models/invitee.model";

// @description Get all people invited
// @route       GET /api/v1/invitee
export async function getInvitees(req : any, res: any, next: any) {
    try{
        const invitees = await InviteeModel.find();
        res.status(200).json(invitees);
    } catch (err) {
        res.status(500).json(err);
    }
}

// @description Get person invited by ID
// @route       GET /api/v1/invitee/:id
export async function getInvitee(req: any, res: any, next: any) {
    try {
        const foundInvitee = await InviteeModel.findById(req.params.id);
        if(foundInvitee)
            res.status(200).json(foundInvitee);
        else res.status(404).json({message: 'No invitee with matching ID found.'});
    } catch (err) {
        res.status(500).json(err);
    }
}

// @description Invite new person
// @route       POST /api/v1/invitee
export async function createInvitee(req: any, res: any, next: any) {
    try {
        const newInvitee = await InviteeModel.create(req.body);
        res.status(201).json(newInvitee);
    } catch (err) {
        res.status(500).json(err);
    }
}

// @description Update existing invitee
// @route       PUT /api/v1/invitee/:id
export async function updateInvitee(req: any, res: any, next: any) {
    try {
        const updatedInvitee = await InviteeModel.findByIdAndUpdate(
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
export async function deleteInvitee (req: any, res: any, next: any) {
    try {
        const deletedInvitee = await InviteeModel.findByIdAndDelete(req.params.id);
        if (!deletedInvitee)
          return res
            .status(404)
            .json({message: 'Failed to find invitee to delete.'});
        else return res.status(204).json({});
      } catch (err) {
        return res.status(500).json(err);
      }
}