# The Globetrotter Challenge

Globetrotter is an interactive travel-based guessing game where players use clues to guess destinations. It features score tracking, an invite system, and engaging UI elements.

---

## **Dataset**

A starter dataset was provided, and I expanded it to over 100 destinations using AI tools like ChatGPT. The extended dataset is stored in `destinations.json`. To populate the database, I created a script `insert_data.py`, which inserts the data into the `destinations` table.et

## Tech Stack & Choices

### **Backend: Flask (Python)**

- **Why Flask?**
  - Flask's minimalistic design allows quick setup and scalability. Its flexibility enables seamless API development, making it a great choice for interactive applications like this project.

### **Database: PostgreSQL**

- **Why PostgreSQL over MongoDB/MySQL?**
  - PostgreSQL offers structured storage for destinations, clues, and users while ensuring scalability with ACID compliance and efficient indexing. Its JSONB support allows handling semi-structured AI-generated data seamlessly.

### **Frontend: React (TypeScript)**

- React with TypeScript ensures type safety and scalability. Redux manages state efficiently, while MUI provides a polished UI. Framer Motion enhances animations, React Confetti adds celebration effects, and html2canvas enables capturing and sharing game moments.

- **Libraries & Tools:**
  - **Redux** – For state management.
  - **MUI** – For styling components.
  - **Framer Motion** – For smooth animations.
  - **React Confetti** – For celebration effects.
  - **html2canvas** – For capturing and sharing game moments.

### **Hosting & Deployment**

- **Railway for Backend** – Easy Flask deployment with built-in PostgreSQL support.
- **Vercel for Frontend** – Fast and scalable React hosting.

---

## 📌 Setup Instructions

### **Backend Setup**

```sh
# Clone the repository
git clone git@github.com:singhvishvendra700/globetrotter-challenge.git
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
flask run
```

### **Frontend Setup**

```sh
# Clone the repository
git clone git@github.com:singhvishvendra700/globetrotter-challenge.git
cd frontend

# Install dependencies
npm install

# Start the React app
npm run dev
```

---

## 🎮 How It Works

**Fetching Clues**: The app fetches a random destination and displays clues.
**Answer Selection**: Users choose an answer from the given options.
**Answer Validation**: The app checks whether the selected answer is correct.
**Celebration Effects**: If correct, confetti and animations enhance the experience.
**Score Update**: If correct, the user’s score increases.
**Fun Fact Display**: A fun fact about the destination is shown after answering.
**User Registration**: Users enter a username to start sharing.
**Invite Friends**: Users can generate an invite link to challenge their friends.

---
