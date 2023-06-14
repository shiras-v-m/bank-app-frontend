import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder } from '@angular/forms';
import jspdf from 'jspdf'
import 'jspdf-autotable';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit{
  searchKey:string=""
  transactions:any
 

  constructor(private api:ApiService,private toaster:ToasterService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.api.getTransactions().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.transactions=res
      },
      error:(err:any)=>{
        console.log(err.error);
        this.toaster.showError(err.error,"Failed")
      }
      
    })

  }


  generatePDF(){
    // create an object for jspdf
    let pdf=new jspdf()

    // create title row
    let title_row=['Type','Debit Account','Credit Account','Amount']
    
    // table_body should be array of array
    let table_body:any=[]

    pdf.setFontSize(16) //fontsize for heading
    pdf.text("All transactions",10,10)
    pdf.setFontSize(12) //fontsize for body
    
    //convert transaction to array of arrray (transactions type is array of object)
    for(let element of this.transactions){
      var temp=[element.transaction_Type,element.fromAcno,element.toAcno,element.amount]
      table_body.push(temp)
    }

    (pdf as any).autoTable(title_row,table_body)
    
    // view in new tab
    pdf.output('dataurlnewwindow')
    
    // download pdf
    pdf.save('transaction.pdf')
  }

}
