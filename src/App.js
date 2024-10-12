import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

function App() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#ffffff');

  const generateQRCode = async () => {
    try {
      const qr = await QRCode.toDataURL(text, {
        color: {
          dark: darkColor,
          light: lightColor
        }
      });
      setQrCode(qr);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (text) {
      generateQRCode();
    }
  }, [text, darkColor, lightColor]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Wpisz tekst lub URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />
      <br />
      
      <label style={{ marginRight: '10px' }}>Kolor kwadratów:</label>
      <input
        type="color"
        value={darkColor}
        onChange={(e) => setDarkColor(e.target.value)}
      />
      <br /><br />
      
      <label style={{ marginRight: '10px' }}>Kolor tła:</label>
      <input
        type="color"
        value={lightColor}
        onChange={(e) => setLightColor(e.target.value)}
      />
      <br /><br />

      <div style={{ marginTop: '30px' }}>
        {qrCode && (
          <>
            <h3>Wygenerowany QR Kod:</h3>
            <img src={qrCode} alt="Generated QR Code" style={{boxShadow: `0px 0px 20px 5px ${lightColor}`, width: '170px'}}/>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
