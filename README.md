# Aarogya Bharat

Aarogya Bharat is a comprehensive telehealth platform designed to transform healthcare management in urban areas. It bridges the gap between doctors, patients, and administrators, enabling seamless interaction, secure medical record management, and scalable healthcare services.

## Features

### User Management
- **Multi-role Access**:
  - **Patients**: Access medical records, book appointments, consult doctors via video, and view e-prescriptions.
  - **Doctors**: Manage patient records, conduct virtual consultations, issue e-prescriptions, and manage schedules.
  - **Administrators**: Oversee platform operations, manage users, roles, and permissions, and monitor analytics.
- **Role-Based Dashboards**: Tailored dashboards for each user type with actionable insights and metrics.

### Telehealth Services
- **Video Chat and Messaging**: Real-time communication for virtual consultations (Currently Not Deployed successfully inplemented on the local host (server directory)).
- **QR Code Integration**: Secure access to medical records using QR codes.

### AI-Powered Chatbot (Currently Not Deployed successfully inplemented on the local host).
- Provides:
  - Home remedies for common ailments.
  - Suggestions for nearby medical facilities and doctors.
- Multilingual support.

### Appointment and Resource Management
- **Appointment Booking**: Real-time scheduling and notifications on the mail.
  
## Technical Stack

### Frontend
- **Framework**: React.js (Vite for development)
- **Styling**: Tailwind CSS
- **State Management**: Redux

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB and AWS(Medical Records Storage)
- **Authentication**: JWT-based token authentication
- **APIs**: RESTful APIs for all operations

### Third-Party Integrations
- **Video Conferencing**: WebRTC
- **Payment Gateway**: PhonePe
- **Chatbot**: Dialogflow/Custom AI-based NLP
## **Installation**

1. **Download this repositary**
   - Frontend
   ```bash
   cd Aarogya_Bharat
   npm install
   npm run dev
   ```
   - Backend
   ```bash
   cd Backend
   npm install
   npm run dev
   ```
   - Video Call
   ```bash
   cd server
   npm install
   node app.js
