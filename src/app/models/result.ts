
export class Result {
    public Success: boolean;
    public Message: string;
    public Content: any;

    constructor(){
        this.Message = '';
        this.Success = false;
        this.Content = {}
    }
}