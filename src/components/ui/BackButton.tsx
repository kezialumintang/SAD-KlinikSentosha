import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to?: string; // path to navigate back to, optional, defaults to -1 history
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to, className }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button variant="ghost" onClick={handleBack} className={className}>
      <ArrowLeft className="w-4 h-4 mr-2" />
      Kembali
    </Button>
  );
};

export default BackButton;
