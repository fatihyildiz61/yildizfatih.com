export function initGalleryModal() {
  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const imageContainer = document.getElementById('imageContainer');
    const closeBtn = document.getElementById('closeModalBtn');

    
    const prevBtn = document.getElementById('prevImageBtn');
    const nextBtn = document.getElementById('nextImageBtn');
    const currentNumber = document.getElementById('currentImageNumber');
    const totalImages = document.getElementById('totalImages');
    
    let currentIndex = 0;
    let isFullscreen = false;
    // Sadece thumbnail container'ları al, video elementlerini ayrı sayma
    const images = Array.from(document.querySelectorAll('div[data-image-index]'));
    
    // Open modal - sadece container'lara click event ekle
    images.forEach((container, index) => {
      container.addEventListener('click', () => {
        currentIndex = index;
        openModal(index);
      });
    });
    
    // Video click events artık gerekli değil çünkü container'lara click event ekliyoruz
    
    // Debug bilgileri kaldırıldı
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    // Image click to toggle fullscreen
    modalImage.addEventListener('click', toggleFullscreen);
    

    
    // Navigation
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateModal();
      resetToNormalView();
    });
    
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateModal();
      resetToNormalView();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('hidden')) {
        if (e.key === 'Escape') {
          if (isFullscreen) {
            toggleFullscreen();
          } else {
            closeModal();
          }
        }
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      }
    });
    
    // Click outside to close (only in normal mode)
    modal.addEventListener('click', (e) => {
      if (e.target === modal && !isFullscreen) closeModal();
    });
    
    function openModal(index) {
      currentIndex = index;
      isFullscreen = false;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      updateModal();
      updateFullscreenUI();
      document.body.style.overflow = 'hidden';
      
      // Reset to normal view when opening modal
      resetToNormalView();
    }
    

    
    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      isFullscreen = false;
      document.body.style.overflow = '';
      updateFullscreenUI();
    }
    
    function toggleFullscreen() {
      isFullscreen = !isFullscreen;
      updateFullscreenUI();
      
      // Get background elements
      const modalBackground = document.getElementById('modalBackground');
      
      if (isFullscreen) {
        // Enter fullscreen - remove all constraints
        modal.classList.remove('p-4', 'items-center');
        modal.classList.add('fullscreen');
        imageContainer.classList.remove('max-w-[90vw]', 'max-h-[90vh]');
        imageContainer.classList.add('w-full', 'h-full', 'p-0', 'flex', 'justify-center', 'overflow-auto', 'items-start', 'fullscreen');
        
        // Hide background in fullscreen mode
        if (modalBackground) {
          modalBackground.style.display = 'none';
        }
        
        // Handle both image and video
        if (!modalImage.classList.contains('hidden')) {
          modalImage.classList.remove('max-w-[90vw]', 'max-h-[90vh]');
          modalImage.classList.add('w-auto', 'h-auto', 'max-w-none', 'max-h-none');
        }
        if (!modalVideo.classList.contains('hidden')) {
          modalVideo.classList.remove('max-w-[90vw]', 'max-h-[90vh]');
          modalVideo.classList.add('w-auto', 'h-auto', 'max-w-none', 'max-h-none');
        }
        
        // Hide navigation elements in fullscreen
        prevBtn.classList.add('opacity-0');
        nextBtn.classList.add('opacity-0');
        imageCounter.classList.add('opacity-0');
      } else {
        // Exit fullscreen - restore constraints
        modal.classList.add('p-4', 'items-start');
        modal.classList.remove('fullscreen');
        imageContainer.classList.remove('w-full', 'h-full', 'p-0', 'flex', 'justify-center', 'overflow-auto', 'items-start', 'fullscreen');
        imageContainer.classList.add('max-w-[90vw]', 'max-h-[90vh]');
        
        // Show background again when exiting fullscreen
        if (modalBackground) {
          modalBackground.style.display = 'block';
        }
        
        // Handle both image and video
        if (!modalImage.classList.contains('hidden')) {
          modalImage.classList.remove('w-auto', 'h-auto', 'max-w-none', 'max-h-none');
          modalImage.classList.add('max-w-[90vw]', 'max-h-[90vh]');
        }
        if (!modalVideo.classList.contains('hidden')) {
          modalVideo.classList.remove('w-auto', 'h-auto', 'max-w-none', 'max-h-none');
          modalVideo.classList.add('max-w-[90vw]', 'max-h-[90vh]');
        }
        
        // Show navigation elements
        prevBtn.classList.remove('opacity-0');
        nextBtn.classList.remove('opacity-0');
        imageCounter.classList.remove('opacity-0');
      }
    }
    
    function resetToNormalView() {
      if (isFullscreen) {
        isFullscreen = false;
        updateFullscreenUI();
        
        // Exit fullscreen - restore constraints
        modal.classList.add('p-4', 'items-start');
        modal.classList.remove('fullscreen');
        imageContainer.classList.remove('w-full', 'h-full', 'p-0', 'flex', 'justify-center', 'overflow-auto', 'items-start', 'fullscreen');
        imageContainer.classList.add('max-w-[90vw]', 'max-h-[90vh]');
        
        // Show background again when exiting fullscreen
        const modalBackground = document.getElementById('modalBackground');
        if (modalBackground) {
          modalBackground.style.display = 'block';
        }
        
        // Handle both image and video
        if (!modalImage.classList.contains('hidden')) {
          modalImage.classList.remove('w-auto', 'h-auto', 'max-w-none', 'max-h-none');
          modalImage.classList.add('max-w-[90vw]', 'max-h-[90vh]');
        }
        if (!modalVideo.classList.contains('hidden')) {
          modalVideo.classList.remove('w-auto', 'h-auto', 'max-w-none', 'max-h-none');
          modalVideo.classList.add('max-w-[90vw]', 'max-h-[90vh]');
        }
        
        // Show navigation elements
        prevBtn.classList.remove('opacity-0');
        nextBtn.classList.remove('opacity-0');
        imageCounter.classList.remove('opacity-0');
      }
    }
    
    function updateFullscreenUI() {
      // Zoom icon functionality removed
    }
    
    function updateModal() {
      const container = images[currentIndex];
      const src = container.getAttribute('data-image-src');
      const title = container.getAttribute('data-image-title');
      const isVideo = container.hasAttribute('data-is-video');
      
      console.log('Container:', container);
      console.log('Source:', src);
      console.log('Title:', title);
      console.log('Is Video:', isVideo);
      

      
      if (isVideo) {
        console.log('Video detected:', src);
        
        // Show video, hide image
        modalImage.classList.add('hidden');
        modalVideo.classList.remove('hidden');
        
        // Video background'ı set et - thumbnail'lardaki gibi
        const modalBackgroundVideo = document.getElementById('modalBackgroundVideo');
        const modalBackgroundImage = document.getElementById('modalBackgroundImage');
        
        if (modalBackgroundVideo && modalBackgroundImage) {
          modalBackgroundImage.classList.add('hidden');
          modalBackgroundVideo.classList.remove('hidden');
          modalBackgroundVideo.src = src;
          // Background video'yu da muted ve loop yap
          modalBackgroundVideo.muted = true;
          modalBackgroundVideo.loop = true;
        }
        
        // Video elementini sıfırla ve yeni source'u set et
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.src = src;
        currentNumber.textContent = currentIndex + 1;
        
        // Video'yu yükle ve metadata'yı bekle
        setTimeout(() => {
          modalVideo.load();
        }, 100);
        
        // Video yüklendikten sonra boyutları ayarla
        modalVideo.onloadedmetadata = function() {
          console.log('Video metadata loaded');
          if (!isFullscreen) {
            modalVideo.classList.remove('w-auto', 'h-auto', 'max-w-none', 'max-h-none');
            modalVideo.classList.add('max-w-[90vw]', 'max-h-[90vh]');
          } else {
            modalVideo.classList.remove('max-w-[90vw]', 'max-h-[90vh]');
            modalVideo.classList.add('w-auto', 'h-auto', 'max-w-none', 'max-h-none');
          }
        };
        
        // Video yüklendikten sonra otomatik başlat
        modalVideo.oncanplay = function() {
          console.log('Video can play, starting...');
          modalVideo.play().catch(function(error) {
            console.log('Video otomatik başlatılamadı:', error);
          });
        };
        
        // Video hata durumunda
        modalVideo.onerror = function(e) {
          console.log('Video yüklenirken hata oluştu:', e);
          console.log('Video error:', modalVideo.error);
        };
        
      } else {
        // Show image, hide video
        modalVideo.classList.add('hidden');
        modalImage.classList.remove('hidden');
        
        // Görsel background'ı set et - thumbnail'lardaki gibi
        const modalBackgroundVideo = document.getElementById('modalBackgroundVideo');
        const modalBackgroundImage = document.getElementById('modalBackgroundImage');
        
        if (modalBackgroundVideo && modalBackgroundImage) {
          modalBackgroundVideo.classList.add('hidden');
          modalBackgroundImage.classList.remove('hidden');
          modalBackgroundImage.src = src;
        }
        
        modalImage.src = src;
        modalImage.alt = title;
        currentNumber.textContent = currentIndex + 1;
        
        // Ensure image loads with correct dimensions
        modalImage.onload = function() {
          if (!isFullscreen) {
            // Reset to normal view constraints
            modalImage.classList.remove('w-auto', 'h-auto', 'max-w-none', 'max-h-none');
            modalImage.classList.add('max-w-[90vw]', 'max-h-[90vh]');
          } else {
            // In fullscreen, ensure image shows at full size
            modalImage.classList.remove('max-w-[90vw]', 'max-h-[90vh]');
            modalImage.classList.add('w-auto', 'h-auto', 'max-w-none', 'max-h-none');
          }
        };
      }
    }
  });
}
