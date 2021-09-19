import { Document, Model } from "mongoose";

export interface IInvitee {
  enteredName: string;
  preferredName: string;
  inviteeStatus: string;
  contactEmail: string;
  contactNumber: string;
  preferredContact: string;
  invitedToCeremony: boolean;
  attendingCeremony: boolean;
  invitedToReception: boolean;
  attendingReception: boolean;
  dietaryNotes: string;
  additionalNotes: string;
}

export interface IInviteeDocument extends IInvitee, Document {}

export interface IInviteeModel extends Model<IInviteeDocument> {}
