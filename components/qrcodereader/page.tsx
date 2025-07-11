"use client";

import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react"; // importe o ícone camera
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QRCodeReader() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const qrCodeRegionId = "qr-reader";
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    setError(null);
    setResult(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        setError("Seu navegador não suporta acesso à câmera.");
        return;
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some((device) => device.kind === "videoinput");

      if (!hasCamera) {
        setError("Nenhuma câmera foi encontrada neste dispositivo.");
        return;
      }

      setIsScanning(true);
      const qrCodeScanner = new Html5Qrcode(qrCodeRegionId);
      html5QrCodeRef.current = qrCodeScanner;

      await qrCodeScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setResult(decodedText);
          stopScanner();
        },
        () => {}
      );
    } catch (err) {
      console.error("Erro ao acessar câmera:", err);
      setError("Erro ao acessar a câmera.");
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    html5QrCodeRef.current?.stop().then(() => {
      html5QrCodeRef.current?.clear();
      setIsScanning(false);
    });
  };

  useEffect(() => {
    return () => {
      stopScanner(); // Cleanup
    };
  }, []);

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        onClick={startScanner}
        disabled={isScanning}
        size="default"
        className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        aria-label={isScanning ? "Escaneando" : "Abrir câmera para QR Code"}
      >
        <Camera className="w-5 h-5" />
        {isScanning ? "Escaneando..." : "Abrir Câmera"}
      </Button>

      {isScanning && (
        <div
          id={qrCodeRegionId}
          className="w-[300px] h-[300px] border rounded-md"
        />
      )}

      {result && (
        <p className="text-green-600 font-semibold">QR Code lido: {result}</p>
      )}

      {error && <p className="text-red-600 font-medium">{error}</p>}
    </div>
  );
}
