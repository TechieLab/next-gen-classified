export class Register{
    public UserName : string;
    public EmailId : string;
    public FullName : string;
    public Password : string;
    public ConfirmPassword : string;
}

export class Login{
    public UserName : string; 
    public Password : string;
}

export class ChangePassword{
    public CurrentPassword : string; 
    public NewPassword : string;
}