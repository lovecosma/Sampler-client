# This is the frontend for a Simple Web Audio Sampler

# What is a sampler?

A sampler is an electronic musical instrument which uses sound recordings (or "samples") of real instrument sounds (e.g., a piano, violin or trumpet), excerpts from recorded songs (e.g., a five-second bass guitar riff from a funk song) or found sounds (e.g., sirens and ocean waves). These sounds are then played back by means of the sampler program itself, a MIDI keyboard, sequencer or another triggering device (e.g., electronic drums) to perform or compose music.

This application allows users to upload new samples, or select from samples previously loaded by other users.

# How to use this Simple Audio Sampler:
  
  - make sure [backend](https://github.com/lovecosma/Sampler-backend) is installed and configured 
  - fork and clone this repo
  - run yarn install && yarn start in this repo's directory
  - Upload samples from your local machine or select from previously uploaded samples
    - Assign keyboard key and color to sample as well
  - Use keyboard or mouse to trigger samples and enjoy


# Visit heroku deploy:
- First, make sure the backend server is running https://audio-sampler-api.herokuapp.com/
- Visit frontend here https://audio-sample-client.herokuapp.com/

Video demo [here](https://youtu.be/Onyck4wJM5U)

# Key technology:

- Ruby on Rails - scalable and secure web framework utilizing MVC architecture with RESTful routes
- postgresql - SQL compliant relational database management system
- activerecord - object relational mapping library
- activestorage - storing files in pg database using activerecord
- aws-s3 - API allowing file storage in cloud
- heroku - deployment
- Tone.js - Web Audio API wrapper framework
- React/Redux - javascript framework for SPA client side rendering
