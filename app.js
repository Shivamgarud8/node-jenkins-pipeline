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
      <title>Jenkins Pipeline Deployment</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
          color: #e0e0e0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .container {
          max-width: 900px;
          width: 90%;
          padding: 40px;
          background: rgba(20, 25, 45, 0.9);
          border-radius: 15px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(72, 121, 255, 0.3);
          position: relative;
          z-index: 10;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .jenkins-logo {
          font-size: 60px;
          margin-bottom: 10px;
          animation: float 3s ease-in-out infinite;
        }

        h1 {
          color: #4879ff;
          font-size: 2.5em;
          margin-bottom: 10px;
          text-shadow: 0 0 20px rgba(72, 121, 255, 0.5);
          animation: glow 2s ease-in-out infinite alternate;
        }

        .subtitle {
          color: #8ab4f8;
          font-size: 1.2em;
          margin-bottom: 30px;
        }

        .status-card {
          background: linear-gradient(135deg, #1e2a4a 0%, #2a3555 100%);
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 20px;
          border-left: 4px solid #4879ff;
          animation: slideIn 0.5s ease-out;
        }

        .status-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .status-icon {
          font-size: 24px;
          margin-right: 15px;
        }

        .status-title {
          font-size: 1.3em;
          color: #4879ff;
          font-weight: 600;
        }

        .feature-list {
          list-style: none;
          margin-top: 15px;
        }

        .feature-item {
          padding: 12px 0;
          border-bottom: 1px solid rgba(72, 121, 255, 0.1);
          display: flex;
          align-items: center;
          animation: fadeIn 0.5s ease-out backwards;
        }

        .feature-item:last-child {
          border-bottom: none;
        }

        .feature-item:nth-child(1) { animation-delay: 0.1s; }
        .feature-item:nth-child(2) { animation-delay: 0.2s; }
        .feature-item:nth-child(3) { animation-delay: 0.3s; }
        .feature-item:nth-child(4) { animation-delay: 0.4s; }
        .feature-item:nth-child(5) { animation-delay: 0.5s; }

        .feature-icon {
          margin-right: 12px;
          font-size: 18px;
        }

        .success-badge {
          display: inline-block;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 600;
          margin-top: 20px;
          animation: pulse 2s ease-in-out infinite;
        }

        .tech-stack {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .tech-item {
          background: rgba(72, 121, 255, 0.1);
          padding: 15px 25px;
          border-radius: 8px;
          margin: 10px;
          border: 1px solid rgba(72, 121, 255, 0.3);
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          background: rgba(72, 121, 255, 0.2);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(72, 121, 255, 0.3);
        }

        .pipeline-bar {
          background: #1e2a4a;
          height: 8px;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 20px;
        }

        .pipeline-progress {
          height: 100%;
          background: linear-gradient(90deg, #4879ff 0%, #10b981 100%);
          animation: progress 3s ease-in-out infinite;
        }

        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #4879ff;
          border-radius: 50%;
          animation: particle-float 15s infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes glow {
          from { text-shadow: 0 0 20px rgba(72, 121, 255, 0.5); }
          to { text-shadow: 0 0 30px rgba(72, 121, 255, 0.8), 0 0 40px rgba(72, 121, 255, 0.6); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes progress {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }

        @keyframes particle-float {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          h1 { font-size: 2em; }
          .subtitle { font-size: 1em; }
          .tech-stack { flex-direction: column; }
        }
      </style>
    </head>
    <body>
      <div class="particles" id="particles"></div>
      
      <div class="container">
        <div class="header">
          <div class="jenkins-logo">⚙️</div>
          <h1>Jenkins Pipeline Deployment</h1>
          <p class="subtitle">Node.js Application • Automated CI/CD</p>
        </div>

        <div class="status-card">
          <div class="status-header">
            <span class="status-icon">✅</span>
            <span class="status-title">Deployment Status</span>
          </div>
          <p>Application successfully deployed via Jenkins automated pipeline with PM2 process manager</p>
          <div class="pipeline-bar">
            <div class="pipeline-progress"></div>
          </div>
          <span class="success-badge">🚀 Build #${Math.floor(Math.random() * 100) + 1} - SUCCESS</span>
        </div>

        <div class="status-card">
          <div class="status-header">
            <span class="status-icon">🔧</span>
            <span class="status-title">Automation Features</span>
          </div>
          <ul class="feature-list">
            <li class="feature-item">
              <span class="feature-icon">📦</span>
              <span>Automated build and deployment pipeline</span>
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔄</span>
              <span>Continuous integration with Git webhooks</span>
            </li>
            <li class="feature-item">
              <span class="feature-icon">⚡</span>
              <span>PM2 process management with zero downtime</span>
            </li>
            <li class="feature-item">
              <span class="feature-icon">📊</span>
              <span>Real-time monitoring and health checks</span>
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔒</span>
              <span>Secure environment variable injection</span>
            </li>
          </ul>
        </div>

        <div class="tech-stack">
          <div class="tech-item">🟢 Node.js</div>
          <div class="tech-item">⚙️ Jenkins</div>
          <div class="tech-item">📦 PM2</div>
          <div class="tech-item">🔧 CI/CD</div>
        </div>
      </div>

      <script>
        // Generate particles
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 15 + 's';
          particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
          particlesContainer.appendChild(particle);
        }
      </script>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
