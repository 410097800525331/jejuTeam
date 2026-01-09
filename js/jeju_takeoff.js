document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the page that needs these features
    // In a real SPA we might check routes, here we just run if the script is loaded
    const takeoffEngine = new JejuTakeoffEngine();
    takeoffEngine.init();
});

class JejuTakeoffEngine {
    constructor() {
        this.overlay = null;
        this.isAnimating = false;
        this.config = {
            transitionId: 'piong_piong_effect',
            duration: 2800,
            cloudCount: 12
        };
    }

    init() {
        this.createOverlay();
        this.interceptClicks();
    }

    createOverlay() {
        // Create the overlay container
        this.overlay = document.createElement('div');
        this.overlay.className = 'jeju-takeoff-overlay';
        
        // Create Runway
        const runway = document.createElement('div');
        runway.className = 'jeju-runway';
        this.overlay.appendChild(runway);

        // Create Plane Icon Container
        const planeContainer = document.createElement('div');
        planeContainer.className = 'jeju-plane-container';
        
        // Lucide Plane Icon SVG
        planeContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="jeju-plane-icon">
                <path d="M2 22h20"/>
                <path d="M12 2a5 5 0 0 0-5 5v5a.5.5 0 0 1-.5.5 2 2 0 0 0-2 2v2 a.5.5 0 0 1-.5.5c-4 0-4 3 0 3h7"/>
                <path d="M12 2a5 5 0 0 1 5 5v5a.5.5 0 0 0 .5.5 2 2 0 0 1 2 2v2 a.5.5 0 0 0 .5.5c4 0 4 3 0 3h-7"/>
            </svg>
        `;
        this.planeContainer = planeContainer; // Store reference for animation
        this.overlay.appendChild(planeContainer);

        document.body.appendChild(this.overlay);
    }

    interceptClicks() {
        // Intercept all <a> tags containing 'hotel'
        document.addEventListener('click', (e) => {
            const link = e.target.closest("a[href*='hotel']");
            if (link && !this.isAnimating) {
                const href = link.getAttribute('href');
                
                // Only intercept if it's not an internal anchor or empty link
                if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('//')) {
                   // Double-check if it's pointing to jejuhotel.html functionality (basic check)
                   // The prompt specified "hotel.html -> jejuhotel.html" transition logic.
                   // We'll intercept any relative link containing 'hotel' for the demo.
                   e.preventDefault();
                   this.startSequence(href);
                }
            }
        });
    }

    startSequence(targetUrl) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // Prevent interaction
        this.overlay.classList.add('active');

        // Spawn Clouds
        this.spawnClouds();

        // Animate Plane Takeoff after a slight delay
        setTimeout(() => {
             this.planeContainer.classList.add('jeju-plane-takeoff');
        }, 500);

        // Redirect
        setTimeout(() => {
            window.location.href = targetUrl;
        }, this.config.duration);
    }

    spawnClouds() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < this.config.cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'jeju-cloud';
            
            // Randomize styling
            const size = 60 + Math.random() * 80; // 60px - 140px
            const left = 10 + Math.random() * 80; // 10% - 90%
            const duration = 1.5 + Math.random() * 1.0; // 1.5s - 2.5s
            const delay = Math.random() * 0.5; // Stagger start

            cloud.style.width = `${size}px`;
            cloud.style.height = `${size * 0.6}px`; // flatten slightly
            cloud.style.left = `${left}%`;
            
            // Apply animation
            // utilizing CSS variable for bezier if supported, else fallback in keyframes
            cloud.style.animation = `cloudPiong ${duration}s var(--ease-piong, cubic-bezier(0.34, 1.56, 0.64, 1)) ${delay}s infinite`;

            fragment.appendChild(cloud);
        }

        this.overlay.appendChild(fragment);
    }
}
