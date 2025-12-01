import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/ui/BackButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const DoctorExamination = () => {
  const { id } = useParams<{ id: string }>();


  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    // Implement saving logic here, e.g., send to backend API
    console.log("Saving diagnosis and prescription for patient", id);
    console.log("Diagnosis:", diagnosis);
    console.log("Prescription:", prescription);
    alert("Diagnosis and prescription saved.");
    navigate("/doctor/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-medical-soft p-6">
      <BackButton className="mb-4" to="/doctor/dashboard" />

      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Periksa Pasien: {id}</h1>

        <Card>
          <CardHeader>
            <CardTitle>Diagnosa</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Masukkan diagnosa pasien..."
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={6}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resep Obat</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Masukkan resep obat..."
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
            />
          </CardContent>
        </Card>

        <button onClick={handleSave} className="w-full bg-primary text-white py-2 rounded-lg mt-4">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default DoctorExamination;
