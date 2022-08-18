import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder, 
    private api:ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef:MatDialogRef<AddComponent>) { }
    actionBtn:string="Add"
  objectiveForm!:FormGroup;


  ngOnInit(): void {
    this.objectiveForm=this.formBuilder.group({
      objectiveType: ['',Validators.required],
      title: ['',Validators.required],
      description:['',Validators.required],
      periodStart:['',Validators.required],
      periodEnd:['',Validators.required],
      progressType:['',Validators.required],
      notes:['',Validators.required],
      riskObs:['',Validators.required],
      doBetter:['',Validators.required]
    }) //bir formbuilder yarattığım bu yapıdaki değişkenleri,html tarafında değişkenlerimi formcontrol name ile bağlayacağım.

    if(this.editData){
      this.actionBtn="Update"
      this.objectiveForm.controls['objectiveType'].setValue(this.editData.objectiveType);
      this.objectiveForm.controls['title'].setValue(this.editData.title);
      this.objectiveForm.controls['description'].setValue(this.editData.description);
      this.objectiveForm.controls['periodStart'].setValue(this.editData.periodStart);
      this.objectiveForm.controls['periodEnd'].setValue(this.editData.periodEnd);
      this.objectiveForm.controls['progressType'].setValue(this.editData.progressType);
      this.objectiveForm.controls['notes'].setValue(this.editData.notes);
      this.objectiveForm.controls['riskObs'].setValue(this.editData.riskObs);
      this.objectiveForm.controls['doBetter'].setValue(this.editData.doBetter);
      
    }
  }


  addObjective(){
    if(!this.editData)
    {
      if(this.objectiveForm.valid){ //form valid ise
        this.api.postObjective(this.objectiveForm.value) //apideki post objective objective form value değerlerini gönder
        .subscribe({  //subscribe ol dinle.
          next:(res)=>{
            alert("Objective added successfully!")
            this.objectiveForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding objective!")
          }
        })
      }
    }

    else{
      this.updateObjective()
    } 
  }

  updateObjective(){
      this.api.putObjectives(this.objectiveForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Objective updated successfully!")
          this.objectiveForm.reset();
          this.actionBtn="Add"

        },
        error:()=>{
          alert("Error while updating the record!")

        }
      })
  }

}
