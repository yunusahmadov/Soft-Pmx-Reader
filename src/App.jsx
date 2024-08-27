import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Buffer } from 'buffer';

function App() {
  const [files, setFiles] = useState([]);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const extractedFiles = await extractPMXFiles(file);
      setFiles(extractedFiles);
    }
  };

  const extractPMXFiles = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Example extraction logic (replace this with actual PMX extraction logic)
    const extractedFiles = [];
    let offset = 0;

    // Example logic to simulate extraction (replace with actual PMX parsing logic)
    while (offset < buffer.length) {
      const fileName = `file_${offset}.pmx`;
      const fileData = buffer.slice(offset, offset + 1024); // example slice size
      extractedFiles.push({ name: fileName, data: fileData });
      offset += 1024; // increment offset by slice size
    }

    return extractedFiles;
  };

  const downloadFile = (data, filename) => {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  };

  return (
    <div>
      <h1>PMX File Extractor</h1>
      <input type="file" accept=".pmx" onChange={handleFileSelect} />
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name}
            <button onClick={() => downloadFile(file.data, file.name)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
