from typing import Union
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import easyocr

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    print("file saved")
    reader = easyocr.Reader(['en'])
    result = reader.readtext(file_location)
    fstr = ''

    for tup in result:
        fstr += tup[1]
    return {fstr}

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
