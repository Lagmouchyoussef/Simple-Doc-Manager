# Simple-Doc-Manager

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?logo=javascript&logoColor=black)
![GitHub Repo stars](https://img.shields.io/github/stars/Lagmouchyoussef/Simple-Doc-Manager?style=social)

**Simple-Doc-Manager** is a lightweight, responsive, and fully functional Document Management System (DMS). Built entirely with Vanilla JavaScript, HTML5, and CSS3, this project demonstrates how to create a robust Single Page Application (SPA) without relying on external frameworks like React, Vue, or jQuery.

It features a clean user interface with real-time search, CRUD (Create, Read, Update, Delete) operations, and custom toast notifications.

---

## 📸 Screenshots

> *(Note: You can add a screenshot of your app here to make it look better!)*

---

## ✨ Features

*   **🔧 Full CRUD Operations:** Seamlessly Create, Read, Update, and Delete documents.
*   **🔍 Real-time Search:** Instantly filter the document list by title or author.
*   **🎨 Modern & Responsive UI:** Built with CSS Variables and Flexbox/Grid, ensuring a smooth experience on desktop, tablet, and mobile.
*   **🛡️ Security:** Implements HTML escaping (`escapeHtml`) to prevent XSS (Cross-Site Scripting) attacks.
*   **🔔 User Feedback:** Custom Toast Notification system for success/error messages (no native `alert()`).
*   **⚡ Zero Dependencies:** Pure performance. No build tools, no npm, no bloated libraries.
*   **🚀 Client-Side Logic:** All logic runs in the browser using an in-memory JavaScript array.

---

## 🚀 Getting Started

Since this is a static HTML/JS project, you don't need complex installation procedures. You can run it directly in your browser.

### Prerequisites
*   A modern web browser (Chrome, Firefox, Edge, Safari).

### Installation

**Option 1: Clone the Repository**
```bash
git clone https://github.com/Lagmouchyoussef/Simple-Doc-Manager.git
cd Simple-Doc-Manager
```
Open the `index.html` file in your preferred web browser.

**Option 2: Direct Download**
1.  Download `index.html`.
2.  Double-click to run.

---

## 📖 Usage Guide

### Adding a Document
1.  Fill in the **Title** and **Author** fields at the top of the page.
2.  Select a **Category** (HR, Finance, etc.) and a **Status** (Active/Inactive).
3.  Click the **"Save Document"** button.

### Editing a Document
1.  Locate the document in the table.
2.  Click the **"Edit"** button.
3.  Update the fields in the form and click **"Update"**.

### Deleting a Document
1.  Click the **"Delete"** button next to any document.
2.  Confirm the action in the browser prompt.

### Searching
*   Type keywords into the search bar ("Search by title or author...").
*   The list updates automatically to show matching titles or authors.

---

## 🧩 Technical Architecture

This project is structured as a single-page application using a Model-View-Controller (MVC) approach adapted for Vanilla JS.

*   **State Management:** Data is stored in the `documents` array.
*   **Controller:** Functions like `handleSave`, `deleteDocument`, and `filterDocuments` manipulate the state.
*   **View:** The `renderTable` function dynamically regenerates the HTML table based on the current state.
*   **Security:** User input is sanitized using the `escapeHtml` helper function before rendering.

### Technologies Used
*   **HTML5:** Semantic markup.
*   **CSS3:** CSS Variables for theming, Flexbox/Grid for layout.
*   **JavaScript (ES6+):** Arrow functions, Template Literals, Array methods (`filter`, `map`, `find`).

---

## 📝 Code Structure

```text
Simple-Doc-Manager/
├── index.html       # Main entry point (HTML + CSS + JS)
├── README.md        # Project documentation
└── assets/          # (Optional folder for screenshots)
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1.  Fork this repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5.  Push to the branch (`git push origin feature/AmazingFeature`).
6.  Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Lagmouchyoussef**

*   **GitHub:** [Lagmouchyoussef](https://github.com/Lagmouchyoussef)
*   **Project:** [Simple-Doc-Manager](https://github.com/Lagmouchyoussef/Simple-Doc-Manager)

---
*Built with ❤️ using pure Vanilla JavaScript*
