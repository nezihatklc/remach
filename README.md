# Remach - Industrial Spare Parts Marketplace

This is a B2B industrial marketplace platform that connects companies, workshops, factories, and machine-part suppliers for buying, selling, and requesting unused machines, spare parts, and industrial equipment.

## Technologies Used

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** (ORM)
- **SQLite** (Local Database)
- **Lucide React** (Icons)
- **Bcryptjs & JWT** (Authentication)

## Local Setup Instructions

1. **Install Dependencies**
   Run the following command to install all the required npm packages:
   ```bash
   npm install
   ```

2. **Database Setup**
   Ensure that the `.env` file exists with the `DATABASE_URL` for SQLite.
   If you don't have it, create `.env` in the root:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   ```

3. **Push Schema and Seed Data**
   Apply the Prisma schema to your SQLite database and seed it with dummy data:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Run the Application**
   Start the Next.js development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

## Demo Credentials

The database is seeded with two users that you can use to test the platform:

- **Seller Demo Account**
  - Email: `seller1@example.com`
  - Password: `password123`
  - Role: Seller (has listings)

- **Buyer Demo Account**
  - Email: `buyer1@example.com`
  - Password: `password123`
  - Role: Buyer (has urgent requests)

- **Admin Demo Account**
  - Email: `admin@example.com`
  - Password: `password123`
  - Role: Admin

## Features Completed in MVP
- Next.js setup with App Router and Tailwind CSS
- Prisma SQLite database schema
- Seed data for categories, listings, requests, and users
- Public pages: Home, Marketplace (Listings), Urgent Requests, Listing Details
- JWT Authentication (Login/Logout)
- Dashboard (My Listings overview)
- Admin Panel (Platform overview)
