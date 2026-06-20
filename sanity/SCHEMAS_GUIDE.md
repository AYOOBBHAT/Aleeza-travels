# Sanity Schemas Guide - Kashmir Travel Website

This document provides an overview of all content schemas configured for the Kashmir travel website.

## 📋 Available Schemas

### 1. Destination (`destination`)
Kashmir travel destinations like Gulmarg, Srinagar, Pahalgam, etc.

**Fields:**
- `title` - Destination name (required, 3-100 chars)
- `slug` - SEO-friendly URL (auto-generated)
- `description` - Brief overview (required, 50-500 chars)
- `bestSeason` - Best time to visit (Spring/Summer/Autumn/Winter/Year Round)
- `images` - Array of images with alt text (1-10 images)
- `thingsToDo` - Array of activities with descriptions (min 3)
- `localTips` - Array of helpful tips with categories
- `featured` - Boolean to feature on homepage

**Example Use Cases:**
- Gulmarg skiing destination
- Srinagar city guide
- Pahalgam adventure hub

---

### 2. Package (`package`)
Detailed travel packages with itineraries.

**Fields:**
- `title` - Package name (required, 5-100 chars)
- `slug` - SEO-friendly URL (auto-generated)
- `duration` - Package length (e.g., "5 Days / 4 Nights")
- `priceRange` - Object with starting price, currency, per-person flag
- `destinationsCovered` - Array of destination references (min 1)
- `itinerary` - Day-wise array with:
  - Day number
  - Day title
  - Activities description
  - Meals included
  - Accommodation details
- `includes` - Array of included items/services (min 3)
- `excludes` - Array of excluded items
- `hotelType` - Budget/Standard/Deluxe/Luxury/Heritage/Houseboat/Mixed
- `transportDetails` - Object with pickup/dropoff, vehicle type, driver, fuel
- `safetyNotes` - Array of safety information with priority levels
- `featured` - Boolean to feature on homepage

**Example Use Cases:**
- "7 Days Kashmir Valley Tour"
- "Gulmarg Ski Package"
- "Houseboat Experience in Srinagar"

---

### 3. Blog (`blog`)
Blog posts with full SEO optimization.

**Fields:**
- `title` - Post title (required, 10-100 chars)
- `slug` - SEO-friendly URL (auto-generated)
- `excerpt` - Short summary (required, 100-200 chars for SEO)
- `coverImage` - Main image with alt text (required, 1200x630px recommended)
- `author` - Object with name, image, bio
- `publishedAt` - Publication date (required)
- `readTime` - Estimated reading time
- `categories` - Array (Destinations, Travel Tips, Culture, Adventure, Food, Photography, Seasonal)
- `content` - Rich text array with:
  - Headings (H2, H3)
  - Paragraphs
  - Lists (bullet, numbered)
  - Images with captions
  - Code blocks
  - Links
- `seo` - SEO object with:
  - Meta title (max 60 chars)
  - Meta description (max 160 chars)
  - Keywords array
  - Open Graph image
  - Canonical URL
- `featured` - Boolean to feature on blog page

**Example Use Cases:**
- "Best Time to Visit Kashmir: A Seasonal Guide"
- "10 Must-Try Kashmiri Dishes"
- "Photography Tips for Kashmir Valley"

---

### 4. FAQ (`faq`)
Frequently asked questions with rich answers.

**Fields:**
- `question` - The FAQ question (required, 10-200 chars)
- `answer` - Rich text answer (required)
- `category` - One of:
  - General
  - Booking & Payments
  - Travel & Transportation
  - Accommodation
  - Destinations
  - Packages
  - Safety & Health
  - Visa & Documents
  - Weather & Seasons
  - Culture & Customs
- `order` - Display order (lower numbers first)
- `featured` - Boolean to feature prominently

**Example Use Cases:**
- "Do I need a permit to visit Kashmir?"
- "What is the best time to visit Gulmarg?"
- "Are houseboats safe for families?"

---

## 🎨 Editor UI Features

### SEO-Friendly Slugs
All schemas with slugs automatically:
- Convert to lowercase
- Replace spaces with hyphens
- Limit to 96 characters
- Generate from title field

### Validation Rules
- Required fields are enforced
- Character limits for SEO optimization
- Minimum array lengths where applicable
- Type validation (numbers, strings, etc.)

### Rich Content Editing
- Blog posts support rich text with headings, lists, images
- FAQ answers support formatted text with links
- Package itineraries have structured day-by-day format

### Image Optimization
- All images support:
  - Hotspot selection for cropping
  - Alt text for accessibility and SEO
  - Optional captions
  - Multiple image arrays where needed

### Preview Configuration
- Custom previews show relevant information
- Icons for visual identification
- Ordering options for better content management

---

## 📊 Content Relationships

### Package → Destination
- Packages can reference multiple destinations
- Creates a many-to-many relationship
- Helps organize packages by location

### All Schemas
- All support `featured` flag for homepage/prominent display
- All have SEO-friendly slugs
- All include validation for data quality

---

## 🚀 Best Practices

### For Destinations
1. Use high-quality images (at least 3-5)
2. Write detailed descriptions (aim for 200-400 chars)
3. Add at least 5-7 things to do
4. Include practical local tips

### For Packages
1. Create detailed day-by-day itineraries
2. Be specific about what's included/excluded
3. Add safety notes for Kashmir-specific concerns
4. Set realistic price ranges

### For Blog Posts
1. Write compelling excerpts (150-160 chars)
2. Use SEO meta titles and descriptions
3. Add relevant keywords
4. Include high-quality cover images (1200x630px)

### For FAQs
1. Use clear, concise questions
2. Provide detailed, helpful answers
3. Categorize properly for easy navigation
4. Set display order for logical flow

---

## 🔧 Schema Customization

To modify schemas:
1. Edit the schema file in `sanity/schemas/`
2. Restart Sanity Studio (`npm run sanity`)
3. Changes will appear immediately

To add new fields:
- Use `defineField()` for type safety
- Add validation rules
- Update preview configuration if needed

---

## 📝 Notes

- All schemas use TypeScript for type safety
- Validation rules help maintain content quality
- SEO fields are optimized for search engines
- Rich text editors support formatting and media
- Image fields include accessibility features (alt text)

---

**Ready to create content?** Start by adding your first destination, then create packages that reference it!

