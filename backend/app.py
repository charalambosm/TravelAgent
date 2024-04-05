# -*- coding: utf-8 -*-
"""
Created on Sat Apr 29 17:33:30 2023

@author: maxou
"""
from flask import Flask, request, jsonify
from firebase_util import FirebaseUtil
from itinerary import Itinerary
from google_util import autocomplete
from uuid import uuid4
from dotenv import load_dotenv

# Initialize Flask app
app = Flask(__name__)

# Load .env file with environment variables
load_dotenv()

# Initialize FirebaseUtil object
firebaseUtil = FirebaseUtil()

itinerary = None

@app.get("/itinerary")
def get_itinerary():
    code, message = firebaseUtil.authorize(request)
    if code == 401:
        return jsonify(error="Unauthorized access."), 401

    if itinerary:
        response = {}
        response['itinerary'] = itinerary.get_itinerary()
        response['id'] = uuid4().hex
        response['params'] = itinerary.get_params()
    else:
        return jsonify(error="No itinerary has been initialized."), 400
    
    if response:
        return response, 200
    else:
        return jsonify(error="Unknown error has occured. Please try again."), 500

@app.post("/initialize")
def initialize():
    # Authorize request
    code, message = firebaseUtil.authorize(request)
    if code == 401:
        return jsonify(error="Unauthorized access."), 401

    # Get data in the request
    request_data = request.get_json()
    location = request_data['location']
    duration = request_data['duration']
    arrival_date = request_data['date']
    interests = request_data['interests']
    
    # Initialize itinerary
    global itinerary 
    itinerary = Itinerary(location, duration, arrival_date, interests)
    
    # Return success code
    return itinerary.message_history, 201

@app.get("/search_location")
def search_location():
    # # Authorize request
    code, message = firebaseUtil.authorize(request)
    if code == 401:
        return jsonify(error="Unauthorized access."), 401
        
    # Get data in the request
    query = request.args.get('query')
    
    return autocomplete(query), 200
        

if __name__ == "__main__":
    app.run(port=5000)