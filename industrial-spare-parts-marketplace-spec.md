# Industrial Spare Parts Marketplace – Project Specification

## 1. Project Overview

This project is a B2B industrial marketplace platform that connects companies, workshops, factories, and machine-part suppliers for buying, selling, and requesting unused machines, spare parts, and industrial equipment.

The main idea is to help industrial businesses turn idle or unused equipment into value, while allowing buyers to find affordable and reliable spare parts faster than traditional informal networks.

The platform should focus on:
- Selling unused or idle machines and spare parts
- Helping buyers find affordable second-hand or unused industrial parts
- Supporting urgent spare-part needs
- Increasing trust between buyers and sellers
- Reducing storage costs and waste
- Promoting reuse and sustainability in industrial zones

The initial target market is Turkey, especially industrial regions such as Istanbul, Kocaeli, Bursa, Sakarya, Ankara, Izmir, and organized industrial zones.

---

## 2. Problem Definition

Industrial businesses often face several problems when buying or selling machine parts:

### Buyer-side problems
- New spare parts are expensive
- Suitable components are hard to find
- Compatibility information is often unclear
- Buyers rely heavily on informal networks, WhatsApp groups, social media, or personal contacts
- Urgent part needs can stop production
- Trust is a major issue when buying from a new supplier
- Search processes are time-consuming

### Seller-side problems
- Unused machines and parts occupy storage space
- Scrap value is usually much lower than actual reusable value
- It is difficult to find the right buyer
- Sellers do not always know whether someone needs their unused part
- Selling and logistics processes are complex
- Idle assets create unnecessary storage and inventory costs

---

## 3. Proposed Solution

Build a web-based marketplace where verified industrial users can:

- Register as buyer, seller, or both
- List unused machines, spare parts, tools, and equipment
- Search and filter available parts
- Post urgent part requests
- Contact sellers through the platform
- View seller profile, reliability indicators, and previous listings
- Save favorite listings
- Manage inventory-like product listings
- Mark items as sold, reserved, or available
- Provide detailed technical specifications for each listing

The platform should not be a general e-commerce website. It should be designed specifically for industrial machine parts and equipment.

---

## 4. Target Users

### Primary Users

#### 1. Sellers
Industrial businesses, factories, workshops, and machine owners that have unused or idle machines, spare parts, or equipment.

Seller goals:
- Dispose of unused machines and assets
- Reduce storage and inventory cost
- Convert idle equipment into cash
- Reach relevant buyers
- Sell quickly and easily

#### 2. Buyers
Factories, SMEs, technicians, repair shops, and workshops that need affordable spare parts or machines.

Buyer goals:
- Find affordable machine parts
- Repair machines quickly
- Maintain operational continuity
- Find alternatives to expensive new parts
- Access reliable sellers

#### 3. Admin
Platform owner or moderator responsible for managing users, listings, categories, reports, and trust mechanisms.

---

## 5. Core Features

## 5.1 Authentication and User Management

Users should be able to:
- Register
- Login
- Logout
- Edit profile
- Select account type:
  - Buyer
  - Seller
  - Buyer & Seller
- Add company information:
  - Company name
  - Sector
  - City
  - Industrial zone
  - Phone
  - Email
  - Website
  - Tax number or company registration field, optional for MVP
- Upload profile/company logo, optional

Authentication can be implemented with email/password for MVP.

---

## 5.2 User Roles

### Guest
Can:
- View public listings
- Search listings
- View basic listing details

Cannot:
- Contact sellers
- Create listings
- Save favorites
- Post requests

### Registered User
Can:
- Create listings
- Contact sellers
- Save favorites
- Post urgent requests
- Manage own listings
- Edit own profile

### Admin
Can:
- View all users
- View all listings
- Delete inappropriate listings
- Approve or reject listings, optional for MVP
- Manage categories
- Manage reports

---

## 5.3 Listings / Product Management

Users should be able to create listings for:

- Spare parts
- Machines
- Equipment
- Tools
- Electrical components
- Automation components
- Bearings
- Belts
- Motors
- Gearboxes
- Hydraulic or pneumatic components
- Other industrial items

### Listing fields

Each listing should include:

- Title
- Description
- Category
- Subcategory
- Condition:
  - New
  - Used
  - Refurbished
  - For repair
  - Scrap / parts only
- Brand
- Model
- Part number, optional
- Machine compatibility, optional
- Technical specifications
- Dimensions, optional
- Material, optional
- Quantity
- Price
- Currency
- City
- District / industrial zone
- Seller company
- Images
- Availability status:
  - Available
  - Reserved
  - Sold
- Listing date
- Last updated date

### Important detail
The UI should strongly encourage technical clarity. Since wrong or missing technical information is a real user pain, the listing form should include structured technical fields and a clear description area.

---

## 5.4 Search and Filtering

Users should be able to search listings by:

- Keyword
- Category
- City
- Industrial zone
- Condition
- Price range
- Brand
- Availability
- Urgency / immediately available
- Seller type, optional

Search results should show:

- Listing image
- Title
- Price
- City
- Condition
- Seller/company name
- Availability status
- Short description

---

## 5.5 Listing Detail Page

Each listing detail page should show:

- Images
- Title
- Price
- Category
- Condition
- Location
- Seller information
- Technical specifications
- Description
- Compatibility notes
- Quantity
- Availability
- Contact seller button
- Save to favorites button
- Similar listings, optional

---

## 5.6 Urgent Part Request Feature

This is one of the most important features.

Users should be able to post a request when they urgently need a machine part.

### Request fields
- Request title
- Needed part name
- Description
- Category
- Machine brand/model
- Technical details
- Required quantity
- City
- Deadline / urgency level
- Upload reference image, optional
- Contact preference

### Urgency levels
- Normal
- Urgent
- Very urgent / production stopped

Other users should be able to see requests and respond if they have a matching part.

---

## 5.7 Trust and Reliability Features

Since trust is a major problem in this sector, the platform should include trust-building elements.

For MVP:
- Company profile pages
- Account creation date
- Number of active listings
- Seller city and sector
- Optional verified badge placeholder
- User rating placeholder
- Report listing button

For later versions:
- Company verification
- Transaction history
- Reviews and ratings
- Escrow/payment protection
- Delivery tracking
- Verified industrial-zone membership

---

## 5.8 Favorites

Registered users should be able to:
- Save listings
- Remove listings from favorites
- View favorite listings in dashboard

---

## 5.9 Messaging / Contact

For MVP, use a simple contact system:
- Contact seller button
- Show seller phone/email only to logged-in users
- Optional contact form that creates an inquiry message

For a more advanced version:
- In-platform messaging
- Inquiry history
- Notifications

---

## 5.10 Dashboard

Registered users should have a dashboard with:

- My listings
- Add new listing
- My urgent requests
- Favorites
- Profile settings
- Inquiries, optional

Seller dashboard should show:
- Active listings
- Sold listings
- Reserved listings
- Listing views, optional

---

## 5.11 Admin Panel

Admin should be able to:

- View users
- View listings
- Delete listings
- Manage categories
- View urgent requests
- Mark users as verified, optional
- Handle reported listings, optional

---

## 6. MVP Scope

The first version should include:

- Landing page
- Authentication
- User profile
- Listing creation
- Listing search/filter
- Listing detail page
- Urgent request creation
- Urgent request list
- Favorites
- Basic dashboard
- Basic admin page
- Responsive UI

Do not implement payment system in MVP.
Do not implement shipping/logistics in MVP.
Do not implement advanced escrow system in MVP.

---

## 7. Out of Scope for MVP

The following features should not be implemented in the first version:

- Online payment
- Escrow
- Shipping integration
- AI-based part matching
- Automatic compatibility verification
- Mobile app
- Live chat
- Complex company verification
- ERP integration

These can be added later.

---

## 8. Suggested Pages

### Public Pages
1. Home / Landing Page
2. Listings Page
3. Listing Detail Page
4. Urgent Requests Page
5. Login Page
6. Register Page
7. About Page

### User Pages
1. Dashboard
2. My Listings
3. Add Listing
4. Edit Listing
5. My Requests
6. Add Urgent Request
7. Favorites
8. Profile Settings

### Admin Pages
1. Admin Dashboard
2. User Management
3. Listing Management
4. Category Management
5. Request Management

---

## 9. Suggested Tech Stack

Use a modern full-stack web application structure.

Recommended stack:
- Frontend: React or Next.js
- Styling: Tailwind CSS
- Backend: Node.js with Express or Next.js API routes
- Database: PostgreSQL or SQLite for MVP
- ORM: Prisma
- Authentication: JWT or NextAuth
- Image upload: local storage for MVP, later cloud storage
- Deployment: Vercel / Render / Railway

If Antigravity can choose the stack, prefer:
- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- SQLite for local development
- PostgreSQL-ready schema

---

## 10. Database Entities

### User
- id
- name
- email
- passwordHash
- role
- accountType
- phone
- companyName
- sector
- city
- industrialZone
- website
- isVerified
- createdAt
- updatedAt

### Category
- id
- name
- slug
- parentCategoryId, optional

### Listing
- id
- title
- description
- categoryId
- sellerId
- condition
- brand
- model
- partNumber
- compatibility
- technicalSpecs
- dimensions
- material
- quantity
- price
- currency
- city
- district
- industrialZone
- status
- isUrgentAvailable
- createdAt
- updatedAt

### ListingImage
- id
- listingId
- imageUrl
- createdAt

### UrgentRequest
- id
- userId
- title
- partName
- description
- categoryId
- machineBrand
- machineModel
- technicalDetails
- quantity
- city
- urgencyLevel
- deadline
- status
- createdAt
- updatedAt

### Favorite
- id
- userId
- listingId
- createdAt

### Inquiry
- id
- listingId
- senderId
- sellerId
- message
- contactPhone
- contactEmail
- createdAt

### Report
- id
- reporterId
- listingId
- reason
- description
- status
- createdAt

---

## 11. UI / UX Requirements

The design should feel:
- Industrial
- Professional
- Clean
- Trustworthy
- Simple to use

Suggested visual style:
- Light background
- Dark gray / navy typography
- Yellow or orange accent color for industrial feeling
- Clear cards for listings
- Large search bar on home page
- Category shortcuts
- Trust indicators
- Responsive mobile layout

Avoid:
- Overly playful design
- Too many animations
- Complicated user flows
- Consumer-style shopping design

---

## 12. Home Page Structure

The home page should include:

1. Hero section
   - Headline: “Find and sell industrial spare parts faster”
   - Subtext: “A trusted B2B marketplace for unused machines, spare parts, and urgent industrial needs.”
   - Search bar
   - Buttons:
     - Browse Listings
     - Post a Part Request

2. Category cards
   - Spare Parts
   - Machines
   - Motors
   - Bearings
   - Automation
   - Electrical
   - Hydraulic / Pneumatic
   - Tools

3. How it works
   - List your unused part
   - Buyers search or post urgent requests
   - Connect with verified industrial users

4. Trust section
   - Company profiles
   - Technical details
   - Industrial-zone focused network
   - Verified seller placeholder

5. Featured listings

6. Urgent requests preview

---

## 13. Important Business Logic

- Only logged-in users can create listings or urgent requests.
- Users can edit/delete only their own listings.
- Admin can manage all listings.
- Sold listings should remain visible only optionally; default can hide sold listings from main search.
- Favorites must be unique per user/listing.
- Listing status should be clear.
- Urgent requests should have an active/closed status.
- Guest users can browse but cannot contact sellers.

---

## 14. Sample Data

Create seed data for demo purposes.

Example categories:
- Spare Parts
- Machines
- Motors
- Bearings
- Belts
- Gearboxes
- Electrical Components
- Automation Components
- Hydraulic & Pneumatic
- Tools

Example listings:
1. Used Siemens motor
2. Industrial gearbox
3. Food processing machine spare blade
4. Conveyor belt
5. Linear bearing
6. Hydraulic cylinder
7. Packaging machine part
8. Automation control card

Example users:
1. Small workshop seller from Istanbul
2. Factory buyer from Kocaeli
3. Machine-part supplier from Bursa
4. Admin user

---

## 15. Acceptance Criteria

The application is successful if:

- A user can register and log in
- A user can create a listing
- Listings can be searched and filtered
- A listing detail page displays all technical information
- A user can save a listing to favorites
- A user can post an urgent part request
- A seller can manage their own listings
- Admin can view and manage listings
- The UI is responsive
- The app can run locally with clear setup instructions

---

## 16. Development Instructions for AI Coding Agent

Build this project step by step.

Recommended order:
1. Set up project structure
2. Configure database and ORM
3. Create schema/models
4. Implement authentication
5. Build public pages
6. Build listing CRUD
7. Build search and filtering
8. Build urgent request feature
9. Build favorites
10. Build dashboard
11. Build admin panel
12. Add seed data
13. Polish UI
14. Add README setup instructions

Always keep the code clean, modular, and readable.

Use TypeScript if possible.

Create reusable components:
- Navbar
- Footer
- ListingCard
- ListingForm
- SearchFilters
- CategoryCard
- DashboardSidebar
- StatusBadge
- UrgencyBadge
- EmptyState
- Button
- Input
- Textarea
- Select

---

## 17. Final Deliverables

The final project should include:

- Full source code
- Database schema
- Seed data
- README file
- Local setup instructions
- Demo login credentials
- Responsive design
- Clean UI
- Working MVP features
