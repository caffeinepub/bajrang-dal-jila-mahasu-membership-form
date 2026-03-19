import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CheckCircle2, Loader2, MapPin, Phone, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AdminPage } from "./components/AdminPage";
import { useSubmitApplication } from "./hooks/useQueries";

const queryClient = new QueryClient();

function ApplicationForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    mobile?: string;
    address?: string;
  }>({});

  const submitMutation = useSubmitApplication();

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required / नाम आवश्यक है";
    if (!mobile.trim())
      e.mobile = "Mobile number is required / मोबाइल नंबर आवश्यक है";
    else if (!/^[6-9]\d{9}$/.test(mobile.trim()))
      e.mobile = "Enter valid 10-digit mobile number";
    if (!address.trim()) e.address = "Address is required / पता आवश्यक है";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submitMutation.mutateAsync({
        name: name.trim(),
        mobile: mobile.trim(),
        address: address.trim(),
      });
      setSubmitted(true);
    } catch {
      // error handled via mutation state
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
        data-ocid="form.success_state"
      >
        <CheckCircle2
          className="mx-auto mb-4"
          style={{ width: 64, height: 64, color: "#E07B1A" }}
        />
        <h3
          className="text-2xl font-bold font-devanagari mb-2"
          style={{ color: "#5A0F0F" }}
        >
          आवेदन सफलतापूर्वक जमा हुआ!
        </h3>
        <p className="text-gray-600 mb-1">
          Your application has been submitted successfully.
        </p>
        <p className="text-sm text-gray-500">
          We will contact you soon on your mobile number.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setMobile("");
            setAddress("");
          }}
          className="mt-6 text-sm underline"
          style={{ color: "#E07B1A" }}
        >
          Submit another application
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate data-ocid="application.form">
      <div className="space-y-5">
        {/* Name */}
        <div>
          <Label
            htmlFor="name"
            className="text-sm font-semibold mb-1.5 block"
            style={{ color: "#2B2B2B" }}
          >
            Full Name{" "}
            <span className="font-devanagari text-xs font-normal">
              (पूरा नाम)
            </span>
          </Label>
          <div
            className="flex rounded-lg overflow-hidden border"
            style={{ borderColor: errors.name ? "#dc2626" : "#d1c4a8" }}
          >
            <div
              className="flex items-center justify-center px-3"
              style={{ background: "#FDF3E7" }}
            >
              <User size={18} style={{ color: "#5A0F0F" }} />
            </div>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name / अपना पूरा नाम लिखें"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((p) => ({ ...p, name: undefined }));
              }}
              className="border-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
              data-ocid="application.input"
              style={{ background: "#fff", color: "#1a1a1a" }}
            />
          </div>
          {errors.name && (
            <p
              className="text-xs text-red-600 mt-1"
              data-ocid="application.name.error"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <Label
            htmlFor="mobile"
            className="text-sm font-semibold mb-1.5 block"
            style={{ color: "#2B2B2B" }}
          >
            Mobile Number{" "}
            <span className="font-devanagari text-xs font-normal">
              (मोबाइल नंबर)
            </span>
          </Label>
          <div
            className="flex rounded-lg overflow-hidden border"
            style={{ borderColor: errors.mobile ? "#dc2626" : "#d1c4a8" }}
          >
            <div
              className="flex items-center justify-center px-3"
              style={{ background: "#FDF3E7" }}
            >
              <Phone size={18} style={{ color: "#5A0F0F" }} />
            </div>
            <Input
              id="mobile"
              type="tel"
              placeholder="10-digit mobile number / 10 अंकों का नंबर"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setErrors((p) => ({ ...p, mobile: undefined }));
              }}
              className="border-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
              data-ocid="application.mobile.input"
              maxLength={10}
              style={{ background: "#fff", color: "#1a1a1a" }}
            />
          </div>
          {errors.mobile && (
            <p
              className="text-xs text-red-600 mt-1"
              data-ocid="application.mobile.error"
            >
              {errors.mobile}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <Label
            htmlFor="address"
            className="text-sm font-semibold mb-1.5 block"
            style={{ color: "#2B2B2B" }}
          >
            Address{" "}
            <span className="font-devanagari text-xs font-normal">(पता)</span>
          </Label>
          <div
            className="flex rounded-lg overflow-hidden border"
            style={{ borderColor: errors.address ? "#dc2626" : "#d1c4a8" }}
          >
            <div
              className="flex items-start justify-center px-3 pt-3"
              style={{ background: "#FDF3E7" }}
            >
              <MapPin size={18} style={{ color: "#5A0F0F" }} />
            </div>
            <Textarea
              id="address"
              placeholder="Full address / पूरा पता लिखें"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setErrors((p) => ({ ...p, address: undefined }));
              }}
              className="border-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none resize-none min-h-[90px]"
              data-ocid="application.textarea"
              style={{ background: "#fff", color: "#1a1a1a" }}
            />
          </div>
          {errors.address && (
            <p
              className="text-xs text-red-600 mt-1"
              data-ocid="application.address.error"
            >
              {errors.address}
            </p>
          )}
        </div>

        {submitMutation.isError && (
          <div
            className="rounded-lg p-3 bg-red-50 border border-red-200 text-sm text-red-700"
            data-ocid="application.error_state"
          >
            Submission failed. Please try again. / पुनः प्रयास करें।
          </div>
        )}

        <Button
          type="submit"
          disabled={submitMutation.isPending}
          className="w-full py-6 text-base font-bold tracking-wide text-white rounded-lg transition-all"
          style={{ background: "#E07B1A", color: "#fff" }}
          data-ocid="application.submit_button"
        >
          {submitMutation.isPending ? (
            <>
              <Loader2
                className="mr-2 h-5 w-5 animate-spin"
                data-ocid="application.loading_state"
              />{" "}
              Submitting...
            </>
          ) : (
            <span className="flex flex-col items-center leading-tight">
              <span>SUBMIT APPLICATION</span>
              <span className="font-devanagari text-sm font-normal">
                आवेदन जमा करें
              </span>
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<"home" | "admin">("home");

  const navLinks = [
    { label: "Home", hindi: "होम" },
    { label: "About", hindi: "परिचय" },
    { label: "Join Us", hindi: "जुड़ें" },
    { label: "Contact", hindi: "संपर्क" },
  ];

  if (currentPage === "admin") {
    return <AdminPage onBack={() => setCurrentPage("home")} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md" data-ocid="header.section">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <img
            src="/assets/generated/bajrang-dal-logo-transparent.dim_200x200.png"
            alt="Bajrang Dal Logo"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
          <div className="text-center flex-1">
            <h1
              className="text-2xl md:text-3xl font-bold leading-tight font-devanagari"
              style={{ color: "#5A0F0F" }}
            >
              बजरंग दल जिला महासू
            </h1>
            <p
              className="text-xs md:text-sm font-bold tracking-widest mt-0.5"
              style={{ color: "#6B1A12" }}
            >
              BAJRANG DAL JILA MAHASU
            </p>
            <p
              className="text-xs font-devanagari mt-0.5"
              style={{ color: "#E07B1A" }}
            >
              विश्व हिन्दू परिषद के तत्वावधान में
            </p>
          </div>
          <img
            src="/assets/generated/vhp-logo-transparent.dim_200x200.png"
            alt="VHP Logo"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
        </div>
      </header>

      <nav
        className="w-full"
        style={{ background: "#5A0F0F" }}
        data-ocid="nav.section"
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              className="flex-1 text-center py-2.5 text-xs md:text-sm font-semibold transition-colors hover:bg-white/10"
              style={{
                color: "#F2E4CF",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              data-ocid={`nav.${link.label.toLowerCase().replace(" ", "-")}.link`}
            >
              {link.label}
              <span className="font-devanagari text-xs ml-1 opacity-70">
                ({link.hindi})
              </span>
            </button>
          ))}
        </div>
      </nav>

      <section className="hero-pattern py-12 md:py-16" data-ocid="hero.section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-4"
            style={{
              background: "rgba(215,166,58,0.15)",
              color: "#D7A63A",
              border: "1px solid rgba(215,166,58,0.3)",
            }}
          >
            ।। जय श्री राम ।।
          </div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-widest uppercase text-white mb-3">
            MEMBERSHIP APPLICATION FORM
          </h2>
          <p
            className="text-xl md:text-2xl font-devanagari font-semibold"
            style={{ color: "#E07B1A" }}
          >
            सदस्यता आवेदन पत्र
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div
              className="h-0.5 w-16 rounded-full"
              style={{ background: "#D7A63A", opacity: 0.5 }}
            />
            <div
              className="h-0.5 w-4 rounded-full"
              style={{ background: "#E07B1A" }}
            />
            <div
              className="h-0.5 w-16 rounded-full"
              style={{ background: "#D7A63A", opacity: 0.5 }}
            />
          </div>
        </motion.div>
      </section>

      <main
        className="flex-1 ornamental-bg py-10 px-4"
        style={{ background: "#F2E4CF" }}
        data-ocid="main.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg mx-auto bg-white rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 8px 40px rgba(90,15,15,0.18), 0 2px 8px rgba(90,15,15,0.1)",
          }}
        >
          <div
            className="px-6 pt-6 pb-4 border-b"
            style={{ borderColor: "#F2E4CF" }}
          >
            <h3
              className="text-lg font-bold font-devanagari text-center"
              style={{ color: "#5A0F0F" }}
            >
              आवेदन पत्र भरें
            </h3>
            <p className="text-xs text-center mt-1" style={{ color: "#888" }}>
              Please fill in all the required details below
            </p>
          </div>
          <div className="px-6 py-6">
            <AnimatePresence mode="wait">
              <ApplicationForm key="form" />
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="text-center text-xs mt-6" style={{ color: "#888" }}>
          आपकी जानकारी सुरक्षित है। Your information is safe and will not be
          shared.
        </p>
      </main>

      <footer
        className="py-5 px-4 text-center"
        style={{ background: "#5A0F0F" }}
        data-ocid="footer.section"
      >
        <p
          className="font-devanagari text-sm mb-1"
          style={{ color: "#F2E4CF" }}
        >
          बजरंग दल जिला महासू
        </p>
        <p className="text-xs" style={{ color: "rgba(242,228,207,0.7)" }}>
          © {new Date().getFullYear()} | All Rights Reserved
        </p>
        <button
          type="button"
          onClick={() => setCurrentPage("admin")}
          className="text-xs mt-2 underline hover:opacity-80 transition-opacity block mx-auto"
          style={{ color: "rgba(242,228,207,0.35)" }}
          data-ocid="footer.admin.link"
        >
          Admin
        </button>
        <p className="text-xs mt-1" style={{ color: "rgba(242,228,207,0.5)" }}>
          Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster />
    </QueryClientProvider>
  );
}
