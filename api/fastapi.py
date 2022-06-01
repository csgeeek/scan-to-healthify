# create a folder "images"
# works faster on gpu

from typing import Union
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import easyocr
from fastapi.responses import HTMLResponse

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


def generate_html_response():
    html_content = """
    <html>
        <head>
            <title>FastApi</title>
        </head>
        <body>
            <h1>Server</h1>
            <div style="height: 78vh"></div>
        </body>
        <footer>
            <p style="text-align: center">&#169; csgeek</p>
        </footer>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)


@app.get("/", response_class=HTMLResponse)
async def read_items():
    return generate_html_response()


@app.post("/upload")
async def create_upload_file(file: UploadFile):
    print("Filename: " + file.filename)
    file_location = f"images/{file.filename}"
    print(file_location)
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())

    print("file saved at " + file_location)
    reader = easyocr.Reader(['en'])
    result = reader.readtext(file_location)

    res = ''
    for tup in result:
        res += tup[1]

    print("response: " + res)
    return {res}


# test

@app.post("/uploadstream")
async def read_image(file: UploadFile):
    print(file.file)
    IMAGE_PATH = 'test4.jpg'
    reader = easyocr.Reader(['en'])
    result = reader.readtext(IMAGE_PATH)
    fstr = ''
    for tup in result:
        fstr += tup[1]
    print(fstr)
    print(type(fstr))
    return {fstr}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}


# @app.get("/")
# def read_root():
#     return """
#     <html>
#         <head>
#             <title>Some HTML in here</title>
#         </head>
#         <body>
#             <h1>Look ma! HTML!</h1>
#         </body>
#     </html>
#     """
