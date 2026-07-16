const DATA = {
  categories: [
    {id:'iphone',name:'iPhone',icon:'▯',available:false},
    {id:'ipad',name:'iPad',icon:'▭',available:false},
    {id:'watch',name:'Apple Watch',image:'assets/products/watch-series11.png',available:true},
    {id:'airpods',name:'AirPods',icon:'◡',available:false},
    {id:'mac',name:'Mac',icon:'⌨',available:false},
    {id:'accessory',name:'액세서리',icon:'＋',available:false},
    {id:'applecare',name:'AppleCare+',icon:'＋',available:false}
  ],
  favorites: [
    {left:'SE 3',right:'Series 11'},
    {left:'Series 11',right:'Ultra 3'}
  ],
  watchFamilies: {
    'SE 3': {
      family:'Apple Watch SE 3', shortName:'SE 3', image:'assets/products/watch-se3.png', appleCare:79000,
      tagline:'가볍게 시작하는 스마트 워치.',
      features:[
        {icon:'◌',title:'Retina 디스플레이',body:'최대 1,000니트'},
        {icon:'18h',title:'최대 18시간',body:'배터리 사용'},
        {icon:'S10',title:'S10 칩',body:'일상에 충분한 성능'},
        {icon:'50m',title:'50m 방수',body:'운동과 일상에 적합'}
      ],
      featureDetails:[
        ['부담 없는 시작 가격','기본 알림, 운동 기록과 건강 관리를 합리적으로 시작하기 좋습니다.'],
        ['40mm·44mm 선택','손목 크기와 화면 선호에 따라 두 가지 케이스 크기를 고를 수 있습니다.'],
        ['필수 기능 중심','상시표시와 고급 소재보다는 기본 기능과 가격을 우선하는 고객에게 적합합니다.'],
        ['가벼운 알루미늄','알루미늄 케이스와 스포츠 밴드 중심으로 간결하게 선택할 수 있습니다.']
      ],
      specs:{display:'Retina 디스플레이\n최대 1,000니트',battery:'최대 18시간',chip:'S10',health:'기본 건강·운동 기능',material:'알루미늄',water:'50m 방수'},
      accessories:['40mm·44mm 호환 스포츠 밴드','Apple Watch 마그네틱 고속 충전 케이블','AppleCare+ for Watch SE 3'],
      consult:'기본적인 알림, 운동, 건강 관리가 목적이고 가격을 중요하게 생각하는 고객',
      variants:[
        {size:'40mm',material:'알루미늄',network:'GPS',band:'스포츠 밴드 S/M',color:'스타라이트',colorHex:'#ded8ca',price:369000,code:'MEH34KH/A'},
        {size:'40mm',material:'알루미늄',network:'GPS',band:'스포츠 밴드 M/L',color:'스타라이트',colorHex:'#ded8ca',price:369000,code:'MEH54KH/A'},
        {size:'40mm',material:'알루미늄',network:'GPS',band:'스포츠 밴드 S/M',color:'미드나이트',colorHex:'#36383d',price:369000,code:'MEH94KH/A'},
        {size:'40mm',material:'알루미늄',network:'GPS + Cellular',band:'스포츠 밴드 S/M',color:'스타라이트',colorHex:'#ded8ca',price:439000,code:'MEP64KH/A'},
        {size:'44mm',material:'알루미늄',network:'GPS',band:'스포츠 밴드 S/M',color:'스타라이트',colorHex:'#ded8ca',price:409000,code:'MEHG4KH/A'},
        {size:'44mm',material:'알루미늄',network:'GPS',band:'스포츠 밴드 M/L',color:'미드나이트',colorHex:'#36383d',price:409000,code:'MEHQ4KH/A'},
        {size:'44mm',material:'알루미늄',network:'GPS + Cellular',band:'스포츠 밴드 S/M',color:'스타라이트',colorHex:'#ded8ca',price:479000,code:'MEPE4KH/A'}
      ]
    },
    'Series 11': {
      family:'Apple Watch Series 11', shortName:'Series 11', image:'assets/products/watch-series11.png', appleCare:119000,
      tagline:'더 똑똑해진 건강 파트너.',
      features:[
        {icon:'AOD',title:'상시표시형 Retina',body:'최대 2,000니트'},
        {icon:'24h',title:'최대 24시간',body:'배터리 사용'},
        {icon:'S10',title:'S10 칩',body:'더 빠른 성능'},
        {icon:'50m',title:'50m 방수',body:'운동과 일상에 적합'}
      ],
      featureDetails:[
        ['상시표시 디스플레이','손목을 들지 않아도 시간과 주요 정보를 빠르게 확인할 수 있습니다.'],
        ['42mm·46mm 선택','SE 3보다 큰 두 가지 케이스 크기로 화면 가독성을 높였습니다.'],
        ['알루미늄·티타늄','가격 중심의 알루미늄과 고급 소재인 티타늄 중 선택할 수 있습니다.'],
        ['건강 기능 강화','건강 기능과 더 긴 배터리를 중요하게 보는 고객에게 적합합니다.']
      ],
      specs:{display:'상시표시형 Retina 디스플레이\n최대 2,000니트',battery:'최대 24시간',chip:'S10',health:'심전도 앱 등 고급 건강 기능',material:'알루미늄 또는 티타늄',water:'50m 방수'},
      accessories:['42mm·46mm 스포츠 밴드 및 스포츠 루프','티타늄 밀레니즈 루프','Apple Watch 마그네틱 고속 충전 케이블','AppleCare+ for Watch S11'],
      consult:'상시표시, 더 밝은 디스플레이, 강화된 건강 기능과 고급 소재를 원하는 고객',
      variants:[
        {size:'42mm',material:'알루미늄',network:'GPS',band:'스포츠 밴드 S/M',color:'제트블랙',colorHex:'#222326',price:599000,code:'MEQT4KH/A'},
        {size:'42mm',material:'알루미늄',network:'GPS',band:'스포츠 밴드 M/L',color:'스페이스그레이',colorHex:'#55575b',price:599000,code:'MEQX4KH/A'},
        {size:'42mm',material:'알루미늄',network:'GPS',band:'스포츠 밴드 S/M',color:'로즈골드',colorHex:'#d9ada6',price:599000,code:'MEU04KH/A'},
        {size:'42mm',material:'알루미늄',network:'GPS',band:'스포츠 밴드 S/M',color:'실버',colorHex:'#e1e3e6',price:599000,code:'MEU64KH/A'},
        {size:'42mm',material:'알루미늄',network:'GPS + Cellular',band:'스포츠 밴드 S/M',color:'제트블랙',colorHex:'#222326',price:749000,code:'MF834KH/A'},
        {size:'42mm',material:'티타늄',network:'GPS + Cellular',band:'스포츠 밴드 S/M',color:'내추럴 티타늄',colorHex:'#beb9ae',price:999000,code:'MF8M4KH/A'},
        {size:'42mm',material:'티타늄',network:'GPS + Cellular',band:'밀레니즈 루프',color:'내추럴 티타늄',colorHex:'#beb9ae',price:1069000,code:'MF8P4KH/A'},
        {size:'46mm',material:'알루미늄',network:'GPS',band:'스포츠 밴드 S/M',color:'제트블랙',colorHex:'#222326',price:639000,code:'MEUW4KH/A'},
        {size:'46mm',material:'알루미늄',network:'GPS',band:'스포츠 밴드 S/M',color:'실버',colorHex:'#e1e3e6',price:639000,code:'MEV94KH/A'},
        {size:'46mm',material:'알루미늄',network:'GPS + Cellular',band:'스포츠 밴드 S/M',color:'제트블랙',colorHex:'#222326',price:789000,code:'MFC24KH/A'},
        {size:'46mm',material:'티타늄',network:'GPS + Cellular',band:'스포츠 밴드 S/M',color:'내추럴 티타늄',colorHex:'#beb9ae',price:1069000,code:'MFCW4KH/A'},
        {size:'46mm',material:'티타늄',network:'GPS + Cellular',band:'밀레니즈 루프',color:'슬레이트 티타늄',colorHex:'#5a575a',price:1139000,code:'MFD34KH/A'}
      ]
    },
    'Ultra 3': {
      family:'Apple Watch Ultra 3', shortName:'Ultra 3', image:'assets/products/watch-ultra3.png', appleCare:149000,
      tagline:'극한의 환경을 위한 최상위 워치.',
      features:[
        {icon:'49',title:'49mm 티타늄',body:'크고 견고한 케이스'},
        {icon:'GPS',title:'Cellular 기본',body:'아웃도어 연결성'},
        {icon:'UL',title:'울트라급 내구성',body:'전문 활동에 적합'},
        {icon:'OUT',title:'운동 특화',body:'러닝·등산·다이빙'}
      ],
      featureDetails:[
        ['49mm 단일 크기','가장 크고 선명한 화면과 강한 존재감을 원하는 고객에게 적합합니다.'],
        ['티타늄 케이스','가벼움과 강도를 함께 고려한 프리미엄 소재를 사용합니다.'],
        ['아웃도어 밴드','오션·알파인·트레일·밀레니즈 루프를 활동에 맞게 선택할 수 있습니다.'],
        ['전문 활동 중심','일상용보다는 장시간 야외 활동과 전문 스포츠를 우선하는 고객에게 적합합니다.']
      ],
      specs:{display:'49mm 대형 고휘도 디스플레이',battery:'Ultra 라인업 장시간 배터리',chip:'고성능 Watch 칩',health:'고급 건강·운동·아웃도어 기능',material:'티타늄',water:'전문 수상 활동 대응'},
      accessories:['49mm 오션 밴드','49mm 알파인 루프','49mm 트레일 루프','49mm 티타늄 밀레니즈 루프','AppleCare+ for Watch Ultra 3'],
      consult:'야외 활동, 러닝, 등산과 수상 스포츠 등 전문적인 활용을 원하는 고객',
      variants:[
        {size:'49mm',material:'티타늄',network:'GPS + Cellular',band:'오션 밴드',color:'내추럴',colorHex:'#c0b9aa',price:1249000,code:'MEWH4KH/A'},
        {size:'49mm',material:'티타늄',network:'GPS + Cellular',band:'알파인 루프 M',color:'내추럴',colorHex:'#c0b9aa',price:1249000,code:'MEWM4KH/A'},
        {size:'49mm',material:'티타늄',network:'GPS + Cellular',band:'트레일 루프 S/M',color:'내추럴',colorHex:'#c0b9aa',price:1249000,code:'MEWR4KH/A'},
        {size:'49mm',material:'티타늄',network:'GPS + Cellular',band:'오션 밴드',color:'블랙',colorHex:'#242529',price:1299000,code:'MF0J4KH/A'},
        {size:'49mm',material:'티타늄',network:'GPS + Cellular',band:'티타늄 밀레니즈 루프 M',color:'블랙',colorHex:'#242529',price:1399000,code:'MF1Q4KH/A'},
        {size:'49mm',material:'티타늄',network:'GPS + Cellular',band:'티타늄 밀레니즈 루프 M',color:'내추럴',colorHex:'#c0b9aa',price:1399000,code:'MEWY4KH/A'}
      ]
    }
  }
};

const FILTER_ORDER=['size','material','network','band','color'];
const state={family:'Series 11',filters:{},mainTab:'model',compareTab:'differences',compare:['SE 3','Series 11'],customerMode:false,favorites:new Set(),recent:[]};
const $=id=>document.getElementById(id);
const els={categoryGrid:$('categoryGrid'),favoriteList:$('favoriteList'),searchInput:$('searchInput'),searchResults:$('searchResults'),detailTitle:$('detailTitle'),heroImage:$('heroImage'),heroName:$('heroName'),heroTagline:$('heroTagline'),heroPrice:$('heroPrice'),heroCare:$('heroCare'),featureStrip:$('featureStrip'),mainTabContent:$('mainTabContent'),compareLeftCard:$('compareLeftCard'),compareRightCard:$('compareRightCard'),compareContent:$('compareContent'),toast:$('toast'),modal:$('modal'),modalTitle:$('modalTitle'),modalBody:$('modalBody'),modeBadge:$('modeBadge'),favoriteButton:$('favoriteButton')};
const money=n=>`${Number(n).toLocaleString('ko-KR')}원`;
const family=()=>DATA.watchFamilies[state.family];
const escapeHtml=s=>String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

function showToast(message){els.toast.textContent=message;els.toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>els.toast.classList.remove('show'),1900)}
function showModal(title,html){els.modalTitle.textContent=title;els.modalBody.innerHTML=html;els.modal.hidden=false}
function closeModal(){els.modal.hidden=true}
function addRecent(familyKey,variant){state.recent=state.recent.filter(x=>x.code!==variant.code);state.recent.unshift({familyKey,code:variant.code,label:`${DATA.watchFamilies[familyKey].family} ${variant.size} ${variant.color}`,price:variant.price});state.recent=state.recent.slice(0,8)}

function initFilters(familyKey,preferred={}){state.family=familyKey;state.filters={};FILTER_ORDER.forEach(key=>{const options=getOptions(key);state.filters[key]=options.includes(preferred[key])?preferred[key]:options[0]});const v=getSelectedVariant();if(v)addRecent(familyKey,v)}
function getOptions(key){const index=FILTER_ORDER.indexOf(key);return [...new Set(family().variants.filter(v=>FILTER_ORDER.slice(0,index).every(k=>!state.filters[k]||v[k]===state.filters[k])).map(v=>v[key]))]}
function setFilter(key,value){els.searchInput.value='';els.searchResults.hidden=true;const index=FILTER_ORDER.indexOf(key);state.filters[key]=value;FILTER_ORDER.slice(index+1).forEach(next=>{const opts=getOptions(next);state.filters[next]=opts[0]});const v=getSelectedVariant();if(v)addRecent(state.family,v);renderAll()}
function getSelectedVariant(){return family().variants.find(v=>FILTER_ORDER.every(k=>v[k]===state.filters[k]))||family().variants[0]}
function minPrice(f){return Math.min(...f.variants.map(v=>v.price))}

function renderCategories(){els.categoryGrid.innerHTML=DATA.categories.map(c=>`<button type="button" class="category-card ${c.id==='watch'?'active':''} ${c.available?'':'pending'}" data-category="${c.id}"><div class="category-art">${c.image?`<img src="${c.image}" alt="">`:`<span class="category-icon">${c.icon}</span>`}</div><span>${c.name}</span></button>`).join('');els.categoryGrid.querySelectorAll('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{const c=DATA.categories.find(x=>x.id===btn.dataset.category);if(!c.available){showToast(`${c.name}은 다음 단계에서 PPT 데이터와 연결됩니다.`);return}document.getElementById('mainPanel').scrollIntoView({behavior:'smooth'});showToast('Apple Watch 카테고리를 표시했습니다.')}))}
function renderFavorites(){els.favoriteList.innerHTML=DATA.favorites.map((f,i)=>`<button class="favorite-item" type="button" data-favorite-index="${i}"><span><strong>${f.left} vs ${f.right}</strong><small>비교표와 상담 요약 바로 보기</small></span><span class="favorite-pair"><img src="${DATA.watchFamilies[f.left].image}" alt=""><img src="${DATA.watchFamilies[f.right].image}" alt="">›</span></button>`).join('');els.favoriteList.querySelectorAll('[data-favorite-index]').forEach(btn=>btn.addEventListener('click',()=>{const f=DATA.favorites[Number(btn.dataset.favoriteIndex)];state.compare=[f.left,f.right];state.compareTab='differences';renderCompare();document.getElementById('comparePanel').scrollIntoView({behavior:'smooth'});showToast(`${f.left}와 ${f.right} 비교를 열었습니다.`)}))}

function renderHero(){const f=family();els.detailTitle.textContent=f.family;els.heroImage.src=f.image;els.heroImage.alt=`${f.family} 대표 이미지`;els.heroName.textContent=f.shortName;els.heroTagline.textContent=f.tagline;els.heroPrice.textContent=`${money(minPrice(f))}부터`;els.heroCare.textContent=`AppleCare+ ${money(f.appleCare)}`;els.featureStrip.innerHTML=f.features.map(x=>`<article class="feature-card"><div class="feature-icon">${escapeHtml(x.icon)}</div><strong>${escapeHtml(x.title)}</strong><p class="muted">${escapeHtml(x.body)}</p></article>`).join('');els.favoriteButton.textContent=state.favorites.has(state.family)?'♥':'♡'}
function chipGroup(label,key){const opts=getOptions(key);return `<div class="selector-group"><label>${label}</label><div class="chip-row">${opts.map(v=>`<button type="button" class="chip ${state.filters[key]===v?'active':''}" data-filter="${key}" data-value="${escapeHtml(v)}">${escapeHtml(v)}</button>`).join('')}</div></div>`}
function renderModelTab(){const v=getSelectedVariant();return `<div><div class="selector-group"><label>시리즈</label><div class="chip-row">${Object.keys(DATA.watchFamilies).map(k=>`<button type="button" class="chip ${state.family===k?'active':''}" data-family="${k}">${k}</button>`).join('')}</div></div>${chipGroup('크기','size')}${chipGroup('재질','material')}${chipGroup('통신','network')}${chipGroup('밴드','band')}<div class="selector-group"><label>색상</label><div class="swatch-row">${getOptions('color').map(c=>{const item=family().variants.find(x=>x.color===c);return `<span class="swatch-wrap"><button type="button" class="swatch ${state.filters.color===c?'active':''}" data-filter="color" data-value="${escapeHtml(c)}" style="background:${item.colorHex}" aria-label="${escapeHtml(c)}"></button><span class="swatch-name">${escapeHtml(c)}</span></span>`}).join('')}</div></div><div class="selection-footer"><div><p class="selection-summary">${family().family} · ${v.size} · ${v.material} · ${v.network} · ${v.band}</p><strong class="selection-price">${money(v.price)}</strong><div class="code-line">색상 ${escapeHtml(v.color)} · 모델코드 <strong>${escapeHtml(v.code)}</strong><button type="button" class="copy-button" id="copyCodeButton">복사</button></div></div><button type="button" class="primary-button" id="compareAddButton">비교함에 추가</button></div></div>`}
function renderFeaturesTab(){return `<div class="content-section"><div class="content-grid">${family().featureDetails.map(([t,b])=>`<article class="info-card"><h3>${escapeHtml(t)}</h3><p>${escapeHtml(b)}</p></article>`).join('')}</div></div>`}
function renderSpecsTab(){const v=getSelectedVariant();const rows=[['디스플레이',family().specs.display],['배터리',family().specs.battery],['칩',family().specs.chip],['건강 기능',family().specs.health],['소재',family().specs.material],['방수',family().specs.water],['현재 선택',`${v.size} · ${v.material} · ${v.network}`],['판매가',money(v.price)]];return `<ul class="spec-list">${rows.map(([a,b])=>`<li><strong>${a}</strong><span>${escapeHtml(b)}</span></li>`).join('')}</ul>`}
function renderAccessoriesTab(){return `<div class="accessory-list">${family().accessories.map((a,i)=>`<div class="accessory-item"><strong>${escapeHtml(a)}</strong><span>${i===family().accessories.length-1?'보증 서비스':'호환 액세서리'}</span></div>`).join('')}</div>`}
function renderMainTab(){document.querySelectorAll('[data-main-tab]').forEach(b=>b.classList.toggle('active',b.dataset.mainTab===state.mainTab));els.mainTabContent.innerHTML=state.mainTab==='model'?renderModelTab():state.mainTab==='features'?renderFeaturesTab():state.mainTab==='specs'?renderSpecsTab():renderAccessoriesTab();bindMainContent()}
function bindMainContent(){els.mainTabContent.querySelectorAll('[data-family]').forEach(b=>b.addEventListener('click',()=>{els.searchInput.value='';initFilters(b.dataset.family);renderAll()}));els.mainTabContent.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter,b.dataset.value)));const copy=$('copyCodeButton');if(copy)copy.addEventListener('click',()=>copyText(getSelectedVariant().code,'모델코드를 복사했습니다.'));const add=$('compareAddButton');if(add)add.addEventListener('click',()=>{if(state.compare.includes(state.family)){showToast('이미 비교함에 있는 제품입니다.');return}state.compare[1]=state.family;renderCompare();showToast(`${family().shortName}을 비교함에 추가했습니다.`)})}

function compareCard(key){const f=DATA.watchFamilies[key],v=f.variants.reduce((a,b)=>a.price<=b.price?a:b);return `<div class="compare-card-inner"><img src="${f.image}" alt="${f.family}"><div class="compare-meta"><small>Apple Watch</small><h4>${f.shortName}</h4><p>${v.size} · ${v.material} · ${v.network}</p><strong>${money(v.price)}부터</strong></div></div>`}
function keyDiffHtml(left,right){const rows=[['디스플레이',left.specs.display,right.specs.display],['배터리',left.specs.battery,right.specs.battery],['건강 기능',left.specs.health,right.specs.health],['재질',left.specs.material,right.specs.material],['크기', [...new Set(left.variants.map(v=>v.size))].join(' / '), [...new Set(right.variants.map(v=>v.size))].join(' / ')],['시작 가격',money(minPrice(left)),money(minPrice(right))]];return `<table class="diff-table"><thead><tr><th>항목</th><th>${left.shortName}</th><th>${right.shortName}</th></tr></thead><tbody>${rows.map(r=>`<tr><td><strong>${r[0]}</strong></td><td>${escapeHtml(r[1])}</td><td>${escapeHtml(r[2])}</td></tr>`).join('')}</tbody></table>`}
function fullSpecsHtml(left,right){const summarize=f=>({크기:[...new Set(f.variants.map(v=>v.size))].join(' / '),통신:[...new Set(f.variants.map(v=>v.network))].join(' / '),소재:[...new Set(f.variants.map(v=>v.material))].join(' / '),밴드:[...new Set(f.variants.map(v=>v.band))].join(' / '),가격:`${money(minPrice(f))} ~ ${money(Math.max(...f.variants.map(v=>v.price)))}`,AppleCare:money(f.appleCare)});const a=summarize(left),b=summarize(right);return `<table class="diff-table"><thead><tr><th>구분</th><th>${left.shortName}</th><th>${right.shortName}</th></tr></thead><tbody>${Object.keys(a).map(k=>`<tr><td><strong>${k}</strong></td><td>${escapeHtml(a[k])}</td><td>${escapeHtml(b[k])}</td></tr>`).join('')}</tbody></table>`}
function consultHtml(left,right){const gap=Math.abs(minPrice(right)-minPrice(left));return `<div class="consult-cards"><article class="consult-card left-tone"><h3>${left.shortName}이 적합한 고객</h3><p>${escapeHtml(left.consult)}</p></article><article class="consult-card right-tone"><h3>${right.shortName}이 적합한 고객</h3><p>${escapeHtml(right.consult)}</p></article></div><div class="price-gap">시작 가격 차이 · 약 ${money(gap)}</div>`}
function renderCompare(){const [lk,rk]=state.compare,left=DATA.watchFamilies[lk],right=DATA.watchFamilies[rk];els.compareLeftCard.innerHTML=compareCard(lk);els.compareRightCard.innerHTML=compareCard(rk);document.querySelectorAll('[data-compare-tab]').forEach(b=>b.classList.toggle('active',b.dataset.compareTab===state.compareTab));els.compareContent.innerHTML=state.compareTab==='differences'?keyDiffHtml(left,right):state.compareTab==='specs'?fullSpecsHtml(left,right):consultHtml(left,right)}

function allSearchItems(){return Object.entries(DATA.watchFamilies).flatMap(([familyKey,f])=>f.variants.map(v=>({familyKey,family:f.family,shortName:f.shortName,...v}))) }
function renderSearch(query){const q=query.trim().toLowerCase();if(!q){els.searchResults.hidden=true;return}const terms=q.split(/\s+/).filter(Boolean);const matches=allSearchItems().filter(x=>terms.every(t=>[x.family,x.shortName,x.size,x.material,x.network,x.band,x.color,x.code,String(x.price)].some(v=>String(v).toLowerCase().includes(t)))).slice(0,12);els.searchResults.innerHTML=matches.length?matches.map((x,i)=>`<button type="button" class="search-result ${i===0?'active':''}" data-result-code="${x.code}"><strong>${x.family} ${x.size} ${x.color}</strong><small>${x.material} · ${x.network} · ${x.code}</small><span class="result-price">${money(x.price)}</span></button>`).join(''):`<div class="search-empty">일치하는 모델이 없습니다.</div>`;els.searchResults.hidden=false;els.searchResults.querySelectorAll('[data-result-code]').forEach(b=>b.addEventListener('click',()=>selectSearchResult(b.dataset.resultCode)))}
function selectSearchResult(code){const item=allSearchItems().find(x=>x.code===code);if(!item)return;initFilters(item.familyKey,item);els.searchInput.value=`${item.family} ${item.size} ${item.color}`;els.searchResults.hidden=true;state.mainTab='model';renderAll();showToast(`${item.code} 모델을 표시했습니다.`)}
function copyText(text,message){if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(()=>showToast(message)).catch(()=>fallbackCopy(text,message))}else fallbackCopy(text,message)}
function fallbackCopy(text,message){const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');showToast(message)}catch{showToast(`복사할 내용: ${text}`)}ta.remove()}

function renderRecentModal(){const html=state.recent.length?`<div class="recent-list">${state.recent.map(x=>`<div class="recent-item"><span><strong>${escapeHtml(x.label)}</strong><br><small>${escapeHtml(x.code)} · ${money(x.price)}</small></span><button type="button" data-recent-code="${x.code}">열기</button></div>`).join('')}</div>`:'<p class="muted">최근 조회한 제품이 없습니다.</p>';showModal('최근 조회',html);els.modalBody.querySelectorAll('[data-recent-code]').forEach(b=>b.addEventListener('click',()=>{selectSearchResult(b.dataset.recentCode);closeModal()}))}
function toggleCustomerMode(){state.customerMode=!state.customerMode;document.body.classList.toggle('customer-mode',state.customerMode);els.modeBadge.textContent=state.customerMode?'고객 보기':'내부 직원용';showToast(state.customerMode?'모델코드를 숨긴 고객 보기로 전환했습니다.':'내부 직원용 보기로 전환했습니다.')}
function renderAll(){renderHero();renderMainTab();renderCompare()}

function bindStaticEvents(){document.querySelectorAll('[data-main-tab]').forEach(b=>b.addEventListener('click',()=>{state.mainTab=b.dataset.mainTab;renderMainTab()}));document.querySelectorAll('[data-compare-tab]').forEach(b=>b.addEventListener('click',()=>{state.compareTab=b.dataset.compareTab;renderCompare()}));els.searchInput.addEventListener('input',e=>renderSearch(e.target.value));els.searchInput.addEventListener('keydown',e=>{if(e.key==='Enter'){const first=els.searchResults.querySelector('[data-result-code]');if(first){e.preventDefault();selectSearchResult(first.dataset.resultCode)}}if(e.key==='Escape')els.searchResults.hidden=true});document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))els.searchResults.hidden=true});$('favoriteButton').addEventListener('click',()=>{state.favorites.has(state.family)?state.favorites.delete(state.family):state.favorites.add(state.family);renderHero();showToast(state.favorites.has(state.family)?'즐겨찾기에 추가했습니다.':'즐겨찾기에서 제거했습니다.')});$('shareButton').addEventListener('click',()=>{const v=getSelectedVariant();copyText(`${family().family} ${v.size} ${v.color} / ${money(v.price)} / ${v.code}`,'제품 정보를 복사했습니다.')});$('backButton').addEventListener('click',()=>{initFilters('Series 11');state.mainTab='model';renderAll();window.scrollTo({top:0,behavior:'smooth'})});$('swapCompareButton').addEventListener('click',()=>{state.compare.reverse();renderCompare();showToast('비교 제품의 좌우를 바꿨습니다.')});document.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-nav]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const n=b.dataset.nav;if(n==='home'){$('mainPanel').scrollIntoView({behavior:'smooth'})}else if(n==='compare'){$('comparePanel').scrollIntoView({behavior:'smooth'})}else if(n==='favorite'){$('favoriteSection').scrollIntoView({behavior:'smooth'})}else if(n==='recent')renderRecentModal();else toggleCustomerMode()}));$('modalClose').addEventListener('click',closeModal);els.modal.addEventListener('click',e=>{if(e.target===els.modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()})}

initFilters('Series 11');renderCategories();renderFavorites();bindStaticEvents();renderAll();
