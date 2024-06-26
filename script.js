//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function() {
  // Step 1: Add event listener to the 'Save' button
  const saveButton = document.querySelector('input[type="submit"]');
  saveButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get values from form inputs
    const fontSize = document.getElementById('fontsize').value + 'px';
    const fontColor = document.getElementById('fontcolor').value;

    // Save preferences in cookies
    setCookie('fontSize', fontSize, 30); // Expires in 30 days
    setCookie('fontColor', fontColor, 30); // Expires in 30 days

    // Apply preferences immediately
    applyPreferences();
  });

  // Step 3: Apply saved preferences on page load
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
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  // Function to get cookie value by name
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return match[2];
    }
    return null;
  }

  // Step 4: Update CSS custom properties on input change
  const fontSizeInput = document.getElementById('fontsize');
  const fontColorInput = document.getElementById('fontcolor');

  fontSizeInput.addEventListener('input', function() {
    document.documentElement.style.setProperty('--fontsize', this.value + 'px');
  });

  fontColorInput.addEventListener('input', function() {
    document.documentElement.style.setProperty('--fontcolor', this.value);
  });

  // Step 2: Check and apply preferences on initial page load
  applyPreferences();
});

