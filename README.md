# **Clothing Shop Platform**

---

## **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)
4. [Project Structure](#projet-structure)

---

## **Features**

- **User Authentication**: Register, log in, and manage your profile.
- **Clothing Items**: Browse a catalogue of clothing options.
- **Search Filter**: Filter clothing items by size, color or price.

---

## **Tech Stack**

- **Frontend Framework**: [React]
- **Backend Framework**: [FastApi]
- **Styling**: [CSS]
- **API Integration**: [Fetch API] for connecting to the backend.
- **Build Tool**: [Vite]
- **Other Tools**:
- [React Router/ React Routing Library]
- [Echarts/Javascript Data Visualization Libarary]
- [SQLAlchemy / Object Relational Mapping for Database integration]
- [Pydandtic / API Response and Request Modeling]

---

## **Getting Started (Frontend)**

### **Prerequisites**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **Installation**

1. Clone the repository:

```bash

git clone https://github.com/ScreedVA/clothing-store-ecommerce-platform.git

```

2. Navigate to the project directory:

```bash

cd frontend

```

3. Install dependencies

```bash

npm install

```

### **Running the Application**

To start the development server, run:

```bash

npm run dev

```

For a production build:

```bash

npm run build

```

## **Getting Started (Backend)**

### **Prerequisites**

Make sure you have the following installed:

- [pip](https://pypi.org/project/pip/)

## **Installation**

1. Clone the repository(If havn't already):

```bash

git clone https://github.com/ScreedVA/clothing-store-ecommerce-platform.git

```

2. Navigate to the project directory:

```bash

cd backend\app

```

3. Activate virtual environement

```bash

python -m venv .venv

.venv\Scrips\activate

```

3. Install dependencies

```bash

pip install -r requirements.txt

```

```plaintext

├── src/
│   ├── assets/         # Images, icons, andother static assets
│   ├── components/     # Components and Pages
│   ├── templates/      # Reusable UI tempaltes
│   ├── services/       # API service files for backend integration
│   ├── App.js          # Main app component
│   ├── index.js        # Entry point for the application
├── public/             # Public assets like favicon, index.html
├── package.json        # Dependencies and project scripts


```
