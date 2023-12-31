import type { FC } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FlowbiteWrapper from "./components/flowbite-wrapper";
import ForgotPasswordPage from "./pages/authentication/forgot-password";
import ProfileLockPage from "./pages/authentication/profile-lock";
import ResetPasswordPage from "./pages/authentication/reset-password";
import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import ContactsListPage from "./pages/contacts/list";
import DriveListPage from "./pages/drive/list";
import EcommerceBillingPage from "./pages/e-commerce/billing";
import EcommerceInvoicePage from "./pages/e-commerce/invoice";
import EcommerceProductsPage from "./pages/e-commerce/products";
import KanbanPage from "./pages/kanban";
import MailingComposePage from "./pages/mailing/compose";
import MailingInboxPage from "./pages/mailing/inbox";
import MailingReadPage from "./pages/mailing/read";
import MailingReplyPage from "./pages/mailing/reply";
import NotFoundPage from "./pages/pages/404";
import ServerErrorPage from "./pages/pages/500";
import MaintenancePage from "./pages/pages/maintenance";
import PricingPage from "./pages/pages/pricing";
import UserFeedPage from "./pages/users/feed";
import UserListPage from "./pages/users/list";
import UserProfilePage from "./pages/users/profile";
import UserSettingsPage from "./pages/users/settings";
import { UserProvider } from "./context/UserContext";
import { FileSharingProvider } from "./context/FileSharingContext";

const App: FC = function () {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  return (
    <BrowserRouter>
      <UserProvider>
        <FileSharingProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route element={<FlowbiteWrapper />}>
                <Route path="/" element={<MailingComposePage />} index />
                <Route
                  path="/mailing/compose"
                  element={<MailingComposePage />}
                />
                <Route path="/contacts" element={<ContactsListPage />} />
                <Route path="/drive" element={<DriveListPage />} />
                <Route path="/mailing/inbox" element={<MailingInboxPage />} />
                <Route path="/mailing/read" element={<MailingReadPage />} />
                <Route path="/mailing/reply" element={<MailingReplyPage />} />
                <Route path="/kanban" element={<KanbanPage />} />
                <Route path="/pages/pricing" element={<PricingPage />} />
                <Route
                  path="/pages/maintenance"
                  element={<MaintenancePage />}
                />
                <Route path="/pages/404" element={<NotFoundPage />} />
                <Route path="/pages/500" element={<ServerErrorPage />} />
                <Route
                  path="/authentication/sign-in"
                  element={<SignInPage />}
                />
                <Route
                  path="/authentication/sign-up"
                  element={<SignUpPage />}
                />
                <Route
                  path="/authentication/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path="/authentication/reset-password"
                  element={<ResetPasswordPage />}
                />
                <Route
                  path="/authentication/profile-lock"
                  element={<ProfileLockPage />}
                />
                <Route
                  path="/e-commerce/billing"
                  element={<EcommerceBillingPage />}
                />
                <Route
                  path="/e-commerce/invoice"
                  element={<EcommerceInvoicePage />}
                />
                <Route
                  path="/e-commerce/products"
                  element={<EcommerceProductsPage />}
                />
                <Route path="/users/feed" element={<UserFeedPage />} />
                <Route path="/users/list" element={<UserListPage />} />
                <Route path="/users/profile" element={<UserProfilePage />} />
                <Route path="/users/settings" element={<UserSettingsPage />} />
              </Route>
            </Routes>
          </QueryClientProvider>
        </FileSharingProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
