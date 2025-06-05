# Blueberry Dairy Farm Website

This is a full-stack MERN application for our organic dairy farm and orchard. It includes:

- 🐐 Product listings (raw goat milk, fruit, cheese)
- 📝 Blog editor and viewer
- 🛒 E-commerce features (cart, checkout, Stripe payments)
- 🔐 Authentication with admin privileges
- 🌐 SEO optimizations and Cloudinary image hosting

---

## 🚀 Getting Started

### Install dependencies:

```bash
cd client && npm install
cd ../server && npm install

Folder Structure
.
├── .DS_Store
├── .env
├── .gitignore
├── client
│   ├── .DS_Store
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── .DS_Store
│   │   ├── images
│   │   │   ├── ace_ready.jpeg
│   │   │   ├── Ada.jpg
│   │   │   ├── Ada2.jpg
│   │   │   ├── Ada3.HEIC
│   │   │   ├── albert.jpg
│   │   │   ├── Amanda2.HEIC
│   │   │   ├── Amanda2.jpg
│   │   │   ├── apple1.jpg
│   │   │   ├── big_dairy.jpg
│   │   │   ├── BlueberriesInHand.jpg
│   │   │   ├── blueberrieslg.jpg
│   │   │   ├── blueberriesxl.jpg
│   │   │   ├── Cocoa and Babies BW.jpg
│   │   │   ├── Cocoa_and_Babies.jpg
│   │   │   ├── cow.jpg
│   │   │   ├── creek_barn.jpg
│   │   │   ├── creek1.jpg
│   │   │   ├── deer_and_apples.webp
│   │   │   ├── Enrico.jpeg
│   │   │   ├── farm-banner.jpg
│   │   │   ├── Final Banner.png
│   │   │   ├── goat_logo_3.png
│   │   │   ├── goat_logo1.png
│   │   │   ├── goat_logo2.png
│   │   │   ├── house.jpg
│   │   │   ├── house2.jpg
│   │   │   ├── isaac_banner.jpg
│   │   │   ├── isaac.jpeg
│   │   │   ├── Judy_and_ball.jpeg
│   │   │   ├── judy.jpeg
│   │   │   ├── Lisa and Patsy.HEIC
│   │   │   ├── Lisa and Patsy.jpg
│   │   │   ├── Lisa.HEIC
│   │   │   ├── Lisa.psd
│   │   │   ├── Max.jpeg
│   │   │   ├── milk1.jpg
│   │   │   ├── mountain_in_clouds.jpeg
│   │   │   ├── myLogo.png
│   │   │   ├── navbar-bg.png
│   │   │   ├── piggyback.png
│   │   │   ├── Pond.jpg
│   │   │   ├── Pond2.jpg
│   │   │   ├── pond3.jpg
│   │   │   ├── Richard and Missy.HEIC
│   │   │   ├── richard.jpeg
│   │   │   ├── Richard2.HEIC
│   │   │   ├── Richard3.jpg
│   │   │   ├── Robert.jpg
│   │   │   ├── rolling_hills.jpg
│   │   │   ├── rolling_hills2.jpg
│   │   │   ├── smoothie.jpg
│   │   │   ├── snow_scene.zip
│   │   │   └── thumbnails
│   │   │       ├── apple1-thumb.jpg
│   │   │       ├── blueberrieslg-thumb.jpg
│   │   │       └── milk1-thumb.jpg
│   │   └── videos
│   │       ├── Albert1.mov
│   │       ├── Albert2.mov
│   │       ├── Amanda1.mov
│   │       ├── Coco and Patsys Kids 2025.mov
│   │       ├── Cocoa and her Babies 2025.mov
│   │       ├── Piggy Back 2025.mov
│   │       ├── The whole gang 2025.mov
│   │       └── thewholegang.psd
│   ├── README.md
│   ├── src
│   │   ├── api
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── AccessDenied.jsx
│   │   │   ├── AdminDropdown.jsx
│   │   │   ├── AuthButton.jsx
│   │   │   ├── blog
│   │   │   │   └── BlogCard.jsx
│   │   │   ├── ConfirmRoleChangeModal.jsx
│   │   │   ├── FarmMap.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── forum
│   │   │   │   ├── AddForumPost.jsx
│   │   │   │   ├── ForumPostForm.jsx
│   │   │   │   └── ForumReplyForm.jsx
│   │   │   ├── HomeLinksSection.jsx
│   │   │   ├── ImageUploadWithPreview.jsx
│   │   │   ├── layouts
│   │   │   │   └── DarkPageLayout.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── MenuBar.jsx
│   │   │   ├── NavbarLayout.jsx
│   │   │   ├── PasswordStrengthMeter.jsx
│   │   │   ├── PayNowButton.jsx
│   │   │   ├── PopoverMessage.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── ScrollingBanner.jsx
│   │   │   ├── SlideShow.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── StickyNavbar.jsx
│   │   │   ├── ThemeToggleButton.jsx
│   │   │   └── UserGreeting.jsx
│   │   ├── config
│   │   │   └── navigation.js
│   │   ├── content
│   │   │   ├── rawMilkContent.js
│   │   │   └── simpleBlogTemplate.js
│   │   ├── contexts
│   │   │   ├── BlogContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   ├── ContactContext.jsx
│   │   │   ├── ForumContext.jsx
│   │   │   ├── NavbarContext.jsx
│   │   │   ├── ProductContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── userContext.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── Accessibility.jsx
│   │   │   ├── admin
│   │   │   │   ├── AdminRoute.jsx
│   │   │   │   ├── blog
│   │   │   │   │   ├── AddBlogPost.jsx
│   │   │   │   │   ├── BlogEditor.jsx
│   │   │   │   │   ├── ManagePosts.jsx
│   │   │   │   │   └── UpdateBlog.jsx
│   │   │   │   ├── ManageUsers.jsx
│   │   │   │   ├── PrivateRoute.jsx
│   │   │   │   └── products
│   │   │   │       ├── AddProduct.jsx
│   │   │   │       ├── AdminOrders.jsx
│   │   │   │       ├── EditProduct.jsx
│   │   │   │       ├── ManageInventory.jsx
│   │   │   │       └── ManageProducts.jsx
│   │   │   ├── blog
│   │   │   │   ├── BlogPage.jsx
│   │   │   │   └── BlogPost.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── forum
│   │   │   │   ├── ForumPage.jsx
│   │   │   │   └── ForumPost.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── OurFarm.jsx
│   │   │   ├── products
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── Checkout.jsx
│   │   │   │   ├── Confirmation.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductDetails.jsx
│   │   │   │   └── ProductList.jsx
│   │   │   └── Register.jsx
│   │   ├── reducers
│   │   │   └── forumReducer.js
│   │   ├── services
│   │   │   ├── authService.js
│   │   │   ├── forumService.js
│   │   │   ├── productService.js
│   │   │   └── uploadService.js
│   │   └── utils
│   │       └── validators.js
│   └── vite.config.js
├── Codesnippets.md
├── folder-structure.txt
├── package-lock.json
├── package.json
├── Readme.md
├── server
│   ├── .env
│   ├── config
│   │   ├── db.js
│   │   └── stripe.js
│   ├── controllers
│   │   ├── blogController.js
│   │   ├── checkoutController.js
│   │   ├── contactController.js
│   │   ├── forumController.js
│   │   ├── goatController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   ├── uploadController.js
│   │   └── userController.js
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── validateRequest.js
│   │   ├── validationResultHandler.js
│   │   └── validators
│   │       ├── checkoutValidator.js
│   │       └── userValidators.js
│   ├── models
│   │   ├── blogModel.js
│   │   ├── contactModel.js
│   │   ├── forumPostModel.js
│   │   ├── goatModel.js
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── blogRoutes.js
│   │   ├── checkoutRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── forumRoutes.js
│   │   ├── goatRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── uploadRoutes.js
│   │   ├── userRoutes.js
│   │   └── webhookRoutes.js
│   ├── server.js
│   ├── uploads
│   │   ├── 1746617396860-Ad Picture.jpg
│   │   ├── 1746621698015-Banner 4 Best.png
│   │   ├── 1746635146582-Banner 5 Best of all.png
│   │   ├── 1746635391871-Banner 6 shifted right.png
│   │   ├── 1747346296310-creek_barn.jpg
│   │   ├── 1747478336756-judy.jpeg
│   │   ├── 1747480708441-Ada.jpg
│   │   ├── 1747481038611-Ada.jpg
│   │   ├── 1747481997061-Ada.jpg
│   │   ├── 1747762550567-Robert.jpg
│   │   ├── 1747772500446-blueberriesinhand.jpg
│   │   ├── 1747772968521-blueberriesinhand.jpg
│   │   ├── 1747774302148-blueberriesinhand.jpg
│   │   ├── 1747774327954-blueberriesinhand.jpg
│   │   ├── 1747774841322-blueberrieslg.jpg
│   │   ├── 1747775344033-blueberrieslg.jpg
│   │   ├── 1747775530838-blueberrieslg.jpg
│   │   ├── 1747775600780-blueberrieslg.jpg
│   │   ├── 1747775763967-blueberrieslg.jpg
│   │   ├── 1747776699782-ace_ready.jpeg
│   │   ├── 1747823468822-milk1.jpg
│   │   ├── 1748032115846-BlueberriesInHand.jpg
│   │   ├── 1748032285527-milk1.jpg
│   │   └── 1748433405848-albert.jpg
│   └── utils
│       ├── .gitignore
│       ├── createUserResponse.js
│       ├── generateToken.js
│       ├── sendEmail.js
│       └── validators.js
├── start-stripe-listener.sh
└── stripe-testing-readme.md

34 directories, 225 files
```
