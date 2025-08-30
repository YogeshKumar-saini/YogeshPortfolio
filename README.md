# Modern Portfolio with Admin Dashboard

A beautiful, modern portfolio website built with Next.js, TypeScript, and MongoDB. Features a complete admin dashboard for easy content management.

## ✨ Features

### Frontend
- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Performance**: Optimized for speed and SEO
- **Accessibility**: Built with accessibility best practices

### Admin Dashboard
- **Project Management**: Add, edit, and delete projects easily
- **Skills Management**: Organize your technical skills
- **Contact Messages**: View and manage contact form submissions
- **Analytics**: Track portfolio performance

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Authentication**: Secure JWT-based admin authentication
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Cloudinary integration for image management
- **API**: RESTful API with proper error handling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd modern-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your-super-secret-jwt-key-here
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   ```

4. **Seed the database** (optional)
   ```bash
   curl -X POST http://localhost:3000/api/admin/seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 📱 Usage

### Public Portfolio
Visit `http://localhost:3000` to view the portfolio website.

### Admin Dashboard
1. Go to `http://localhost:3000/admin`
2. Login with your admin credentials
3. Manage projects, skills, and view messages

### Default Admin Credentials
- **Email**: admin@example.com
- **Password**: admin123

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **React Hook Form**: Form handling
- **React Hot Toast**: Notifications

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing

### DevOps & Tools
- **Cloudinary**: Image management
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── admin/             # Admin-specific components
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   └── ui/                # Reusable UI components
├── contexts/              # React contexts
├── lib/                   # Utility libraries
├── models/                # Database models
└── types/                 # TypeScript type definitions
```

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get all skills
- `POST /api/contact` - Send contact message

### Admin Endpoints (Requires Authentication)
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- `POST /api/skills` - Create skill
- `PUT /api/skills/[id]` - Update skill
- `DELETE /api/skills/[id]` - Delete skill
- `GET /api/contact` - Get all messages
- `PATCH /api/contact/[id]` - Mark message as read
- `DELETE /api/contact/[id]` - Delete message

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    // Your primary color palette
  },
  dark: {
    // Your dark color palette
  }
}
```

### Content
- Update personal information in the Hero component
- Modify the about text in the About component
- Add your social media links in the Footer component

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue or contact me at yksaini1090@gmail.com.