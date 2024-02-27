import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class PDFGenerator extends React.Component {
  generatePDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("download.pdf");
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.generatePDF}>Generar PDF</button>
        <div id="pdf-content">
          {/* Contenido de tu página web */}
        </div>
      </div>
    );
  }
}

export default PDFGenerator;