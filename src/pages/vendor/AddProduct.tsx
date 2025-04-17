
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { 
  Package, ArrowLeft, Upload, Leaf, Tag, Scale, Info, Store
} from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  weight: z.coerce.number().positive({
    message: "Weight must be a positive number.",
  }),
  quantity: z.coerce.number().int().positive({
    message: "Quantity must be a positive integer.",
  }),
  image: z.string().optional(),
  sustainabilityScore: z.coerce.number().min(0).max(100).optional(),
  tags: z.string().optional(),
  recyclablePackaging: z.boolean().optional().default(false),
  organicCertified: z.boolean().optional().default(false),
  carbonNeutral: z.boolean().optional().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProduct = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      weight: 0,
      quantity: 1,
      image: "",
      sustainabilityScore: 50,
      tags: "",
      recyclablePackaging: false,
      organicCertified: false,
      carbonNeutral: false,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result);
        form.setValue("image", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real application, this would send data to a backend API
      console.log("Product data:", data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Product added successfully!");
      navigate('/vendor');
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
    "Groceries", 
    "Organic Food", 
    "Health & Wellness", 
    "Home Goods",
    "Eco-friendly Products", 
    "Clothes & Apparel", 
    "Beauty & Personal Care", 
    "Electronics",
    "Others"
  ];

  return (
    <DashboardLayout userRole="vendor">
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <p className="text-gray-600">
            Create a new sustainable product for your eco-conscious customers
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5 text-primary" />
              Product Details
            </CardTitle>
            <CardDescription>
              Fill in the details below to add a new product to your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Additional Details</TabsTrigger>
                <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              </TabsList>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Eco-friendly Water Bottle" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (₦)*</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description*</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter product description..." 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Describe your product in detail, including materials, usage, and benefits.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category*</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              {...field}
                            >
                              <option value="" disabled>Select a category</option>
                              {categoryOptions.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormItem>
                      <FormLabel>Product Image</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                            <Upload className="h-10 w-10 text-gray-400 mb-2" />
                            <Label 
                              htmlFor="image-upload"
                              className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium"
                            >
                              Click to upload
                            </Label>
                            <p className="text-sm text-gray-500 mt-1">
                              SVG, PNG, JPG or GIF (max. 2MB)
                            </p>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </div>
                        </div>
                        
                        {selectedImage && (
                          <div className="border rounded-md overflow-hidden flex items-center justify-center bg-white">
                            <img
                              src={selectedImage}
                              alt="Product preview"
                              className="max-h-40 object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </FormItem>
                  </TabsContent>
                  
                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Scale className="h-4 w-4 mr-1" /> 
                              Weight (kg)*
                            </FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Store className="h-4 w-4 mr-1" /> 
                              Stock Quantity*
                            </FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" /> 
                            Tags
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="eco-friendly, reusable, sustainable (comma separated)" {...field} />
                          </FormControl>
                          <FormDescription>
                            Add searchable tags to help customers find your product
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="sustainability" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="sustainabilityScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Leaf className="h-4 w-4 mr-1 text-green-500" /> 
                            Sustainability Score (0-100)
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Input type="range" min="0" max="100" {...field} />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>0</span>
                                <span>25</span>
                                <span>50</span>
                                <span>75</span>
                                <span>100</span>
                              </div>
                              <p className="text-center text-sm">Current value: {field.value}</p>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Rate how sustainable your product is based on materials, production process, and packaging
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4 bg-green-50 p-4 rounded-md">
                      <h3 className="font-medium flex items-center">
                        <Info className="h-4 w-4 mr-2 text-green-600" />
                        Sustainability Features
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start space-x-2">
                          <input
                            type="checkbox"
                            id="recyclablePackaging"
                            className="mt-1"
                            checked={form.watch("recyclablePackaging")}
                            onChange={(e) => form.setValue("recyclablePackaging", e.target.checked)}
                          />
                          <div>
                            <Label htmlFor="recyclablePackaging">Recyclable Packaging</Label>
                            <p className="text-xs text-gray-500">Product uses recyclable materials</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <input
                            type="checkbox"
                            id="organicCertified"
                            className="mt-1"
                            checked={form.watch("organicCertified")}
                            onChange={(e) => form.setValue("organicCertified", e.target.checked)}
                          />
                          <div>
                            <Label htmlFor="organicCertified">Organic Certified</Label>
                            <p className="text-xs text-gray-500">Product is certified organic</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <input
                            type="checkbox"
                            id="carbonNeutral"
                            className="mt-1"
                            checked={form.watch("carbonNeutral")}
                            onChange={(e) => form.setValue("carbonNeutral", e.target.checked)}
                          />
                          <div>
                            <Label htmlFor="carbonNeutral">Carbon Neutral</Label>
                            <p className="text-xs text-gray-500">Production is carbon neutral</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-primary hover:bg-primary-hover text-black"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Product"}
                    </Button>
                  </div>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
