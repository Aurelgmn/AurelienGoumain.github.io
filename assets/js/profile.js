// Changement de photo de profil au clic
const profileImage = document.getElementById('profileImage');

if (profileImage) {
  // Charger la photo depuis localStorage si elle existe
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    profileImage.src = savedImage;
  }

  profileImage.addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          profileImage.src = event.target.result;
          localStorage.setItem('profileImage', event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });
}
