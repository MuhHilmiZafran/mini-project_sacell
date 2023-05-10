import LoginPage from './pages/User/login';
import { Route, Routes, useParams } from 'react-router-dom';
import SignUpPage from './pages/User/signup';
import { AuthContextProvider } from './context/auth-context';
import ProtectedRoute from './components/layout/protected-route';
import LandingPage from './pages/User/landing-page';
import NavBar from './components/navbar/navbar';
import Profile from './pages/User/profile';
import FormAddProduct from './components/form/form-add-product';
import { ProductContextProvider } from './context/product-context';
import ProductList from './pages/Admin/products';
import FormEditProduct from './components/form/form-edit-product';
import ProductListUser from './pages/User/product-list';
import ProductDetail from './pages/User/product-detail';
import Checkout from './pages/User/checkout';
import FormAddCategory from './components/form/form-add-category';
import { CategoryContextProvider } from './context/category-context';
import { TransactionContextProvider } from './context/transaction-context';
import TransactionPage from './pages/User/transaction';
import SideBarAdmin from './components/sidebar/sidebar-admin';
import SideBarCategory from './components/sidebar/sidebar-category';
import HistoryPage from './pages/User/history';
import TransactionList from './pages/Admin/transactions-admin';

function App() {
  const { productId, transactionId, categoryId } = useParams();
  return (
    <div>
      <AuthContextProvider>
        <ProductContextProvider>
          <CategoryContextProvider>
            <TransactionContextProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/" element={<NavBar />}>
                  <Route index element={<LandingPage />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <ProtectedRoute>
                        <SideBarCategory />
                      </ProtectedRoute>
                    }
                  >
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <ProductListUser categoryId={''} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/products/:categoryId"
                      element={
                        <ProtectedRoute>
                          <ProductListUser categoryId={categoryId} />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  <Route
                    path="/products/product-detail/:productId"
                    element={
                      <ProtectedRoute>
                        <ProductDetail productId={productId} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/products/product-detail/:productId/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout productId={productId} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/products/product-detail/:productId/checkout/transaction/:transactionId"
                    element={
                      <ProtectedRoute>
                        <TransactionPage productId={productId} transactionId={transactionId} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/history"
                    element={
                      <ProtectedRoute>
                        <HistoryPage />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route path="/admin" element={<SideBarAdmin />}>
                  <Route
                    index
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <ProductList />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/admin/add-product"
                    element={
                      <ProtectedRoute>
                        <FormAddProduct />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/edit-product/:productId"
                    element={
                      <ProtectedRoute>
                        <FormEditProduct productId={productId} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/add-category"
                    element={
                      <ProtectedRoute>
                        <FormAddCategory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/transactions"
                    element={
                      <ProtectedRoute>
                        <TransactionList />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Routes>
            </TransactionContextProvider>
          </CategoryContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
