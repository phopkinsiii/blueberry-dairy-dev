// @ts-nocheck
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages and components
import ProductList from './pages/products/ProductList.jsx';
import Cart from './pages/products/Cart';
import OurFarm from './pages/OurFarm';
import Contact from './pages/Contact';
import Login from './pages/Login.jsx';
import AdminRoute from './pages/admin/AdminRoute.jsx';
import ManageProducts from './pages/admin/products/ManageProducts.jsx';
import AddProduct from './pages/admin/products/AddProduct.jsx';
import Home from './pages/Home.jsx';
import BlogPage from './pages/blog/BlogPage.jsx';
import NavbarLayout from './components/NavbarLayout.jsx';
import AddBlogPost from './pages/admin/blog/AddBlogPost.jsx';
import EditProduct from './pages/admin/products/EditProduct.jsx';
import Checkout from './pages/products/Checkout.jsx';
import Confirmation from './pages/products/Confirmation.jsx';
import BlogPost from './pages/blog/BlogPost.jsx';
import Register from './pages/Register.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import Accessibility from './pages/Accessibility.jsx';
import ManagePosts from './pages/admin/blog/ManagePosts.jsx';
import AccessDenied from './components/AccessDenied.jsx';
import UpdateBlog from './pages/admin/blog/UpdateBlog.jsx';
import AdminOrders from './pages/admin/products/AdminOrders.jsx';
import PrivateRoute from './pages/admin/PrivateRoute.jsx';
import ManageUsers from './pages/admin/ManageUsers';
import ProductDetails from './pages/products/ProductDetails.jsx';
import ForumPage from './pages/forum/ForumPage.jsx';
import ForumPost from './pages/forum/ForumPost.jsx';
import ForumPostForm from './components/forum/ForumPostForm.jsx';
import AddForumPost from './components/forum/AddForumPost.jsx';
import ManageForum from './pages/admin/forum/ManageForum.jsx';
import ManageInventory from './pages/admin/products/ManageInventory.jsx';
import GoatList from './pages/goats/GoatList.jsx';
import AddGoat from './pages/admin/goats/AddGoat.jsx';
import GoatDetails from './pages/goats/GoatDetails.jsx';
import EditGoat from './pages/admin/goats/EditGoat.jsx';
import ManageGoats from './pages/admin/goats/ManageGoats.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ForSaleGoats from './pages/goats/ForSaleGoats';
import DoesGoats from './pages/goats/DoesGoats';
import BuckGoats from './pages/goats/BuckGoats.jsx';
import NotFound from './pages/NotFound.jsx';
import MilkRecordsPage from './pages/milk/MilkRecordsPage.jsx';
import MilkEntryForm from './pages/milk/MilkEntryForm.jsx';
import EditMilkRecord from './pages/admin/milk/EditMilkRecord';
import TestimonialsPage from './pages/TestimonialsPage.jsx';
import AdminTestimonialsPage from './pages/admin/blog/AdminTestimonialsPage.jsx';

function App() {
	return (
		<div className='flex flex-col min-h-screen'>
			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
				className='p-4'
			/>
			{/* 🔼 Scroll to top on route change */}
			<ScrollToTop />
			{/* Header + Page Content */}
			<div className='flex-grow'>
				<NavbarLayout>
					<Routes>
						<Route path='*' element=<NotFound /> />
						<Route path='/' element={<Home />} />
						<Route path='/products' element={<ProductList />} />
						<Route path='/products/:id' element={<ProductDetails />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/our-farm' element={<OurFarm />} />
						<Route path='/testimonials' element={<TestimonialsPage />} />
						<Route path='/contact' element={<Contact />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route
							path='/manage-products'
							element={
								<AdminRoute adminOnly>
									<ManageProducts />
								</AdminRoute>
							}
						/>
						<Route
							path='/add-product'
							element={
								<AdminRoute>
									<AddProduct />
								</AdminRoute>
							}
						/>
						<Route
							path='/admin/edit-product/:id'
							element={
								<AdminRoute>
									<EditProduct />
								</AdminRoute>
							}
						/>
						<Route
							path='/add-blog'
							element={
								<AdminRoute>
									<AddBlogPost />
								</AdminRoute>
							}
						/>
						<Route
							path='/admin/inventory'
							element={
								<AdminRoute>
									<ManageInventory />
								</AdminRoute>
							}
						/>
						<Route path='/checkout' element={<Checkout />} />
						<Route path='/confirmation' element={<Confirmation />} />
						<Route path='/blog/:id' element={<BlogPost />} />
						<Route path='reset-password' element={<ResetPassword />} />
						<Route path='forgot-password' element={<ForgotPassword />} />
						<Route path='/accessibility' element={<Accessibility />} />

						<Route path='/blog' element={<BlogPage />} />
						<Route
							path='/manage-posts'
							element={
								<AdminRoute>
									<ManagePosts />
								</AdminRoute>
							}
						/>
						<Route
							path='/admin/edit-blog/:id'
							element={
								<AdminRoute>
									<UpdateBlog />
								</AdminRoute>
							}
						/>
						<Route
							path='/admin/users'
							element={
								<AdminRoute>
									<ManageUsers />
								</AdminRoute>
							}
						/>
						<Route path='/forum' element={<ForumPage />} />
						<Route path='/forum/:id' element={<ForumPost />} />
						<Route
							path='/admin/forum'
							element={
								<AdminRoute>
									<ManageForum />
								</AdminRoute>
							}
						/>

						<Route
							path='/forum/new'
							element={
								<PrivateRoute>
									<AddForumPost />
								</PrivateRoute>
							}
						/>
						<Route path='/admin-orders' element={<AdminOrders />} />
						<Route path='access-denied' element={<AccessDenied />} />

						<Route path='/goats' element={<GoatList />} />
						<Route path='/goats/for-sale' element={<ForSaleGoats />} />
						<Route path='/goats/does' element={<DoesGoats />} />
						<Route path='/goats/bucks' element={<BuckGoats />} />
						<Route
							path='/admin/goats/add'
							element={
								<AdminRoute>
									<AddGoat />
								</AdminRoute>
							}
						/>
						<Route path='/goats/:id' element={<GoatDetails />} />
						<Route
							path='/admin/edit-goat/:id'
							element={
								<AdminRoute>
									<EditGoat />
								</AdminRoute>
							}
						/>
						<Route
							path='/manage-goats'
							element={
								<AdminRoute>
									<ManageGoats />
								</AdminRoute>
							}
						/>

						<Route path='/milk-records' element={<MilkRecordsPage />} />
						<Route
							path='/admin/milk-entry'
							element={
								<AdminRoute>
									<MilkEntryForm />
								</AdminRoute>
							}
						/>
						<Route
							path='/milk-records/:id/edit'
							element={
								<AdminRoute>
									<EditMilkRecord />
								</AdminRoute>
							}
						/>
						<Route
							path='/admin/testimonials'
							element={
								<AdminRoute>
									<AdminTestimonialsPage />
								</AdminRoute>
							}
						/>
					</Routes>
				</NavbarLayout>
			</div>
			<ScrollToTop />

			{/* Footer always at bottom */}
			<Footer />
		</div>
	);
}

export default App;
