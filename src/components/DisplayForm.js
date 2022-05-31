import React from 'react'
import Display from './Display'
import { useState } from 'react';

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

	const dataRef = collection(db, 'food-products');

	const handleSubmit = async (e) => {

		e.preventDefault();
		if(file === null && upc === null) {
			alert('Please select a file or enter a UPC');
			return;
		}
			
		if(file !== null) {
			const formData = new FormData();
			formData.append('file', file);
			fetch('http://localhost:8000/uploadfile', {
				method: 'POST',
				body: formData,
			})
			.then(res => res.json())
			.then(data => {
				setUpc(data);
				console.log(data);
			})
			.catch(err => console.log(err));
		}
		const docRef = doc(dataRef, String(upc));
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setproductDetails(docSnap.data());
		}
		else {
			setproductDetails(null);
		}


	}
  return (
    <div>
		<div className="form">
			<input type="file" onChange={(e) => setFile(e.target.files[0])} />
			<br></br>
			<input type="text" placeholder='Enter UPC' onChange={(e) => setUpc(e.target.value)} />
			<br></br>
			<button className='btn' onClick={handleSubmit}>Submit</button>
		</div>
		<Display productDetails={productDetails} />
    </div>
  )
}

export default DisplayForm;