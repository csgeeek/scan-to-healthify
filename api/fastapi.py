from typing import Union
from fastapi import FastAPI


import easyocr

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.get("/images/{image_id}")
def read_image(image_id: str):
    reader = easyocr.Reader(['en'])
    result = reader.readtext(image_id)
    fstr = ''
    for tup in result:
        fstr += tup[1]
    print(fstr)
    print(type(fstr))
    return {fstr}
