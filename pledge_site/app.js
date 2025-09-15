const form = document.getElementById('pledgeForm');
const countEl = document.getElementById('signatureCount');
const progressEl = document.getElementById('progress');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  if (!fd.get('agree')) return alert('Please agree to the pledge.');
  let count = parseInt(countEl.textContent.replace(/,/g,''),10) + 1;
  countEl.textContent = count.toLocaleString();
  progressEl.value = count;
  gtag('event','pledge_submit', { method:'web_form', ba_optin: !!fd.get('ba_optin') });
  alert('Thank you! Check your inbox for your Bridge the Divide starter kit.');
  form.reset();
});

document.getElementById('shareX').addEventListener('click', () => {
  const txt = encodeURIComponent("I signed the #UnityPledge to #EndTheCycle. Join me →");
  const url = encodeURIComponent(location.href);
  window.open(`https://twitter.com/intent/tweet?text=${txt}&url=${url}&hashtags=KirkUnityMoment`);
  gtag('event','share_click',{ network:'x' });
});

document.getElementById('copyLink').addEventListener('click', async () => {
  await navigator.clipboard.writeText(location.href);
  alert('Link copied. Invite a friend across the aisle.');
  gtag('event','share_click',{ network:'copy_link' });
});
