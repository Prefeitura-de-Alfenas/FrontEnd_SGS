import ExcelJS from 'exceljs';

export const generateExcelRMA = async (
  name: string,
  header: string[],
  dados: any[]
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  // Define colunas com headers e largura
  worksheet.columns = header.map((title, index) => ({
    header: title,
    key: `col${index}`, // chave obrigatória e única
    width: 35,
  }));

  // Adiciona dados (como array de valores)
  dados.forEach((linha) => {
    const dataRow = worksheet.addRow(linha);
  
    dataRow.eachCell((cell, colNumber) => {
      // Alinhamento padrão
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'left',
        indent: 1,
      };
  
      // Borda
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
  
      // Aplica cor apenas à coluna 6 (Situação)
      if (colNumber === 6) {
        const valor = cell.value?.toString().toLowerCase();
  
        if (valor === 'deferido') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD1F2EB' }, // verde claro
          };
        } else if (valor === 'indeferido') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFDAE8FC' }, // azul claro
          };
        } else if (valor === 'em análise' || valor === 'em analise') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFEAEAEA' }, // cinza claro
          };
        }
      }
    });
  });
  // Aplica estilo ao cabeçalho (linha 1)
  const headerRow = worksheet.getRow(1);
  headerRow.height = 25;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF5B3F86' }, // Roxo escuro + opacidade
    };
    cell.font = {
      bold: true,
      color: { argb: 'FFFFFFFF' },
      size: 12,
    };
    cell.alignment = {
        vertical: 'middle',
        horizontal: 'left',
        indent: 1, // Aumente para mais espaço à esquerda
      };
    cell.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // Gera e baixa
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${name}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
