const form = document.getElementById('quizForm');
const results = document.getElementById('results');
const scoreLine = document.getElementById('scoreLine');
const tipsDiv = document.getElementById('tips');

async function loadExamples() {
  const res = await fetch('examples.json');
  return res.json();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  let score = 0;
  for (let i=1;i<=10;i++) score += parseInt(fd.get(`q${i}`),10);

  let band, nudge;
  if (score <= 20) { band = 'Low HPI risk'; nudge = 'Keep practicing curiosity and non-violence norms.'; }
  else if (score <= 35) { band = 'Moderate HPI risk'; nudge = 'Diversify your feed and slow down before sharing.'; }
  else { band = 'High HPI risk'; nudge = 'Unfollow outrage farms; add 3 credible cross-partisan sources today.'; }

  scoreLine.textContent = `Score: ${score}/50 • ${band}. ${nudge}`;
  results.hidden = false;

  const examples = await loadExamples();
  tipsDiv.innerHTML = '';

  const dimensions = [
    { key:'affective_polarization', tip:'Save before you share. Ask: “What would a good-faith opponent say?”', ex: examples.affective },
    { key:'negative_partisanship',   tip:'Replace “they” with “some.” Avoid group blame.', ex: examples.negative },
    { key:'social_sorting',          tip:'Follow 2 researchers and 1 local journalist with opposing views.', ex: examples.sorting },
    { key:'cognitive_bias',          tip:'Adopt a 30-second read rule before reposting.', ex: examples.cognitive },
    { key:'non_violence',            tip:'Use a templated reply condemning violence—no whataboutism.', ex: examples.nonviolence }
  ];

  dimensions.forEach(d => {
    const card = document.createElement('div');
    card.className = 'counter-card';
    card.innerHTML = `
      <h3>${d.key.replace('_',' ')}</h3>
      <p>${d.tip}</p>
      <details>
        <summary>See X post patterns (anonymized)</summary>
        <ul>${d.ex.map(e=>`<li><em>Pattern:</em> ${e.pattern} — <strong>Nudge:</strong> ${e.nudge}</li>`).join('')}</ul>
      </details>
    `;
    tipsDiv.appendChild(card);
  });

  if (typeof gtag === 'function') {
    gtag('event','audit_complete',{ score, band });
  }
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'pledgeCta') {
    if (typeof gtag === 'function') gtag('event','cta_click',{ target:'pledge' });
    location.href = '../pledge_site/index.html';
  }
  if (e.target && e.target.id === 'baCta') {
    if (typeof gtag === 'function') gtag('event','cta_click',{ target:'braver_angels' });
    alert('Thanks! We\'ll email a pairing form for Braver Angels.');
  }
});
