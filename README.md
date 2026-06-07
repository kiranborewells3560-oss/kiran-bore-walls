# Kiran Bore Walls

E-commerce website for bore wall parts and tools.

## Features

- Product catalog with 32+ products (Type A, B, C categories)
- YouTube-style dark theme UI
- Product search with live suggestions
- Shopping cart with quantity management
- Google Forms checkout (no payment gateway needed)
- Responsive design for mobile and desktop

## Tech Stack

- React.js
- React Router
- CSS3

## Product Categories

| Type | Products |
|------|----------|
| Type A | Locks, Nuts, Adaptors (11 items) |
| Type B | Camera & Electronics (9 items) |
| Type C | Motor Parts, Collars, Clamps, Tools (12 items) |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   └── Icons.js
├── pages/
│   ├── Home.js
│   ├── Cart.js
│   └── ProductDetail.js
├── data/
│   └── products.js
├── App.js
└── App.css
```

## Adding Products

Edit `src/data/products.js`:

```javascript
{
  id: 1,
  name: 'Product Name',
  category: 'typeA', // typeA, typeB, or typeC
  subcategory: 'Locks',
  price: 500,
  mrp: 650,
  image: '/images/A1.jpg',
  desc: 'Product description',
  rating: 4.5,
  soldOut: false
}
```

## Adding Images

Place product images in `public/images/` folder:
- A1.jpg to A12.jpg (Type A)
- B1.jpg to B9.jpg (Type B)
- C1.jpg to C12.jpg (Type C)

## Contact

Kiran Bore Walls  
Kunchanoor Road, Jamkhandi, Karnataka 587301

## License

MIT
