# scan-to-healthify

This project identifies harmful ingredients in consumer products by capturing UPC of the barcode.

### Tech-stack:-
- React
- FastAPI
- EasyOCR
- Firebase

The captured image🖼 is sent from React front-end to EasyOCR script📜 for UPC extraction and will be returned to front-end. React and EasyOCR script are integrated using FastAPI. 

The extracted UPC is then sent to firestoredb🔥 which returns harmful ingredients.
