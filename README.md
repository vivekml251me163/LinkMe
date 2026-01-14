<<<<<<< Updated upstream
# LinkMe
=======
# LinkMe - Your Personal Link Hub

LinkMe is a modern, user-friendly application that allows you to create a personalized link aggregation page, similar to Linktree. Showcase all your important links, social profiles, and content in one beautiful, customizable landing page.

## 🌟 Features

- **Personalized User Pages**: Create custom link pages with your username (`/[username]`)
- **Ask & Feedback System**: Allow visitors to send you questions and feedback
- **Admin Dashboard**: Manage your links, suggestions, and user interactions from a secure admin panel
- **User Authentication**: Secure login system with NextAuth integration
- **Responsive Design**: Mobile-first design that works on all devices
- **Auto-Scrolling Gallery**: Beautiful image gallery display
- **MongoDB Integration**: Persistent data storage with MongoDB

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before you begin, make sure you have installed:
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB (local or MongoDB Atlas account)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd linkme
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
linkme/
├── app/
│   ├── api/              # API routes (auth, add, feedback, suggestions)
│   ├── admin/            # Admin dashboard
│   ├── [username]/       # Dynamic user pages
│   ├── ask/              # Ask page
│   ├── feedback/         # Feedback page
│   ├── login/            # Login page
│   ├── suggestions/      # Suggestions page
│   └── page.js           # Home page
├── components/           # Reusable React components
├── models/               # MongoDB models
├── lib/                  # Utility functions
├── public/               # Static assets
└── package.json          # Dependencies
```

## 📚 Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page |
| `/[username]` | User's personalized link page |
| `/admin` | Admin dashboard |
| `/login` | User login |
| `/ask` | Ask questions page |
| `/feedback` | Feedback submission |
| `/suggestions` | View suggestions |
| `/about` | About page |

## 🔌 API Endpoints

- `POST /api/auth/[...nextauth]` - Authentication
- `POST /api/add/` - Add new links
- `POST /api/ask/` - Submit questions
- `POST /api/feedback/` - Submit feedback
- `POST /api/suggestion/` - Submit suggestions

## 🎨 Customization

### Styling

Global styles are in `app/globals.css`. Customize colors, fonts, and layouts to match your brand.

### Components

Reusable components are located in the `components/` directory:
- `Navbar.js` - Navigation bar
- `AutoScrollGallery.js` - Image gallery
- `SessionWrapper.js` - Authentication wrapper
- `floating.js` - Floating elements

## 🛡️ Security

- User authentication via NextAuth
- Protected admin routes
- MongoDB connection with credentials
- Environment variable security

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🚢 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements.

## 📄 License

This project is open-source and available under the MIT License.

## 💬 Support

For issues and questions, please open an issue in the repository or check the [Next.js documentation](https://nextjs.org/docs).

## 📞 Contact

Have questions or need help? Reach out through the feedback or ask pages in the application.

---

**Built with ❤️ using Next.js**
>>>>>>> Stashed changes
