# RanjanBooks

Ranjan Books is a book-sharing and lending marketplace built with Next.js. Users can browse books by category, view book details, save favourites, add listings, and reserve books for selected dates.

## Features

- Browse available books
- Filter books by category
- Search by format, author, and length
- View detailed book information
- Save books to favourites
- Add new book listings
- Reserve books by date
- View current and previous reservations
- Responsive design for desktop, tablet, and mobile
- Authentication with NextAuth
- MongoDB database access through Prisma

## Tech stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [NextAuth.js](https://next-auth.js.org/)
- [Axios](https://axios-http.com/)
- [date-fns](https://date-fns.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Hot Toast](https://react-hot-toast.com/)

## Getting started

### Prerequisites

Install the following before running the project:

- Node.js 18 or newer
- npm
- A MongoDB Atlas database
- Git

### Clone the repository

```bash
git clone git@github.com:shraddharanjan/ranjanbooks.git
cd ranjanbooks
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/ranjanbooks?retryWrites=true&w=majority"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-secure-random-secret"
```

Add any additional authentication-provider or image-hosting credentials required by your local configuration.

Generate a secure NextAuth secret with:

```bash
openssl rand -base64 32
```

Never commit `.env` files or real credentials to Git.

### Generate the Prisma client

```bash
npx prisma generate
```

To verify the database connection:

```bash
npx prisma db pull
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production build.

```bash
npm run lint
```

Checks the project for linting issues.

## Project structure

```text
app/
├── actions/                 # Server actions and data fetching
├── api/                     # API routes
├── books/                   # Individual book pages
├── components/
│   ├── books/               # Book cards, details, and reservations
│   ├── navbar/              # Navigation, search, and categories
│   └── ...
├── hooks/                   # Reusable React hooks
├── types/                   # Shared TypeScript types
├── favicon.ico
├── layout.tsx
└── page.tsx

prisma/
└── schema.prisma

public/
└── images/
```

## Database

The application uses MongoDB through Prisma.

After changing `prisma/schema.prisma`, regenerate the Prisma client:

```bash
npx prisma generate
```

For MongoDB, avoid running relational migration commands such as `prisma migrate dev`. Use Prisma's MongoDB-compatible workflows instead.

## Security

- Keep `.env` in `.gitignore`
- Never commit database passwords, OAuth secrets, or API keys
- Rotate credentials immediately if they are exposed
- Restrict MongoDB Atlas network access to trusted IP addresses
- Use a strong `NEXTAUTH_SECRET` in production

## Deployment

The project can be deployed to platforms that support Next.js, such as Vercel.

Before deploying:

1. Add all required environment variables to the hosting provider.
2. Ensure the MongoDB Atlas cluster is running.
3. Allow the deployment platform to connect to MongoDB Atlas.
4. Run a production build locally:

```bash
npm run build
```

## Roadmap

Potential future improvements include:

- Improved search and sorting
- Pagination or infinite scrolling
- User reviews and ratings
- Location-based book discovery
- Messaging between lenders and borrowers
- Reservation notifications
- Better accessibility and keyboard navigation
