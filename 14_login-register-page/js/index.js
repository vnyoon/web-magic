const container = document.getElementById('container'),
      registerBtn = document.getElementById('register'),
      loginBtn = document.getElementById('login');

registerBtn.onclick = function() {
  container.classList.add('active');
}

loginBtn.onclick = function() {
  container.classList.remove('active');
}
