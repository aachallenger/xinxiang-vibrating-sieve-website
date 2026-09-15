const SITE_EMAIL = 'info@xinxiangvibratingsieve.com'

document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach((item) => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)) })
  let count = 0
  document.querySelectorAll('.product-card').forEach((card) => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++ })
  const status = document.querySelector('#product-status'); if (status) status.textContent = `${count} equipment options shown.`
}))

const menu = document.querySelector('.menu-toggle')
const nav = document.querySelector('#navigation')
const megaItems = [...document.querySelectorAll('.nav-item.has-mega')]
function closeMegaMenus(except) { megaItems.forEach((item) => { if (item !== except) { item.classList.remove('mega-open'); item.querySelector('.mega-toggle')?.setAttribute('aria-expanded', 'false') } }) }
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav?.classList.toggle('open', open); if (!open) closeMegaMenus() })
megaItems.forEach((item) => item.querySelector('.mega-toggle')?.addEventListener('click', (event) => { event.stopPropagation(); const open = !item.classList.contains('mega-open'); closeMegaMenus(item); item.classList.toggle('mega-open', open); event.currentTarget.setAttribute('aria-expanded', String(open)) }))
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menu?.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); closeMegaMenus() }))
document.addEventListener('click', (event) => { if (!event.target.closest('.has-mega')) closeMegaMenus() })
document.addEventListener('keydown', (event) => { if (event.key !== 'Escape') return; closeMegaMenus(); if (nav?.classList.contains('open')) { nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); menu?.focus() } })

document.querySelectorAll('[data-email]').forEach((link) => { link.href = `mailto:${SITE_EMAIL}`; link.textContent = SITE_EMAIL })
const year = document.querySelector('#year'); if (year) year.textContent = new Date().getFullYear()

let lastEnquiry = ''
document.querySelector('#inquiry-form')?.addEventListener('submit', (event) => {
  event.preventDefault(); const data = new FormData(event.currentTarget)
  lastEnquiry = `Hello Xinxiang Vibrating Sieve,\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\nEquipment: ${data.get('equipment')}\n\nRequirements:\n${data.get('requirements')}`
  const url = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(`Equipment enquiry — ${data.get('equipment')}`)}&body=${encodeURIComponent(lastEnquiry)}`
  document.querySelector('#form-status').textContent = 'Your enquiry is prepared, not sent. Send it from your email application. If it does not open, copy the text and email us directly.'
  document.querySelector('#copy-inquiry').hidden = false; window.location.href = url
})
document.querySelector('#copy-inquiry')?.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lastEnquiry); document.querySelector('#form-status').textContent = `Enquiry copied. Paste it into an email and send it to ${SITE_EMAIL}.` }
  catch { document.querySelector('#form-status').textContent = 'Copy is unavailable in this browser. Please select and copy the enquiry below.'; let area = document.querySelector('#copy-fallback'); if (!area) { area = document.createElement('textarea'); area.id = 'copy-fallback'; area.readOnly = true; area.setAttribute('aria-label', 'Prepared enquiry text'); document.querySelector('#inquiry-form').append(area) } area.value = lastEnquiry; area.focus(); area.select() }
})

const params = new URLSearchParams(location.search)
const equipmentField = document.querySelector('#equipment')
if (equipmentField && params.has('equipment')) { const value = params.get('equipment'); if ([...equipmentField.options].some((option) => option.value === value)) equipmentField.value = value }
const requirements = document.querySelector('#requirements')
if (requirements && params.has('subject')) requirements.value = `Project: ${params.get('subject').slice(0, 300)}\nMaterial: \nTarget capacity: \nRequired particle size: `
