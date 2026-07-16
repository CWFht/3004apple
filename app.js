(() => {
  'use strict';
  const DATA = window.APP_DATA;
  if (!DATA || !Array.isArray(DATA.products)) {
    document.body.innerHTML = '<main style="padding:40px;font-family:sans-serif"><h1>데이터를 불러오지 못했습니다.</h1><p>data.js 파일이 index.html과 같은 폴더에 있는지 확인해주세요.</p></main>';
    return;
  }

  const products = DATA.products;
  const byId = new Map(products.map(p => [p.id, p]));
  const CATEGORIES = ['전체','iPhone','iPad','Apple Watch','AirPods','Mac','Accessory','AppleCare+'];
  const CATEGORY_LABEL = {전체:'전체',iPhone:'iPhone',iPad:'iPad','Apple Watch':'Apple Watch',AirPods:'AirPods',Mac:'Mac',Accessory:'액세서리','AppleCare+':'AppleCare+'};
  const FIELD_LABELS = {
    display:'화면', chip:'칩', ram:'RAM', storage:'용량', color:'색상', connectivity:'통신 방식',
    size:'크기', material:'재질', band:'밴드', caseColor:'케이스 색상', bandColor:'밴드 색상',
    cpu:'CPU', gpu:'GPU', charging:'충전 방식', anc:'노이즈 캔슬링', port:'충전 포트',
    compatible:'호환 모델', type:'유형', pencil:'호환 Apple Pencil', keyboard:'호환 키보드',
    features:'특장점', coveredModel:'보장 대상'
  };
  const FILTER_ORDER = ['display','size','storage','connectivity','ram','cpu','gpu','material','band','caseColor','bandColor','color','type','compatible','charging','anc','port','pencil','keyboard'];
  const DISPLAY_ORDER = ['display','chip','size','storage','connectivity','ram','cpu','gpu','material','band','caseColor','bandColor','color','charging','anc','port','type','compatible','pencil','keyboard','features','coveredModel'];
  const OFFICIAL_FACTS = {
    'Apple Watch SE3': [
      ['케이스','40mm 또는 44mm 알루미늄'],['디스플레이','Retina 디스플레이 · 최대 1,000니트'],['추천','가격과 기본 건강·운동 기능을 중시']
    ],
    'Apple Watch Series 11': [
      ['케이스','42mm 또는 46mm · 알루미늄/티타늄'],['디스플레이','상시표시형 Retina · 최대 2,000니트'],['추천','화면과 건강 기능의 균형을 중시']
    ],
    'Apple Watch Ultra3': [
      ['케이스','49mm 티타늄'],['디스플레이','상시표시형 Retina · 최대 3,000니트'],['추천','아웃도어와 전문 운동 활용']
    ],
    'AirPods 4': [['착용','오픈형'],['ANC','미지원'],['배터리','한 번 충전 시 최대 5시간']],
    'AirPods 4(ANC)': [['착용','오픈형'],['ANC','지원'],['방진·생활 방수','IP54']],
    'AirPods Pro 3': [['착용','실리콘 이어팁형'],['배터리','ANC 상태 최대 8시간'],['방진·생활 방수','IP57']],
    'AirPods Pro 2': [['착용','실리콘 이어팁형'],['배터리','ANC 상태 최대 6시간'],['방진·생활 방수','IP54']],
    'AirPods Max': [['착용','오버이어'],['배터리','ANC 상태 최대 20시간'],['추천','몰입형 청취와 헤드폰 착용감']]
  };
  const RECOMMENDED = {
    'iPhone': [['iPhone 17e','iPhone 17'],['iPhone 17','iPhone Air'],['iPhone 17 Pro','iPhone 17 Pro Max']],
    'iPad': [['iPad A16','iPad Air 11'],['iPad Air 11','iPad Pro 11'],['iPad Air 13','iPad Pro 13']],
    'Apple Watch': [['Apple Watch SE3','Apple Watch Series 11'],['Apple Watch Series 11','Apple Watch Ultra3']],
    'AirPods': [['AirPods 4(ANC)','AirPods Pro 3'],['AirPods 4','AirPods 4(ANC)']],
    'Mac': [['MacBook Neo','MacBook Air'],['MacBook Air','MacBook Pro'],['Mac mini','iMac']],
    'Accessory': [], 'AppleCare+': []
  };

  const $ = id => document.getElementById(id);
  const els = {
    viewModeBtn:$('viewModeBtn'), favoritesBtn:$('favoritesBtn'), recentBtn:$('recentBtn'),
    searchInput:$('searchInput'), clearSearchBtn:$('clearSearchBtn'), searchResults:$('searchResults'),
    categoryNav:$('categoryNav'), catalogTitle:$('catalogTitle'), catalogMeta:$('catalogMeta'), sortSelect:$('sortSelect'),
    recommended:$('recommendedComparisons'), productGrid:$('productGrid'), emptyState:$('emptyState'),
    detailPanel:$('detailPanel'), detailEmpty:$('detailEmpty'), detailContent:$('detailContent'), closeDetailBtn:$('closeDetailBtn'),
    detailFavoriteBtn:$('detailFavoriteBtn'), shareBtn:$('shareBtn'), detailImage:$('detailImage'), detailFallback:$('detailFallback'),
    detailCategory:$('detailCategory'), detailFamily:$('detailFamily'), detailDescription:$('detailDescription'), detailStartPrice:$('detailStartPrice'),
    officialLink:$('officialLink'), variantCountBadge:$('variantCountBadge'), appleCareBox:$('appleCareBox'), filterControls:$('filterControls'),
    selectedPrice:$('selectedPrice'), copyCodeBtn:$('copyCodeBtn'), selectedCodeRow:$('selectedCodeRow'), variantSpecs:$('variantSpecs'),
    salesPoints:$('salesPoints'), addCompareBtn:$('addCompareBtn'), compareTray:$('compareTray'), compareCount:$('compareCount'),
    compareTrayItems:$('compareTrayItems'), openCompareBtn:$('openCompareBtn'), modalBackdrop:$('modalBackdrop'), compareContent:$('compareContent'),
    closeModalBtn:$('closeModalBtn'), sideSheetBackdrop:$('sideSheetBackdrop'), sheetTitle:$('sheetTitle'), sheetContent:$('sheetContent'),
    closeSheetBtn:$('closeSheetBtn'), toast:$('toast')
  };

  const state = {
    category:'전체', sort:'name', search:'', selectedId:null, filterKeys:[], selections:{}, selectedVariant:null,
    compareIds:[], favorites:new Set(readStore('appleConsultFavorites',[])), recent:readStore('appleConsultRecent',[]), customerMode:false
  };

  function readStore(key,fallback){try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}}
  function writeStore(key,val){try{localStorage.setItem(key,JSON.stringify(val))}catch{}}
  function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function fmtPrice(n){return Number.isFinite(n)?`${n.toLocaleString('ko-KR')}원`:'가격 확인 필요'}
  function norm(s){return String(s??'').toLowerCase().replace(/\s+/g,'').replace(/[()_\-\/]/g,'')}
  function productSearchText(p){return norm([p.family,p.category,p.description,...p.variants.flatMap(v=>Object.values(v))].join(' '))}
  function getImage(p){return p.image || ''}
  function toast(msg){els.toast.textContent=msg;els.toast.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>els.toast.classList.remove('show'),1800)}
  async function copyText(text){try{await navigator.clipboard.writeText(text);toast('클립보드에 복사했습니다.')}catch{const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();toast('클립보드에 복사했습니다.')}}

  function renderCategories(){
    els.categoryNav.innerHTML=CATEGORIES.map(cat=>{
      const count=cat==='전체'?products.length:products.filter(p=>p.category===cat).length;
      return `<button class="category-btn ${state.category===cat?'active':''}" data-cat="${esc(cat)}">${esc(CATEGORY_LABEL[cat])}<span>${count}</span></button>`;
    }).join('');
    els.categoryNav.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{
      state.category=b.dataset.cat; state.search=''; els.searchInput.value=''; hideSearch(); els.detailPanel.classList.remove('mobile-open'); renderAll();
    });
  }

  function filteredProducts(){
    let list=products.filter(p=>state.category==='전체'||p.category===state.category);
    const q=norm(state.search);
    if(q) list=list.filter(p=>productSearchText(p).includes(q));
    return list.sort((a,b)=>{
      if(state.sort==='price-asc') return (a.minPrice??Infinity)-(b.minPrice??Infinity);
      if(state.sort==='price-desc') return (b.minPrice??-1)-(a.minPrice??-1);
      if(state.sort==='variants') return b.variants.length-a.variants.length;
      return a.family.localeCompare(b.family,'ko');
    });
  }

  function renderRecommended(){
    const cat=state.category==='전체'?'Apple Watch':state.category;
    const combos=RECOMMENDED[cat]||[];
    els.recommended.innerHTML=combos.length?combos.map(([a,b])=>`<button data-a="${esc(a)}" data-b="${esc(b)}">${esc(a)} vs ${esc(b)}</button>`).join(''):'';
    els.recommended.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{
      const a=products.find(p=>p.family===btn.dataset.a), b=products.find(p=>p.family===btn.dataset.b);
      if(a&&b){state.compareIds=[a.id,b.id];renderCompareTray();openCompare();}
    });
  }

  function productCard(p){
    const img=getImage(p);
    return `<article class="product-card ${state.selectedId===p.id?'selected':''}" data-id="${esc(p.id)}">
      <button class="favorite-dot ${state.favorites.has(p.id)?'on':''}" data-fav="${esc(p.id)}" aria-label="즐겨찾기">${state.favorites.has(p.id)?'♥':'♡'}</button>
      <div class="product-image">${img?`<img src="${esc(img)}" alt="${esc(p.family)}" onerror="this.style.display='none';this.nextElementSibling.hidden=false"><div class="fallback-art" hidden></div>`:'<div class="fallback-art"></div>'}</div>
      <span class="category-label">${esc(CATEGORY_LABEL[p.category]||p.category)}</span><h3>${esc(p.family)}</h3>
      <div class="product-bottom"><strong>${p.minPrice?`${fmtPrice(p.minPrice)}부터`:'가격 확인'}</strong><span>${p.variants.length}개 옵션</span></div>
    </article>`;
  }

  function renderCatalog(){
    const list=filteredProducts();
    const title=state.search?`“${state.search}” 검색 결과`:CATEGORY_LABEL[state.category];
    els.catalogTitle.textContent=title;
    els.catalogMeta.textContent=`제품군 ${list.length}개 · 모델 옵션 ${list.reduce((n,p)=>n+p.variants.length,0).toLocaleString()}개`;
    els.productGrid.innerHTML=list.map(productCard).join('');
    els.emptyState.hidden=list.length!==0;
    els.productGrid.querySelectorAll('.product-card').forEach(card=>card.onclick=e=>{
      if(e.target.closest('[data-fav]'))return;
      selectProduct(card.dataset.id);
    });
    els.productGrid.querySelectorAll('[data-fav]').forEach(btn=>btn.onclick=e=>{e.stopPropagation();toggleFavorite(btn.dataset.fav);});
  }

  function productFilterKeys(p){
    const keys=new Set();p.variants.forEach(v=>Object.keys(v).forEach(k=>{if(!['price','modelCode','features','coveredModel'].includes(k))keys.add(k)}));
    return FILTER_ORDER.filter(k=>keys.has(k)&&new Set(p.variants.map(v=>v[k]).filter(Boolean)).size>1);
  }
  function initSelections(p,preferredVariant){
    state.filterKeys=productFilterKeys(p);state.selections={};
    const v=preferredVariant||p.variants[0]||{};
    state.filterKeys.forEach(k=>{if(v[k]!=null)state.selections[k]=String(v[k])});
    state.selectedVariant=v;
  }
  function candidatesBefore(p,index){
    return p.variants.filter(v=>state.filterKeys.slice(0,index).every(k=>!state.selections[k]||String(v[k])===state.selections[k]));
  }
  function matchingVariants(p){return p.variants.filter(v=>state.filterKeys.every(k=>!state.selections[k]||String(v[k])===state.selections[k]));}
  function ensureValidSelection(p){
    state.filterKeys.forEach((key,index)=>{
      const vals=[...new Set(candidatesBefore(p,index).map(v=>v[key]).filter(v=>v!==undefined&&v!==''))].map(String);
      if(!vals.includes(state.selections[key]))state.selections[key]=vals[0]||'';
    });
    state.selectedVariant=matchingVariants(p)[0]||p.variants[0]||{};
  }

  function renderDetail(){
    const p=byId.get(state.selectedId);
    if(!p){els.detailEmpty.hidden=false;els.detailContent.hidden=true;return}
    ensureValidSelection(p);
    const v=state.selectedVariant||{};
    els.detailEmpty.hidden=true;els.detailContent.hidden=false;
    els.detailCategory.textContent=CATEGORY_LABEL[p.category]||p.category;els.detailFamily.textContent=p.family;els.detailDescription.textContent=p.description;
    els.detailStartPrice.textContent=p.minPrice?`${fmtPrice(p.minPrice)}부터`:'가격 정보 확인 필요';els.variantCountBadge.textContent=`${p.variants.length}개 모델 옵션`;
    els.officialLink.href=p.sourceUrl||'#';els.officialLink.style.display=p.sourceUrl?'inline':'none';
    const img=getImage(p);els.detailImage.style.display=img?'block':'none';els.detailFallback.hidden=!!img;
    if(img){els.detailImage.src=img;els.detailImage.alt=p.family;els.detailImage.onerror=()=>{els.detailImage.style.display='none';els.detailFallback.hidden=false;}}
    els.detailFavoriteBtn.textContent=state.favorites.has(p.id)?'♥':'♡';els.detailFavoriteBtn.classList.toggle('on',state.favorites.has(p.id));
    renderCare(p);renderFilters(p);renderVariant(p,v);renderSalesPoints(p);
    els.addCompareBtn.textContent=state.compareIds.includes(p.id)?'비교함에서 제거':'비교함에 추가';
  }

  function careOptionsFor(p,v={}){
    let options=[...(p.appleCareOptions||[])];
    const display=String(v.display||'');
    if((p.family==='MacBook Air'||p.family==='MacBook Pro')&&display){
      const size=(display.match(/13|14|15|16/)||[])[0];
      if(size){const sized=options.filter(o=>String(o.variant.coveredModel||'').includes(size));if(sized.length)options=sized;}
    }
    return options;
  }
  function careSummary(p,v={}){
    const o=careOptionsFor(p,v)[0];
    return o?`${o.family.replace('AppleCare+ ','')} · ${fmtPrice(o.variant.price)}`:'—';
  }
  function renderCare(p){
    const options=careOptionsFor(p,state.selectedVariant||{});
    if(options.length){
      const o=options[0],c=o.variant;els.appleCareBox.hidden=false;
      els.appleCareBox.innerHTML=`<strong>AppleCare+ 함께 확인</strong><div><span>${esc(o.family.replace('AppleCare+ ',''))}</span><b>${fmtPrice(c.price)}</b></div><div class="internal-only"><span>모델코드</span><b>${esc(c.modelCode||'')}</b></div>${options.length>1?`<small style="display:block;margin-top:7px;color:#58708a">동일 제품군 AppleCare+ ${options.length}종 운영 · 선택 모델의 세대를 확인하세요.</small>`:''}`;
    }else els.appleCareBox.hidden=true;
  }

  function renderFilters(p){
    if(!state.filterKeys.length){els.filterControls.innerHTML='<p style="color:var(--muted);font-size:14px">선택 가능한 추가 옵션이 없습니다.</p>';return}
    els.filterControls.innerHTML=state.filterKeys.map((key,index)=>{
      const vals=[...new Set(candidatesBefore(p,index).map(v=>v[key]).filter(v=>v!==undefined&&v!==''))].map(String);
      return `<div class="filter-row"><div class="filter-label">${esc(FIELD_LABELS[key]||key)}</div><div class="filter-values">${vals.map(val=>`<button class="filter-chip ${state.selections[key]===val?'active':''}" data-key="${esc(key)}" data-index="${index}" data-value="${esc(val)}">${esc(val)}</button>`).join('')}</div></div>`;
    }).join('');
    els.filterControls.querySelectorAll('.filter-chip').forEach(btn=>btn.onclick=()=>{
      const index=Number(btn.dataset.index);state.selections[btn.dataset.key]=btn.dataset.value;
      state.filterKeys.slice(index+1).forEach(k=>delete state.selections[k]);ensureValidSelection(p);renderDetail();
    });
  }

  function renderVariant(p,v){
    els.selectedPrice.textContent=fmtPrice(v.price);els.selectedCodeRow.innerHTML=`<span class="internal-only">${esc(v.modelCode||'모델코드 없음')}</span><span class="customer-only" style="display:none">선택 옵션이 적용되었습니다.</span>${v.warning?`<small class="data-warning internal-only">⚠ ${esc(v.warning)}</small>`:''}`;
    els.copyCodeBtn.disabled=!v.modelCode;els.copyCodeBtn.classList.add('internal-only');
    const keys=DISPLAY_ORDER.filter(k=>v[k]!==undefined&&v[k]!==''&&k!=='features');
    els.variantSpecs.innerHTML=keys.map(k=>`<div><dt>${esc(FIELD_LABELS[k]||k)}</dt><dd>${esc(v[k])}</dd></div>`).join('');
    if(v.features)els.variantSpecs.innerHTML+=`<div style="grid-column:1/-1"><dt>특장점</dt><dd>${esc(v.features)}</dd></div>`;
  }

  function renderSalesPoints(p){
    const facts=OFFICIAL_FACTS[p.family]||[];
    const generic=[['추천 고객',p.description],['옵션 범위',`${p.variants.length}개 모델코드 운영`]];
    const all=[...facts,...generic].slice(0,4);
    els.salesPoints.innerHTML=all.map(([t,d])=>`<article class="point-card"><strong>${esc(t)}</strong><p>${esc(d)}</p></article>`).join('');
  }

  function selectProduct(id,variant,options={}){
    const p=byId.get(id);if(!p)return;
    state.selectedId=id;initSelections(p,variant);addRecent(id);renderCatalog();renderDetail();
    if(window.innerWidth<=900&&options.openMobile!==false)els.detailPanel.classList.add('mobile-open');
  }
  function addRecent(id){state.recent=[id,...state.recent.filter(x=>x!==id)].slice(0,20);writeStore('appleConsultRecent',state.recent)}
  function toggleFavorite(id){state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);writeStore('appleConsultFavorites',[...state.favorites]);renderCatalog();if(state.selectedId===id)renderDetail()}

  function searchEntries(q){
    const nq=norm(q);if(!nq)return[];const out=[];
    products.forEach(p=>{
      let found=false;
      p.variants.forEach(v=>{
        const text=norm([p.family,...Object.values(v)].join(' '));
        if(text.includes(nq)&&out.length<30){out.push({p,v,score:norm(v.modelCode||'')===nq?0:norm(p.family).startsWith(nq)?1:2});found=true}
      });
      if(!found&&norm([p.family,p.description].join(' ')).includes(nq)&&out.length<30)out.push({p,v:p.variants[0],score:3});
    });
    const seen=new Set();return out.sort((a,b)=>a.score-b.score).filter(x=>{const k=`${x.p.id}:${x.v?.modelCode||''}`;if(seen.has(k))return false;seen.add(k);return true}).slice(0,20);
  }
  function renderSearch(){
    const q=els.searchInput.value.trim();state.search=q;renderCatalog();
    if(!q){hideSearch();return}
    const results=searchEntries(q);els.searchResults.hidden=false;
    els.searchResults.innerHTML=results.length?results.map((x,i)=>`<button class="search-result ${i===0?'active':''}" data-id="${esc(x.p.id)}" data-code="${esc(x.v?.modelCode||'')}">${x.p.image?`<img src="${esc(x.p.image)}" alt="">`:'<div class="mini-fallback"></div>'}<div><strong>${esc(x.p.family)}</strong><span>${esc([x.v?.storage,x.v?.size,x.v?.color,x.v?.compatible].filter(Boolean).join(' · ')||x.p.category)}</span></div>${x.v?.modelCode?`<code class="internal-only">${esc(x.v.modelCode)}</code>`:''}</button>`).join(''):'<div style="padding:22px;text-align:center;color:var(--muted)">검색 결과가 없습니다.</div>';
    els.searchResults.querySelectorAll('.search-result').forEach(btn=>btn.onclick=()=>{
      const p=byId.get(btn.dataset.id);const v=p?.variants.find(v=>v.modelCode===btn.dataset.code)||p?.variants[0];
      if(p){state.category=p.category;renderCategories();selectProduct(p.id,v);hideSearch();}
    });
  }
  function hideSearch(){els.searchResults.hidden=true}

  function renderCompareTray(){
    const ids=state.compareIds.filter(id=>byId.has(id));state.compareIds=ids;els.compareTray.hidden=!ids.length;els.compareCount.textContent=ids.length;
    els.compareTrayItems.className='compare-tray-items';els.compareTrayItems.innerHTML=ids.map(id=>`<span class="tray-item">${esc(byId.get(id).family)}<button data-remove="${esc(id)}">×</button></span>`).join('');
    els.compareTrayItems.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{state.compareIds=state.compareIds.filter(id=>id!==b.dataset.remove);renderCompareTray();renderDetail()});
    els.openCompareBtn.disabled=ids.length<2;
  }
  function toggleCompare(id){
    if(state.compareIds.includes(id))state.compareIds=state.compareIds.filter(x=>x!==id);
    else if(state.compareIds.length<2)state.compareIds.push(id);
    else{toast('비교는 두 제품까지 가능합니다.');return}
    renderCompareTray();renderDetail();
  }
  function uniqueSummary(p,key){const vals=[...new Set(p.variants.map(v=>v[key]).filter(Boolean).map(String))];return vals.length?vals.slice(0,8).join(' / '):'—'}
  function openCompare(){
    if(state.compareIds.length<2){toast('비교할 제품 두 개를 선택하세요.');return}
    const [a,b]=state.compareIds.map(id=>byId.get(id));if(!a||!b)return;
    const keys=[...new Set([...DISPLAY_ORDER.filter(k=>a.variants.some(v=>v[k])),...DISPLAY_ORDER.filter(k=>b.variants.some(v=>v[k]))])].filter(k=>!['features','coveredModel'].includes(k)).slice(0,12);
    els.compareContent.innerHTML=`<div class="compare-head-grid"><div></div>${[a,b].map(p=>`<div class="compare-product-head">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.family)}">`:''}<h3>${esc(p.family)}</h3><strong>${p.minPrice?`${fmtPrice(p.minPrice)}부터`:'가격 확인'}</strong><p>${p.variants.length}개 옵션</p></div>`).join('')}</div>
      <table class="compare-table"><tbody><tr><th>상담 핵심</th><td>${esc(a.description)}</td><td>${esc(b.description)}</td></tr><tr><th>시작 가격</th><td>${fmtPrice(a.minPrice)}</td><td>${fmtPrice(b.minPrice)}</td></tr>${keys.map(k=>`<tr><th>${esc(FIELD_LABELS[k]||k)}</th><td>${esc(uniqueSummary(a,k))}</td><td>${esc(uniqueSummary(b,k))}</td></tr>`).join('')}<tr><th>AppleCare+</th><td>${esc(careSummary(a,a.variants[0]||{}))}</td><td>${esc(careSummary(b,b.variants[0]||{}))}</td></tr></tbody></table>
      <div class="compare-advice"><article class="advice-card"><strong>${esc(a.family)} 추천</strong><p>${esc(a.description)}</p></article><article class="advice-card"><strong>${esc(b.family)} 추천</strong><p>${esc(b.description)}</p></article></div>`;
    els.modalBackdrop.hidden=false;document.body.style.overflow='hidden';
  }
  function closeCompare(){els.modalBackdrop.hidden=true;document.body.style.overflow=''}

  function showSheet(type){
    const ids=type==='favorites'?[...state.favorites]:state.recent;els.sheetTitle.textContent=type==='favorites'?'즐겨찾기':'최근 조회';
    const list=ids.map(id=>byId.get(id)).filter(Boolean);els.sheetContent.innerHTML=list.length?list.map(p=>`<button class="sheet-item" data-id="${esc(p.id)}"><div><strong>${esc(p.family)}</strong><small>${esc(CATEGORY_LABEL[p.category])} · ${p.minPrice?fmtPrice(p.minPrice)+'부터':'가격 확인'}</small></div><span>›</span></button>`).join(''):'<p style="color:var(--muted);padding:30px 0;text-align:center">저장된 제품이 없습니다.</p>';
    els.sheetContent.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{const p=byId.get(b.dataset.id);state.category=p.category;renderCategories();selectProduct(p.id);closeSheet()});
    els.sideSheetBackdrop.hidden=false;
  }
  function closeSheet(){els.sideSheetBackdrop.hidden=true}

  function setCustomerMode(on){state.customerMode=on;document.body.classList.toggle('customer-mode',on);els.viewModeBtn.textContent=on?'고객 보기':'내부 직원용';document.querySelectorAll('.customer-only').forEach(el=>el.style.display=on?'inline':'none');renderSearch()}
  function renderAll(){renderCategories();renderRecommended();renderCatalog();renderDetail();renderCompareTray()}

  els.sortSelect.onchange=()=>{state.sort=els.sortSelect.value;renderCatalog()};
  els.searchInput.oninput=renderSearch;els.searchInput.onkeydown=e=>{if(e.key==='Enter'){const first=els.searchResults.querySelector('.search-result');if(first)first.click()}if(e.key==='Escape')hideSearch()};
  els.clearSearchBtn.onclick=()=>{els.searchInput.value='';state.search='';hideSearch();renderCatalog();els.searchInput.focus()};
  document.querySelectorAll('[data-query]').forEach(b=>b.onclick=()=>{els.searchInput.value=b.dataset.query;renderSearch();els.searchInput.focus()});
  document.addEventListener('click',e=>{if(!e.target.closest('.search-area'))hideSearch()});
  els.closeDetailBtn.onclick=()=>els.detailPanel.classList.remove('mobile-open');
  els.detailFavoriteBtn.onclick=()=>state.selectedId&&toggleFavorite(state.selectedId);
  els.copyCodeBtn.onclick=()=>state.selectedVariant?.modelCode&&copyText(state.selectedVariant.modelCode);
  els.shareBtn.onclick=()=>{const p=byId.get(state.selectedId),v=state.selectedVariant;if(p&&v)copyText(`${p.family}\n${Object.entries(v).filter(([k])=>!['features'].includes(k)).map(([k,val])=>`${FIELD_LABELS[k]||k}: ${val}`).join('\n')}`)};
  els.addCompareBtn.onclick=()=>state.selectedId&&toggleCompare(state.selectedId);els.openCompareBtn.onclick=openCompare;els.closeModalBtn.onclick=closeCompare;els.modalBackdrop.onclick=e=>{if(e.target===els.modalBackdrop)closeCompare()};
  els.favoritesBtn.onclick=()=>showSheet('favorites');els.recentBtn.onclick=()=>showSheet('recent');els.closeSheetBtn.onclick=closeSheet;els.sideSheetBackdrop.onclick=e=>{if(e.target===els.sideSheetBackdrop)closeSheet()};
  els.viewModeBtn.onclick=()=>setCustomerMode(!state.customerMode);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){hideSearch();closeCompare();closeSheet();els.detailPanel.classList.remove('mobile-open')}});

  renderAll();
  const initial=products.find(p=>p.family==='iPhone 17')||products[0];if(initial)selectProduct(initial.id,null,{openMobile:false});
})();
