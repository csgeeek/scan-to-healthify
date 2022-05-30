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

	const [upi, setUpi] = useState('');
	const [productDetails, setproductDetails] = useState(null);
	const dataRef = collection(db, 'food-products');
	const handleSubmit = async (e) => {

		e.preventDefault();

		const docRef = doc(dataRef, String(upi));
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setproductDetails(docSnap.data());
			// console.log("Document data:", docSnap.data());
		}
		else {
			setproductDetails(null);
			// console.log("No such document!");
		}
	}
  return (
    <div>
		<div className="form">
			<input type="text" placeholder='Enter UPI' onChange={(e) => setUpi(e.target.value)} />
			<button className='btn' onClick={handleSubmit}>Submit</button>
		</div>
		<Display productDetails={productDetails} />
    </div>
  )
}

export default DisplayForm;