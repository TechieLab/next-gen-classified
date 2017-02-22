export class Media
{
     DisplaySequence: number;
     Caption: string;
     Description: string;
     ImageType: string;
     ImageUrl: string;
     Name: string;
     SizeInBytes: number;
     Height: number;
     Width: number; 

     constructor(){
         this.Name = '';
         this.SizeInBytes = 0;
         this.Height = 0;
         this.Width = 0;
         this.ImageUrl = '';         
         this.ImageType = '';
     }
}