# 🌐 IP Tracker - Privates Webprojekt

Ein einfaches Webprojekt zum Speichern von öffentlichen IP-Adressen mit Zeitstempel in einer JSON-Datei.

## 📋 Features

- ✅ Modernes dunkles Design (Glasmorphismus-Stil)
- ✅ Automatische Erkennung der öffentlichen IP-Adresse
- ✅ Ein-Klick-Speicherung in `ips.json`
- ✅ Einfacher Express.js Backend
- ✅ Responsive und mobilfreundlich
- ✅ Sauberer, kommentierter Code

## 📁 Projektstruktur

```
ip-tracker/
├── index.html       # Webseite mit UI
├── server.js        # Express.js Server
├── ips.json         # JSON-Datei mit gespeicherten IPs
├── package.json     # Node.js Abhängigkeiten
└── README.md        # Diese Datei
```

## 🚀 Installation & Start

### Voraussetzungen

- **Node.js** installiert (kostenlos von [nodejs.org](https://nodejs.org) herunterladen)

### Schritt 1: Abhängigkeiten installieren

```bash
npm install
```

Dies installiert die `express`-Bibliothek, die im `package.json` definiert ist.

### Schritt 2: Server starten

```bash
npm start
```

oder direkt:

```bash
node server.js
```

Du solltest diese Ausgabe sehen:
```
🚀 IP-Tracker Server läuft!
📍 Adresse: http://localhost:3000
📁 IP-Datei: /pfad/zur/ips.json
📊 Alle IPs abrufen: http://localhost:3000/api/get-ips

⏸️  Server stoppen: Drücke Ctrl+C
```

### Schritt 3: Im Browser öffnen

Öffne deinen Browser und navigiere zu:

```
http://localhost:3000
```

## 🎯 Verwendung

1. **Seite laden** → Deine öffentliche IP-Adresse wird automatisch erkannt
2. **"IP Speichern" klicken** → Die IP mit Zeitstempel wird in `ips.json` gespeichert
3. **Erfolgs-Meldung** → Bestätigung wird 4 Sekunden angezeigt

## 📊 Die ips.json Datei

Nach dem Speichern sieht die `ips.json` etwa so aus:

```json
[
  {
    "id": 1689427200000,
    "ip": "192.168.1.100",
    "timestamp": "2026-07-15T10:30:00.000Z",
    "readable_date": "15.07.2026, 10:30:00"
  },
  {
    "id": 1689427260000,
    "ip": "192.168.1.101",
    "timestamp": "2026-07-15T10:31:00.000Z",
    "readable_date": "15.07.2026, 10:31:00"
  }
]
```

## 🔧 API-Endpoints

### POST `/api/save-ip`

Speichert eine IP-Adresse und einen Zeitstempel.

**Request:**
```json
{
  "ip": "192.168.1.100",
  "timestamp": "2026-07-15T10:30:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "IP erfolgreich gespeichert",
  "entry": { ... }
}
```

### GET `/api/get-ips`

Ruft alle gespeicherten IPs ab (für Debugging).

```
http://localhost:3000/api/get-ips
```

## 🎨 Design-Features

- **Glasmorphismus-Design**: Moderner Look mit blauem Gradient
- **Dark Mode**: Schonend für die Augen
- **Responsive**: Funktioniert auf Handy, Tablet und Desktop
- **Smooth Animations**: Button-Hover-Effekte und Übergänge

## 🛡️ Sicherheit (Private Verwendung)

⚠️ **Wichtig**: Dieses Projekt ist für **private Testumgebungen** gedacht. 

Für Produktionsumgebungen solltest du:
- ✅ HTTPS verwenden
- ✅ Eingabenvalidierung erhöhen
- ✅ Rate-Limiting implementieren
- ✅ Datenschutz beachten (DSGVO)
- ✅ Authentifizierung hinzufügen

## 📝 Code-Kommentare

Alle kritischen Stellen sind mit Kommentaren gekennzeichnet:
- `// 📝 SPEICHERUNG:` - Wo Daten in die Datei geschrieben werden
- `// ⚠️ VALIDIERUNG:` - Eingabeprüfungen
- `// 🚀 API:` - API-Endpoints

## 🐛 Troubleshooting

### "Port 3000 wird bereits verwendet"
```bash
# Auf anderen Port starten (z.B. 3001)
# Ändere in server.js: const PORT = 3001;
```

### "module not found: express"
```bash
# Abhängigkeiten neu installieren
npm install
```

### Browser zeigt "Die Verbindung wurde abgelehnt"
- Prüfe, ob `npm start` läuft
- Prüfe, ob du die richtige URL nutzt: `http://localhost:3000`

## 📞 Support & Fragen

Bei Fragen zum Code einfach die Kommentare in den Dateien lesen!

---

**Version:** 1.0.0  
**Typ:** Privates Testprojekt  
**Letztes Update:** 2026-07-15