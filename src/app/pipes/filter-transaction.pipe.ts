import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTransaction'
})
export class FilterTransactionPipe implements PipeTransform {

  transform(transactionArray:any[],searchKey:string,property:string):any[] {
    // transactionArray - array want to visible change

    const result:any=[];
    if(!transactionArray || searchKey=="" || property==""){
      return transactionArray
    }
    transactionArray.forEach((item:any)=>{
      if(item[property].trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        return result.push(item) 
      }
    })
    return result;

  
  }
}


    



