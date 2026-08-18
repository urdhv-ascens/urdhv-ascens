ARCHITECTURE
                              INTERNET
                                  │
                                  ▼
                       ┌────────────────────┐
                       │     CLOUDFLARE     │
                       │                    │
                       │ DNS                │
                       │ TLS                │
                       │ CDN                │
                       │ DDoS protection    │
                       │ WAF/security       │
                       │ Pages              │
                       │ Workers            │
                       └─────────┬──────────┘
                                 │
                 ┌───────────────┴────────────────┐
                 │                                │
                 ▼                                ▼
          PUBLIC STOREFRONT                    ADMIN
                 │                                │
                 │                         Firebase Auth
                 │                                │
                 │                           Admin CMS
                 │                                │
                 │                           Firestore
                 │                                │
                 │                           Media Manager
                 │                                │
                 │                         Publishing Engine
                 │                                │
                 │                                ▼
                 │                         STATIC RELEASE
                 │                                │
                 └────────────────┬───────────────┘
                                  │
                                  ▼
                         CLOUDFLARE CDN
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
          WEBSITE              IMAGES              VIDEOS
           ASSETS             Cloudinary            YouTube
              │                   │                   │
              │                   │             Unlisted videos
              │                   │                   │
              └───────────────────┼───────────────────┘
                                  │
                                  ▼
                              CUSTOMER
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
                 SEARCH         CONTACT        EMAIL
                 Browser        Browser        Order
1. THE MOST IMPORTANT ARCHITECTURAL RULE

There are two completely different worlds.

CONTROL PLANE
Admin
 ↓
Firebase Auth
 ↓
Firestore
 ↓
CMS
 ↓
Publishing
DELIVERY PLANE
Customer
 ↓
Cloudflare
 ↓
Static website
 ↓
Cloudinary / YouTube

They should be loosely coupled.

This is what makes the architecture:

fast
cheap
secure
resilient
scalable
easy to migrate later
2. CUSTOMER REQUEST FLOW

A normal customer should experience:

QR
 ↓
urdhvascens.com
 ↓
Cloudflare Edge
 ↓
HTML
 ↓
CSS/JS
 ↓
content.json
 ↓
Cloudinary images
 ↓
YouTube videos
 ↓
Email
NOT:
QR
 ↓
Cloudflare
 ↓
Firebase
 ↓
Firestore
 ↓
Projects
 ↓
Customer

This distinction is fundamental.

3. CLOUDFLARE = THE FRONT DOOR

Cloudflare handles:

DNS
urdhvascens.com
www.urdhvascens.com
media.urdhvascens.com
admin.urdhvascens.com
TLS

HTTPS everywhere.

CDN

Static website assets are distributed through Cloudflare's network.

Security

Use:

HTTPS
security headers
CSP
WAF where appropriate
bot protection/rate limiting where appropriate
origin protection
least-privilege API endpoints
Hosting

Use Cloudflare Pages for the public application.

Workers

Use Workers only where dynamic edge logic is genuinely required.

4. PUBLIC WEBSITE

The public application should be static-first.

Recommended:

Next.js
+
TypeScript
+
Tailwind
+
shadcn/ui

But the architecture should not depend on Next.js-specific business logic.

Structure it like:

/apps/storefront


/app
/components
/core
/lib
/styles
/public
5. PUBLIC DATA

The published website gets:

content.json
theme.json
navigation.json
seo.json
pages.json

For example:

/releases/v042/
    content.json
    theme.json
    navigation.json
    pages.json
    seo.json
    manifest.json

Cloudflare serves these.

6. FIREBASE = CONTROL PLANE

Firebase is not the public website database.

Use Firebase for:

Authentication
Firebase Auth
CMS database
Firestore
Draft content
Firestore
Admin users
Firestore
Permissions
Firestore Rules
+
server-side authorization
Audit logs
Firestore
7. FIRESTORE DATA MODEL

Universal model:

Firestore
│
├── projects
├── categories
├── variants
├── addons
├── media
├── pages
├── sections
├── navigation
├── themes
├── categoryThemes
├── siteSettings
├── releases
├── admins
├── roles
├── permissions
├── auditLogs
└── scheduledChanges

Don't create a database collection for every UI concept.

Keep the model intentionally small.

8. PRODUCT MODEL

Universal project schema:

{
  "id": "project-id",
  "name": "Project Name",
  "slug": "project-name",


  "categoryId": "category-id",


  "status": "active",


  "description": "",
  "shortDescription": "",
  "ingredients": [],


  "media": {
    "primary": "media-id"
  },


  "variants": [
    {
      "id": "small",
      "name": "Small",
      "price": 59
    },
    {
      "id": "medium",
      "name": "Medium",
      "price": 79
    }
  ],


  "addons": [],


  "featured": false,
  "sortOrder": 1,


  "seo": {
    "title": "",
    "description": ""
  }
}

This is flexible enough for:

restaurant
food
retail
services
courses
projects
catalogues

without forcing Ūrdhv Ascens-specific assumptions into the core architecture.

9. PRODUCT STATES

Don't use a simple boolean.

Use:

ACTIVE
SOLD_OUT
COMING_SOON
HIDDEN
ARCHIVED

That lets the admin control exactly what customers see.

10. CATEGORY SYSTEM

Categories are database entities.

Category
│
├── name
├── slug
├── description
├── icon
├── theme
├── sortOrder
├── visibility
├── displaySettings
└── projects[]

The admin can create future categories without changing code.

11. THE TWO-ROW PRODUCT GRID

This stays in the application rendering engine, not inside Firestore.

Admin controls:

initialRows = 2
mobileColumns = 2
desktopColumns = auto
showMore = true

Rendering:

Mobile
┌───────┬───────┐
│   1   │   2   │
├───────┼───────┤
│   3   │   4   │
└───────┴───────┘


       SHOW MORE
Desktop

Columns adapt to available width:

1200px → 5 columns × 2 rows
1440px → 6 × 2
1920px → 8 × 2

The algorithm is fixed.

The content is editable.

That prevents an admin from accidentally breaking the responsive system.

12. ADMIN CMS

The admin should be a real application.

ADMIN
│
├── Dashboard
├── Projects
├── Categories
├── Variants
├── Add-ons
├── Media
├── Pages
├── Sections
├── Navigation
├── Theme
├── SEO
├── Publishing
├── Users
├── Roles
├── Audit Log
└── Settings
13. ADMIN AUTHENTICATION
Admin
 ↓
Firebase Auth
 ↓
MFA where appropriate
 ↓
Authorization
 ↓
Role
 ↓
Permission
 ↓
CMS

Never rely on:

/admin

being hidden.

Never rely only on:

if (user.email === adminEmail)

Use actual authorization.

14. RBAC

Universal roles:

SUPER_ADMIN
ADMIN
EDITOR
CONTENT_MANAGER
MEDIA_MANAGER
SEO_MANAGER
VIEWER

Permissions can be:

projects.read
projects.write
projects.delete


media.read
media.write
media.delete


pages.write


theme.write


publish.execute


users.manage


settings.manage
15. MEDIA ARCHITECTURE

This is where your selected providers fit extremely well.

                     MEDIA
                       │
           ┌───────────┴───────────┐
           │                       │
         IMAGES                  VIDEOS
           │                       │
           ▼                       ▼
      CLOUDINARY                YOUTUBE
           │                       │
           │                 Unlisted/public
           │                 embedded videos
           │                       │
           └───────────┬───────────┘
                       │
                       ▼
                  STOREFRONT
16. CLOUDINARY = IMAGE CDN

Use Cloudinary for:

project photos
category imagery
hero images
promotional images
thumbnails
responsive image transformations

Admin uploads:

camera photo

Browser:

crop
 ↓
resize
 ↓
WebP
 ↓
upload

Cloudinary then handles transformations/CDN delivery.

17. YOUR 512×512 PRODUCT IMAGE SYSTEM

The admin machine does:

RAW PHOTO
 ↓
EXIF correction
 ↓
crop
 ↓
square canvas
 ↓
512×512
 ↓
WebP
 ↓
compression
 ↓
Cloudinary

Then optionally generate:

160×160
320×320
512×512

The browser selects the appropriate version.

18. YOUTUBE = PUBLIC VIDEO CDN

For free public/marketing videos:

Admin
 ↓
YouTube upload
 ↓
Unlisted
 ↓
YouTube processing
 ↓
YouTube infrastructure
 ↓
Embedded player
 ↓
Customer

Use:

youtube-nocookie.com

where appropriate.

Don't attempt to extract YouTube's underlying .mp4 URLs and turn YouTube into an unofficial raw CDN.

19. VIDEO ABSTRACTION

The CMS shouldn't care which provider is being used.

Store:

{
  "type": "video",
  "provider": "youtube",
  "videoId": "abc123",
  "poster": "media-id",
  "aspectRatio": "16:9",
  "autoplay": false,
  "muted": true,
  "loop": false
}

Later you could support:

youtube
r2
stream

without changing the website's video component.

20. VIDEO UX

Never load a YouTube iframe unnecessarily on initial page load.

Instead:

Poster
 ↓
User interaction
 ↓
Load player
 ↓
Play

This keeps the initial page lightweight.

For a hero/background video:

Desktop:
video


Mobile:
poster or optimized video

depending on network/device conditions.

21. PUBLISHING ENGINE

This is the heart of the architecture.

Admin changes:

Project
Price
Category
Theme
Page
Image
SEO

Everything initially becomes:

DRAFT

Then:

PREVIEW
 ↓
VALIDATE
 ↓
PUBLISH
22. PUBLISH PIPELINE
                    FIRESTORE
                        │
                        ▼
                 CONTENT EXPORT
                        │
                        ▼
                 SCHEMA VALIDATION
                        │
             ┌──────────┼──────────┐
             ▼          ▼          ▼
          PRODUCTS    MEDIA       SEO
             │          │          │
             └──────────┼──────────┘
                        ▼
                 STATIC GENERATION
                        │
                        ▼
                   BUILD TESTS
                        │
                        ▼
                 CLOUDFLARE PAGES
                        │
                        ▼
                   SMOKE TEST
                        │
                        ▼
                    RELEASE
23. IMMUTABLE RELEASES

Don't overwrite projection blindly.

Use:

/releases/v001
/releases/v002
/releases/v003

Then:

CURRENT_RELEASE = v003

If v004 fails:

CURRENT_RELEASE = v003

Rollback becomes extremely simple.

24. PUBLIC CACHE STRATEGY

Use immutable hashed assets:

app.a81f3.js
catalogue.91c2e.json
theme.3e7f2.json

These can have very long cache lifetimes.

HTML can have shorter cache lifetimes.

This means most customers are served directly from edge caches.

25. CUSTOMER SEARCH

Don't search Firebase.

Load:

content.json

into the browser.

Then:

Search
 ↓
Browser memory
 ↓
instant results

For a small/local catalogue, this is vastly simpler than introducing a search server.

26. CONTACT

Contact lives in the browser.

Project
 ↓
Contact state
 ↓
localStorage

No account.

No customer database.

No server request.

27. EMAIL ORDERING
Contact
 ↓
Generate order text
 ↓
URL encode
 ↓
Email

Example:



I'd like to order:


Mixed Sprouts
Medium × 2 — ₹158


Mixed Fruit Salad
Large × 1 — ₹99


TOTAL: ₹257


Please confirm availability.

No Email API required.

No payment gateway.

28. CUSTOMER DATA MINIMIZATION

The public website doesn't need:

customer account
email
password
database record
order history

That dramatically reduces:

security surface
infrastructure
privacy exposure
development time
database usage
29. FAILURE MODEL

This is where the architecture becomes genuinely robust.

Firebase unavailable
Admin ❌
Public website ✅

Because the public website uses its latest published release.

Cloudinary unavailable
Existing cached media → potentially continues
New uploads → ❌
YouTube unavailable
Video → ❌
Website → ✅

The video component should fall back to:

poster image
Email unavailable
Website → ✅
Ordering → unavailable

The site should show:

Please call us

as a fallback.

30. SECURITY BOUNDARY

This is the architecture's security model:

                 INTERNET
                    │
                    ▼
              CLOUDFLARE
                    │
          ┌─────────┴─────────┐
          │                   │
       PUBLIC               ADMIN
          │                   │
       STATIC             AUTHENTICATED
          │                   │
          │                FIREBASE
          │                   │
          │                FIRESTORE
          │                   │
          └─────────┬─────────┘
                    │
                PUBLISH
                    │
                    ▼
                PUBLIC CDN

The customer has no path to modify Firestore.

31. SECRETS

Never put:

Firebase Admin SDK secret
Cloudinary secret
Cloudflare API token
GitHub token

in the browser.

Use:

PUBLIC

variables only for genuinely public identifiers.

Privileged operations happen server-side/through secured deployment infrastructure.

32. CLOUDFLARE WORKERS

Don't put everything into Workers.

Use Workers only for things such as:

admin API
publishing endpoint
security middleware
rate limiting
small edge transformations
webhooks

The public catalogue doesn't need a Worker for every request.

33. GITHUB

GitHub becomes your source of truth for code:

GitHub
│
├── source
├── configuration
├── schema
├── migrations
├── tests
└── CI/CD

Never put secrets in Git.

34. CI/CD
Git push
 ↓
GitHub Actions
 ↓
Typecheck
 ↓
Lint
 ↓
Tests
 ↓
Security audit
 ↓
Build
 ↓
Deploy
 ↓
Cloudflare Pages
35. UNIVERSAL PROJECT STRUCTURE

I'd structure the application like:

omkara/
│
├── apps/
│   │
│   ├── storefront/
│   │   ├── app/
│   │   ├── components/
│   │   ├── layouts/
│   │   └── styles/
│   │
│   ├── admin/
│   │   ├── app/
│   │   ├── components/
│   │   └── features/
│   │
│   └── publisher/
│
├── packages/
│   │
│   ├── core/
│   │   ├── projects/
│   │   ├── catalog/
│   │   ├── contact/
│   │   ├── media/
│   │   ├── publishing/
│   │   └── validation/
│   │
│   ├── ui/
│   │
│   ├── schema/
│   │
│   └── config/
│
├── functions/
│
├── tests/
│
├── docs/
│
└── .github/
36. THE MOST IMPORTANT ABSTRACTIONS

Don't couple your application directly to providers.

Create:

AuthProvider
DatabaseProvider
StorageProvider
ImageProvider
VideoProvider
PublishingProvider
AnalyticsProvider

Then:

ImageProvider
      │
      ▼
Cloudinary

and:

VideoProvider
      │
      ▼
YouTube

This means you can replace a provider later without rebuilding Ūrdhv Ascens.

37. UNIVERSAL CMS MEDIA MODEL
Media
│
├── type
│   ├── image
│   ├── video
│   ├── document
│   └── animation
│
├── provider
│   ├── cloudinary
│   ├── youtube
│   └── future-provider
│
├── url
├── thumbnail
├── dimensions
├── metadata
├── alt
├── title
├── status
└── createdAt

This makes your architecture future-proof.

38. DESIGN SYSTEM

The CMS can control:

GLOBAL COLORS
TYPOGRAPHY
BUTTONS
CARDS
SPACING
BORDERS
RADIUS
CATEGORY THEMES
PAGE SECTIONS
NAVIGATION
FOOTER

But not arbitrary code.

So:

Admin freedom
        +
Engineering constraints
        =
Safe flexibility
39. WHAT THE ADMIN CAN CHANGE

Almost everything a business owner reasonably needs:

Catalogue
projects
categories
variants
prices
add-ons
ingredients
descriptions
availability
sorting
featured projects
Media
images
videos
thumbnails
cropping
focal point
WebP conversion
Website
homepage
sections
navigation
footer
banners
promotional blocks
Design
colors
category colors
typography options
card styles
button variants
decorative assets
SEO
titles
descriptions
OG images
canonical URLs
structured content
Operations
publish
preview
rollback
audit history
40. WHAT ADMIN SHOULD NOT CHANGE

Don't expose:

Firebase credentials
Cloudflare credentials
security rules
application source
database schema
authentication internals
CDN configuration
deployment credentials

That is how you get maximum CMS freedom without giving the CMS the ability to destroy the application.

41. UNIVERSAL VERSION

The architecture doesn't have to remain an “Ūrdhv Ascens-only” system.

The core can be:

Universal Commerce/Catalogue Engine

Then Ūrdhv Ascens becomes a configuration:

brand
theme
catalogue
content
ordering
media

So later you could build:

Ūrdhv Ascens
Star Excellent Academy
another local business
portfolio
restaurant
catalogue

using the same underlying engine.

42. FINAL STACK
Layer	Technology	Purpose
Source	GitHub	Code/version control
Frontend	Next.js + TypeScript	Public application
UI	Tailwind + shadcn	Design system
Hosting	Cloudflare Pages	Static hosting
CDN/security	Cloudflare	Edge/CDN/DNS/TLS/security
Edge logic	Cloudflare Workers	Only required dynamic operations
Auth	Firebase Auth	Admin authentication
CMS database	Firestore	Draft/control data
Images	Cloudinary	Image CDN/transformation
Videos	YouTube Unlisted	Free public video delivery
Orders	Email	Checkout/order communication
Contact	Browser/localStorage	Zero backend traffic
Search	Browser	Zero database reads
Publishing	GitHub/Cloudflare	Static release
Backup	Git + exported data	Recovery
🏆 The final principle

The architecture should effectively be:

                 ┌─────────────────────────┐
                 │       CONTROL PLANE     │
                 │                         │
                 │ Firebase Auth           │
                 │ Firestore               │
                 │ Admin CMS               │
                 │ Drafts                  │
                 │ Publishing              │
                 └────────────┬────────────┘
                              │
                           PUBLISH
                              │
                              ▼
                 ┌─────────────────────────┐
                 │       DELIVERY PLANE    │
                 │                         │
                 │ Cloudflare Pages        │
                 │ Cloudflare CDN          │
                 │ Static catalogue        │
                 │ Static HTML/JS/CSS      │
                 └────────────┬────────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
        Cloudinary         YouTube          Browser
         Images            Videos           Services             │                │                │
             └────────────────┼────────────────┘
                              │
                              ▼
                         Email

That is the architecture I would lock in.

It gives you the powerful admin/CMS you want without making every customer request dependent on Firebase, uses Cloudflare as the delivery/security layer, Cloudinary as the image CDN, YouTube as the zero-cost public video infrastructure, and Email as the transaction/order layer.

The only thing I would explicitly not promise is “unlimited/free forever”: Firebase, Cloudinary, Cloudflare and YouTube all have their own quotas, policies, and limits. The architecture's strength is that ordinary public traffic is largely decoupled from the database and your expensive/dynamic operations are kept extremely small, so a local Tier-3-city business can operate comfortably within free/low-cost limits.