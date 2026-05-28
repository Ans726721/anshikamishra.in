/* ==========================================================================
   ANSHIKA MISHRA PORTFOLIO INTERACTIVE LOGIC & SIMULATOR ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Set copyright year dynamically
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     1. Navigation & Floating Header
     ========================================================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Change header styling on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Highlight navigation menu item based on current viewport scroll
    const scrollY = window.scrollY;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
      
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-link'));
          navLink.classList.add('active-link');
        }
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
      }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }
      });
    });
  }

  /* ==========================================================================
     2. Skills Matrix Category Filter
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active state from all buttons and apply to target
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     3. Self-Checkout & Custom Runtime Simulator Engine
     ========================================================================== */
  
  // Element selections
  const cpuVal = document.getElementById('cpu-value');
  const cpuBar = document.getElementById('cpu-bar');
  const memVal = document.getElementById('mem-value');
  const memBar = document.getElementById('mem-bar');
  const latencyVal = document.getElementById('latency-value');
  const latencyBar = document.getElementById('latency-bar');
  
  const statusFailureRate = document.getElementById('stat-failure-rate');
  const statusMttd = document.getElementById('stat-mttd');
  const statusDeploys = document.getElementById('stat-active-deploys');
  const statusSecurity = document.getElementById('stat-security');
  const systemStatusBadge = document.getElementById('system-status-badge');
  
  const simLogger = document.getElementById('sim-logger-body');
  const btnClearLog = document.getElementById('btn-clear-logger');
  
  const btnRollout = document.getElementById('btn-sim-rollout');
  const btnCrash = document.getElementById('btn-sim-crash');
  const btnTest = document.getElementById('btn-sim-test');
  const btnSecure = document.getElementById('btn-sim-secure');

  let simulatorLocked = false;

  // Append logs to terminal helper
  function addLog(message, type = 'info') {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const logLine = document.createElement('div');
    logLine.className = 'log-line';
    
    let label = '';
    if (type === 'success') {
      label = `<span class="text-green">[SUCCESS]</span> `;
    } else if (type === 'error' || type === 'critical') {
      label = `<span class="text-orange">[CRITICAL]</span> `;
    } else if (type === 'system') {
      label = `<span class="text-purple">[SYSTEM]</span> `;
    } else if (type === 'test') {
      label = `<span class="text-cyan">[TEST]</span> `;
    } else {
      label = `<span class="text-dim">[INFO]</span> `;
    }

    logLine.innerHTML = `<span class="text-dim">${time}</span> ${label}${message}`;
    simLogger.appendChild(logLine);
    
    // Auto-scroll to bottom of logs
    simLogger.scrollTop = simLogger.scrollHeight;

    // Limit maximum lines in terminal to prevent bloating
    while (simLogger.children.length > 50) {
      simLogger.removeChild(simLogger.firstChild);
    }
  }

  // Clear Logger Button
  if (btnClearLog && simLogger) {
    btnClearLog.addEventListener('click', () => {
      simLogger.innerHTML = '';
      addLog('Process terminal cleared.', 'info');
    });
  }

  // Set telemetry bars dynamically
  function updateTelemetry(cpu, memory, latency) {
    if (cpuVal && cpuBar) {
      cpuVal.textContent = `${cpu}%`;
      cpuBar.style.width = `${cpu}%`;
    }
    if (memVal && memBar) {
      memVal.textContent = `${memory.toFixed(1)} GB`;
      const memPercentage = (memory / 4.0) * 100; // Assuming 4GB max for visual scaling
      memBar.style.width = `${memPercentage}%`;
    }
    if (latencyVal && latencyBar) {
      latencyVal.textContent = `${latency} ms`;
      const latencyPercentage = Math.min((latency / 200) * 100, 100); // Visual scaling
      latencyBar.style.width = `${latencyPercentage}%`;
    }
  }

  // Organic Ambient Telemetry Fluctuations
  setInterval(() => {
    // Only fluctuate if not locked by an active manual operation
    if (!simulatorLocked) {
      const baseCpu = 25 + Math.floor(Math.random() * 8);
      const baseMem = 1.3 + (Math.random() * 0.2);
      const baseLatency = 38 + Math.floor(Math.random() * 10);
      updateTelemetry(baseCpu, baseMem, baseLatency);
    }
  }, 3500);

  // 1. ROLLOUT UPDATE COMMAND
  if (btnRollout) {
    btnRollout.addEventListener('click', () => {
      if (simulatorLocked) return;
      simulatorLocked = true;
      btnRollout.classList.add('active');
      
      addLog('Initializing system bundle OTA deployment sequence...', 'info');
      addLog('Establishing handshake with 1,824 active retail stores...', 'system');
      
      // Animate progress
      setTimeout(() => {
        updateTelemetry(48, 1.8, 85);
        addLog('Verifying artifact provenance hashes via secure pipelines...', 'system');
        statusDeploys.textContent = 'Updating...';
        statusDeploys.classList.add('text-cyan');
      }, 1000);

      setTimeout(() => {
        updateTelemetry(65, 2.1, 110);
        addLog('Artifact Provenance validated successfully. Lock verified: { prod_rollout_v42: true }', 'success');
        addLog('Triggering progressive rollout to 100,800 devices under feature flag check...', 'info');
      }, 2200);

      setTimeout(() => {
        updateTelemetry(85, 2.4, 142);
        addLog('OTA Deployment Status: 10% -> 45% -> 80%...', 'system');
      }, 3500);

      setTimeout(() => {
        updateTelemetry(32, 1.4, 45);
        statusDeploys.textContent = '1,824 Stores';
        statusDeploys.classList.remove('text-cyan');
        statusFailureRate.textContent = '2.1%';
        statusFailureRate.classList.add('text-green');
        
        addLog('OTA Deployment completed across all 100,800 active devices.', 'success');
        addLog('Change Failure Rate locked at 2.1%. Rollback metrics: 0 regressions.', 'success');
        
        btnRollout.classList.remove('active');
        simulatorLocked = false;
      }, 4800);
    });
  }

  // 2. CRASH SIMULATION & ALERT COMMAND
  if (btnCrash) {
    btnCrash.addEventListener('click', () => {
      if (simulatorLocked) return;
      simulatorLocked = true;
      btnCrash.classList.add('active');

      addLog('Artificially injecting memory overflow & segfault signals...', 'critical');
      
      // Update badge to offline/alerting state
      if (systemStatusBadge) {
        systemStatusBadge.style.backgroundColor = 'rgba(255, 90, 54, 0.1)';
        systemStatusBadge.style.borderColor = 'rgba(255, 90, 54, 0.3)';
        systemStatusBadge.querySelector('.status-text').textContent = 'SCO RUNTIME: FAULT';
        systemStatusBadge.querySelector('.status-dot').style.backgroundColor = 'var(--accent-orange)';
        systemStatusBadge.querySelector('.status-dot').style.boxShadow = '0 0 10px var(--accent-orange)';
      }

      // Metric spikes
      setTimeout(() => {
        updateTelemetry(99, 3.8, 480);
        addLog('SIGSEGV: Electron Core UI shell encountered unhandled Out-Of-Memory exception.', 'critical');
        addLog('Grafana Alert triggered: CPU 99% / OOM threshold breached.', 'critical');
        statusMttd.textContent = 'Alerting!';
        statusMttd.classList.add('text-orange');
      }, 1000);

      setTimeout(() => {
        addLog('Telemetry pipelines forwarding diagnostics dump to Elasticsearch index [log-sco-diagnostics-*].', 'system');
        addLog('Initiating custom platform recovery lifecycle (Electron v28 shell reboot)...', 'system');
      }, 2500);

      setTimeout(() => {
        addLog('Purging legacy contextual states and restoring clean guarded state transitions...', 'system');
        updateTelemetry(42, 1.9, 120);
      }, 3800);

      setTimeout(() => {
        updateTelemetry(26, 1.4, 40);
        statusMttd.textContent = '14.8m';
        statusMttd.classList.remove('text-orange');
        
        // Restore badge to active state
        if (systemStatusBadge) {
          systemStatusBadge.style.backgroundColor = '';
          systemStatusBadge.style.borderColor = '';
          systemStatusBadge.querySelector('.status-text').textContent = 'SCO RUNTIME: ACTIVE';
          systemStatusBadge.querySelector('.status-dot').style.backgroundColor = '';
          systemStatusBadge.querySelector('.status-dot').style.boxShadow = '';
        }

        addLog('Pristine session state recovered. Devices successfully re-initialized.', 'success');
        addLog('System MTTR: 180ms! Observability dashboard reported fully healthy.', 'success');
        
        btnCrash.classList.remove('active');
        simulatorLocked = false;
      }, 5000);
    });
  }

  // 3. RUN WEBDRIVER / CYPRESS SUITE COMMAND
  if (btnTest) {
    btnTest.addEventListener('click', () => {
      if (simulatorLocked) return;
      simulatorLocked = true;
      btnTest.classList.add('active');

      addLog('Starting automated test orchestrator [Jest / Cypress / WebDriver I/O]...', 'info');
      addLog('Scanning platform source codebase...', 'info');

      setTimeout(() => {
        updateTelemetry(45, 1.6, 68);
        addLog('PASS - src/runtime/electron/security.test.ts (820ms)', 'test');
      }, 1000);

      setTimeout(() => {
        updateTelemetry(52, 1.7, 72);
        addLog('PASS - src/platform/navigation/stateMachine.test.ts (410ms)', 'test');
        addLog('PASS - src/ui/components/transactionScreen.test.tsx (310ms)', 'test');
      }, 2000);

      setTimeout(() => {
        updateTelemetry(48, 1.8, 60);
        addLog('PASS - src/redux/sagas/deviceSyncSaga.test.ts (650ms)', 'test');
      }, 3000);

      setTimeout(() => {
        updateTelemetry(25, 1.3, 38);
        addLog('All automated suites executed successfully. 0 failures, 14 passed.', 'success');
        addLog('70% automated test coverage verified via Cypress/Nx pipelines!', 'success');
        
        btnTest.classList.remove('active');
        simulatorLocked = false;
      }, 4000);
    });
  }

  // 4. ROTATE OIDC SECURITY CREDENTIALS COMMAND
  if (btnSecure) {
    btnSecure.addEventListener('click', () => {
      if (simulatorLocked) return;
      simulatorLocked = true;
      btnSecure.classList.add('active');

      addLog('Initiating secure token rotation for active POS devices...', 'info');
      
      setTimeout(() => {
        updateTelemetry(38, 1.5, 62);
        addLog('Revoking current associate session key via ForgeRock auth servers...', 'system');
        statusSecurity.textContent = 'Rotating...';
      }, 1000);

      setTimeout(() => {
        updateTelemetry(42, 1.6, 75);
        addLog('Requesting authorization challenge from Keycloak OIDC endpoint...', 'system');
        addLog('Exchanging active claims. Handshake status: 200 OK (latency: 45ms)', 'success');
      }, 2200);

      setTimeout(() => {
        updateTelemetry(28, 1.4, 42);
        statusSecurity.textContent = 'OAuth Secure';
        addLog('Session claims updated. Cryptographic keys rotated successfully.', 'success');
        addLog('User activity trackers refreshed. POS RBAC policies verified.', 'success');
        
        btnSecure.classList.remove('active');
        simulatorLocked = false;
      }, 3400);
    });
  }

  /* ==========================================================================
     4. Interactive Contact Form Handler
     ========================================================================== */
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback-message');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Extract form values
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      // Loading state on button
      const submitBtn = document.getElementById('btn-submit-form');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<i data-lucide="loader" class="btn-icon spinning"></i> Sending...`;
      lucide.createIcons();
      submitBtn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Display Success State
        formFeedback.style.color = 'var(--accent-green)';
        formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
        
        // Reset submit button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        lucide.createIcons();

        // Clear feedback after 5 seconds
        setTimeout(() => {
          formFeedback.textContent = '';
        }, 5000);
      }, 1500);
    });
  }
});
