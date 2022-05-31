from typing import Union
from fastapi import FastAPI, File, UploadFile


import easyocr

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/uploadfile")
async def create_upload_file(file: UploadFile):
    print(file.filename)
    file_location = f"files/{file.filename}"
    print(file_location)
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    return {"info": f"file '{file.filename}' saved at '{file_location}'"}

@app.post("/upload")
async def read_image(file: UploadFile):
    print(file.file)
    reader = easyocr.Reader(['en'])
    result = reader.readtext()
    fstr = ''
    for tup in result:
        fstr += tup[1]
    print(fstr)
    print(type(fstr))
    return {fstr}
