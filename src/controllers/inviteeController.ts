import { InviteeModel } from "../models/invitee.model";

// @description Get all people invited
// @route       GET /api/v1/invitee
export async function getInvitees(req : any, res: any, next: any) {
    try{
        const invitees = await InviteeModel.find();
        res.status(200).json(invitees);
    } catch (err) {
        res.status(500).json({message: 'Failed to retrieve invitees.'});
    }
}

// @description Get person invited by ID
// @route       GET /api/v1/invitee/:id
export function getInvitee(req: any, res: any, next: any) {
    res.status(200).json({ id: req.params.id, name: "sam" });
}

// @description Invite new person
// @route       POST /api/v1/invitee
export async function createInvitee(req: any, res: any, next: any) {
    try {
        const newInvitee = await InviteeModel.create(req.body);
        res.status(201).json(newInvitee);
    } catch (err) {
        res.status(500).json({err});
    }
}

// @description Update existing invitee
// @route       PUT /api/v1/invitee/:id
export function updateInvitee(req: any, res: any, next: any) {
    res
    .status(200)
    .json({ "modified invitee": { id: req.params.id, name: "sam" } });
}

// @description Delete existing invitee
// @route       DELETE /api/v1/invitee/:id
export function deleteInvitee (req: any, res: any, next: any) {
    res
    .status(200)
    .json({ "deleted invitee": { id: req.params.id, name: "sam" } });
}