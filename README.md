# Arduino-Hologram-Photobooth

## Abstract
The interactive hologram display is an art installation leveraging a live holographic projection rendered using p5.js, multiple sensors, inputs and outputs, and user interaction. A virtual copy of the user is projected in an ephemeral, intangible and transient hologram to delineate the role of art in a technological era, whereby digital reproductions of objects that exist in the physical world are created in cyberspace devoid of a physical embodiment. This contrasts every day life, in which objects are touched, change and decay. In the physical world, individuals are able to interact with every day objects in ways that allow us to experience their materiality and changes in material states - qualities that have meaning for us as material beings. Users of this installation experience interacting with version of themselves from the outside, disembodied, looking in, reinforcing the notion of spectatorship rather than the experiential; a result of the technological era.
Motion, movement, and proximity to the webcam, however, activates different filters to represent the multifaceted nature of a user. This interactivity transforms the user as not only creators or controllers of art but also into the art object itself, thereby encouraging users to participate in the creation, production, and distribution of art. This project ultimately emphasises the democratisation of a domain such as art and curation that was previously exclusive only to a cultural and economic elite.

## Interaction Overview
Users are positioned in a dark room and interact with a live webcam stream, which projects the feed onto a see-through pyramid structure made with acetate plastic to achieve a 3D hologram effect in a floating display. An LED strip is attached to an Arduino attached to a power supply and taped to the webcam to subtly introduce brightness amidst the darkness and aid the ultrasonic sensor attached to another Arduino, which
detects movement proximity to accordingly activate various filters using frame differencing programmed on p5.js. Each pixel in the previous and current frame is extracted, stored and analysed after which RGB values are randomised and assigned to the subsequent frame with an additional invert, posterise and blur effect readily available to use on p5.js.
A primary push button attached to the Arduino allows users to manually manipulate and flick through the different filters. The processed output is rendered four times and rotated around the origin, streamed on a live server from the PC to a tablet mounted on a box, and reflected against the four-sided plastic pyramid to create the illusion of the holographic projection at the centre of a screen.
A secondary push button allows users to take a screenshot of the frame and access their images by storing it locally on the computer and also on an online Google Firebase storage as a public object. A hyperlink to the object is then rendered on a separate HTML file for users to access easily.

## Files
Refer to index.js, index.html (replace config details for Firebase), and style.css for the main project files. Refer to test.js and main.html for Node.js files and uploading images to Google Firebase from your local computer. 

## Images
### Project Images
<img width="1524" alt="Screenshot 2022-05-23 at 01 26 42" src="https://user-images.githubusercontent.com/100088624/169710143-5ea8ac29-7e8b-47d3-a6d5-b7157de4907a.png">
<img width="1524" alt="Screenshot 2022-05-23 at 01 26 23" src="https://user-images.githubusercontent.com/100088624/169710161-8f0c2520-91ae-4704-a752-e67ffa45f4e1.png">

### Acetate Paper Cone attached to Tablet
<img width="904" alt="Screenshot 2022-05-23 at 01 25 39" src="https://user-images.githubusercontent.com/100088624/169710171-2be44344-0d5c-45b5-9132-83f23c696492.png">

### Set Up
<img width="899" alt="Screenshot 2022-05-23 at 01 25 32" src="https://user-images.githubusercontent.com/100088624/169710177-d1782f9a-30c1-4784-8311-45c05e2d080c.png">
![Uploading Screenshot 2022-05-23 at 01.25.24.png…]()

### Image Screenshot
<img width="1018" alt="Screenshot 2022-05-23 at 01 25 06" src="https://user-images.githubusercontent.com/100088624/169710201-379e6403-8035-4bc7-a71a-d9180e0c5cbb.png">

### Arduino Schematic Diagram
<img width="494" alt="Screenshot 2022-05-23 at 01 24 54" src="https://user-images.githubusercontent.com/100088624/169710209-49f3b619-a139-4eea-89f7-7b0d698ad8ee.png">
