import os
import sys
import boto3
import requests
from html2image import Html2Image

session = boto3.Session(profile_name=sys.argv[1], region_name="ap-southeast-1")
s3 = session.client("s3")
raw_folder_name = sys.arg[2]
templated_folder_name = sys.arg[3]

hti = Html2Image(size=(1530*4,1024*4))

template_url = "https://awscc-photobooth-app.s3.ap-southeast-1.amazonaws.com/assets/template.html"
html_content = requests.get(template_url).text
for index, file_name in enumerate(os.listdir(raw_folder_name)):
    html_content = html_content.replace("{{ IMG_LINK }}", f"{raw_folder_name}/{file_name}")
    hti.screenshot(html_str=html_content, save_as=f"{raw_folder_name}/{(index+1):02}.png")
    s3.upload_file(Filename=f"{(index+1):02}.png", Bucket="awscc-photobooth-app", Key=f"templated_photos/079/{(index+1):02}.png")