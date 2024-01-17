"use client"
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import { PDFViewer } from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    width:'100%',
    height:'100%',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  view:{
    width: "100%",
    display: "flex",
    flexDirection:"row",
    alignItems: "center",
    justifyContent:"center",
    marginTop:"8px",
  },
  viewBorder:{
    width: "100%",
    display: "flex",
    flexDirection:"row",
   
   

  },
  border:{

    border:'1px solid #000',

  },
  textinfo:{
     fontSize:"8px",
     color:"#000",
     marginLeft:"3px",
     marginRight:"3px",
     marginBottom:"14px",
  }
});
const currentDate = new Date();

// Opções de formatação para o método toLocaleString
const options = {
  weekday: 'long' as const,
  year: 'numeric' as const,
  month: 'long' as const,
  day: 'numeric' as const,
  hour: 'numeric' as const,
  minute: 'numeric' as const,
  second: 'numeric' as const,
  timeZoneName: 'short' as const,
};
const formattedDate = currentDate.toLocaleString('pt-BR', options);
// Create Document Component
const MyDocument = () => (
  
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.view}>
      <Image src='alfenas.png' style={{width:'40px',height:'40px',marginRight:"20px", borderRadius:"6px" }} />
      <Text>PREFEITURA MUNICIPAL DE ALFENAS</Text>
      </View>
      <View style={styles.view}>
      <Text style={{
        fontSize:"14px",
      }}>SGS - Sistema de Gestão Social</Text>
      </View>
      <View style={styles.view}>
      <Text style={{
        fontSize:"11px",
      }}>Recibo de Atendimento Social</Text>
      </View>
     <View style={{padding:'15px'}}>
        <View style={styles.border}> 
           <View style={styles.viewBorder}>
           <View style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",width:"50%",padding:'7px'}}>
            <Text style={styles.textinfo}>PROTOCOLO: {'7d70f5c9-4339-49f2-a885-46dbdf829846'.toUpperCase()}</Text>
            <Text  style={styles.textinfo}>BENEFICIOARIO: MARCELO DE LIMA GOMES</Text>
            <Text  style={styles.textinfo}>CPF : 090.255.316-01</Text>
            <Text  style={styles.textinfo}>EQUIPAMENTO: PSF.JARDIN ALVORADA SANTOS NETO</Text>
            <Text  style={styles.textinfo}>BENEFÍCIO: CESTA BASICA</Text>
            <Text  style={styles.textinfo}>QUANTIDADE: 5</Text>
     
        
            <Text  style={styles.textinfo}>DATA ATENDIMENTO: 02/02/2024</Text>
           
           </View>
           <View style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",width:"50%",padding:'7px'}}>
            <Text style={styles.textinfo}>ATENDENTE:MARCELO</Text>
            <Text  style={styles.textinfo}>LOGRADOURO: RUA JOÃO DA PENHA DAMASCENO LEITE DA CURNHA SANTOS</Text>
            <Text  style={styles.textinfo}>BAIRO: {('Conjunto Habitacional Francelino Pereira dos Santos').toUpperCase()} (Pinheirinho)</Text>
            <Text  style={styles.textinfo}>NUMERO: 189</Text>
            <Text  style={styles.textinfo}>TELEFONE: 3509543934839</Text>
            <Text  style={styles.textinfo}>STATUS: DEFERIDO</Text>
          
           </View>
           </View>
           <View style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:'10px',padding:"10px"}}>
           <Text  style={{fontSize:"9px",
            color:"#000",
           }}>Observação: Mussum Ipsum, cacilds vidis litro abertis. Cevadis im ampola pa arma uma pindureta. Eu nunca mais boto a boca num copo de cachaça, agora eu só uso canudis! Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Casamentiss faiz malandris se pirulitá</Text> 
           </View>

           <View style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px"}}>
              <Text>________________________________________</Text>
              <Text style={{fontSize:"10px",color:"#000",marginTop:'10px',}}>MARCELO DE LIMA GOMES</Text>
           </View>

           <View style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:'10px',padding:"10px"}}>
            <Text style={styles.textinfo}>IMPRESSO POR: ADMIN</Text>
            <Text style={styles.textinfo}>IMPRESSO EM: {formattedDate.toUpperCase()}</Text>
           </View>
           
        </View>
        
       
     </View>
    
      
     
    </Page>
  </Document>
);






function ReciboDocment() {
    return ( 
        <PDFViewer className='w-full h-screen'>
          <MyDocument />
        </PDFViewer>
     );
}

export default ReciboDocment;