import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/lib/storage";
import { ProductsTable } from "@/components/products-table";
import { ProductCreateDialog } from "@/components/product-create-dialog";
import { Pagination } from "@/components/pagination";

const ITEMS_PER_PAGE = 10;

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadProducts = () => {
    const allProducts = getProducts();
    setProducts(allProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleProductCreated = () => {
    loadProducts();
    // Navigate to last page to show newly created product
    const newTotalPages = Math.ceil((products.length + 1) / ITEMS_PER_PAGE);
    setCurrentPage(newTotalPages);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <ProductCreateDialog onProductCreated={handleProductCreated} />
      </div>

      <div className="space-y-4">
        <ProductsTable products={currentProducts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {products.length > 0 && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of{" "}
          {products.length} products
        </div>
      )}
    </div>
  );
}
