import { parsePhoneNumberFromString, parse } from "libphonenumber-js";
import { getCode } from "country-list";

const $ = x => document.getElementById(x);

let finalNums = [];

// parse csv to js
const handleFile = async file => {
  let data;
  const reader = new FileReader();

  // read from file input
  reader.readAsText(file.target.files[0]);


  // post read, parse to array
  reader.onload = async function(file) {
    data = file.target.result;
    let parsedRowRaw = await data.split("\n");
    let buffer = [];
    parsedRowRaw = await parsedRowRaw.map(el => el.split(','))
    let rawNums = parsedRowRaw

    // replace countries with ISO codews
    for(let i = 0; i < parsedRowRaw.length; i++){
      if(parsedRowRaw[i][1].length > 0){
        parsedRowRaw[i][1] = getCode(parsedRowRaw[i][1].replace(/^\s+|\s+$/g, ''))
      }
    } 

    // parse into phone number where el[0] === rawNum, el[1] === iso
    await parsedRowRaw.forEach(el => {
      if(el[0] !== '' && el[1] !== ''){
        buffer.push(parsePhoneNumberFromString(el[0], el[1]))
      }
      else if(el[0] !== '' & el[1] === ''){
        buffer.push(parsePhoneNumberFromString(el[0]))
      }
      else{
        buffer.push('')
      }
    }
      
    );
    
    console.log(buffer)
    buffer.forEach(el => {
      if(el === undefined || el === ""){
        finalNums.push("")
      }
      else{
        finalNums.push(el.number)
      }
    })

    console.log(finalNums)

  
  let csvContent =  "data:text/csv;charset=utf-8," +
      finalNums.join("\n")

      console.log(csvContent)
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "convertedNums.csv");
      document.body.appendChild(link); 
      
      link.click();

  };
};



$("fileUpload").addEventListener("change", handleFile);
