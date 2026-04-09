const fs = require('fs');
const path = require('path');

// --- KONFIGURATION ---

const outputFileName = 'project_code_dump.txt';

const ignoredDirectories = [
  'node_modules',
  '.git',
  '.angular',
  '.vscode',
  'dist',
  'coverage',
  '.idea' // Falls du WebStorm nutzt
];

const includedExtensions = [
  '.ts',
  '.html',
  '.scss',
  '.css',
  '.json',
  '.js' // WICHTIG: Hinzugefügt für Backend (server.js)
];

const ignoredFiles = [
  'package-lock.json',
  outputFileName,
  'export-project.js'
];

// ---------------------

const outputStream = fs.createWriteStream(outputFileName);

function scanDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!ignoredDirectories.includes(file)) {
        scanDirectory(filePath);
      }
    } else {
      const ext = path.extname(file);

      // Prüfen ob Endung passt UND Datei nicht ignoriert wird
      if (includedExtensions.includes(ext) && !ignoredFiles.includes(file)) {
        writeFileContent(filePath);
      }
    }
  });
}

function writeFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(__dirname, filePath);

    outputStream.write('================================================================================\n');
    outputStream.write(`FILE: ${relativePath}\n`);
    outputStream.write('================================================================================\n\n');
    outputStream.write(content);
    outputStream.write('\n\n');

    console.log(`Hinzugefügt: ${relativePath}`);
  } catch (err) {
    console.error(`Fehler beim Lesen von ${filePath}:`, err.message);
  }
}

console.log('Starte Export...');
scanDirectory(__dirname);
outputStream.end(); // Stream sauber schließen
// Event-Listener warten, bis das Schreiben wirklich fertig ist
outputStream.on('finish', () => {
    console.log(`\nFertig! Alle Dateien wurden in "${outputFileName}" gespeichert.`);
});
