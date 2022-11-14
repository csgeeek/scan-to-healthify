import React from 'react'
import Display from './Display'
import { useState, useEffect } from 'react';

import { db } from '../firebase-config';
import {
  collection, 
  getDoc,
  doc
} from 'firebase/firestore';

const DisplayForm = () => {

	const [upc, setUpc] = useState(null);
	const [file, setFile] = useState(null);
	const [productDetails, setproductDetails] = useState(null);
	const [fileName, setFileName] = useState('none')

	const dataRef = collection(db, 'food-products');


	const edit = useEffect(()=>{
		if(file !== null){
			console.log(file.name) 
			setFileName(file.name)
		}
	},file)

	const handleSubmit = async (e) => {

		e.preventDefault();
		if(file === null && upc === null) {
			alert('Please select a file or enter a UPC');
			return;
		}
			
		if(file !== null) {
			const formData = new FormData();
			formData.append('file', file);
			const res = await fetch('http://localhost:8000/upload', {
				method: 'POST',
				body: formData,
			});
			const json = await res.json();

			const docRef = doc(dataRef, String(json[0]));
			const docSnapshot = await getDoc(docRef);

			if(docSnapshot.exists()) {
				setproductDetails(docSnapshot.data());
			} else {
				setproductDetails(null);
			}

		}
		else{
			const docRef = doc(dataRef, String(upc));
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				console.log('s2');
				setproductDetails(docSnap.data());
			}
			else {
				console.log('mee2');
				setproductDetails(null);
			}
		
		}
	}
  return (
    <div>
		<div className="form">
			<div className='form-upload'>
			<input className='input-upload' type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
				<label className='input-upload' for="file">
					Choose file 
				</label>
			</div>
			<p>OR</p>
			<input className='input-text' type="text" placeholder='Enter UPC' type="number" onChange={(e) => setUpc(e.target.value)} />
			<br></br>
			<button className='btn' onClick={handleSubmit}>Submit</button>
			
				<p className={`choosed-file ${fileName === 'none' ? 'hidden' : null}`}>Choosed file: {fileName}</p>

			
		
		</div>
		<Display productDetails={productDetails} />
    </div>
  )
}

export default DisplayForm;