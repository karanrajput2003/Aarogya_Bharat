# Aarogya Bharat Admin Dashboard

## **Project Overview**
The Aarogya Bharat Admin Dashboard is a secure and intuitive interface for managing users, roles, and permissions in the Aarogya Bharat healthcare platform. Built for telehealth and urban healthcare management, it simplifies the administration of doctors, patients, and other roles, ensuring privacy and efficiency.

---

## **Key Features**
### **1. User Management**
- View, add, edit, and delete users.
- Assign roles to users and manage their status (Active/Inactive).
- Admin verify doctors and manage their status (Verified/Unverified).
- Filters for roles (Doctors, Patients, Administrators).

### **2. Role Management**
- Predefined roles (Administrator, Doctor, Patient) with customizable permissions.
- Add/Edit/Delete roles with role-specific attributes.
- Assign permissions dynamically.

### **3. Permissions Management**
- Manage permissions for roles with a matrix view.
- Categorized permissions for ease of understanding.
- Real-time updates for role-based access control.

### **4. Mock API**
- Simulates CRUD operations for users, roles, and permissions.
- Provides mock responses to validate the UI.

---

## **Tech Stack**
- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend (Mock API):** Node.js, Express, JSON Server
- **State Management:** Redux
- **Database (Optional):** MongoDB and AWS s3 

---

## **Installation**

1. **Clone the Repository**
   Frontend
   ```bash
   cd Aarogya-bharat
   npm install
   npm run dev
   ```
   Backend
   ```bash
   cd Backend
   npm install
   npm run dev
