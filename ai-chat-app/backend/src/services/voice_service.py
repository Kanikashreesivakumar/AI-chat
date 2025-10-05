from fastapi import UploadFile, File
from pydub import AudioSegment
import requests
import os

class VoiceService:
    def __init__(self, whisper_api_url: str):
        self.whisper_api_url = whisper_api_url

    def convert_audio_to_text(self, audio_file: UploadFile):
        audio_path = f"temp_audio.{audio_file.filename.split('.')[-1]}"
        with open(audio_path, "wb") as f:
            f.write(audio_file.file.read())

        audio = AudioSegment.from_file(audio_path)
        audio.export(audio_path, format="wav")


        with open(audio_path, "rb") as f:
            response = requests.post(self.whisper_api_url, files={"file": f})

        os.remove(audio_path)  

        if response.status_code == 200:
            return response.json().get("text", "")
        else:
            raise Exception("Error in voice processing: " + response.text)