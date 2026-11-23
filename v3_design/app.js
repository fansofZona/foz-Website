// Progressive enhancement only: default artwork and download links work without JS.
const announcement = document.querySelector('#preview-status');
const comparison = document.querySelector('.direction-previews');
document.querySelectorAll('[data-background]').forEach(button => {
  if (button.tagName !== 'BUTTON') return;
  button.addEventListener('click', () => {
    const background = button.dataset.background;
    comparison.dataset.background = background;
    document.querySelectorAll('button[data-background]').forEach(item => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelectorAll('[data-preview-mark]').forEach(img => {
      const tone = background === 'white' ? 'navy' : 'white';
      img.src = `logos/${img.dataset.previewMark}/mark-${tone}.svg`;
    });
    announcement.textContent = `All three marks shown on ${background}.`;
  });
});

document.querySelectorAll('.asset-viewer').forEach(viewer => {
  const arrangement = viewer.querySelector('[data-form-select]');
  const ink = viewer.querySelector('[data-tone-select]');
  const stage = viewer.querySelector('.asset-stage');
  const img = viewer.querySelector('.asset-image');
  function update() {
    const form = arrangement.value;
    const tone = ink.value;
    const path = `logos/${viewer.dataset.concept}/${form}-${tone}`;
    stage.dataset.form = form;
    stage.dataset.tone = tone;
    img.src = `${path}.svg`;
    img.alt = `${viewer.dataset.concept.replaceAll('-', ' ')}: ${arrangement.selectedOptions[0].text.toLowerCase()} in ${tone}`;
    // Prevent the HTML's initial aspect ratio from constraining alternate forms.
    img.removeAttribute('width');
    img.removeAttribute('height');
    viewer.querySelector('[data-svg-download]').href = `${path}.svg`;
    viewer.querySelector('[data-png-download]').href = `${path}.png`;
    announcement.textContent = img.alt;
  }
  arrangement.addEventListener('change', update);
  ink.addEventListener('change', update);
});
