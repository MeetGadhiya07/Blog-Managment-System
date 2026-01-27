# Blog Management System

A modern Blog CMS built with Next.js and React featuring CRUD operations, rich text editor, image galleries, ratings, and comments system.

## ✨ Features

- 📝 **CRUD Operations** - Create, read, update, delete blog posts
- 🎨 **Rich Text Editor** - React Quill WYSIWYG editor
- 🖼️ **Image Support** - Banner and gallery images
- ⭐ **Ratings & Comments** - User feedback system
- 🏷️ **Tags & Categories** - Organize content
- 🔍 **Server Actions** - Next.js 14+ server-side operations
- ✅ **Form Validation** - Zod schema validation
- 🎯 **Responsive Design** - Tailwind CSS
- 📱 **SEO Optimized** - Structured data support

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Commands:**

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Production server
- `npm run lint` - ESLint check
- `npm run format` - Format code

## 📁 Project Structure

```
src/
├── app/                   # Routes & layouts
│   ├── (dashboard)/      # Admin dashboard
│   └── (blog)/           # Public blog pages
├── components/           # React components
│   ├── blog/            # Blog components
│   ├── ui/              # UI components
│   └── layouts/         # Layout components
├── lib/                 # Utilities & hooks
│   ├── data/            # blogs.json, comments.json
│   ├── hooks/           # Custom hooks
│   ├── store/           # Redux store
│   └── validations/     # Zod schemas
├── types/               # TypeScript types
└── config/              # Configuration
```

## 🎯 Usage

**View Blogs:** [/blogs](http://localhost:3000/blogs)

- Browse all published blog posts
- Filter by categories and tags
- View ratings and comments

**Blog Detail:** Click any blog post to view full content with images, gallery, and comments

**Admin Dashboard:** [/dashboard/blogs](http://localhost:3000/dashboard/blogs)

- Create/Edit/Delete posts
- Manage images (banner & gallery)
- Set categories, tags, and metadata

## 🛠 Tech Stack

- **Framework:** Next.js 16.1.4
- **UI:** React 19.2.3, Tailwind CSS 4
- **State:** Redux Toolkit 2.11.2
- **Forms:** Formik 2.4.9, Zod 4.3.6
- **Editor:** React Quill 3.7.0
- **Other:** TypeScript 5, Swiper 12, Lucide Icons

## 📄 Author

Built by **Meet Gadhiya** | Last Updated: January 26, 2026
