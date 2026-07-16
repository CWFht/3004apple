const appData = {
  categories: [
    { id: 'iphone', name: 'iPhone', art: 'phone' },
    { id: 'ipad', name: 'iPad', art: 'pad' },
    { id: 'watch', name: 'Apple Watch', art: 'watch', active: true },
    { id: 'airpods', name: 'AirPods', art: 'pods' },
    { id: 'mac', name: 'Mac', art: 'mac' },
    { id: 'accessory', name: '액세서리', art: 'acc' },
    { id: 'applecare', name: 'AppleCare+', art: 'acc' },
  ],
  favorites: [
    { left: 'SE 3', right: 'Series 11', label: 'Apple Watch SE 3 vs Series 11' },
    { left: 'Pro 3', right: '4 ANC', label: 'AirPods Pro 3 vs AirPods 4 ANC' },
    { left: '17', right: '17e', label: 'iPhone 17 vs iPhone 17e' }
  ],
  watchFamilies: {
    'SE 3': {
      family: 'Apple Watch SE 3',
      shortName: 'SE 3',
      appleCare: '79,000원',
      tagline: '가볍게 시작하는 스마트 워치.',
      features: [
        { icon: '◌', title: 'Retina 디스플레이', body: '최대 1,000니트' },
        { icon: '⌁', title: '최대 18시간', body: '배터리 사용' },
        { icon: 'S10', title: 'S10 칩', body: '일상용으로 충분한 성능' },
        { icon: '💧', title: '50m 방수', body: '운동과 일상에 적합' }
      ],
      consult: {
        title: 'SE 3가 적합한 고객',
        text: '기본적인 알림, 운동, 건강 관리가 목적이고 가격을 중요하게 생각하는 고객'
      },
      compareRows: {
        display: 'Retina 디스플레이\n(최대 1,000니트)',
        battery: '최대 18시간',
        chip: 'S10',
        health: '기본 건강 기능',
        material: '알루미늄',
      },
      variants: [
        { size: '40mm', material: '알루미늄', network: 'GPS', band: '스포츠 밴드', color: '스타라이트', bezel: '#dfddd7', price: 369000, code: 'MEH34KH/A' },
        { size: '40mm', material: '알루미늄', network: 'GPS', band: '스포츠 밴드', color: '미드나이트', bezel: '#44474c', price: 369000, code: 'MEH94KH/A' },
        { size: '44mm', material: '알루미늄', network: 'GPS', band: '스포츠 밴드', color: '스타라이트', bezel: '#dfddd7', price: 409000, code: 'MEHG4KH/A' },
        { size: '44mm', material: '알루미늄', network: 'GPS', band: '스포츠 밴드', color: '미드나이트', bezel: '#44474c', price: 409000, code: 'MEHN4KH/A' },
      ]
    },
    'Series 11': {
      family: 'Apple Watch Series 11',
      shortName: 'Series 11',
      appleCare: '119,000원',
      tagline: '더 똑똑해진 건강 파트너.',
      features: [
        { icon: '◉', title: '상시표시형 Retina 디스플레이', body: '최대 2,000니트' },
        { icon: '⌁', title: '최대 24시간', body: '배터리 사용' },
        { icon: 'S10', title: 'S10 칩', body: '더 빠른 성능' },
        { icon: '💧', title: '50m 방수', body: '운동과 일상에 적합' }
      ],
      consult: {
        title: 'Series 11이 적합한 고객',
        text: '상시표시, 더 밝은 디스플레이, 더 강화된 건강 기능과 고급 소재를 원하는 고객'
      },
      compareRows: {
        display: '상시표시형 Retina 디스플레이\n(최대 2,000니트)',
        battery: '최대 24시간',
        chip: 'S10',
        health: '심전도 앱, 혈중 산소 등 고급 건강 기능',
        material: '알루미늄, 티타늄',
      },
      variants: [
        { size: '42mm', material: '알루미늄', network: 'GPS', band: '스포츠 밴드', color: '제트블랙', bezel: '#3e3f42', price: 599000, code: 'MEQT4KH/A' },
        { size: '42mm', material: '알루미늄', network: 'GPS', band: '스포츠 밴드', color: '실버', bezel: '#e7e8ea', price: 599000, code: 'MEU64KH/A' },
        { size: '42mm', material: '알루미늄', network: 'GPS', band: '스포츠 밴드', color: '로즈골드', bezel: '#ddb7b1', price: 599000, code: 'MEU04KH/A' },
        { size: '42mm', material: '알루미늄', network: 'GPS + Cellular', band: '스포츠 밴드', color: '제트블랙', bezel: '#3e3f42', price: 749000, code: 'MF834KH/A' },
        { size: '42mm', material: '티타늄', network: 'GPS + Cellular', band: '밀레니즈 루프', color: '내추럴 티타늄', bezel: '#c8c3bb', price: 1069000, code: 'MF8P4KH/A' },
        { size: '46mm', material: '알루미늄', network: 'GPS', band: '스포츠 밴드', color: '제트블랙', bezel: '#3e3f42', price: 639000, code: 'MEUW4KH/A' },
        { size: '46mm', material: '알루미늄', network: 'GPS', band: '스포츠 밴드', color: '실버', bezel: '#e7e8ea', price: 639000, code: 'MEV94KH/A' },
        { size: '46mm', material: '티타늄', network: 'GPS + Cellular', band: '밀레니즈 루프', color: '슬레이트 티타늄', bezel: '#5d5a5f', price: 1139000, code: 'MFD34KH/A' }
      ]
    },
    'Ultra 3': {
      family: 'Apple Watch Ultra 3',
      shortName: 'Ultra 3',
      appleCare: '149,000원',
      tagline: '극한의 환경을 위한 최상위 워치.',
      features: [
        { icon: '◉', title: '밝고 큰 디스플레이', body: '아웃도어에 적합' },
        { icon: '⌁', title: '긴 배터리', body: '장시간 활동 지원' },
        { icon: 'U', title: '울트라급 내구성', body: '티타늄 바디' },
        { icon: '💧', title: '고급 방수·운동 특화', body: '전문 활동에 적합' }
      ],
      consult: {
        title: 'Ultra 3가 적합한 고객',
        text: '야외 활동, 러닝, 등산, 다이빙 등 전문적인 활용을 원하는 고객'
      },
      compareRows: {
        display: '대형 고휘도 디스플레이',
        battery: 'Ultra 라인업 기준 장시간',
        chip: '고성능',
        health: '확장 건강·운동 기능',
        material: '티타늄',
      },
      variants: [
        { size: '49mm', material: '티타늄', network: 'GPS + Cellular', band: '오션 밴드', color: '내추럴', bezel: '#cfcabf', price: 1249000, code: 'MEWH4KH/A' },
        { size: '49mm', material: '티타늄', network: 'GPS + Cellular', band: '밀레니즈 루프', color: '블랙', bezel: '#2e2e31', price: 1399000, code: 'MF1N4KH/A' }
      ]
    }
  }
};

const state = {
  selectedFamily: 'Series 11',
  filters: { size: null, material: null, network: null, band: null, color: null },
  compare: ['SE 3', 'Series 11']
};

const els = {
  categoryGrid: document.getElementById('categoryGrid'),
  favoriteList: document.getElementById('favoriteList'),
  detailTitle: document.getElementById('detailTitle'),
  heroName: document.getElementById('heroName'),
  heroTagline: document.getElementById('heroTagline'),
  heroPrice: document.getElementById('heroPrice'),
  heroCare: document.getElementById('heroCare'),
  featureStrip: document.getElementById('featureStrip'),
  seriesChips: document.getElementById('seriesChips'),
  sizeChips: document.getElementById('sizeChips'),
  materialChips: document.getElementById('materialChips'),
  networkChips: document.getElementById('networkChips'),
  bandChips: document.getElementById('bandChips'),
  colorSwatches: document.getElementById('colorSwatches'),
  selectionSummary: document.getElementById('selectionSummary'),
  selectionPrice: document.getElementById('selectionPrice'),
  selectionCode: document.getElementById('selectionCode'),
  compareAddButton: document.getElementById('compareAddButton'),
  compareLeftCard: document.getElementById('compareLeftCard'),
  compareRightCard: document.getElementById('compareRightCard'),
  compareLeftLabel: document.getElementById('compareLeftLabel'),
  compareRightLabel: document.getElementById('compareRightLabel'),
  diffTableBody: document.getElementById('diffTableBody'),
  consultLeftTitle: document.getElementById('consultLeftTitle'),
  consultLeftText: document.getElementById('consultLeftText'),
  consultRightTitle: document.getElementById('consultRightTitle'),
  consultRightText: document.getElementById('consultRightText'),
  priceGapBox: document.getElementById('priceGapBox'),
  searchInput: document.getElementById('searchInput')
};

function currency(n) {
  return `${n.toLocaleString('ko-KR')}원`;
}

function familyOptions() {
  return Object.keys(appData.watchFamilies);
}

function currentFamily() {
  return appData.watchFamilies[state.selectedFamily];
}

function deriveDefaultFilters(familyKey) {
  const family = appData.watchFamilies[familyKey];
  const v = family.variants[0];
  return { size: v.size, material: v.material, network: v.network, band: v.band, color: v.color };
}

function uniqueValues(list, key) {
  return [...new Set(list.map(item => item[key]))];
}

function filteredVariants() {
  const family = currentFamily();
  return family.variants.filter(v =>
    (!state.filters.size || v.size === state.filters.size) &&
    (!state.filters.material || v.material === state.filters.material) &&
    (!state.filters.network || v.network === state.filters.network) &&
    (!state.filters.band || v.band === state.filters.band)
  );
}

function selectedVariant() {
  const candidates = filteredVariants();
  return candidates.find(v => v.color === state.filters.color)
      || candidates[0]
      || currentFamily().variants[0];
}

function renderCategories() {
  els.categoryGrid.innerHTML = appData.categories.map(cat => `
    <button class="category-card ${cat.active ? 'active' : ''}" type="button">
      <div class="category-art ${cat.art}"></div>
      <span>${cat.name}</span>
    </button>
  `).join('');
}

function renderFavorites() {
  els.favoriteList.innerHTML = appData.favorites.map(f => `
    <button class="favorite-item" type="button">
      <div class="favorite-item-main">
        <div class="compare-mini-stack">
          <div class="compare-mini-watch"></div>
          <div class="compare-mini-watch"></div>
        </div>
        <div>
          <div>${f.label}</div>
          <small>자주 비교하는 조합</small>
        </div>
      </div>
      <span>›</span>
    </button>
  `).join('');
}

function renderChips(container, values, activeValue, onClick, formatter = v => v) {
  container.innerHTML = values.map(value => `
    <button class="chip ${value === activeValue ? 'active' : ''}" type="button" data-value="${value}">${formatter(value)}</button>
  `).join('');
  container.querySelectorAll('.chip').forEach(btn => btn.addEventListener('click', () => onClick(btn.dataset.value)));
}

function renderSwatches(variants, activeColor) {
  const colors = [...new Map(variants.map(v => [v.color, v])).values()];
  els.colorSwatches.innerHTML = colors.map(item => `
    <button class="swatch ${item.color === activeColor ? 'active' : ''}" type="button" data-color="${item.color}" style="background:${item.bezel};" title="${item.color}"></button>
  `).join('');
  els.colorSwatches.querySelectorAll('.swatch').forEach(btn => btn.addEventListener('click', () => {
    state.filters.color = btn.dataset.color;
    renderPage();
  }));
}

function renderMainPanel() {
  const family = currentFamily();
  const variant = selectedVariant();
  const minPrice = Math.min(...family.variants.map(v => v.price));

  els.detailTitle.textContent = family.family;
  els.heroName.textContent = family.shortName;
  els.heroTagline.textContent = family.tagline;
  els.heroPrice.textContent = `${currency(minPrice)}부터`;
  els.heroCare.textContent = `AppleCare+ ${family.appleCare}`;

  els.featureStrip.innerHTML = family.features.map(f => `
    <article class="feature-card">
      <div class="feature-icon">${f.icon}</div>
      <strong>${f.title}</strong>
      <p class="muted">${f.body}</p>
    </article>
  `).join('');

  renderChips(els.seriesChips, familyOptions(), state.selectedFamily, value => {
    state.selectedFamily = value;
    state.filters = deriveDefaultFilters(value);
    renderPage();
  });

  renderChips(els.sizeChips, uniqueValues(family.variants, 'size'), state.filters.size, value => {
    state.filters.size = value;
    if (!filteredVariants().some(v => v.material === state.filters.material)) state.filters.material = filteredVariants()[0]?.material || null;
    if (!filteredVariants().some(v => v.network === state.filters.network)) state.filters.network = filteredVariants()[0]?.network || null;
    if (!filteredVariants().some(v => v.band === state.filters.band)) state.filters.band = filteredVariants()[0]?.band || null;
    state.filters.color = filteredVariants()[0]?.color || null;
    renderPage();
  });

  renderChips(els.materialChips, uniqueValues(filteredVariants(), 'material'), state.filters.material, value => {
    state.filters.material = value;
    if (!filteredVariants().some(v => v.network === state.filters.network)) state.filters.network = filteredVariants()[0]?.network || null;
    if (!filteredVariants().some(v => v.band === state.filters.band)) state.filters.band = filteredVariants()[0]?.band || null;
    state.filters.color = filteredVariants()[0]?.color || null;
    renderPage();
  });

  renderChips(els.networkChips, uniqueValues(filteredVariants(), 'network'), state.filters.network, value => {
    state.filters.network = value;
    if (!filteredVariants().some(v => v.band === state.filters.band)) state.filters.band = filteredVariants()[0]?.band || null;
    state.filters.color = filteredVariants()[0]?.color || null;
    renderPage();
  });

  renderChips(els.bandChips, uniqueValues(filteredVariants(), 'band'), state.filters.band, value => {
    state.filters.band = value;
    state.filters.color = filteredVariants()[0]?.color || null;
    renderPage();
  });

  renderSwatches(filteredVariants(), state.filters.color);

  els.selectionSummary.textContent = `${family.family} (${variant.size}, ${variant.material}, ${variant.network}, ${variant.band})`;
  els.selectionPrice.textContent = currency(variant.price);
  els.selectionCode.textContent = `색상 ${variant.color} · 모델코드 ${variant.code}`;

  els.compareAddButton.onclick = () => {
    if (!state.compare.includes(state.selectedFamily)) {
      state.compare[1] = state.selectedFamily;
      renderCompare();
      alert(`${family.family}이(가) 비교함에 추가되었습니다.`);
    } else {
      alert('이미 비교함에 들어있는 제품입니다.');
    }
  };
}

function compareCardHtml(familyKey) {
  const family = appData.watchFamilies[familyKey];
  const cheapest = family.variants.reduce((min, cur) => cur.price < min.price ? cur : min, family.variants[0]);
  return `
    <div class="compare-card-inner">
      <div class="compare-watch-art" style="--bezel:${cheapest.bezel};">
        <div class="strap-left"></div>
        <div class="frame"></div>
        <div class="strap-right"></div>
      </div>
      <div class="compare-meta">
        <h4>${family.family}</h4>
        <p>${cheapest.size} (${cheapest.material}, ${cheapest.network})</p>
        <strong>${currency(cheapest.price)}부터</strong>
      </div>
    </div>
  `;
}

function renderCompare() {
  const leftKey = state.compare[0];
  const rightKey = state.compare[1];
  const left = appData.watchFamilies[leftKey];
  const right = appData.watchFamilies[rightKey];

  els.compareLeftCard.innerHTML = compareCardHtml(leftKey);
  els.compareRightCard.innerHTML = compareCardHtml(rightKey);
  els.compareLeftLabel.textContent = left.shortName;
  els.compareRightLabel.textContent = right.shortName;

  const leftMin = Math.min(...left.variants.map(v => v.price));
  const rightMin = Math.min(...right.variants.map(v => v.price));
  const rowLabels = [
    ['display', '디스플레이'],
    ['battery', '배터리 사용 시간'],
    ['chip', '칩'],
    ['health', '건강 기능'],
    ['material', '재질'],
  ];
  const sizeSummary = `${left.variants.filter(v => v.network === 'GPS').map(v => `${v.size} ${currency(v.price)}`).join(' / ')}`;
  const sizeSummaryRight = `${right.variants.filter(v => v.network === 'GPS').map(v => `${v.size} ${currency(v.price)}`).join(' / ')}`;

  els.diffTableBody.innerHTML = rowLabels.map(([key, label]) => `
    <tr>
      <td><strong>${label}</strong></td>
      <td>${left.compareRows[key].replaceAll('\n','<br>')}</td>
      <td>${right.compareRows[key].replaceAll('\n','<br>')}</td>
    </tr>
  `).join('') + `
    <tr>
      <td><strong>가격 (GPS 기준)</strong></td>
      <td>${sizeSummary}</td>
      <td>${sizeSummaryRight}</td>
    </tr>
  `;

  els.consultLeftTitle.textContent = left.consult.title;
  els.consultLeftText.textContent = left.consult.text;
  els.consultRightTitle.textContent = right.consult.title;
  els.consultRightText.textContent = right.consult.text;
  els.priceGapBox.textContent = `가격 차이 (동급 GPS 모델 기준) · 약 ${currency(Math.abs(rightMin - leftMin)).replace('원','')} 차이`;
}

function renderSearchBehavior() {
  els.searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) return;
    const matchFamily = Object.keys(appData.watchFamilies).find(key => {
      const fam = appData.watchFamilies[key];
      return fam.family.toLowerCase().includes(q) || fam.shortName.toLowerCase().includes(q) || fam.variants.some(v =>
        v.code.toLowerCase().includes(q) ||
        v.color.toLowerCase().includes(q) ||
        v.size.toLowerCase().includes(q)
      );
    });
    if (matchFamily) {
      state.selectedFamily = matchFamily;
      state.filters = deriveDefaultFilters(matchFamily);
      renderPage();
    }
  });
}

function renderPage() {
  renderCategories();
  renderFavorites();
  renderMainPanel();
  renderCompare();
}

state.filters = deriveDefaultFilters(state.selectedFamily);
renderPage();
renderSearchBehavior();
