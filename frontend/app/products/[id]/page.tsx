'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiHeart, 
  FiShoppingCart, 
  FiStar, 
  FiTruck, 
  FiRefreshCw, 
  FiShield,
  FiChevronRight,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import ProductCard from '@/components/products/ProductCard';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  subCategory: string;
  gender: string;
  images: { url: string; alt: string }[];
  colors: { name: string; hex: string; images: string[] }[];
  sizes: { size: string; stock: number }[];
  totalStock: number;
  features: string[];
  tags: string[];
  rating: { average: number; count: number };
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const inWishlist = product ? isInWishlist(product._id) : false;

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${params.id}`);
      setProduct(response.data);
      
      // Set default selections
      if (response.data.colors?.length > 0) {
        setSelectedColor(response.data.colors[0].name);
      }
      if (response.data.sizes?.length > 0) {
        setSelectedSize(response.data.sizes[0].size);
      }

      // Fetch related products
      const relatedResponse = await api.get(`/products?category=${response.data.category}&limit=4`);
      setRelatedProducts(relatedResponse.data.filter((p: Product) => p._id !== params.id));
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    const cartItem = {
      _id: `${product._id}-${selectedSize}-${selectedColor}`,
      product: product,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
    };

    addToCart(cartItem);
    toast.success('Added to cart!');
  };

  const handleWishlist = () => {
    if (!product) return;

    if (inWishlist) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-puma-red"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link href="/products" className="text-puma-red hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-puma-red transition-colors">
            Home
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-puma-red transition-colors">
            Products
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={product.images[selectedImage]?.url || '/placeholder.jpg'}
                alt={product.images[selectedImage]?.alt || product.name}
                className="w-full h-full object-contain p-8"
              />
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white dark:bg-gray-900 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-puma-red scale-105'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                {product.isNewArrival && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    NEW
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    BESTSELLER
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating.average)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {product.rating.average}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-black text-puma-red">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Inclusive of all taxes
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                  Color: <span className="text-puma-red">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`px-6 py-3 rounded-lg border-2 transition-all font-semibold ${
                        selectedColor === color.name
                          ? 'border-puma-red bg-puma-red text-white'
                          : 'border-gray-300 dark:border-gray-600 hover:border-puma-red'
                      }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                  Size: <span className="text-puma-red">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size.size)}
                      disabled={size.stock === 0}
                      className={`px-6 py-3 rounded-lg border-2 transition-all font-semibold ${
                        selectedSize === size.size
                          ? 'border-puma-red bg-puma-red text-white'
                          : size.stock === 0
                          ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 dark:border-gray-600 hover:border-puma-red'
                      }`}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-puma-red font-bold"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-puma-red font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-puma-red text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`px-6 py-4 rounded-lg border-2 font-bold text-lg transition-all ${
                  inWishlist
                    ? 'border-puma-red bg-puma-red text-white'
                    : 'border-gray-300 dark:border-gray-600 hover:border-puma-red'
                }`}
              >
                <FiHeart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform"
            >
              Buy Now
            </button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t dark:border-gray-700">
              <div className="text-center">
                <FiTruck className="w-8 h-8 mx-auto mb-2 text-puma-red" />
                <p className="text-sm font-semibold">Free Delivery</p>
              </div>
              <div className="text-center">
                <FiRefreshCw className="w-8 h-8 mx-auto mb-2 text-puma-red" />
                <p className="text-sm font-semibold">Easy Returns</p>
              </div>
              <div className="text-center">
                <FiShield className="w-8 h-8 mx-auto mb-2 text-puma-red" />
                <p className="text-sm font-semibold">Warranty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 shadow-lg">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
            Product Details
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                You May Also Like
              </h2>
              <Link
                href={`/products?category=${product.category}`}
                className="text-puma-red hover:underline font-semibold flex items-center gap-2"
              >
                View All
                <FiChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
