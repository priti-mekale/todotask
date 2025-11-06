import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
 interface Itodos{
    todoItem:string,
    todoId:string
}
@Component({
  selector: 'app-todotask',
  templateUrl: './todotask.component.html',
  styleUrls: ['./todotask.component.scss']
})
export class TodotaskComponent implements OnInit {
todoArray : Array<Itodos> = [
  {
  todoItem :'JavaScript',
  todoId :'1234',

}]
isInEditMode : boolean=false;
// formMode:"ADD"|"EDIT"="ADD"

@ViewChild('todoItem') todoItemRef!:ElementRef
  constructor(private _matSnackBar:MatSnackBar) {}

  ngOnInit(): void {}

   onTodoAdd(todoItemcontrol:HTMLInputElement){
if(todoItemcontrol.value.length>0){
      let todoObj :Itodos={
      todoItem:todoItemcontrol.value,
      todoId:this.uuid()

    }
    todoItemcontrol.value=''
   this.todoArray.unshift(todoObj)
   this._matSnackBar.open(`New todo item added successfully !!!`,"Close",{
    duration:3000,
    horizontalPosition:'left',
    verticalPosition:'top'

   })
   //create a new li on ui
}

}

  onTodoRemove(todoId: string) {
    //get remove id
let Remove_id=todoId;
console.log(Remove_id)

    //get indexnumber of the object
    const Get_index = this.todoArray.findIndex(todo => todo.todoId === todoId);
    //remove object from array
    this.todoArray.splice(Get_index, 1);
     this._matSnackBar.open(`The todo item with id${todoId} Removed successfully !!!`,"Close",{
    duration:3000,
    horizontalPosition:'left',
    verticalPosition:'top'

   })
   }





   onTodoEdit(todoOBJ :Itodos){
    //edit-id on == true
    this.isInEditMode=true
    console.log(todoOBJ)
    //Edit_id
   let EDIT_Id=todoOBJ.todoId;
   localStorage.setItem("EDIT_Id",EDIT_Id)
  
    //patch data in form
    this.todoItemRef.nativeElement.value=todoOBJ.todoItem

  
   }
onUpadateTodo(todoItemc: HTMLInputElement) {
  // update_id
  let Update_Id = localStorage.getItem("EDIT_Id");
  localStorage.removeItem("EDIT_Id");

  if (Update_Id) {

    // updated object
    let Updated_obj: Itodos = {
      todoItem: todoItemc.value,
      todoId: Update_Id
    };
    console.log(Updated_obj);

    // update in array
    const Get_index = this.todoArray.findIndex(todo => todo.todoId === Update_Id);

  
      this.todoArray[Get_index] = Updated_obj; // update object in array
    
this.isInEditMode=true
 this._matSnackBar.open(`The todo object with id ${Update_Id} updated successfully !!!`,"Close",{
    duration:3000,
    horizontalPosition:'left',
    verticalPosition:'top'

   })
    // clear input
    todoItemc.value = "";
  }
}


     uuid() {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });
};


}
