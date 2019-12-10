import { parsePhoneNumberFromString } from 'libphonenumber-js'

const $ = x => document.getElementById(x)

let finalNums = []

async function handleFile(file) {
	let data 
    const reader = new FileReader();
	reader.readAsText(file.target.files[0]);

    reader.onload = async function(file) {

		data = file.target.result
		let rawNumsArray = await data.split('\n')
		console.log(rawNumsArray)

		await rawNumsArray.forEach(el => finalNums.push(parsePhoneNumberFromString(el)))
		console.log(finalNums)

    };

}


$('fileUpload').addEventListener('change', handleFile)
