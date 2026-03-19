import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Download,
  Loader2,
  Lock,
  LogOut,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetAllApplications } from "../hooks/useQueries";

const ADMIN_PASSWORD = "admin123";

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Incorrect password. / गलत पासवर्ड।");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#F2E4CF" }}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 8px 40px rgba(90,15,15,0.18), 0 2px 8px rgba(90,15,15,0.1)",
        }}
      >
        <div className="px-6 pt-6 pb-4" style={{ background: "#5A0F0F" }}>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Shield size={22} color="#F2E4CF" />
            <h2 className="text-lg font-bold" style={{ color: "#F2E4CF" }}>
              Admin Login
            </h2>
          </div>
          <p
            className="text-center text-xs font-devanagari"
            style={{ color: "rgba(242,228,207,0.7)" }}
          >
            प्रशासन पैनल
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="px-6 py-6 space-y-4"
          data-ocid="admin.form"
        >
          <div>
            <Label
              htmlFor="admin-password"
              className="text-sm font-semibold block mb-1.5"
              style={{ color: "#2B2B2B" }}
            >
              Password / पासवर्ड
            </Label>
            <div
              className="flex rounded-lg overflow-hidden border"
              style={{ borderColor: error ? "#dc2626" : "#d1c4a8" }}
            >
              <div
                className="flex items-center justify-center px-3"
                style={{ background: "#FDF3E7" }}
              >
                <Lock size={18} style={{ color: "#5A0F0F" }} />
              </div>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="border-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                data-ocid="admin.input"
                style={{ background: "#fff" }}
              />
            </div>
            {error && (
              <p
                className="text-xs text-red-600 mt-1"
                data-ocid="admin.error_state"
              >
                {error}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full py-5 font-bold text-white"
            style={{ background: "#E07B1A" }}
            data-ocid="admin.submit_button"
          >
            Login / लॉगिन
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

function AdminDashboard({ onBack }: { onBack: () => void }) {
  const {
    data: applications = [],
    isLoading,
    isError,
  } = useGetAllApplications();

  const downloadCSV = () => {
    const escapeCSV = (s: string) => s.replace(/"/g, '""');
    const header = "S.No,Name,Mobile,Address";
    const rows = applications.map(
      (app, i) =>
        `${i + 1},"${escapeCSV(app.name)}","${app.mobile}","${escapeCSV(app.address)}"`,
    );
    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bajrang-dal-applications.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F2E4CF" }}
    >
      <header style={{ background: "#5A0F0F" }} data-ocid="admin.panel">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "#F2E4CF" }}
            data-ocid="admin.back.button"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="text-center">
            <h1
              className="text-lg md:text-xl font-bold"
              style={{ color: "#F2E4CF" }}
            >
              Admin Panel
            </h1>
            <p
              className="text-xs font-devanagari"
              style={{ color: "rgba(242,228,207,0.7)" }}
            >
              प्रशासन पैनल
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "#F2E4CF" }}
            data-ocid="admin.logout.button"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div
            className="bg-white rounded-xl p-5 flex items-center gap-4 flex-1"
            style={{ boxShadow: "0 2px 16px rgba(90,15,15,0.10)" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "#FDF3E7" }}
            >
              <User size={22} style={{ color: "#E07B1A" }} />
            </div>
            <div>
              <p className="text-3xl font-bold" style={{ color: "#5A0F0F" }}>
                {applications.length}
              </p>
              <p className="text-sm text-gray-500">
                Total Applications / कुल आवेदन
              </p>
            </div>
          </div>
          <Button
            onClick={downloadCSV}
            disabled={applications.length === 0}
            className="flex items-center gap-2 px-5 py-5 font-bold text-white"
            style={{ background: "#E07B1A" }}
            data-ocid="admin.download.button"
          >
            <Download size={18} />
            Download CSV
            <span className="font-devanagari text-xs font-normal ml-1">
              डाउनलोड
            </span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 4px 24px rgba(90,15,15,0.12)" }}
        >
          <div
            className="px-6 py-4 border-b"
            style={{ borderColor: "#F2E4CF", background: "#fdf8f1" }}
          >
            <h2 className="font-bold text-base" style={{ color: "#5A0F0F" }}>
              All Applications / सभी आवेदन
            </h2>
          </div>

          {isLoading && (
            <div
              className="flex items-center justify-center py-16 gap-3"
              data-ocid="admin.loading_state"
            >
              <Loader2
                className="animate-spin"
                style={{ color: "#E07B1A" }}
                size={28}
              />
              <span className="text-gray-500">Loading applications...</span>
            </div>
          )}

          {isError && (
            <div
              className="m-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
              data-ocid="admin.error_state"
            >
              Failed to load applications. Please refresh.
            </div>
          )}

          {!isLoading && !isError && applications.length === 0 && (
            <div
              className="text-center py-16 text-gray-400"
              data-ocid="admin.empty_state"
            >
              <User size={48} className="mx-auto mb-3 opacity-30" />
              <p className="font-devanagari">कोई आवेदन नहीं मिला</p>
              <p className="text-sm">No applications submitted yet.</p>
            </div>
          )}

          {!isLoading && !isError && applications.length > 0 && (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow style={{ background: "#fdf8f1" }}>
                    <TableHead
                      className="font-bold w-16"
                      style={{ color: "#5A0F0F" }}
                    >
                      S.No
                    </TableHead>
                    <TableHead
                      className="font-bold"
                      style={{ color: "#5A0F0F" }}
                    >
                      Name{" "}
                      <span className="font-devanagari font-normal text-xs">
                        (नाम)
                      </span>
                    </TableHead>
                    <TableHead
                      className="font-bold"
                      style={{ color: "#5A0F0F" }}
                    >
                      Mobile{" "}
                      <span className="font-devanagari font-normal text-xs">
                        (मोबाइल)
                      </span>
                    </TableHead>
                    <TableHead
                      className="font-bold"
                      style={{ color: "#5A0F0F" }}
                    >
                      Address{" "}
                      <span className="font-devanagari font-normal text-xs">
                        (पता)
                      </span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app, i) => (
                    <TableRow
                      key={String(app.id)}
                      className="hover:bg-orange-50 transition-colors"
                      data-ocid={`admin.item.${i + 1}`}
                    >
                      <TableCell
                        className="font-semibold text-center"
                        style={{ color: "#5A0F0F" }}
                      >
                        {i + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "#FDF3E7" }}
                          >
                            <User size={14} style={{ color: "#E07B1A" }} />
                          </div>
                          <span
                            className="font-bold"
                            style={{ color: "#2B2B2B", fontSize: "1rem" }}
                          >
                            {app.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: "#FDF3E7", color: "#E07B1A" }}
                        >
                          <Phone size={11} />
                          {app.mobile}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs">
                        {app.address}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </main>

      <footer className="py-4 text-center" style={{ background: "#5A0F0F" }}>
        <p className="text-xs" style={{ color: "rgba(242,228,207,0.5)" }}>
          © {new Date().getFullYear()} बजरंग दल जिला महासू
        </p>
      </footer>
    </div>
  );
}

export function AdminPage({ onBack }: { onBack: () => void }) {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  return <AdminDashboard onBack={onBack} />;
}
