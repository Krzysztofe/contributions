# Contributions

An commercial application commissioned by a labor union. Aplication created after consultations with union activists for the use of the treasurer of a workers' union commission.  Using the application, the treasurer can record contributions and send e-mail messages to commission members who have not paid their contributions.

1 The user, who serves as the treasurer of the commission, saves list of commission members in the settings panel. </br>


   <div align="center">
  <img src="https://github.com/Krzysztofe/contributions/assets/96065197/0f9d89af-b1ed-4790-b4bb-aeb87f0abd47" alt="html5" width="450" height="200" /> 
</div> 
<br/>
2 In the calendar panel, there is a table showing the record of contributions paid throughout the year by each member of the commission. </br>3 In this table user mark whether a particular member has paid the contribution for a given month. </br> 4 There are two methods for recording contributions:
<br/>
fast method </br> 
  <div align="center">
  <img src="https://github.com/Krzysztofe/contributions/assets/96065197/d99e2b8b-15f6-4055-93cf-d8a6287d85fb" alt="html5" width="450" height="200" /> 
</div>

slow method </br>

  <div align="center">
  <img src="https://github.com/Krzysztofe/contributions/assets/96065197/bf9b1059-7f91-4117-b083-fef45a78d177" alt="html5" width="450" height="200" /> 
</div>
</br>

5 The user can send e-mail messages to members who have not paid their dues, requesting that they transfer the dues to the commission's account. The application uses a backend service written in PHP to send emails. </br>

  <div align="center">
  <img src="https://github.com/user-attachments/assets/51dfcbef-64b3-43d5-8557-df54bf646153" alt="html5" width="450" height="200" /> 
</div>



6 The user can create a PDF with a summary of contributions for each year stored in the database. </br> 7 Application uses a backend built in PHP.

Application is written according to the principles of OOP (Object-Oriented Programming). HTML elements are dynamically created, such as in the case of forms or tables, using objects with basic data passed in arrays to appropriate methods in classes instances that generate these HTML elements.


## Vesion for users tests deployed on home.pl server: https://skladki.ozzip.pl/ <br/> <div>(you can add your e-mail address and send the information about the overdue payments)</div>

## Production Vesion: https://skladkiuam.ozzip.pl/

## Desktop


<div align="center">
 <img src="https://github.com/Krzysztofe/contributions/assets/96065197/8dff3070-34db-4d3d-b089-e2e67ba1fa93" alt="html5" width="504" height="300" margin = "30"/> 
</div>
 <div align="center">
 <img src="https://github.com/Krzysztofe/contributions/assets/96065197/c1a943da-f44f-4dce-ac98-17992bc169b4" alt="html5" width="250" height="100" margin = "30"/> 
</div>

## Mobile




 <div align="center">
<img src="https://github.com/Krzysztofe/contributions/assets/96065197/d8341b6c-c52c-4c5d-b7b3-e80614923e47" width="300" alt="Mobile Screenshot" margin="30">

  <img src="https://github.com/Krzysztofe/contributions/assets/96065197/bc340947-f8fd-476e-b0ef-5e7f34725530" width="300" alt="Mobile Screenshot">
</div>

## Features

* Comunication with database - GET, POST, PATCH, DELETE
* Auth 
* Forms / validations
* Tables
* HTTP requests state messages for user
* Creating a PDF with data stored in a database
* Debouncing
* RWD
* Custom alerts / popups
* Automatic logout after five minutes
* Animations


## Technologies

* Tailwind / daisyUI
* JavaScript / TypeScript / OOP / MVC Pattern
* RegExp
* LocalStorage
* Vite

## Libraries

* jsPDF

## Prerequisites
* Before getting started, make sure you have the Node.js and npm or yarn
* Node version: **Node.js v18.16.1**
* Clone this repository to your local machine
* Navigate to the project directory: **cd .\contributions**
* Install the project dependencies by running **npm install** 
* Start the development server: **cd .\contributions\ npm run dev** 
* Open your browser and visit your localhost:3000 to see the running application.
* The environmental variables are commented out in the apiUrls file.
