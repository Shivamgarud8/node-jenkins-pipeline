const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Jenkins CI/CD Pipeline - Node.js Deployment</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Courier New', 'Consolas', monospace;
          background: #0a0e27;
          color: #00ff41;
          overflow-x: hidden;
          position: relative;
        }

        /* Animated Matrix Background */
        .matrix-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0.1;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 5%;
          position: relative;
          z-index: 1;
          background: linear-gradient(135deg, rgba(10,14,39,0.95) 0%, rgba(26,31,58,0.95) 100%);
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        /* Terminal Header */
        .terminal-header {
          background: #1a1f3a;
          border: 2px solid #00ff41;
          border-radius: 8px 8px 0 0;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
        }

        .terminal-buttons {
          display: flex;
          gap: 8px;
        }

        .terminal-btn {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .btn-red { background: #ff5f56; }
        .btn-yellow { background: #ffbd2e; }
        .btn-green { background: #27c93f; }

        .terminal-title {
          margin-left: 20px;
          color: #00ff41;
          font-size: 14px;
          letter-spacing: 1px;
        }

        /* Main Content */
        .terminal-content {
          background: rgba(10, 14, 39, 0.98);
          border: 2px solid #00ff41;
          border-top: none;
          border-radius: 0 0 8px 8px;
          padding: 40px;
          box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
        }

        .ascii-logo {
          color: #00ff41;
          font-size: 10px;
          line-height: 1.2;
          margin-bottom: 30px;
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
          white-space: pre;
          font-weight: bold;
        }

        .main-title {
          font-size: 48px;
          color: #00ff41;
          margin-bottom: 15px;
          text-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
          animation: glow 2s ease-in-out infinite alternate;
        }

        .subtitle {
          font-size: 20px;
          color: #0ff;
          margin-bottom: 40px;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
        }

        /* Pipeline Status Grid */
        .pipeline-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin: 40px 0;
        }

        .pipeline-stage {
          background: rgba(26, 31, 58, 0.8);
          border: 2px solid #00ff41;
          border-radius: 8px;
          padding: 25px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .pipeline-stage::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.1), transparent);
          animation: scan 3s infinite;
        }

        .pipeline-stage:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(0, 255, 65, 0.4);
          border-color: #0ff;
        }

        .stage-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .stage-number {
          font-size: 14px;
          color: #0ff;
          background: rgba(0, 255, 255, 0.1);
          padding: 5px 12px;
          border-radius: 4px;
          border: 1px solid #0ff;
        }

        .stage-status {
          font-size: 20px;
          animation: rotate 2s linear infinite;
        }

        .stage-title {
          font-size: 22px;
          color: #00ff41;
          margin-bottom: 12px;
          font-weight: bold;
        }

        .stage-description {
          color: #8ab4f8;
          font-size: 14px;
          line-height: 1.6;
        }

        /* Metrics Section */
        .metrics-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 40px 0;
        }

        .metric-card {
          background: linear-gradient(135deg, #1a1f3a 0%, #2a3555 100%);
          border: 2px solid #00ff41;
          border-radius: 8px;
          padding: 25px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .metric-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #00ff41, #0ff);
          animation: progress-bar 2s ease-in-out infinite;
        }

        .metric-value {
          font-size: 36px;
          color: #00ff41;
          font-weight: bold;
          text-shadow: 0 0 15px rgba(0, 255, 65, 0.8);
          margin-bottom: 10px;
        }

        .metric-label {
          font-size: 14px;
          color: #8ab4f8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Tech Stack */
        .tech-stack {
          background: rgba(26, 31, 58, 0.6);
          border: 2px solid #0ff;
          border-radius: 8px;
          padding: 30px;
          margin: 40px 0;
        }

        .tech-title {
          font-size: 24px;
          color: #0ff;
          margin-bottom: 25px;
          text-align: center;
          text-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
        }

        .tech-items {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 20px;
        }

        .tech-item {
          background: rgba(0, 255, 65, 0.1);
          border: 2px solid #00ff41;
          border-radius: 8px;
          padding: 20px 30px;
          font-size: 18px;
          color: #00ff41;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .tech-item::before {
          content: '>';
          position: absolute;
          left: -20px;
          color: #0ff;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          background: rgba(0, 255, 65, 0.2);
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(0, 255, 65, 0.6);
        }

        .tech-item:hover::before {
          left: 10px;
        }

        /* Command Line Output */
        .command-output {
          background: #000;
          border: 2px solid #00ff41;
          border-radius: 8px;
          padding: 25px;
          margin: 40px 0;
          font-size: 14px;
          line-height: 1.8;
          box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
        }

        .command-line {
          color: #00ff41;
          margin: 8px 0;
        }

        .command-prompt {
          color: #0ff;
        }

        .command-success {
          color: #27c93f;
        }

        .command-info {
          color: #8ab4f8;
        }

        /* Animations */
        @keyframes glow {
          from { text-shadow: 0 0 20px rgba(0, 255, 65, 0.8); }
          to { text-shadow: 0 0 30px rgba(0, 255, 65, 1), 0 0 40px rgba(0, 255, 65, 0.8); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes scan {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        @keyframes progress-bar {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .main-title { font-size: 32px; }
          .subtitle { font-size: 16px; }
          .terminal-content { padding: 20px; }
          .ascii-logo { font-size: 8px; }
          .pipeline-grid { grid-template-columns: 1fr; }
        }
      </style>
    </head>
    <body>
      <canvas class="matrix-bg" id="matrix"></canvas>
      
      <div class="hero">
        <div class="hero-content">
          <div class="terminal-header">
            <div class="terminal-buttons">
              <div class="terminal-btn btn-red"></div>
              <div class="terminal-btn btn-yellow"></div>
              <div class="terminal-btn btn-green"></div>
            </div>
            <div class="terminal-title">jenkins-pipeline@production ~ % </div>
          </div>

          <div class="terminal-content">
            <div class="ascii-logo">
     ██╗███████╗███╗   ██╗██╗  ██╗██╗███╗   ██╗███████╗
     ██║██╔════╝████╗  ██║██║ ██╔╝██║████╗  ██║██╔════╝
     ██║█████╗  ██╔██╗ ██║█████╔╝ ██║██╔██╗ ██║███████╗
██   ██║██╔══╝  ██║╚██╗██║██╔═██╗ ██║██║╚██╗██║╚════██║
╚█████╔╝███████╗██║ ╚████║██║  ██╗██║██║ ╚████║███████║
 ╚════╝ ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝
            </div>

            <h1 class="main-title">CI/CD Pipeline Automation</h1>
            <p class="subtitle">> Node.js Application Deployment System <span class="cursor">_</span></p>

            <div class="metrics-container">
              <div class="metric-card">
                <div class="metric-value">${Math.floor(Math.random() * 100) + 50}</div>
                <div class="metric-label">Build Number</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">99.8%</div>
                <div class="metric-label">Uptime</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">2.3s</div>
                <div class="metric-label">Deploy Time</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">SUCCESS</div>
                <div class="metric-label">Status</div>
              </div>
            </div>

            <div class="pipeline-grid">
              <div class="pipeline-stage">
                <div class="stage-header">
                  <span class="stage-number">STAGE 1</span>
                  <span class="stage-status">⚙️</span>
                </div>
                <h3 class="stage-title">Source Checkout</h3>
                <p class="stage-description">Fetching latest code from Git repository with automated webhook triggers</p>
              </div>

              <div class="pipeline-stage">
                <div class="stage-header">
                  <span class="stage-number">STAGE 2</span>
                  <span class="stage-status">📦</span>
                </div>
                <h3 class="stage-title">Build Process</h3>
                <p class="stage-description">Installing dependencies and compiling application assets with npm</p>
              </div>

              <div class="pipeline-stage">
                <div class="stage-header">
                  <span class="stage-number">STAGE 3</span>
                  <span class="stage-status">🧪</span>
                </div>
                <h3 class="stage-title">Testing Suite</h3>
                <p class="stage-description">Running automated unit tests and integration tests for quality assurance</p>
              </div>

              <div class="pipeline-stage">
                <div class="stage-header">
                  <span class="stage-number">STAGE 4</span>
                  <span class="stage-status">🚀</span>
                </div>
                <h3 class="stage-title">Deployment</h3>
                <p class="stage-description">Zero-downtime deployment using PM2 process manager to production</p>
              </div>

              <div class="pipeline-stage">
                <div class="stage-header">
                  <span class="stage-number">STAGE 5</span>
                  <span class="stage-status">📊</span>
                </div>
                <h3 class="stage-title">Health Check</h3>
                <p class="stage-description">Monitoring application health and performance metrics in real-time</p>
              </div>

              <div class="pipeline-stage">
                <div class="stage-header">
                  <span class="stage-number">STAGE 6</span>
                  <span class="stage-status">✅</span>
                </div>
                <h3 class="stage-title">Notification</h3>
                <p class="stage-description">Sending deployment status notifications to development team channels</p>
              </div>
            </div>

            <div class="tech-stack">
              <h2 class="tech-title">⚡ TECHNOLOGY STACK ⚡</h2>
              <div class="tech-items">
                <div class="tech-item">🟢 Node.js v18</div>
                <div class="tech-item">⚙️ Jenkins CI/CD</div>
                <div class="tech-item">📦 PM2 Manager</div>
                <div class="tech-item">🐙 Git Webhooks</div>
                <div class="tech-item">🐧 Linux Server</div>
                <div class="tech-item">🔒 SSL/TLS</div>
              </div>
            </div>

            <div class="command-output">
              <div class="command-line"><span class="command-prompt">$</span> jenkins build --pipeline=nodejs-app</div>
              <div class="command-line command-info">Connecting to Jenkins server...</div>
              <div class="command-line command-success">✓ Build triggered successfully</div>
              <div class="command-line command-info">Running pipeline stages...</div>
              <div class="command-line command-success">✓ Source checkout completed</div>
              <div class="command-line command-success">✓ Dependencies installed</div>
              <div class="command-line command-success">✓ Tests passed (${Math.floor(Math.random() * 50) + 150} tests)</div>
              <div class="command-line command-success">✓ Application deployed with PM2</div>
              <div class="command-line command-success">✓ Health checks passed</div>
              <div class="command-line"><span class="command-prompt">$</span> pm2 status</div>
              <div class="command-line command-success">nodejs-app │ online │ ${Math.floor(Math.random() * 5) + 1} │ ${(Math.random() * 200 + 50).toFixed(1)}MB │ uptime: 99.8%</div>
              <div class="command-line command-info">Server running at http://localhost:${PORT}</div>
              <div class="command-line command-success">🚀 Deployment completed successfully! <span class="cursor">_</span></div>
            </div>
          </div>
        </div>
      </div>

      <script>
        // Matrix background effect
        const canvas = document.getElementById('matrix');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
          ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = '#00ff41';
          ctx.font = fontSize + 'px monospace';

          for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        }

        setInterval(drawMatrix, 50);

        window.addEventListener('resize', () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        });
      </script>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`🚀 Jenkins Pipeline Dashboard loaded successfully!`);
});
