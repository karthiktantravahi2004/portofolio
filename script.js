// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll('section, .project-card, .cell').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// Contact form submission using Web3Forms
document.getElementById('contact-form')?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = this;
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      showToast('✅ Message sent successfully!');
      form.reset();
    } else {
      showToast('❌ Something went wrong. Please try again.');
    }
  } catch (error) {
    showToast('⚠️ Failed to send. Please check your internet.');
  }
});

// Toast Notification Function
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #4a76ee;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    z-index: 9999;
    opacity: 0;
    animation: fadeInOut 3s ease forwards;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
