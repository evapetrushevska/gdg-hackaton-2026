import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")

if not API_KEY:
    print("ERROR: TMDB_API_KEY was not found in .env")
    exit()

print("API key loaded:", API_KEY[:6] + "...")

url = "https://api.themoviedb.org/3/movie/550"

params = {
    "api_key": API_KEY,
    "language": "en-US"
}

response = requests.get(url, params=params)

print("Status code:", response.status_code)
print("Response:", response.text)

if response.status_code == 200:
    data = response.json()
    print("Movie title:", data.get("title"))
    print("Release date:", data.get("release_date"))