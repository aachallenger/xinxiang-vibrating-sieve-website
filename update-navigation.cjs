const fs = require('node:fs')
const path = require('node:path')

const root = __dirname
const pages = fs.readdirSync(root).filter((name) => name.endsWith('.html'))

function link(file, label, current, prefix = '') {
  return `<a${current ? ' aria-current="page"' : ''} href="${prefix}${file}">${label}</a>`
}

function header(file, prefix = '') {
  const section = file.startsWith('product-') || ['products.html', 'screening-machines.html', 'conveying-feeding.html'].includes(file)
    ? 'products'
    : file.startsWith('industry-') || file === 'industries.html'
      ? 'industries'
      : file.startsWith('solution-') || file === 'solutions.html'
        ? 'solutions'
        : file.startsWith('guide-') || file === 'resources.html'
          ? 'resources'
          : file === 'about.html' ? 'about' : file === 'contact.html' ? 'contact' : file === 'blog' ? 'blog' : 'home'

  return `<header><div class="container navigation"><a class="brand" href="${prefix}index.html" aria-label="Xinxiang Vibrating Sieve home"><span class="brandmark">X<span>V</span></span><span>XINXIANG<small>VIBRATING SIEVE</small></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu <span>☰</span></button><nav id="navigation" class="site-nav" aria-label="Main navigation">
  ${link('index.html', 'Home', section === 'home', prefix)}
  <div class="nav-item has-mega"><button class="mega-trigger" aria-expanded="false">Products <span>⌄</span></button><div class="mega-panel mega-products"><div class="mega-intro"><span class="mega-kicker">EQUIPMENT</span><strong>Find the right screening and material handling equipment.</strong><a href="${prefix}products.html">View all products <span>→</span></a></div><div class="mega-column"><span>SCREENING MACHINES</span><a href="${prefix}product-rotary-vibrating-screen.html"><b>Rotary Vibrating Screen</b><small>Versatile powder and liquid screening</small></a><a href="${prefix}product-linear-vibrating-screen.html"><b>Linear Vibrating Screen</b><small>High-capacity dry classification</small></a><a href="${prefix}product-tumbler-screen.html"><b>Tumbler Screen</b><small>Gentle fine separation</small></a><a href="${prefix}product-ultrasonic-vibrating-screen.html"><b>Ultrasonic Vibrating Screen</b><small>Anti-blinding for fine powders</small></a></div><div class="mega-column"><span>CONVEYING & FEEDING</span><a href="${prefix}product-screw-conveyor.html"><b>Screw Conveyor</b><small>Enclosed material transfer</small></a><a href="${prefix}product-vibratory-feeder.html"><b>Vibratory Feeder</b><small>Controlled, consistent feeding</small></a><a class="mega-feature" href="${prefix}contact.html?subject=Equipment%20selection"><b>Not sure which machine?</b><small>Send your material and capacity requirements.</small><em>Ask an engineer →</em></a></div></div></div>
  <div class="nav-item has-mega"><button class="mega-trigger" aria-expanded="false">Industries <span>⌄</span></button><div class="mega-panel mega-compact"><div class="mega-intro"><span class="mega-kicker">APPLICATIONS</span><strong>Screening solutions shaped around your material.</strong><a href="${prefix}industries.html">Explore all industries <span>→</span></a></div><div class="mega-column"><span>BY INDUSTRY</span><a href="${prefix}industry-food-ingredients.html"><b>Food Ingredients</b><small>Hygienic screening and separation</small></a><a href="${prefix}industry-chemicals-powders.html"><b>Chemicals & Powders</b><small>Dust-aware process integration</small></a></div><div class="mega-column"><span>SPECIALIST MATERIALS</span><a href="${prefix}industry-minerals-aggregates.html"><b>Minerals & Aggregates</b><small>Robust high-throughput classification</small></a><a href="${prefix}industry-fine-metal-powders.html"><b>Fine Metal Powders</b><small>Precision screening for fine particles</small></a></div></div></div>
  ${link('solutions.html', 'Solutions', section === 'solutions', prefix)}
  ${link('about.html', 'About us', section === 'about', prefix)}
  <div class="nav-item has-mega"><button class="mega-trigger" aria-expanded="false">Resources <span>⌄</span></button><div class="mega-panel mega-compact mega-right"><div class="mega-intro"><span class="mega-kicker">KNOWLEDGE</span><strong>Practical guidance for equipment selection.</strong><a href="${prefix}resources.html">Browse resources <span>→</span></a></div><div class="mega-column"><span>SELECTION GUIDES</span><a href="${prefix}guide-equipment-selection.html"><b>Equipment Selection Guide</b><small>Match machine type to your process</small></a><a href="${prefix}guide-screen-mesh.html"><b>Screen Mesh Guide</b><small>Understand mesh and aperture size</small></a></div><div class="mega-column"><span>PLAN YOUR PROJECT</span><a href="${prefix}guide-project-checklist.html"><b>Project Checklist</b><small>Prepare the details engineers need</small></a><a href="${prefix}blog"><b>Screening Blog</b><small>Articles, tips and industry insights</small></a></div></div></div>
  ${link('blog', 'Blog', section === 'blog', prefix)}
  <a class="button small"${section === 'contact' ? ' aria-current="page"' : ''} href="${prefix}contact.html">Get a quote <span>↗</span></a>
  </nav></div></header>`
}

if (require.main === module) {
  for (const file of pages) {
    const target = path.join(root, file)
    const source = fs.readFileSync(target, 'utf8')
    if (!/<header>[\s\S]*?<\/header>/.test(source)) throw new Error(`Header not found in ${file}`)
    fs.writeFileSync(target, source.replace(/<header>[\s\S]*?<\/header>/, header(file)))
  }
  const blogShell = path.join(root, 'lib', 'blog-shell.cjs')
  const shellSource = fs.readFileSync(blogShell, 'utf8')
  const escapedHeader = JSON.stringify(header('blog', '/')).slice(1, -1)
  fs.writeFileSync(blogShell, shellSource.replace(/<header>[\s\S]*?<\/header>/, escapedHeader))
}

module.exports = {header}
