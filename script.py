import easyocr

reader = easyocr.Reader(['en'])
result = reader.readtext('test4.jpg')

print(result)