# -*- coding: utf-8 -*-
"""
Created on Thu May 18 21:24:34 2023

@author: maxou
"""

import requests
import json
import os

places_url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'

def autocomplete(query):
    api_key = os.environ.get("GOOGLEMAPS_API_KEY")

    url = places_url + '?input=' + query + '&key=' + api_key + '&types=(cities)'

    payload = {}

    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)
    results = json.loads(response.text)['predictions']
    descriptions = [{'description': result['description'], 'id': result['place_id']} for result in results]
    return json.dumps(descriptions)