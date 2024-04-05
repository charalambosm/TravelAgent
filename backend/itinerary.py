# -*- coding: utf-8 -*-
"""
Created on Sat Apr 29 17:50:53 2023

@author: maxou
"""
import openai
import json
import re

client = openai.OpenAI()

class Itinerary():
    interests_dict = {
        'art': 'art and museums',
        'history': 'history and culture',
        'architecture': 'architecture and landmarks',
        'shopping': 'shopping',
        'nightlife': 'nightlife',
        'outdoor': 'outdoor activities'
        }
    
    def __init__(self, location, duration, arrival_date, interests):
        self.location = location['description']
        self.duration = duration
        self.arrival_date = arrival_date
        self.interests = [self.interests_dict[key] for key, value in interests.items() if value]
        self._initialize_message_history()
        
    def _initialize_message_history(self):
        self.message_history = []
        self.message_history.append({
            "role": "user",
            "content": "You are an AI travel agent. " +
            "Your job is to create a travel itinerary for a trip. " +
            "Your final response should be only a JSON string which includes an array of objects with an object for each day of the trip. " +
            "In your final response only include this JSON string and strictly nothing else. Do not include any other text before or after this. " +
            "Each object should have the names 'Morning' , 'Lunch' , 'Afternoon', 'Dinner' , 'Evening'. " +
            "Each value of the above should be a nested object with names 'Activity', 'Address', 'Recommended Visit Duration', 'Activity type'. " +
            "The value of 'Activity Type' should be a single choice from the following list: " +
            "'Art and museums', 'History and culture', 'Architecture and landmarks', 'Shopping', 'Nightlife', 'Outdoor activities', 'Food'. " +
            "All the names in the objects should be enclosed in double quotes. " +
            "You should also consider if the weather is expected to impact any outdoor activities during the time that I am visiting. " +
            "You should also include any particular place only once in the itinerary. Start."})
        
        # First question -> location
        self.message_history.append({
            "role": "assistant",
            "content": "Okay. Where do you want to go?"})
        self.message_history.append({
            "role": "user",
            "content": self.location})
        
        # Second question -> length of trip
        self.message_history.append({
            "role": "assistant",
            "content": f"Okay. How many days will you be staying in {self.location}?"})
        self.message_history.append({
            "role": "user",
            "content": self.duration})
        
        # Third question -> time of the year
        self.message_history.append({
            "role": "assistant",
            "content": f"Okay. Which date are you arriving in {self.location}? Specify as format DD-MM-YYYY."})
        self.message_history.append({
            "role": "user",
            "content": self.arrival_date})
        
        # Fourth questions -> interests
        self.message_history.append({
            "role": "assistant",
            "content": "Okay. What activities are you interested in doing?" +
            "Pick any of the following categories: 'Art and museums', 'History and culture', 'Architecture and landmarks', 'Shopping', 'Nightlife', 'Outdoor activities'"})
        self.message_history.append({
            "role": "user",
            "content": ", ".join(self.interests) + ". Strictly only include activities in 'Morning' and 'Afternoon' from these categories. 'Evening' should always be a 'Nightlife' activity."})
    
    def get_params(self):
        return {
            'location': self.location,
            'duration': self.duration,
            'date': self.arrival_date,
            'interests': self.interests
            }
    
    def get_itinerary(self):
        # Tell ChatGPT that we are finished
        self.message_history.append({
            "role": "assistant",
            "content": "Okay. Are you finished asking questions?"})
        self.message_history.append({
            "role": "user",
            "content": "Yes. Please provide your response as a valid JSON object, following exactly the pattern in the template:" +
            "```" + json.dumps(json.load(open('template.json'))) + "```. Do NOT include any other JSON keys. NEVER include ``` characters." })
        
        # Create a chat completion object to get a reply
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=self.message_history,
            temperature=0)
        
        # Return the JSON object from the reply
        reply_content = completion.choices[0].message.content
                
        return json.loads(reply_content)