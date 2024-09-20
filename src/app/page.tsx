"use client";
// import BarcodeDisplay from "./components/BarcodeDisplay";
import BarcodeGenerator from "./components/BarcodeGenerator";
import { useState } from "react";
import { BarcodeType } from "@/types";

// Helper function to check if a value is a valid BarcodeType
const isValidBarcodeType = (type: string): type is BarcodeType => {
  return ["CODE128", "EAN13", "QR"].includes(type);
};

export default function Home() {
  const [generatedBarcodeType, setGeneratedBarcodeType] = useState<string>("");
  const [generatedBarcodeContent, setGeneratedBarcodeContent] =
    useState<string>("");

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <BarcodeGenerator
        setGeneratedBarcodeType={setGeneratedBarcodeType}
        setGeneratedBarcodeContent={setGeneratedBarcodeContent}
      />
      {/* {isValidBarcodeType(generatedBarcodeType) && generatedBarcodeContent && (
        <BarcodeDisplay
          barcodeType={generatedBarcodeType}
          barcodeContent={generatedBarcodeContent}
        />
      )} */}
    </div>
  );
}
