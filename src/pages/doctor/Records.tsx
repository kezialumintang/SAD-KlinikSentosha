import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/ui/BackButton";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Records = () => {
  return (
    <div className="min-h-screen bg-gradient-medical-soft p-6">
      <BackButton className="mb-4" to="/doctor/dashboard" />

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-medical p-3 rounded-full">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Rekam Medis</h1>
        </div>

        <Card>
          <CardContent className="p-8 text-center space-y-2">
            <p className="text-muted-foreground">Fitur rekam medis akan segera hadir</p>
            <p>
              Sementara ini, Anda dapat kembali ke{" "}
              <Link to="/doctor/dashboard" className="text-primary underline">
                Dashboard
              </Link>{" "}
              atau ke{" "}
              <Link to="/doctor/patients" className="text-primary underline">
                Daftar Pasien
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Records;
