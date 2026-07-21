# 📚 RanjanBooks

A modern book-sharing and lending marketplace built with Next.js.

Users can browse books by category, view detailed listings, save favourites, add their own books, and reserve books for selected dates.

## 🌐 Live Demo

Open the live RanjanBooks app: https://ranjanbooks-lemon.vercel.app/

## ✨ Features

- 📖 Browse available books
- 🗂️ Filter books by category
- 🔎 Search by title, author, format, publisher, audience, and length
- 📝 View detailed book information
- ❤️ Save books to favourites
- ➕ Add new book listings
- 📅 Reserve books for selected dates
- 📚 View current and previous reservations
- 📱 Responsive design for desktop, tablet, and mobile
- 🔐 Authentication with NextAuth
- 🗄️ MongoDB database access through Prisma
- ☁️ Image hosting through Cloudinary

## 🛠️ Tech Stack

- ⚡ Next.js
- ⚛️ React
- 🔷 TypeScript
- 🎨 Tailwind CSS
- ▲ Vercel
- 🧩 Prisma
- 🍃 MongoDB Atlas
- 🔐 NextAuth.js
- 🌐 Axios
- 📆 date-fns
- 🎭 React Icons
- 🔔 React Hot Toast

## 🚀 Getting Started

### ✅ Prerequisites

Install the following before running the project:

- Node.js 18 or newer
- npm
- Git
- A MongoDB Atlas database
- A Cloudinary account
- Authentication-provider credentials, when required

### 📥 Clone the Repository

```bash
git clone git@github.com:shraddharanjan/ranjanbooks.git
cd ranjanbooks
```

### 📦 Install Dependencies

```bash
npm install
```

The project includes a `postinstall` script that generates the Prisma Client automatically.

### 🔐 Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/ranjanbooks?retryWrites=true&w=majority"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-secure-random-secret"
```

Add any additional variables required by the authentication providers and Cloudinary configuration used by the project.

Generate a secure NextAuth secret with:

```bash
openssl rand -base64 32
```

> ⚠️ Never commit `.env` files or real credentials to Git.

### 🧩 Generate the Prisma Client

```bash
npx prisma generate
```

To verify the database connection:

```bash
npx prisma db pull
```

### 💻 Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

### Start development mode

```bash
npm run dev
```

### Create a production build

```bash
npm run build
```

### Run the production build

```bash
npm run start
```

### Run lint checks

```bash
npm run lint
```

### Generate Prisma Client

```bash
npm run postinstall
```

## 🗂️ Project Structure

```text
app/
├── actions/                 # Server actions and data fetching
├── api/                     # API routes
├── books/                   # Individual book pages
├── components/
│   ├── books/               # Book cards, details, and reservations
│   ├── navbar/              # Navigation, search, and categories
│   ├── inputs/              # Form and upload inputs
│   └── modals/              # Login, registration, search, and loan modals
├── hooks/                   # Reusable React hooks
├── library/                 # User-created book listings
├── favorites/               # Saved books
├── reads/                   # Borrowed books
├── reservations/            # Reservations for owned books
├── types/                   # Shared TypeScript types
├── favicon.ico
├── layout.tsx
└── page.tsx

prisma/
└── schema.prisma

public/
└── images/
```

## 🗄️ Database

The application uses MongoDB through Prisma.

After changing `prisma/schema.prisma`, regenerate the Prisma Client:

```bash
npx prisma generate
```

For MongoDB, avoid relational migration commands such as:

```bash
npx prisma migrate dev
```

Use Prisma workflows that support MongoDB instead.

## 🔒 Security

- Keep `.env` in `.gitignore`
- Never commit database passwords, OAuth secrets, or API keys
- Rotate credentials immediately if they are exposed
- Restrict MongoDB Atlas network access where practical
- Use a strong `NEXTAUTH_SECRET` in production
- Store production variables in Vercel Environment Variables
- Avoid placing secrets in client-side code

## ▲ Deployment

The project is deployed with Vercel.

Before deploying:

1. Add all required environment variables in Vercel.
2. Ensure the MongoDB Atlas cluster is running.
3. Permit connections from the deployment environment.
4. Confirm the Prisma Client is generated during installation.
5. Run a production build locally:

```bash
npm run build
```

Push the latest changes:

```bash
git add .
git commit -m "Update application"
git push
```

Vercel will automatically deploy the connected `main` branch.

## 🛣️ Roadmap

Potential future improvements include:

- 🔍 Improved search, sorting, and filtering
- ♾️ Pagination or infinite scrolling
- ⭐ User reviews and ratings
- 📍 Location-based book discovery
- 💬 Messaging between lenders and borrowers
- 🔔 Reservation notifications
- ♿ Improved accessibility and keyboard navigation
- 🧪 Automated testing
- 📊 User and listing analytics

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a pull request
