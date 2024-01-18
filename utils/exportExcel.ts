import ExcelJS from 'exceljs';
export  const generateExcel = async (name:string,header:string[],datdos:any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Adicione dados ao arquivo Excel
    worksheet.addRow(header);
    datdos.forEach((element,index) => {
        worksheet.addRow(element);

    });
 

    // Gere o arquivo Excel
    const buffer = await workbook.xlsx.writeBuffer();

    // Crie um blob a partir do buffer
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Crie um URL do blob
    const url = URL.createObjectURL(blob);

    // Crie um link para o download do arquivo
    const link = document.createElement('a');
    link.href = url;
    link.download = name;

    // Adicione o link ao DOM e clique nele para iniciar o download
    document.body.appendChild(link);
    link.click();

    // Remova o link do DOM
    document.body.removeChild(link);
};