/**
 * Einfacher Node.js Express Server für IP-Tracker
 * Speichert öffentliche IP-Adressen mit Zeitstempel in ips.json
 * 
 * Starten: node server.js
 * Erreichbar unter: http://localhost:3000
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

// Express-App initialisieren
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // JSON-Daten verarbeiten
app.use(express.static('.')); // Statische Dateien im aktuellen Verzeichnis servieren

// Pfad zur JSON-Datei für IP-Speicherung
const ipsFilePath = path.join(__dirname, 'ips.json');

/**
 * Funktion: ips.json initialisieren (wenn nicht vorhanden)
 * Falls die Datei nicht existiert, wird sie mit einem leeren Array erstellt
 */
function initializeIPFile() {
    if (!fs.existsSync(ipsFilePath)) {
        fs.writeFileSync(ipsFilePath, JSON.stringify([], null, 2));
        console.log('✅ ips.json wurde erstellt');
    }
}

/**
 * POST /api/save-ip
 * Speichert die IP-Adresse und den Zeitstempel in der ips.json Datei
 * 
 * Request Body:
 * {
 *   "ip": "192.168.1.1",
 *   "timestamp": "2026-07-15T10:30:00.000Z"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "IP gespeichert"
 * }
 */
app.post('/api/save-ip', (req, res) => {
    try {
        const { ip, timestamp } = req.body;

        // Validierung der Eingabedaten
        if (!ip || !timestamp) {
            return res.status(400).json({
                success: false,
                message: 'IP und Zeitstempel erforderlich'
            });
        }

        // Aktuelle IPs aus der Datei lesen
        let ips = [];
        if (fs.existsSync(ipsFilePath)) {
            const fileContent = fs.readFileSync(ipsFilePath, 'utf-8');
            ips = JSON.parse(fileContent);
        }

        // Neue IP-Eintrag hinzufügen
        // 📝 SPEICHERUNG: Hier werden die Daten in ips.json geschrieben
        const newEntry = {
            id: Date.now(),
            ip: ip,
            timestamp: timestamp,
            // Formatiertes Datum für bessere Lesbarkeit
            readable_date: new Date(timestamp).toLocaleString('de-DE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        };

        ips.push(newEntry);

        // In Datei schreiben (mit schöner Formatierung für Lesbarkeit)
        fs.writeFileSync(ipsFilePath, JSON.stringify(ips, null, 2));

        console.log(`📌 IP gespeichert: ${ip} (${newEntry.readable_date})`);

        // Erfolgreiche Antwort
        res.json({
            success: true,
            message: 'IP erfolgreich gespeichert',
            entry: newEntry
        });

    } catch (error) {
        console.error('❌ Fehler beim Speichern:', error);
        res.status(500).json({
            success: false,
            message: 'Fehler beim Speichern der IP'
        });
    }
});

/**
 * GET /api/get-ips
 * Gibt alle gespeicherten IPs zurück (optional, für Debugging)
 */
app.get('/api/get-ips', (req, res) => {
    try {
        if (fs.existsSync(ipsFilePath)) {
            const ips = JSON.parse(fs.readFileSync(ipsFilePath, 'utf-8'));
            res.json({
                success: true,
                count: ips.length,
                ips: ips
            });
        } else {
            res.json({
                success: true,
                count: 0,
                ips: []
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Fehler beim Lesen der IPs'
        });
    }
});

/**
 * Server starten
 */
initializeIPFile();

app.listen(PORT, () => {
    console.log('');
    console.log('🚀 IP-Tracker Server läuft!');
    console.log(`📍 Adresse: http://localhost:${PORT}`);
    console.log(`📁 IP-Datei: ${ipsFilePath}`);
    console.log(`📊 Alle IPs abrufen: http://localhost:${PORT}/api/get-ips`);
    console.log('');
    console.log('⏸️  Server stoppen: Drücke Ctrl+C');
    console.log('');
});