import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/ui/BackButton";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const PharmacistPrescription = () => {
  const { id } = useParams<{ id: string }>();

  // Placeholder data - replace with real data fetched from API as needed
  const prescription = {
    id,
    patient: "John Doe",
    doctor: "Dr. Amanda",
    items: [
      { name: "Paracetamol 500mg", qty: 10 },
      { name: "Amoxicillin 500mg", qty: 7 },
    ],
    time: "10:45",
    status: "pending",
  };

  return (
    <div className="min-h-screen bg-gradient-medical-soft p-6">
      <BackButton className="mb-4" to="/pharmacist/dashboard" />
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Detail Resep: {prescription.id}</h1>

        <Card>
          <CardHeader>
            <CardTitle>Informasi Resep</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold">Pasien: {prescription.patient}</p>
                <p className="text-sm text-muted-foreground">Dokter: {prescription.doctor}</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                {prescription.time}
              </div>
            </div>

            <div className="space-y-2">
              {prescription.items.map((i, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{i.name}</p>
                  </div>
                  <Badge variant="secondary">Qty: {i.qty}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PharmacistPrescription;
