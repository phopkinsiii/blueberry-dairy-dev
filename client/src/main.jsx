// @ts-nocheck
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ProductProvider } from './contexts/ProductContext.jsx'; // note the .jsx extension
import { CartProvider } from './contexts/CartContext.jsx';
import { ContactProvider } from './contexts/ContactContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import { NavbarProvider } from './contexts/NavbarContext.jsx';
import { HeadProvider } from 'react-head'; // ✅ Import
import { BlogProvider } from './contexts/BlogContext.jsx';
import { ForumProvider } from './contexts/ForumContext.jsx';
import { GoatProvider } from './contexts/GoatContext';
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<GoatProvider>
			<ForumProvider>
				<HeadProvider>
					<CartProvider>
						<ProductProvider>
							<BlogProvider>
								<ContactProvider>
									<UserProvider>
										<BrowserRouter>
											<NavbarProvider>
												<App />
											</NavbarProvider>
										</BrowserRouter>
									</UserProvider>
								</ContactProvider>
							</BlogProvider>
						</ProductProvider>
					</CartProvider>
				</HeadProvider>
			</ForumProvider>
		</GoatProvider>
	</StrictMode>
);
