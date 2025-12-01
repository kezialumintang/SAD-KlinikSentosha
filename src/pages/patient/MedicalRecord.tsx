import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/ui/BackButton";
import { Calendar, FileText, User } from "lucide-react";

const PatientMedicalRecord = () => {
  const { id } = useParams<{ id: string }>();

  // Placeholder data - replace with real data from API
  const record = {
    id,
    date: "15 Des 2025",
    doctor: "Dr. Amanda Wijaya",
    diagnosis: "Flu dan Batuk",
    notes: "Pasien mengalami demam ringan, batuk, dan pilek",
    prescription: "Paracetamol 500mg, Amoxicillin 500mg",
  };

  return (
    <div className="min-h-screen bg-gradient-medical-soft p-6">
      <BackButton className="mb-4" to="/patient/medical-records" />
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Rekam Medis: {record.id}</h1>

        <Card>
          <CardHeader>
            <CardTitle>Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{record.diagnosis}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>{record.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Dokter: {record.doctor}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-2">{record.notes}</p>

            <div className="mt-3">
              <h3 className="text-sm font-medium">Resep</h3>
              <p className="text-sm text-muted-foreground">{record.prescription}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientMedicalRecord;
