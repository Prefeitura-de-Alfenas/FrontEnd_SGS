"use client"
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import { PDFViewer } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import { GetEntregaById } from '@/app/api/entrega/routes';
import { EntregaByIdI } from '@/interfaces/entras/interface';
import { convertDataHoraParaPtBr, converterDataParaFormatoInputDate } from '@/utils/converDateParaInput';
import { UsuarioLogadoI } from '@/interfaces/usuario/interface';
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
interface MyDocmentProps{
  entrega:EntregaByIdI,
  usuario:UsuarioLogadoI
}
const MyDocument = ({entrega,usuario}:MyDocmentProps) =>(
 

  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.view}>
     
      <Text style={{marginTop:'20px'}}>PREFEITURA MUNICIPAL DE ALFENAS</Text>
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
            <Text style={styles.textinfo}>PROTOCOLO: {entrega.id.toUpperCase()}</Text>
            <Text  style={styles.textinfo}>BENEFICIÁRIO: {entrega.pessoa.nome.toUpperCase()}</Text>
            <Text  style={styles.textinfo}>CPF : {entrega.pessoa.cpf.toUpperCase()}</Text>
            <Text  style={styles.textinfo}>EQUIPAMENTO: {entrega.equipamento.nome.toUpperCase()}</Text>
            <Text  style={styles.textinfo}>BENEFÍCIO: {entrega.beneficio.nome.toUpperCase()}</Text>
            <Text  style={styles.textinfo}>QUANTIDADE: {entrega.quantidade}</Text>
     
        
            <Text  style={styles.textinfo}>DATA ATENDIMENTO: {convertDataHoraParaPtBr(entrega.datacadastro).toUpperCase()}</Text>
           
           </View>
           <View style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",width:"50%",padding:'7px'}}>
            <Text style={styles.textinfo}>ATENDENTE:{entrega.usuario.nome.toUpperCase()}</Text>
            <Text  style={styles.textinfo}>LOGRADOURO: {entrega.pessoa.logradouro.toUpperCase()}</Text>
            <Text  style={styles.textinfo}>BAIRRO: {entrega.pessoa.bairro.toUpperCase()}</Text>
            <Text  style={styles.textinfo}>NÚMERO: {entrega.pessoa.numero.toUpperCase()}</Text>
            <Text  style={styles.textinfo}>TELEFONE: {entrega.pessoa.telefone ? entrega.pessoa.telefone.toUpperCase() : 'SEM TELEFONE'}</Text>
            <Text  style={styles.textinfo}>STATUS: {entrega.status  === 'ativo' ? "DEFERIDO" : "INDEFERIDO"}</Text>
            <Text  style={styles.textinfo}>VALOR TOTAL: ${(entrega.beneficio.valor * entrega.quantidade).toFixed(2)}</Text>
          
           </View>
           </View>
           <View style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:'10px',padding:"10px"}}>
           <Text  style={{fontSize:"9px",
            color:"#000",
           }}>OBSERVAÇÂO{entrega.observacao ? entrega.observacao.toUpperCase() : ''}</Text> 
           </View>

           <View style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px"}}>
              <Text>________________________________________</Text>
              <Text style={{fontSize:"10px",color:"#000",marginTop:'10px',}}>{entrega.usuario.nome.toUpperCase()}</Text>
           </View>

           <View style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:'10px',padding:"10px"}}>
            <Text style={styles.textinfo}>IMPRESSO POR: {usuario.user.nome.toUpperCase()}</Text>
            <Text style={styles.textinfo}>IMPRESSO EM: {formattedDate.toUpperCase()}</Text>
           </View>
           
        </View>
        
       
     </View>
    
      
     
    </Page>
  </Document>
);




interface ReciboDocmentProps{
  id:string,
  usuario:UsuarioLogadoI
}

function ReciboDocment({usuario,id}:ReciboDocmentProps) {
  const {data,isLoading } = useQuery({
    queryKey:['entrega',id],
    queryFn:() => GetEntregaById(usuario,id)
  })
  if(isLoading){
    return <h1>..Loading</h1>
  }
    return ( 
        <PDFViewer className='w-full h-screen'>
          <MyDocument entrega={data} usuario={usuario} />
        </PDFViewer>
     );
}

export default ReciboDocment;