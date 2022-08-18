import { ApiService } from './services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'case';
  displayedColumns: string[] = ['objectiveType', 'title', 'description', 'periodStart', 'periodEnd', 'progressType','notes','riskObs','doBetter', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog, private api:ApiService){}


  openDialog() {
    this.dialog.open(AddComponent, {
      width:'50%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllObjectives();
      }
    });
  }
  ngOnInit(): void {
    this.getAllObjectives();
  }

  getAllObjectives(){
    this.api.getObjectives().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the records")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any){
    this.dialog.open(AddComponent,{
      width:'40%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllObjectives();

      }
    })
  }

  
  deleteObjective(id:number){

    this.api.deleteObjectives(id)
    .subscribe({
      next:(res)=>{
        alert("Objectives deleted successfully");
        this.getAllObjectives();
      },
      error:()=>{
        alert("Error while deleting the value!")
      }

    })

  }

}