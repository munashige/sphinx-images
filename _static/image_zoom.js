document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    let currentModal = null;
    let escHandler = null;
    let currentScale = 1;
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let translate = { x: 0, y: 0 };
    let prevTranslate = { x: 0, y: 0 };

    function closeModal() {
        if (currentModal) {
            document.body.removeChild(currentModal);
            currentModal = null;
            document.removeEventListener('keydown', escHandler);
            currentScale = 1;
            translate = { x: 0, y: 0 };
            prevTranslate = { x: 0, y: 0 };
        }
    }

    function applyTransform(imgElement) {
        imgElement.style.transform = `scale(${currentScale}) translate(${translate.x}px, ${translate.y}px)`;
    }

    images.forEach(img => {
        img.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '10000';
            modal.style.cursor = 'zoom-out';
            modal.style.overflow = 'hidden';
            
            const zoomedImg = new Image();
            zoomedImg.src = this.src;
            zoomedImg.style.maxHeight = '90vh';
            zoomedImg.style.maxWidth = '90vw';
            zoomedImg.style.objectFit = 'contain';
            zoomedImg.style.transformOrigin = 'center center';
            zoomedImg.style.transition = 'transform 0.2s ease';
            zoomedImg.style.cursor = 'zoom-in';
            zoomedImg.style.userSelect = 'none';
            
            modal.appendChild(zoomedImg);
            document.body.appendChild(modal);
            currentModal = modal;
            currentScale = 1;
            translate = { x: 0, y: 0 };
            prevTranslate = { x: 0, y: 0 };
            
            // Handle modal background click (close)
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Handle image click (zoom in/out)
            zoomedImg.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (currentScale === 1) {
                    // Zoom in
                    currentScale = 2;
                    translate = { x: 0, y: 0 };
                    prevTranslate = { x: 0, y: 0 };
                    zoomedImg.style.cursor = 'grab';
                } else {
                    // Zoom out
                    currentScale = 1;
                    translate = { x: 0, y: 0 };
                    prevTranslate = { x: 0, y: 0 };
                    zoomedImg.style.cursor = 'zoom-in';
                }
                applyTransform(zoomedImg);
            });
            
            // Drag to pan when zoomed in
            zoomedImg.addEventListener('mousedown', function(e) {
                if (currentScale > 1) {
                    isDragging = true;
                    startPos = { x: e.clientX - translate.x, y: e.clientY - translate.y };
                    zoomedImg.style.cursor = 'grabbing';
                    zoomedImg.style.transition = 'none';
                }
            });
            
            window.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                
                translate.x = e.clientX - startPos.x;
                translate.y = e.clientY - startPos.y;
                applyTransform(zoomedImg);
            });
            
            window.addEventListener('mouseup', function() {
                if (isDragging) {
                    isDragging = false;
                    prevTranslate = { ...translate };
                    zoomedImg.style.cursor = 'grab';
                    zoomedImg.style.transition = 'transform 0.2s ease';
                }
            });
            
            // Reset position on double click
            zoomedImg.addEventListener('dblclick', function() {
                if (currentScale > 1) {
                    translate = { x: 0, y: 0 };
                    prevTranslate = { x: 0, y: 0 };
                    applyTransform(zoomedImg);
                }
            });
            
            escHandler = function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            };
            document.addEventListener('keydown', escHandler);
        });
        
        if (img.parentElement.tagName === 'A' && 
            img.parentElement.children.length === 1) {
            img.parentElement.replaceWith(img);
        }
    });
});