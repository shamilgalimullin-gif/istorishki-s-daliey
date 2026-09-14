const filters = [...document.querySelectorAll('[data-filter]')];
const rows = [...document.querySelectorAll('[data-season]')];
const eraButtons = [...document.querySelectorAll('[data-season-button]')];
const playerSection = document.querySelector('#player');
const playerFrame = document.querySelector('#yandex-player');
const playerTitle = document.querySelector('#player-title');

function applyFilter(season) {
  filters.forEach((button) => {
    const selected = button.dataset.filter === season;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  rows.forEach((row) => {
    row.hidden = season !== 'all' && row.dataset.season !== season;
  });
}

filters.forEach((button) => {
  button.addEventListener('click', () => applyFilter(button.dataset.filter));
});

eraButtons.forEach((button) => {
  button.addEventListener('click', () => {
    applyFilter(button.dataset.seasonButton);
    document.querySelector('#episodes').scrollIntoView({ behavior: 'smooth' });
  });
});

function playOnSite(trackId, title) {
  if (!trackId || !playerFrame) return;
  playerFrame.src = `https://music.yandex.ru/iframe/#track/${trackId}/36915321`;
  if (title) playerTitle.textContent = title;
  playerSection.classList.remove('player-pulse');
  requestAnimationFrame(() => playerSection.classList.add('player-pulse'));
  playerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

document.querySelectorAll('a[href*="music.yandex.ru/album/36915321/track/"], [data-track]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const match = link.href.match(/\/track\/(\d+)/);
    const trackId = link.dataset.track || match?.[1];
    const episode = link.closest('article');
    const title = link.dataset.title || episode?.querySelector('h3')?.textContent;
    if (!trackId) return;
    event.preventDefault();
    playOnSite(trackId, title);
  });
});
