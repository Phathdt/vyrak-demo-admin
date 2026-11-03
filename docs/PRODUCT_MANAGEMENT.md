# Product Management Feature

Admin page để quản lý sản phẩm với table list và form tạo mới.

## 🎯 Features

- ✅ **Table hiển thị products** - 4 cột: SKU, Name, Quantity, Pricing
- ✅ **Pagination** - 10 items mỗi trang
- ✅ **Form tạo product** - Dialog modal với validation đầy đủ
- ✅ **localStorage persistence** - Dữ liệu được lưu local
- ✅ **Responsive design** - Mobile-friendly
- ✅ **Dark mode support** - Tự động theo system theme

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser
# http://localhost:5176/
```

## 📋 Requirements

- Node.js >= 18
- npm >= 9

## 🎨 Tech Stack

- **React 19** - UI library
- **TypeScript 6** - Type safety
- **Vite 8** - Build tool
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI components
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **lucide-react** - Icons

## 📁 Project Structure

```
src/
├── components/
│   ├── pagination.tsx           # Pagination controls
│   ├── product-create-dialog.tsx  # Create form dialog
│   ├── products-table.tsx       # Product table
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── schemas.ts               # Zod validation schemas
│   └── storage.ts               # localStorage utilities
├── pages/
│   └── products-page.tsx        # Main products page
├── types/
│   └── product.ts               # Product type definitions
└── App.tsx                      # App entry point
```

## 🎮 Usage

### Creating a Product

1. Click **"Create Product"** button
2. Fill in the form:
   - **SKU** (required) - Product SKU code
   - **Name** (required) - Product name
   - **Quantity** (required, > 0) - Stock quantity
   - **Pricing** (required, > 0) - Product price
3. Click **"Create Product"** to save

### Validation Rules

- **SKU**: Bắt buộc nhập
- **Name**: Bắt buộc nhập
- **Quantity**: Phải > 0, số nguyên
- **Pricing**: Phải > 0, số thập phân (2 chữ số)

### Pagination

- Tự động hiện khi có > 10 products
- Hiển thị 10 items mỗi trang
- Nút Previous/Next + page numbers
- Current page được highlight

## 💾 Data Storage

Products được lưu trong **localStorage** với key `vyrak-products`.

```typescript
// Data structure
interface Product {
  id: string;        // UUID v4
  sku: string;       // Product SKU
  name: string;      // Product name
  quantity: number;  // Stock quantity
  pricing: number;   // Product price
  createdAt: string; // ISO timestamp
}
```

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Format
npm run format

# Build
npm run build
```

## 📚 Documentation

- **PRD**: [`docs/prd/prd-product-management.md`](docs/prd/prd-product-management.md)
- **Implementation Report**: [`plans/reports/implementation-261103-2201-product-management.md`](plans/reports/implementation-261103-2201-product-management.md)

## 🎯 Acceptance Criteria

### ✅ Completed

- [x] Table shows 4 columns correctly
- [x] Empty state when no products
- [x] Create button opens dialog
- [x] Form validation works
- [x] Products saved to localStorage
- [x] Pagination works (10 items/page)
- [x] Data persists after refresh
- [x] Responsive design
- [x] TypeScript strict mode

## 🚫 Out of Scope

Các features sau **KHÔNG** có trong phiên bản này:

- ❌ Edit product
- ❌ Delete product
- ❌ Search/Filter/Sort
- ❌ Backend API
- ❌ Multi-user support
- ❌ Image uploads
- ❌ Product categories

## 🐛 Known Issues

None currently.

## 📝 Notes

- Đây là demo với localStorage, không có backend API
- Data chỉ lưu local trên browser
- Xóa localStorage sẽ mất hết data

## 🤝 Contributing

1. Đọc PRD document trước
2. Follow existing code style
3. Test thoroughly trước khi commit
4. Run `npm run typecheck` và `npm run lint`

---

**Version:** 1.0.0  
**Last Updated:** 2026-11-03  
**Status:** ✅ Production Ready
