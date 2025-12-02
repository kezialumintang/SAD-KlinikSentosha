import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import { toast } from "sonner";

const Payment = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Array<{ id: string; full_name?: string | null }>>([]);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [method, setMethod] = useState<string>("cash");
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [recentPayments, setRecentPayments] = useState<Tables["payments"]["Row"][]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Failed to fetch profiles", error);
          toast.error("Gagal mengambil data pasien");
          return;
        }

        setProfiles(data ?? []);
        if (data && data.length > 0) {
          setPatientId(data[0].id);
        }
      } catch (err) {
        console.error(err);
        toast.error("Gagal menghubungkan layanan");
      }
      // Load recent payments too
      try {
        const { data: paymentsData, error: paymentsError } = await supabase
          .from("payments")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        if (paymentsError) {
          console.warn("Could not fetch payments from Supabase:", paymentsError);
          const local = JSON.parse(localStorage.getItem("app_payments") || "[]");
          setRecentPayments(local.slice(0, 10));
        } else {
          setRecentPayments((paymentsData ?? []) as Tables["payments"]["Row"][]);
        }
      } catch (err) {
        console.warn(err);
        const local = JSON.parse(localStorage.getItem("app_payments") || "[]");
        setRecentPayments(local.slice(0, 10));
      }
    };

    fetchProfiles();
  }, []);

  // Refresh recent payments on saved payment
  useEffect(() => {
    if (!recentPayments) return;
    // nop: placeholder - could implement real-time subscription
  }, [recentPayments]);

  const handleSubmit = async () => {
    // Basic validation
    const parsedAmount = Number(amount.toString().replace(/[^0-9.-]+/g, ""));
    if (!patientId) {
      toast.error("Pilih pasien terlebih dahulu");
      return;
    }
    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Masukkan nominal pembayaran yang valid");
      return;
    }

    setLoading(true);

    try {
      // Try to persist to Supabase in a table `payments`.
      // If table doesn't exist or environment isn't configured, fallback to localStorage.
      const payload = {
        patient_id: patientId,
        amount: parsedAmount,
        method,
        note,
        created_at: new Date().toISOString(),
      };

      const { data: inserted, error } = await supabase.from<TablesInsert["payments"]>("payments").insert([payload]);
      if (error) {
        console.warn("Supabase error or payments table does not exist. Falling back to localStorage.", error);

        // Fallback to localStorage save
        const existing = JSON.parse(localStorage.getItem("app_payments") || "[]");
        existing.unshift(payload);
        localStorage.setItem("app_payments", JSON.stringify(existing));

        toast.success("Pembayaran disimpan sementara (local)");
        setLoading(false);
        navigate("/admin/dashboard");
        return;
      }

      toast.success("Pembayaran berhasil disimpan");
      setLoading(false);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan pembayaran");
      setLoading(false);
    }
  };

  const formatCurrency = (val: string) => {
    try {
      const n = Number(val.toString().replace(/[^0-9.-]+/g, ""));
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n || 0);
    } catch {
      return val;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-medical-soft p-6">
      <Button variant="ghost" onClick={() => navigate("/admin/dashboard")} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-medical p-3 rounded-full">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Input Pembayaran</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tambah Pembayaran</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="mb-1">Pilih Pasien</Label>
              <Select value={patientId ?? ""} onValueChange={(value) => setPatientId(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pasien..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Pilih pasien</SelectItem>
                  {profiles.map((profile) => (
                    <SelectItem value={profile.id} key={profile.id}>
                      {profile.full_name ?? profile.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1">Nominal (IDR)</Label>
              <Input
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Rp 0"
              />
              <p className="text-sm text-muted-foreground mt-1">{formatCurrency(amount)}</p>
            </div>

            <div>
              <Label className="mb-1">Metode Pembayaran</Label>
              <Select value={method} onValueChange={(value) => setMethod(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih metode pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Tunai (Cash)</SelectItem>
                  <SelectItem value="card">Kartu (Debit/Kredit)</SelectItem>
                  <SelectItem value="transfer">Transfer Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1">Catatan</Label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Catatan (opsional)" />
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>
                Batal
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan Pembayaran"}
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Pembayaran Terbaru</h2>
          <div className="space-y-3">
            {recentPayments.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">Belum ada pembayaran</CardContent>
              </Card>
            ) : (
              recentPayments.map((p, idx) => (
                <Card key={idx} className="shadow-card">
                  <CardContent className="p-3 flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{p.patient_id ?? p.patient}</div>
                      <div className="text-sm text-muted-foreground">{p.method || p.payment_method}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(p.amount?.toString() || p.amount || "0")}</div>
                      <div className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleString()}</div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
