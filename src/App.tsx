import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { BannerView } from "./pages/Banner/Banner";
import CameraView from "./pages/camera/Camera";
import BrandView from "./pages/Brand/Brand";
import UserView from "./pages/user/user";
import { AuthProvider } from "./context/AuthContext";
import OptMainPage from "./pages/AuthPages/OtpPage";
import { ConfirmationProvider } from "./components/ui/alert/PopUp";
import { ProtectedRoute } from "./pages/AuthPages/ProtectedRoute";
import { BookingView } from "./pages/Booking/BookingView";
import { DetailCamera } from "./pages/camera/DetailCamera";
import { DetailBooking } from "./pages/Booking/BookingDetail";

// Inisialisasi QueryClient
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfirmationProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/otp" element={<OptMainPage />} />

              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index path="/" element={<Home />} />
                <Route path="/banner" element={<BannerView />} />
                <Route path="/camera" element={<CameraView />} />
                <Route path="/camera/:id" element={<DetailCamera />} />
                <Route path="/brand" element={<BrandView />} />
                <Route path="/users" element={<UserView />} />
                <Route path="/booking" element={<BookingView />} />
                <Route path="/booking/:id" element={<DetailBooking />} />
                <Route path="/profile" element={<UserProfiles />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/blank" element={<Blank />} />
                <Route path="/form-elements" element={<FormElements />} />
                <Route path="/basic-tables" element={<BasicTables />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/avatars" element={<Avatars />} />
                <Route path="/badge" element={<Badges />} />
                <Route path="/buttons" element={<Buttons />} />
                <Route path="/images" element={<Images />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/line-chart" element={<LineChart />} />
                <Route path="/bar-chart" element={<BarChart />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ConfirmationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
