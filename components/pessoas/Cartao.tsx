"use client";
import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";

import QRCode from "qrcode";
import { useQuery } from "@tanstack/react-query";
import { GetPessoaById } from "@/app/api/pessoas/routes";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { logobasemeia6 } from "@/utils/logobase";

const styles = StyleSheet.create({
    page: {
      backgroundColor: "#f4f4f4",
      padding: 40,
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Helvetica",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: 16,
      padding: 24,
      width: 280,
      // Remove altura fixa para permitir expansão natural
      minHeight: 150, // Altura mínima
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start", // Alinhar ao topo
      border: "1px solid #e0e0e0",
    },
    header: {
      borderBottom: "1px solid #eaeaea",
      paddingBottom: 10,
      marginBottom: 14,
      textAlign: "center",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#2d3748",
    },
    subtitle: {
      fontSize: 9,
      color: "#718096",
      marginTop: 4,
    },
    infoGroup: {
      marginBottom: 10,
      // Garantir que textos longos quebrem linha
      wordWrap: "break-word",
    },
    label: {
      fontSize: 10,
      color: "#718096",
    },
    value: {
      fontSize: 11,
      fontWeight: "bold",
      color: "#2d3748",
      // Limitar largura e quebrar linhas se necessário
      maxWidth: 200,
      wordWrap: "break-word",
    },
    qrContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: 16,
      marginBottom: 8, // Margem inferior para evitar colisão
    },
    qr: {
      width: 70,
      height: 70,
    },
    logo: {
      width: 46,
      height: 46,
      alignSelf: "center",
      marginBottom: 10,
    },
  });

interface CartaoPDFProps {
  id: string;
  link: string;
  usuario: UsuarioLogadoI;
}

const CartaoPDF = ({ usuario, id, link }: CartaoPDFProps) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pessoa", id],
    queryFn: () => GetPessoaById(usuario, id),
  });

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(link, { width: 200 });
        setQrCodeDataURL(url);
      } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
      }
    };
    generateQRCode();
  }, [link]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-lg">Carregando dados da pessoa...</h1>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-lg text-red-600">Erro ao carregar a pessoa.</h1>
      </div>
    );
  }

  if (!qrCodeDataURL) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-lg">Gerando QR Code...</h1>
      </div>
    );
  }

  if (!data.slug) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl text-red-600">Pessoa não possui código (slug).</h1>
      </div>
    );
  }
 
  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.card}>
            {/* Logo */}
            <Image
              style={styles.logo}
              src={logobasemeia6}
            />

            {/* Título */}
            <View style={styles.header}>
              <Text style={styles.title}>Cartão Social Alfenas</Text>
              <Text style={styles.subtitle}>Sistema Gestão Social</Text>
            </View>

            {/* Informações */}
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Nome</Text>
              <Text style={styles.value}>
                {data.nome?.toUpperCase() || "NOME INDISPONÍVEL"}
              </Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Nascimento</Text>
              <Text style={styles.value}>
                {data.datanascimento
                  ? new Date(data.datanascimento).toLocaleDateString("pt-BR")
                  : "DATA INDISPONÍVEL"}
              </Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Código Único</Text>
              <Text style={styles.value}>{data.slug}</Text>
            </View>

            {/* QR Code */}
            <View style={styles.qrContainer}>
              <Image style={styles.qr} src={qrCodeDataURL} />
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CartaoPDF;