import {SignUpValidator} from "../validator";

export const fieldsDef = ["email", "username", "password"];

export const submissionUrl = '/create_social_user';

export const submissionTitle = "Continue";

export const validator = new SignUpValidator();
