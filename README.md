# Tech Hunt Point

## Description
The Tech Hunt Point is a web application where users can discover, share, and interact with innovative tech products. It features a comprehensive system of user roles, a rich interface, and functionalities that facilitate interaction and content moderation.

## Live Demo
🔗 [Visit Tech Hunt Point](https://tech-hunt-point.web.app/)

## Features
### General Features
- The website is fully responsive, providing a seamless experience on mobile, tablet, and desktop devices.
- Private routes ensure secure and seamless navigation.
- Search and filter available products by tags.
- Secure login system using JSON Web Tokens for both email/password and Google sign-in.

### User Features
- Browse and view the latest tech products, categorized as web apps, AI tools, software, games, mobile apps, etc.
- Submit new tech products for review.
- Upvote and report products (limited to one action per product).
- Post and view reviews on product details pages.
- Subscribe for premium membership to unlock additional benefits, such as removing product submission limits.

### Moderator Features
- Review and approve/reject submitted products.
- Mark products as "featured" for enhanced visibility.
- Manage reported content by reviewing and deleting reported products.

### Admin Features
- Manage user roles (assign Moderator/Admin roles).
- View site-wide statistics with an interactive pie chart (e.g., total products, reviews, and users).
- Create and manage discount coupons for premium memberships.


## Installation and Setup

### Prerequisites
- Node.js installed
- MongoDB instance or cluster
- Firebase project setup


## Technologies Used
- Frontend: React.js, Tailwind CSS, DaisyUI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: Firebase, JWT
- State Management: Context API
  
## Dependencies
- react
- react-router-dom
- react-hook-form
- tailwindcss
- firebase
- react-toastify

## Run the Project Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mahmudanusrat/tech-hunt-point.git

