const HomeComponent = {
  render: () => {
    let url = window.location.hash.split('?')[1];

    if (url !== undefined) {
      let decrypted = CryptoJS.AES.decrypt(url, prompt("Passphrase"));
      
      setTimeout(function() {
        window.location.href = decrypted.toString(CryptoJS.enc.Utf8);
      }, 3000);

      return `
        <h1>Redirecting to ${decrypted.toString(CryptoJS.enc.Utf8)}</h1>
      `
    }

    let encrypted = CryptoJS.AES.encrypt(prompt("URL"), prompt("Passphrase"));

    return `
      <code>${window.location}#/?${encrypted}</code>
    `;
  }
} 

const ErrorComponent = {
  render: () => {
    return `
      <section>
        <h1>Page Not Found</h1>
      </section>
    `;
  }
}

const routes = [
  { path: '/', component: HomeComponent, },
];

const parseLocation = () => location.hash.slice(1).toLowerCase().split('?')[0] || '/';

const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
  // Find the component based on the current path
  const path = parseLocation();
  // If there's no matching route, get the "Error" component
  const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
  // Render the component in the "app" placeholder
  document.getElementById('app').innerHTML = component.render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
