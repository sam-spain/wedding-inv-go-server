import { model } from "mongoose";
import { IInviteeDocument } from "./invitee.types";
import InviteeSchema from "./invitee.schema";

export const InviteeModel = model<IInviteeDocument>("invitee", InviteeSchema);
