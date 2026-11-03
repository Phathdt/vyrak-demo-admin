import { useState } from "react"
import { Plus } from "lucide-react"
import { mockProducts, type Product } from "@/data/mock-products"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    quantity: "",
    pricing: "",
  })
  const [formErrors, setFormErrors] = useState({
    sku: "",
    name: "",
    quantity: "",
    pricing: "",
  })

  const itemsPerPage = 20
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const validateForm = () => {
    const errors = {
      sku: "",
      name: "",
      quantity: "",
      pricing: "",
    }
    let isValid = true

    if (!formData.sku.trim()) {
      errors.sku = "SKU is required"
      isValid = false
    }

    if (!formData.name.trim()) {
      errors.name = "Name is required"
      isValid = false
    }

    const quantity = Number(formData.quantity)
    if (!formData.quantity || quantity <= 0 || isNaN(quantity)) {
      errors.quantity = "Quantity must be greater than 0"
      isValid = false
    }

    const pricing = Number(formData.pricing)
    if (!formData.pricing || pricing <= 0 || isNaN(pricing)) {
      errors.pricing = "Pricing must be greater than 0"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newProduct: Product = {
      id: String(products.length + 1),
      sku: formData.sku.trim(),
      name: formData.name.trim(),
      quantity: Number(formData.quantity),
      pricing: Number(formData.pricing),
      createdAt: new Date().toISOString(),
    }

    setProducts([newProduct, ...products])
    setFormData({ sku: "", name: "", quantity: "", pricing: "" })
    setFormErrors({ sku: "", name: "", quantity: "", pricing: "" })
    setIsDialogOpen(false)
    setCurrentPage(1)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your product inventory
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Create New Product</DialogTitle>
                  <DialogDescription>
                    Add a new product to your inventory. Fill in the required
                    fields below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sku">
                      SKU <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="sku"
                      placeholder="e.g., PRD-001"
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value)}
                      className={formErrors.sku ? "border-destructive" : ""}
                    />
                    {formErrors.sku && (
                      <p className="text-sm text-destructive">
                        {formErrors.sku}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g., Wireless Headphones"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={formErrors.name ? "border-destructive" : ""}
                    />
                    {formErrors.name && (
                      <p className="text-sm text-destructive">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">
                      Quantity <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="e.g., 100"
                      value={formData.quantity}
                      onChange={(e) =>
                        handleInputChange("quantity", e.target.value)
                      }
                      className={formErrors.quantity ? "border-destructive" : ""}
                    />
                    {formErrors.quantity && (
                      <p className="text-sm text-destructive">
                        {formErrors.quantity}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="pricing">
                      Pricing <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="pricing"
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="e.g., 99.99"
                      value={formData.pricing}
                      onChange={(e) =>
                        handleInputChange("pricing", e.target.value)
                      }
                      className={formErrors.pricing ? "border-destructive" : ""}
                    />
                    {formErrors.pricing && (
                      <p className="text-sm text-destructive">
                        {formErrors.pricing}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false)
                      setFormData({
                        sku: "",
                        name: "",
                        quantity: "",
                        pricing: "",
                      })
                      setFormErrors({
                        sku: "",
                        name: "",
                        quantity: "",
                        pricing: "",
                      })
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Product</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Pricing</TableHead>
                <TableHead>Created Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {product.sku}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-right">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatPrice(product.pricing)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(product.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, products.length)} of{" "}
            {products.length} products
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  const distance = Math.abs(page - currentPage)
                  return (
                    distance === 0 ||
                    distance === 1 ||
                    page === 1 ||
                    page === totalPages
                  )
                })
                .map((page, index, array) => {
                  const prevPage = array[index - 1]
                  const showEllipsis = prevPage && page - prevPage > 1

                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsis && (
                        <span className="px-2 text-muted-foreground">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    </div>
                  )
                })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
