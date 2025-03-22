# MediaHub - A Scalable Media Streaming Platform

MediaHub is a microservices-based media streaming platform similar to Amazon Prime, enabling users to upload, encode, and stream videos seamlessly. It utilizes **Express, TypeScript, AWS (S3, CloudFront), Kafka, PostgreSQL, MongoDB, and HLS streaming**.

---

## 🚀 Architecture Overview
MediaHub follows a microservices architecture, ensuring scalability, flexibility, and high availability. The key services are:

### 🛡️ User Service (Authentication & Authorization)
- Handles user registration, login, and authentication.
- Uses **JWT-based authentication** for secure access.
- Stores user data in **MongoDB**.

### 📤 Upload Service
- Handles video, audio, and image uploads.
- Stores media files in **AWS S3**.
- Validates file types and enforces size restrictions.

### 🎞️ Encoder Service
- Converts uploaded media into **HLS (HTTP Live Streaming) format** for adaptive streaming.
- Uses **FFmpeg** for video processing.
- Works asynchronously with **Kafka** for processing tasks.

### 📺 View Service
- Streams HLS-encoded videos to users.
- Integrates with **AWS CloudFront** for optimized delivery.
- Implements access control to ensure authorized viewing.

---

## 🏗️ Tech Stack
| Component      | Technology Used |
|--------------|----------------|
| **Frontend** | React, Next.js (planned) |
| **Backend**  | Express, TypeScript, Node.js |
| **Database** | MongoDB (User Service), PostgreSQL (Other Services) |
| **Cloud**    | AWS S3, CloudFront |
| **Messaging** | Kafka (for encoding tasks) |
| **Streaming** | HLS (HTTP Live Streaming) |

---

## 📌 Key Features
✔️ Secure JWT-based authentication & authorization  
✔️ Efficient media upload & storage using AWS S3  
✔️ Asynchronous encoding for adaptive bitrate streaming  
✔️ Optimized media delivery with AWS CloudFront  
✔️ Microservices architecture for scalability  
✔️ Event-driven architecture with Kafka  

---

## 📜 Future Enhancements
🔹 Implement a recommendation system using AI/ML  
🔹 Build a responsive frontend with **React & Next.js**  
🔹 Enhance monitoring with **Prometheus & Grafana**  

---

🚀 **MediaHub - Bringing Seamless Streaming to Everyone!**

