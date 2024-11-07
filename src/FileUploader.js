import React from "react";
import Papa from "papaparse";

const FileUploader = ({ onFileUpload }) => {
  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      transformHeader: (header) =>
        header
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()),
      complete: (result) => {
        onFileUpload(result, type);
      },
    });
    event.target.nextElementSibling.nextElementSibling.textContent = `${file.name} enviado`;

    if (event.target.id === "roster-upload") {
      document.querySelector("#info-upload").disabled = false;
      const labelSpan =
        document.querySelector("#info-upload").nextElementSibling
          .nextElementSibling;
      labelSpan.textContent = "Nenhum arquivo enviado";
      labelSpan.style.color = "initial";
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p>
        1º Visite o site oficial{" "}
        <a href="https://marvelstrikeforce.com/pt/alliance/members">
          https://marvelstrikeforce.com/pt/alliance/members
        </a>{" "}
        e encontre o botão{" "}
        <i className="fa fa-fas fa-file-csv" style={{ color: "#00aeef" }}></i>{" "}
        logo no início da lista de membros <br />
        2º Baixe a segunda opção (roster.csv), sendo a primeira (info.csv)
        opcional, e envie o(s) arquivos clicando nos botões abaixo:
      </p>
      <input
        type="file"
        id="roster-upload"
        accept=".csv"
        onChange={(e) => handleFileChange(e, "roster")}
      />
      <label htmlFor="roster-upload">Enviar roster.csv</label>
      <span>Nenhum arquivo enviado</span>
      <input
        type="file"
        id="info-upload"
        accept=".csv"
        disabled={true}
        onChange={(e) => handleFileChange(e, "info")}
        style={{ marginLeft: "10px" }}
      />
      <label htmlFor="info-upload">Enviar info.csv</label>
      <span style={{ color: "red" }}>Enviar roster.csv primeiro</span>
    </div>
  );
};

export default FileUploader;
