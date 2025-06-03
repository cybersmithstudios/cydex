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
    <DashboardLayout userRole="VENDOR">
      <div className="p-3 sm:p-4 md:p-6 max-w-5xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-3 sm:mb-4 w-full sm:w-auto text-xs sm:text-sm"
          >
            <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Back
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold">Add New Product</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Create a new sustainable product for your eco-conscious customers
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center text-base sm:text-lg">
              <Package className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Product Details
            </CardTitle>
            <CardDescription className="text-sm">
              Fill in the details below to add a new product to your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 sm:mb-8 w-full">
                <TabsTrigger value="basic" className="text-xs sm:text-sm">Basic Info</TabsTrigger>
                <TabsTrigger value="details" className="text-xs sm:text-sm">Details</TabsTrigger>
                <TabsTrigger value="sustainability" className="text-xs sm:text-sm">Sustainability</TabsTrigger>
              </TabsList>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <TabsContent value="basic" className="space-y-3 sm:space-y-4 mt-3 sm:mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Product Name*</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Eco-friendly Water Bottle" 
                                className="text-sm sm:text-base"
                                {...field} 
                              />
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
                            <FormLabel className="text-sm sm:text-base">Price (₦)*</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0.00" 
                                className="text-sm sm:text-base"
                                {...field} 
                              />
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
                          <FormLabel className="text-sm sm:text-base">Description*</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter product description..." 
                              className="min-h-24 sm:min-h-32 text-sm sm:text-base"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-xs sm:text-sm">
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
                          <FormLabel className="text-sm sm:text-base">Category*</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-9 sm:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                      <FormLabel className="text-sm sm:text-base">Product Image</FormLabel>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 sm:p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                          <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 mb-2" />
                          <Label 
                            htmlFor="image-upload"
                            className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium text-sm sm:text-base"
                          >
                            Click to upload
                          </Label>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
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
                        
                        {selectedImage && (
                          <div className="border rounded-md overflow-hidden flex items-center justify-center bg-white p-4">
                            <img
                              src={selectedImage}
                              alt="Product preview"
                              className="max-h-32 sm:max-h-40 object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </FormItem>
                  </TabsContent>
                  
                  <TabsContent value="details" className="space-y-3 sm:space-y-4 mt-3 sm:mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm sm:text-base">
                              <Scale className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> 
                              Weight (kg)*
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.01" 
                                className="text-sm sm:text-base"
                                {...field} 
                              />
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
                            <FormLabel className="flex items-center text-sm sm:text-base">
                              <Store className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> 
                              Stock Quantity*
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                className="text-sm sm:text-base"
                                {...field} 
                              />
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
                          <FormLabel className="flex items-center text-sm sm:text-base">
                            <Tag className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> 
                            Tags
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="eco-friendly, reusable, sustainable (comma separated)" 
                              className="text-sm sm:text-base"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-xs sm:text-sm">
                            Add searchable tags to help customers find your product
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="sustainability" className="space-y-3 sm:space-y-4 mt-3 sm:mt-0">
                    <FormField
                      control={form.control}
                      name="sustainabilityScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm sm:text-base">
                            <Leaf className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" /> 
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
                              <p className="text-center text-xs sm:text-sm">Current value: {field.value}</p>
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs sm:text-sm">
                            Rate how sustainable your product is based on materials, production process, and packaging
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-3 sm:space-y-4 bg-green-50 p-3 sm:p-4 rounded-md">
                      <h3 className="font-medium flex items-center text-sm sm:text-base">
                        <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-green-600" />
                        Sustainability Features
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
                        <SustainabilityCheckbox
                          id="recyclablePackaging"
                          label="Recyclable Packaging"
                          description="Product uses recyclable materials"
                          checked={form.watch("recyclablePackaging")}
                          onChange={(checked) => form.setValue("recyclablePackaging", checked)}
                        />
                        
                        <SustainabilityCheckbox
                          id="organicCertified"
                          label="Organic Certified"
                          description="Product is certified organic"
                          checked={form.watch("organicCertified")}
                          onChange={(checked) => form.setValue("organicCertified", checked)}
                        />
                        
                        <SustainabilityCheckbox
                          id="carbonNeutral"
                          label="Carbon Neutral"
                          description="Production is carbon neutral"
                          checked={form.watch("carbonNeutral")}
                          onChange={(checked) => form.setValue("carbonNeutral", checked)}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-2 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(-1)}
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-primary hover:bg-primary-hover text-black w-full sm:w-auto text-xs sm:text-sm"
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

// Mobile-Optimized Sustainability Checkbox Component
const SustainabilityCheckbox = ({ id, label, description, checked, onChange }) => (
  <div className="flex items-start space-x-2">
    <input
      type="checkbox"
      id={id}
      className="mt-1"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <div>
      <Label htmlFor={id} className="text-sm sm:text-base">{label}</Label>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

export default AddProduct;
