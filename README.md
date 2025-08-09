# Skills Map

A simple web application that allows professionals to showcase their skills through peer endorsements. Users can select their industry of expertise (IT, Marketing, Sales...) which all have a fixed amount of skills. Users can then endorse up to two skill to their peers and visualise their expertise in a radar graph.


## Features

- **LinkedIn Authentication**: Sign in with your LinkedIn account for seamless profile integration
- **Skill Endorsements**: Endorse colleagues and get endorsed for your skills
- **Industry-Specific Skills**: Skills are organized by industry (Technology, Marketing & Advertising, etc.)
- **Profile Management**: Edit your job title, industry, and location
- **Visual Dashboard**: Chart to visualize your skills

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with LinkedIn provider
- **Database**: SQLite with Prisma ORM
- **Visualization**: D3.js for radar charts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AlfonsoFidalgo/skills-map.git
cd skills-map
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
touch .env.local
```

Add your LinkedIn OAuth credentials and database URL to `.env.local`:
```env
NEXTAUTH_SECRET=your-secret-key
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
DATABASE_URL="file:./dev.db"
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Schema

The application uses the following main models:

- **User**: Stores user profile information from LinkedIn
- **Industry**: Categories for different professional industries
- **Skill**: Industry-specific skills that can be endorsed
- **Endorsement**: Tracks who endorsed whom for which skill

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── actions/            # Server actions for data mutations
├── auth.ts             # NextAuth.js configuration
├── db/                 # Database connection
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and constants

prisma/
├── schema.prisma       # Database schema
├── migrations/         # Database migrations
└── dev.db             # SQLite database file
```

