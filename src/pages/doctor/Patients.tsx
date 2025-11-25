import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/ui/BackButton";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const navigate = useNavigate();

  const patients = [
    { id: "A-024", name: "John Doe", complaint: "Demam dan batuk" },
    { id: "A-025", name: "Jane Smith", complaint: "Pemeriksaan rutin" },
    { id: "A-026", name: "Bob Johnson", complaint: "Sakit kepala" },
    { id: "A-027", name: "Alice Brown", complaint: "Alergi kulit" },
  ];

  return (
    <div className="min-h-screen bg-gradient-medical-soft p-6">
      <BackButton className="mb-4" to="/doctor/dashboard" />

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-medical p-3 rounded-full">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Daftar Pasien</h1>
        </div>

        {patients.map((patient) => (
          <Card
            key={patient.id}
            className="cursor-pointer mb-3"
            onClick={() => navigate(`/doctor/examination/${patient.id}`)}
          >
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{patient.name}</p>
                <p className="text-sm text-muted-foreground">{patient.complaint}</p>
              </div>
              <p className="text-xs text-muted-foreground">{patient.id}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Patients;
