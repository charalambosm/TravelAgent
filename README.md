# Travel Agent
Welcome to Travel Agent! This project is for building a cross-platform AI-powered mobile application for generating your personal travel itineraries, for a trip to any location in the world! ✈️🌍

🚧 **This project is work under development!** 🚧

## Technical overview
The frontend is built using React Native and Expo and can be found in the `frontend` folder. It is using Axios to perform HTTP requests to a Python backend, built using Flask, found in the `backend` folder. The Flask backend is running as a containerized web application in a Kubernetes Engine on Google Cloud Platform.

Windows BAT scripts are included in the `scripts` folder, which can be used to deploy web application to Google Cloud Platform. They are based on Google's documentation on [Deploying a containerized web application](https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app).

The backend is leveraging the power of generative AI and Open AI's API, to generate your personal travel itinerary given the following parameters: location, duration, dates and user interests. For more information on Open AI's API see: [OpenAI API Documentation](https://platform.openai.com/docs/introduction).

Google's Place Autocomplete API is also used to search and autocomplete the location search in the app. The documentation for this can be found at: [Place Autocomplete](https://developers.google.com/maps/documentation/places/web-service/autocomplete).

Google's Firebase Authentication and Realtime Database are also used and configured for user authentication and data storage.

## Installation
As the project is still under development, installation instructions will be provided once the project reaches a stable release.

## Contributing
Contributions are welcome! Feel free to contact me at my email address (cmaxoutis79@gmail.com) for details on how to get started.

© 2024 Charalambos Maxoutis. All rights reserved.
