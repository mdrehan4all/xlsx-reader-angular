import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'xlsx-reader-angular';
  
  file: any;
  filelist: any;
  arrayBuffer: any;

  addfile(event: any)     
  {    
  this.file= event.target.files[0];     
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name];    
      console.log(worksheet)
      //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
      var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
      this.filelist = [];
      this.filelist = arraylist;    
      console.log(this.filelist)         
      console.log(worksheet['A1']['h']);
    
  }    
}

ngOnInit(): void {
  
}

}
