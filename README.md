# Tuzo E-Commerce Platform

A full-featured e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User Authentication & Authorization
- Product Catalog with Categories
- Shopping Cart Functionality
- Order Management
- Seller Dashboard
- Admin Panel
- Search Functionality
- Payment Integration
- Responsive Design

## Tech Stack

- **Frontend:** React.js, Redux Toolkit, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment:** Stripe Integration
- **Image Storage:** Cloudinary
- **Search:** Elasticsearch

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies for backend
```bash
cd backend
npm install
```

3. Install dependencies for frontend
```bash
cd frontend
npm install
```

4. Create .env file in backend directory with:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

5. Create .env file in frontend directory with:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
