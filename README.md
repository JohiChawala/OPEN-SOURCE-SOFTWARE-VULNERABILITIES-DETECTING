# 🔐 Detecting Open-Source Software Vulnerabilities Using AI

This repository contains the complete implementation of the Final Year Project titled **"Detecting Open-Source Software Vulnerabilities Using AI."** It is a full-stack web application that allows users to upload C/C++ source code and automatically detects software vulnerabilities using Abstract Syntax Tree (AST) analysis and a trained Deep Learning model.

---

## 📚 Project Objective

The goal of this project is to automate the detection of vulnerabilities in open-source software by integrating AI-based techniques, particularly AST parsing and GNN models. The system provides developers with a powerful tool to analyze and get real-time reports of security flaws in their code, along with known vulnerabilities from CVE/NVD databases.

---

## 🛠️ Technologies Used

| Layer          | Technologies                             |
|----------------|-------------------------------------------|
| Frontend       | ReactJS, JavaScript, HTML5, CSS3          |
| Backend        | NodeJS, ExpressJS                         |
| Database       | MongoDB, Mongoose                         |
| AI Engine      | Python, TensorFlow, Keras, FastAPI        |
| AST Parsing    | pycparser, Clang                          |
| APIs           | CVE / NVD REST APIs                       |
| Tools          | Postman, VS Code, Git, GitHub             |

---

## 📁 Project Structure


frontend/

├── public       
├── src/    

│   ├── assets

│   ├── css

│   ├── components/

│   │   ├── About.js  
│   │   ├── AnalysisResults.js  
│   │   ├── AuthContext.js  
│   │   ├── CodeAnalyzer.js  
│   │   ├── Contact.js  
│   │   ├── Footer.js  
│   │   ├── Header.js  
│   │   ├── Login.js  
│   │   ├── Root.js  
│   │   ├── Routing.js  
│   │   ├── Signup.js  

backend/

├── routes/ 

│   ├── authRoutes.js

│   ├── codeRoutes.js

├── models/

├── .env              
├── index.js      

integration/

├── API access.ipynb            
├── main.py                     
├── model.py                   
├── gnn_trained.pth           
├── node_encoder.pt            

---

## 🚀 Installation & Setup Guide

### 1. 📦 Clone the Repository

git clone https://github.com/JohiChawla/OPEN-SOURCE-SOFTWARE-VULNERABILITIES-DETECTING.git

cd OPEN-SOURCE-SOFTWARE-VULNERABILITIES-DETECTING

---
### 2. ⚙️ Backend Setup (NodeJS)

cd backend

npm install

Create a .env file in the backend/ directory and add the following:

- PORT=5000

- MONGO_URI=mongodb://localhost:27017/fypdb

- JWT_SECRET=your_jwt_secret

npm start

---

### 3. 💻 Frontend Setup (ReactJS)

cd frontend

npm install

npm start

This will launch the app at: http://localhost:3000

---

### 4. 🤖 AI Engine Setup (FastAPI + Python)

cd integration

uvicorn main:app --reload --port 8000

---

## 🔄 System Workflow

1. User registers or logs in via the frontend.

2. Uploads .c or .cpp source code.

3. Backend parses the code and generates an AST.

4. AST is sent to the Python-based AI model via FastAPI.

5. Model predicts vulnerable code lines.

6. CVE/NVD APIs provide metadata on identified vulnerabilities.

7. A complete report is generated and shown to the user.

8. Data is saved in MongoDB for future access.

---

## 📊 Example Use Case

- A developer uploads a C code file.

- The system detects a potential buffer overflow on line 27.

- The CVE integration returns that this matches CVE-2023-XXXXX.

- The user is notified of the vulnerability severity and suggestions.

---

## 👨‍🎓 Authors

Johi Chawla – Full Stack Developer / AI Engineer

Supervisor Name – Dr. Javed Shahani

Institute Name – Sukkur IBA University

---
## 🧾 License

This project is licensed under the MIT License – for academic and learning purposes only.

---
## 📬 Contact
📧 Email: johichawala33@gmail.com

🌐 LinkedIn: https://www.linkedin.com/in/johi-chawla-~jc-55648a267/



