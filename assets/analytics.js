// Google Analytics 4 (gtag.js) — chargé sur toutes les pages du site.
// L'identifiant est défini dans build_pages.py (constante GA_ID ou option --ga).
(function(){
  var GA_ID = "G-4Q6MX1M0NQ";
  if(!GA_ID || GA_ID.indexOf("XXXX") !== -1){ return; }  // non configuré : on ne charge rien
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID);
})();
