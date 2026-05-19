(function() {
  const drawer = document.getElementById('zy-cart-drawer');
  if (!drawer) return;

  const backdrop = drawer.querySelector('.zy-cart-drawer-backdrop');
  const closeBtn = drawer.querySelector('.zy-cart-drawer-close');

  function openDrawer() {
    drawer.classList.add('zy-cart-drawer--open');
  }

  function closeDrawer() {
    drawer.classList.remove('zy-cart-drawer--open');
  }

  document.addEventListener('click', function(e) {
    const link = e.target.closest('.zy-cart-link');
    if (link) {
      e.preventDefault();
      openDrawer();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }
})();
