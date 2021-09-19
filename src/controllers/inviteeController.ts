// @description Get all people invited
// @route       GET /api/v1/invitee
export function getInvitees(req : any, res: any, next: any) {
    res.status(200).json([{ name: "sam" }, { name: "karen" }]);
}

// @description Get person invited by ID
// @route       GET /api/v1/invitee/:id
export function getInvitee(req: any, res: any, next: any) {
    res.status(200).json({ id: req.params.id, name: "sam" });
}

// @description Invite new person
// @route       POST /api/v1/invitee
export function createInvitee(req: any, res: any, next: any) {
    res.status(200).json({ "created invitee": { name: "sam" } });
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