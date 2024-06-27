//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function() {
	
  const saveButton = document.querySelector('input[type="submit"]');
  saveButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

  
    const fontSize = document.getElementById('fontsize').value + 'px';
    const fontColor = document.getElementById('fontcolor').value;

    console.log(document.cookie);
    setCookie('fontSize', fontSize, 30); // Expires in 30 days
    setCookie('fontColor', fontColor, 30); 

    
    applyPreferences();
  });

  
  function applyPreferences() {
    const savedFontSize = getCookie('fontSize');
    const savedFontColor = getCookie('fontColor');

    if (savedFontSize) {
      document.documentElement.style.setProperty('--fontsize', savedFontSize);
      document.getElementById('fontsize').value = savedFontSize.replace('px', '');
    }

    if (savedFontColor) {
      document.documentElement.style.setProperty('--fontcolor', savedFontColor);
      document.getElementById('fontcolor').value = savedFontColor;
    }
  }

  // Function to set cookie
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
  }

  
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return match[2];
    }
    return null;
  }

  
  const fontSizeInput = document.getElementById('fontsize');
  const fontColorInput = document.getElementById('fontcolor');

  fontSizeInput.addEventListener('input', function() {
    document.documentElement.style.setProperty('--fontsize', this.value + 'px');
  });

  fontColorInput.addEventListener('input', function() {
    document.documentElement.style.setProperty('--fontcolor', this.value);
  });

  
  applyPreferences();
});

