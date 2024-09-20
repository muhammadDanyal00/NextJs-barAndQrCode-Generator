"use client";

import { useState, useRef } from "react";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BarcodeType } from "@/types";

interface BarcodeGeneratorProps {
  setGeneratedBarcodeType: (type: string) => void;
  setGeneratedBarcodeContent: (content: string) => void;
}

export default function BarcodeGenerator({
  setGeneratedBarcodeType,
  setGeneratedBarcodeContent,
}: BarcodeGeneratorProps) {
  const [barcodeContent, setBarcodeContent] = useState<string>("");
  const [barcodeType, setBarcodeType] = useState<BarcodeType>("CODE128");
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const barcodeRef = useRef<HTMLDivElement | null>(null);

  const handleGenerate = () => {
    if (barcodeContent) {
      setIsGenerated(true);
      setGeneratedBarcodeType(barcodeType);
      setGeneratedBarcodeContent(barcodeContent);
    }
  };

  const downloadBarcode = () => {
    if (barcodeRef.current) {
      html2canvas(barcodeRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "barcode.png";
        link.click();
      });
    }
  };

  const shareBarcode = async () => {
    const shareData = {
      title: "Check out my Barcode!",
      text: `Here is the barcode: ${barcodeContent}`,
      url: window.location.href,
    };
    try {
      await navigator.share(shareData);
      console.log("Barcode shared successfully");
    } catch (err) {
      console.error("Error sharing", err);
    }
  };

  const renderBarcode = () => {
    switch (barcodeType) {
      case "CODE128":
      case "EAN13":
        return <Barcode value={barcodeContent} format={barcodeType} />;
      case "QR":
        return <QRCode value={barcodeContent} size={210} />;
      default:
        return null;
    }
  };

  // Function to render barcode only for download
  // const renderBarcodeForDownload = () => {
  //   switch (barcodeType) {
  //     case "CODE128":
  //     case "EAN13":
  //       return <Barcode value={barcodeContent} format={barcodeType} />;
  //     case "QR":
  //       return <QRCode value={barcodeContent} size={256} />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-100">
        Barcode Generator
      </h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="content" className="text-gray-300">
            Barcode Content
          </Label>
          <Input
            id="content"
            placeholder="Enter barcode content"
            value={barcodeContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBarcodeContent(e.target.value)
            }
            className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
          />
        </div>
        <div>
          <Label htmlFor="type" className="text-gray-300">
            Barcode Type
          </Label>
          <Select
            value={barcodeType}
            onValueChange={(value: BarcodeType) => setBarcodeType(value)}
          >
            <SelectTrigger
              id="type"
              className="bg-gray-700 border-gray-600 text-gray-100"
            >
              <SelectValue placeholder="Select barcode type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="CODE128" className="text-gray-100">
                Code 128
              </SelectItem>
              <SelectItem value="EAN13" className="text-gray-100">
                EAN-13
              </SelectItem>
              <SelectItem value="QR" className="text-gray-100">
                QR Code
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleGenerate}
        >
          Generate Barcode
        </Button>
      </div>
      {isGenerated && (
        <div className="mt-6">
          <div
            className="bg-white p-4 rounded-md flex items-center justify-center"
            ref={barcodeRef}
          >
            {renderBarcode()}
          </div>
          <p className="mt-2 text-sm text-center text-gray-400">
            Type: {barcodeType.toUpperCase()}, Content: {barcodeContent}
          </p>
          <div className="flex space-x-2 mt-4">
            <Button
              onClick={downloadBarcode}
              className="bg-green-600 hover:bg-green-700"
            >
              Download Barcode
            </Button>
            <Button
              onClick={shareBarcode}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Share Barcode
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
