import './App.css';
import { db } from './firebase-config';
import {
  collection, getDocs, getDoc, doc, query, where
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

const App = () => {

  const [data, setData] = useState([]);
  const dataRef = collection(db, 'food-products');
  useEffect(() => {
    const getData = async () => {
      const docs = await getDocs(dataRef);
      // console.log(docs.docs);
      setData(docs.docs.map(doc => ({...doc.data(), id: doc.id})));
    };
    getData();
  }, []);
  
  const findDataByUPC = async () => {
    const docRef = doc(dataRef, "028000549657");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        Hello World
        {/* {findDataByUPC()} */}
        {
          data.map((datum) => {
            return(
              <div>
                <h2>{datum.name}</h2>
                {
                  datum["harmful-ing"].map((ing) => {
                    return (
                      <div>
                        <p>{ing}</p>
                      </div>
                    )
                  })
                }
              </div>
            );
          })
        }
      </header>
    </div>
  );
}

export default App;
