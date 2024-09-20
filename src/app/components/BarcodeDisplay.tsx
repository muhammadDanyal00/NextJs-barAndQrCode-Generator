// import { BarcodeType } from "@/types";

// interface BarcodeDisplayProps {
//   barcodeType: BarcodeType;
//   barcodeContent: string;
// }

// export default function BarcodeDisplay({
//   barcodeType,
//   barcodeContent,
// }: BarcodeDisplayProps) {
//   return (
//     <div className="mt-6">
//       <div className="aspect-w-2 aspect-h-1 bg-gray-700 rounded-md flex items-center justify-center">
//         <span className="text-gray-400">Barcode Placeholder</span>
//       </div>
//       <p className="mt-2 text-sm text-center text-gray-400">
//         Type: {barcodeType ? barcodeType.toUpperCase() : "N/A"}, Content:{" "}
//         {barcodeContent || "No Content"}
//       </p>
//     </div>
//   );
// }

import { BarcodeType } from "@/types";

interface BarcodeDisplayProps {
  barcodeType: BarcodeType;
  barcodeContent: string;
}

export default function BarcodeDisplay({
  barcodeType,
  barcodeContent,
}: BarcodeDisplayProps) {
  return (
    <div className="mt-6">
      <div className="aspect-w-2 aspect-h-1 bg-gray-700 rounded-md flex items-center justify-center">
        <span className="text-gray-400">Barcode Placeholder</span>
      </div>
      <p className="mt-2 text-sm text-center text-gray-400">
        Type: {barcodeType ? barcodeType.toUpperCase() : "N/A"}, Content:{" "}
        {barcodeContent || "No Content"}
      </p>
    </div>
  );
}
