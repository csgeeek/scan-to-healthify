# scan-to-healthify

This project identifies harmful ingredients in food products by capturing UPC of the barcode.

### Tech-stack:-
- React
- FastAPI
- EasyOCR
- Firebase

The captured image🖼 is sent from React front-end to EasyOCR script📜 for UPC extraction and will be returned to front-end. React and EasyOCR script are integrated using FastAPI. 

The extracted UPC is then sent to firestoredb🔥 which returns harmful ingredients.


## Working
Check out the working of my project [here](https://youtu.be/1FBrA8gWGQg).
