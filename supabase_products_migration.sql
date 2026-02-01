-- CREATE PRODUCTS TABLE
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  old_price DECIMAL(10, 2),
  discount INTEGER,
  rating DECIMAL(2, 1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  image TEXT NOT NULL,
  images TEXT[],
  sizes TEXT[],
  category TEXT NOT NULL,
  subcategory TEXT,
  badge_type TEXT,
  flash_sale BOOLEAN DEFAULT false,
  best_selling BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  free_delivery BOOLEAN DEFAULT true,
  return_policy TEXT DEFAULT 'Free 30 Days Delivery Returns',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy: Anyone can view products
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Create policy: Only authenticated users can insert products (for admin)
CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy: Only authenticated users can update products (for admin)
CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy: Only authenticated users can delete products (for admin)
CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

  -- ============================================
-- CREATE CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  image TEXT,
  description TEXT,
  parent_id UUID REFERENCES categories(id),
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy: Anyone can view categories
CREATE POLICY "Anyone can view categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

-- ============================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_flash_sale ON products(flash_sale);
CREATE INDEX idx_products_best_selling ON products(best_selling);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);

-- ============================================
-- CREATE FUNCTION TO UPDATE TIMESTAMP
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- CREATE TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INSERT CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, icon, display_order) VALUES
  ('Phones', 'phones', '📱', 1),
  ('Computers', 'computers', '💻', 2),
  ('SmartWatch', 'smartwatch', '⌚', 3),
  ('Camera', 'camera', '📷', 4),
  ('HeadPhones', 'headphones', '🎧', 5),
  ('Gaming', 'gaming', '🎮', 6),
  ('Woman''s Fashion', 'womans-fashion', '👗', 7),
  ('Men''s Fashion', 'mens-fashion', '👔', 8),
  ('Electronics', 'electronics', '⚡', 9),
  ('Home & Lifestyle', 'home-lifestyle', '🏠', 10),
  ('Medicine', 'medicine', '💊', 11),
  ('Sports & Outdoor', 'sports-outdoor', '⚽', 12),
  ('Baby''s & Toys', 'babys-toys', '🧸', 13),
  ('Groceries & Pets', 'groceries-pets', '🛒', 14),
  ('Health & Beauty', 'health-beauty', '💄', 15);

-- ============================================
-- INSERT PRODUCTS
-- ALL PRODUCTS HAVE EXACTLY 18 VALUES
-- ============================================
-- Column order: product_id, title, description, price, old_price, discount, 
-- rating, reviews_count, image, images, sizes, category, subcategory,
-- badge_type, flash_sale, best_selling, featured, in_stock

INSERT INTO products (
  product_id, title, description, price, old_price, discount, 
  rating, reviews_count, image, images, sizes, category, subcategory,
  badge_type, flash_sale, best_selling, featured, in_stock
) VALUES
-- FLASH SALES PRODUCTS (flash_sale = true)
(
  'flash-gamepad-1', 
  'HAVIT HV-G92 Gamepad',
  'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
  120, 160, 40, 5.0, 88,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FHAVIT%20HV-G92%20Gamepad.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FHAVIT%20HV-G92%20Gamepad.png&w=256&q=75'],
  NULL,
  'Electronics', 'Gaming',
  'discount',
  true, false, false, true
),
(
  'flash-keyboard-1',
  'AK-900 Wired Keyboard',
  'Mechanical gaming keyboard with RGB backlight and premium switches',
  960, 1160, 35, 4.0, 75,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FAK-900%20Wired%20Keyboard.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FAK-900%20Wired%20Keyboard.png&w=256&q=75'],
  NULL,
  'Electronics', 'Gaming',
  'discount',
  true, false, false, true
),
(
  'flash-chair-1',
  'S-Series Comfort Chair',
  'Ergonomic office chair with lumbar support and breathable mesh',
  375, 400, 25, 4.5, 99,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FS-Series%20Comfort%20Chair.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FS-Series%20Comfort%20Chair.png&w=256&q=75'],
  NULL,
  'Home & Lifestyle', NULL,
  'discount',
  true, false, false, true
),
(
  'flash-samsung-s23',
  'Samsung Galaxy S23 Ultra',
  'Premium Android smartphone with 200MP camera and S Pen support.',
  1199, 1399, 14, 4.8, 6200,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FSamsung%20Galaxy%20S23%20Ultra.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FSamsung%20Galaxy%20S23%20Ultra.png&w=256&q=75'],
  ARRAY['128GB', '256GB', '512GB'],
  'Electronics', 'Phones',
  'discount',
  true, false, false, true
),
(
  'ips-lcd-gaming-screen',
  'IPS LCD Gaming Screen',
  'High-refresh-rate IPS gaming monitor with vivid colors, fast response time, and smooth visuals for competitive gaming.',
  280, 450, 38, 4.5, 1200,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FIPS%20LCD%20Gaming%20Monitor.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FIPS%20LCD%20Gaming%20Monitor.png&w=256&q=75'],
  NULL,
  'Electronics', 'Gaming',
  'discount',
  true, false, false, true
),

-- BEST SELLING PRODUCTS (best_selling = true)
(
  'best-jacket-1',
  'The North Coat',
  'Warm winter jacket with premium insulation and water-resistant fabric',
  260, 360, 28, 5.0, 65,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FThe%20North%20Coat.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FThe%20North%20Coat.png&w=256&q=75'],
  ARRAY['S', 'M', 'L', 'XL'],
  'Woman''s Fashion', NULL,
  NULL,
  false, true, false, true
),
(
  'best-bag-1',
  'Gucci Duffle Bag',
  'Luxury leather duffle bag with signature GG pattern',
  960, 1160, 17, 4.5, 35,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FGucci%20Duffle%20Bag.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FGucci%20Duffle%20Bag.png&w=256&q=75'],
  NULL,
  'Woman''s Fashion', NULL,
  NULL,
  false, true, false, true
),
(
  'best-bookshelf-1',
  'Small BookSelf',
  'Minimalist wooden bookshelf perfect for small spaces',
  360, NULL, NULL, 5.0, 65,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FSmall%20Bookshelf.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FSmall%20Bookshelf.png&w=256&q=75'],
  NULL,
  'Home & Lifestyle', NULL,
  NULL,
  false, true, false, true
),
(
  'rgb-liquid-cpu-cooler',
  'RGB Liquid CPU Cooler',
  'Advanced liquid cooling system with customizable RGB lighting to keep your CPU cool during heavy workloads and gaming.',
  130, 150, 13, 4.0, 450,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FRGB%20Liquid%20CPU%20Cooler.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FRGB%20Liquid%20CPU%20Cooler.png&w=256&q=75'],
  NULL,
  'Electronics', 'Gaming',
  NULL,
  false, true, false, true
),

-- FEATURED PRODUCTS (featured = true) - For "Our Products" page
(
  'asus-fhd-gaming-laptop',
  'ASUS FHD Gaming Laptop',
  'Powerful gaming laptop with Full HD display, high-performance processor, and dedicated graphics card for smooth gameplay.',
  1050, 1200, 13, 4.0, 2300,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FASUS%20FHD%20Gaming%20Laptop.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FASUS%20FHD%20Gaming%20Laptop.png&w=256&q=75'],
  NULL,
  'Electronics', 'Computers',
  NULL,
  false, true, true, true
),
(
  'featured-dog-food',
  'Breed Dry Dog Food',
  'Premium nutrition for adult dogs with real meat',
  100, NULL, NULL, 3.0, 35,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FBreed%20Dry%20Dog%20Food.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FBreed%20Dry%20Dog%20Food.png&w=256&q=75'],
  NULL,
  'Groceries & Pets', NULL,
  NULL,
  false, false, true, true
),
(
  'canon-eos-dslr-camera',
  'Canon EOS DSLR Camera',
  'High-quality DSLR camera with advanced autofocus and stunning image clarity. Ideal for photography enthusiasts and professionals.',
  800, 850, 6, 4.0, 1500,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FCANON%20EOS%20DSLR%20Camera.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FCANON%20EOS%20DSLR%20Camera.png&w=256&q=75'],
  NULL,
  'Electronics', 'Camera',
  NULL,
  false, false, true, true
),
(
  'featured-curology',
  'Curology Product Set',
  'Personalized skincare set for clear, healthy skin',
  500, NULL, NULL, 4.0, 145,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FCurology%20Product%20Set.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FCurology%20Product%20Set.png&w=256&q=75'],
  NULL,
  'Health & Beauty', NULL,
  NULL,
  false, false, true, true
),
(
  'kids-electric-car',
  'Kids Electric Car',
  'Fun and safe electric ride-on car for kids with realistic design, easy controls, and long-lasting battery for hours of play.',
  220, 250, 12, 4.0, 750,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FKids%20Electric%20Car.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FKids%20Electric%20Car.png&w=256&q=75'],
  NULL,
  'Baby''s & Toys', NULL,
  NULL,
  false, false, true, true
),
(
  'football-shoes',
  'Football Shoes',
  'High-performance soccer cleats for young athletes',
  1160, NULL, NULL, 5.0, 35,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FFootball%20Shoes.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FFootball%20Shoes.png&w=256&q=75'],
  ARRAY['36', '37', '38', '39', '40'],
  'Sports & Outdoor', NULL,
  NULL,
  false, false, true, true
),
(
  'featured-gamepad-2',
  'GP11 Shooter USB Gamepad',
  'Professional gaming controller with precision controls',
  660, NULL, NULL, 4.5, 55,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FGP11%20Shooter%20USB%20Gamepad.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FGP11%20Shooter%20USB%20Gamepad.png&w=256&q=75'],
  NULL,
  'Electronics', 'Gaming',
  'new',
  false, false, true, true
),
(
  'featured-jacket-2',
  'Quilted Satin Jacket',
  'Stylish quilted jacket with premium satin finish',
  660, NULL, NULL, 4.5, 55,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FQuilted%20Satin%20Jacket.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FQuilted%20Satin%20Jacket.png&w=256&q=75'],
  ARRAY['S', 'M', 'L', 'XL'],
  'Men''s Fashion', NULL,
  NULL,
  false, false, true, true
),

-- NEW ARRIVAL PRODUCTS (new_arrival = true) - But we'll use featured flag
(
  'new-ps5-console',
  'PlayStation 5',
  'Next-gen gaming console with ultra-high speed SSD and ray tracing support. Experience lightning-fast loading and stunning graphics.',
  499, 599, 17, 4.8, 9500,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FPlayStation%205.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FPlayStation%205.png&w=256&q=75'],
  NULL,
  'Electronics', 'Gaming',
  'new',
  false, false, true, true
),
(
  'new-perfume',
  'GUCCI INTENSE OUD EDP',
  'Luxury fragrance with rich oud and spicy notes',
  129, 160, 19, 4.9, 320,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FGucci%20Intense%20Oud%20Eau%20de%20Parfum.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FGucci%20Intense%20Oud%20Eau%20de%20Parfum.png&w=256&q=75'],
  NULL,
  'Health & Beauty', NULL,
  'discount',
  false, false, true, true
),
(
  'new-speakers',
  'Amazon Wireless Speakers',
  'Powerful wireless speakers with 360-degree sound',
  199, NULL, NULL, 4.7, 580,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FAmazon%20Echo%20(2nd%20Generation).png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FAmazon%20Echo%20(2nd%20Generation).png&w=256&q=75'],
  NULL,
  'Electronics', NULL,
  'new',
  false, false, true, true
),

-- HERO SECTION - iPhone 14
(
  'iphone-14-pro-max',
  'iPhone 14 Pro Max',
  'Latest iPhone with advanced camera system and A16 Bionic chip. Dynamic Island feature for seamless multitasking and pro-grade photography.',
  1099, 1199, 8, 4.9, 8500,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FiPhone%2014%20Series.png&w=640&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FiPhone%2014%20Series.png&w=640&q=75'],
  ARRAY['128GB', '256GB', '512GB', '1TB'],
  'Electronics', 'Phones',
  'new',
  false, true, true, true
),

-- JBL PRODUCT (for JBL page)
(
  'jbl-boombox-3',
  'JBL Boombox 3',
  'Massive sound with deepest bass. 24 hours of playtime. IP67 waterproof and dustproof. Perfect for outdoor adventures.',
  499, 599, 17, 4.8, 2340,
  'https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FJBL_BOOMBOX_2_HERO_020_x1.png&w=256&q=75',
  ARRAY['https://exclusive-store-ten.vercel.app/_next/image?url=%2Fproducts%2FJBL_BOOMBOX_2_HERO_020_x1.png&w=256&q=75'],
  NULL,
  'Electronics', 'HeadPhones',
  'new',
  false, false, true, true
),

-- CATEGORY PRODUCTS - SmartWatch
(
  'apple-watch-9',
  'Apple Watch Series 9',
  'Advanced health monitoring with ECG, blood oxygen sensor, and fitness tracking features.',
  429, 499, 14, 4.8, 3200,
  'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600',
  ARRAY['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600'],
  NULL,
  'Electronics', 'SmartWatch',
  'discount',
  false, true, false, true
),
(
  'samsung-watch-6',
  'Samsung Galaxy Watch 6',
  'Feature-rich smartwatch with comprehensive health tracking and long battery life.',
  299, 349, 14, 4.6, 1800,
  'https://images.unsplash.com/photo-1617625802912-cde586faf331?w=600',
  ARRAY['https://images.unsplash.com/photo-1617625802912-cde586faf331?w=600'],
  NULL,
  'Electronics', 'SmartWatch',
  NULL,
  false, true, false, true
),
(
  'fitbit-sense-2',
  'Fitbit Sense 2',
  'Advanced fitness smartwatch with stress management and sleep tracking',
  299, 349, 14, 4.5, 1200,
  'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=600',
  ARRAY['https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=600'],
  NULL,
  'Electronics', 'SmartWatch',
  NULL,
  false, false, false, true
),

-- CATEGORY PRODUCTS - Camera
(
  'nikon-z9',
  'Nikon Z9',
  'Flagship mirrorless camera with unrivaled autofocus and 8K video',
  5499, NULL, NULL, 5.0, 280,
  'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600',
  ARRAY['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600'],
  NULL,
  'Electronics', 'Camera',
  NULL,
  false, false, false, true
),

-- CATEGORY PRODUCTS - HeadPhones
(
  'bose-qc45',
  'Bose QuietComfort 45',
  'Premium wireless headphones with world-class noise cancellation',
  329, 379, 13, 4.8, 1850,
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600',
  ARRAY['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600'],
  NULL,
  'Electronics', 'HeadPhones',
  'discount',
  false, false, false, true
),

-- CATEGORY PRODUCTS - Gaming
(
  'gaming-chair-racer',
  'Racing Gaming Chair Pro',
  'Ergonomic racing-style gaming chair with lumbar support',
  299, 349, 14, 4.6, 890,
  'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600',
  ARRAY['https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600'],
  NULL,
  'Electronics', 'Gaming',
  NULL,
  false, false, false, true
);

-- ============================================
-- VERIFY DATA
-- ============================================
-- Run these to check:
-- SELECT COUNT(*) FROM products;
-- SELECT COUNT(*) FROM categories;
-- SELECT category, subcategory, COUNT(*) FROM products GROUP BY category, subcategory;
