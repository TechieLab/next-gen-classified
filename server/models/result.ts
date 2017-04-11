export class Result{
    Message : string;
    Success : boolean;
    Content : any;

    constructor(){
        this.Message = '';
        this.Success = false;
        this.Content = null;
    }
}