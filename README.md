# ThreeJS - Museum Exhibition

This is a small project to create animations based on threejs library.

The main theme of the project is a museum exhibition, in which each art model will be shown together with their information, and user can move the model around to have the 360-degree observation of the model.

All models are taken from [Geoffrey Marchal](https://sketchfab.com/geoffreymarchal) under CC Attribution-NonCommercial-ShareAlike.

The format of the model is glTF (GL Transmission Format), the [recommended format of the official three.js documentation](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models).

# Team members

- Huong, Vu (s0575318)
- Hien, Tran (s0584617)

# Getting Started

## Prerequisites

- Download and install [Node.js](https://nodejs.org/en/download/)
- Install dependencies with:

`npm install`

## Deploying

- Run the command:

`npx vite`

- Go to http://localhost:5173 to see the website

## NOTE

Loading background and model might take a lot of time, please wait until the model had shown. Contact Huong Vu or Hien Tran for support if the model hasn't shown up after 7 minutes.

# Process

## Achievements (can be seen in src/museum.js)

- Create a scene
- Render the scene
- Add model to the scene
- Remove model from the scene
- Setup camera
- Setup directional light and ambient light
- Setup texture for background
- Set model to be at the center of the scene
- Render scene when window is resized
- Set OrbitControls to zoom in/out and rotate the model
- Non-Threejs achievements: fully designed museum website, model info is automatically updated when model is changed

### Small achievement

Successfully clone the [webgl_loader_mmd_audio](https://threejs.org/examples/?q=mmd#webgl_loader_mmd_audio) example from threejs website as a basic to learn about threejs. The clone website can be seen from http://localhost:5173/mikuDance.html

## Challenges

- Couldn't find the location of the model => Reason is the wrong position of camera
- The model color was almost fully white => The light is too strong, need to reduce it
- Canva size automatically increased to full screen when changing window size => Set the wrong size in setSize() function inside onWindowResize()
- Struggled to move the model to center, changing all kind of data didn't work => Set a bounding box cover the whole model
