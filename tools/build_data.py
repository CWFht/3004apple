from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE
from pathlib import Path
from collections import defaultdict
from PIL import Image
from io import BytesIO
import json, re

PPT = Path('/mnt/data/Apple_2026_09.pptx')
ROOT = Path('/mnt/data/apple-consult-2026-09')
ASSET = ROOT/'assets'/'products'
ASSET.mkdir(parents=True, exist_ok=True)
prs = Presentation(str(PPT))


def clean(s):
    if s is None: return ''
    s = str(s).replace('\x0b',' ').replace('\n',' / ').replace('”','"').replace('“','"')
    s = re.sub(r'\s+',' ',s).strip()
    s = re.sub(r'\s*/\s*',' / ',s)
    return s


def money(s):
    s=clean(s).replace(' ','').replace(',','')
    m=re.search(r'\d+',s)
    return int(m.group()) if m else None


def slugify(s):
    s=s.lower().replace('+','plus')
    s=re.sub(r'[^a-z0-9가-힣]+','-',s).strip('-')
    return s


def rows(slide_no, table_idx=0):
    tables=[sh.table for sh in prs.slides[slide_no-1].shapes if sh.has_table]
    t=tables[table_idx]
    return [[clean(t.cell(r,c).text) for c in range(len(t.columns))] for r in range(len(t.rows))]


def ffill_table(data, cols):
    last={c:'' for c in cols}
    out=[]
    for row in data:
        row=row[:]
        for c in cols:
            if c < len(row):
                if row[c]: last[c]=row[c]
                else: row[c]=last[c]
        out.append(row)
    return out


def normalize_family(s):
    s=clean(s).replace(' / ',' ')
    s=re.sub(r'(?i)^iphone\s*(\d+)', r'iPhone \1', s)
    s=re.sub(r'(?i)\bpromax\b','Pro Max',s)
    s=re.sub(r'(?i)\bpro\b','Pro',s)
    s=re.sub(r'(?i)^mac\s+mini$','Mac mini',s)
    s=re.sub(r'(?i)^mac\s+studio$','Mac Studio',s)
    s=re.sub(r'\s+',' ',s).strip()
    return s


def normalize_code(v):
    v=clean(v)
    v=re.sub(r'\s*/\s*','/',v).replace(' ','').upper()
    v=v.replace('//','/')
    return v


def add_product(store, category, family, variant, image=None, description='', source_url='', source_label='Apple 공식 비교'):
    family=normalize_family(family)
    key=f'{category}::{family}'
    if key not in store:
        store[key]={
            'id': slugify(key), 'category': category, 'family': family,
            'image': image or '', 'description': description,
            'sourceUrl': source_url, 'sourceLabel': source_label,
            'variants': []
        }
    if image and not store[key]['image']: store[key]['image']=image
    clean_variant={}
    for k,v in variant.items():
        if v in ('',None,'-'): continue
        if k=='modelCode' and isinstance(v,str): v=normalize_code(v)
        clean_variant[k]=v
    if clean_variant:
        store[key]['variants'].append(clean_variant)


def recursive_pictures(shapes):
    out=[]
    for sh in shapes:
        if sh.shape_type == MSO_SHAPE_TYPE.PICTURE:
            out.append(sh)
        elif sh.shape_type == MSO_SHAPE_TYPE.GROUP:
            out.extend(recursive_pictures(sh.shapes))
    return out


def extract_picture(slide_no, pic_idx, family):
    pics=recursive_pictures(prs.slides[slide_no-1].shapes)
    if pic_idx-1 >= len(pics): return ''
    sh=pics[pic_idx-1]
    blob=sh.image.blob
    fn=f'{slugify(family)}.webp'
    try:
        im=Image.open(BytesIO(blob)).convert('RGBA')
        im.save(ASSET/fn,'WEBP',quality=91,method=6)
        return f'assets/products/{fn}'
    except Exception:
        ext=sh.image.ext or 'png'
        fn=f'{slugify(family)}.{ext}'
        (ASSET/fn).write_bytes(blob)
        return f'assets/products/{fn}'

# New/current product images from the September deck. Unchanged items keep the copied July assets.
new_image_map={
    'iPhone 18 Pro':(3,3),
    'iPhone 18 Pro Max':(3,4),
    'Apple Watch Series 12':(14,4),
    'Apple Watch Ultra 4':(20,8),
    'AirPods 5':(22,6),
    'AirPods 5 (무선 충전)':(22,5),
}
for fam,(sn,pi) in new_image_map.items():
    extract_picture(sn,pi,fam)


def asset_for(family):
    p=ASSET/f'{slugify(family)}.webp'
    return f'assets/products/{p.name}' if p.exists() else ''

source_urls={
 'iPhone':'https://www.apple.com/kr/iphone/compare/',
 'iPad':'https://www.apple.com/kr/ipad/compare/',
 'Apple Watch':'https://www.apple.com/kr/watch/compare/',
 'AirPods':'https://www.apple.com/kr/airpods/compare/',
 'Mac':'https://www.apple.com/kr/mac/compare/',
 'Accessory':'https://www.apple.com/kr/shop/accessories/all',
 'AppleCare+':'https://www.apple.com/kr/support/products/'
}

descriptions={
 'iPhone 18 Pro':'A20 Pro, 가변 조리개 48MP 프로 카메라와 긴 배터리를 갖춘 최신 Pro 모델입니다.',
 'iPhone 18 Pro Max':'6.9형 대화면과 최대 43시간 동영상 재생을 제공하는 최신 최상위 iPhone입니다.',
 'iPhone 17e':'실속형 iPhone. 가격과 기본 사용성을 중시하는 고객에게 적합합니다.',
 'iPhone 17':'표준형 iPhone. 화면, 성능, 카메라의 균형을 원하는 고객에게 적합합니다.',
 'iPhone Air':'큰 화면과 얇고 가벼운 사용감을 우선하는 고객에게 적합합니다.',
 'iPhone 17 Pro':'고성능과 프로급 촬영 기능을 원하는 고객을 위한 모델입니다.',
 'iPhone 17 Pro Max':'큰 화면과 프로급 성능을 원하는 고객에게 적합합니다.',
 'iPhone 16e':'가격을 낮추면서 iPhone 핵심 경험을 원하는 고객에게 적합합니다.',
 'iPad A16':'학습, 영상, 기본 문서 작업 중심의 입문형 iPad입니다.',
 'iPad Air 11':'휴대성과 성능의 균형이 좋은 범용 iPad입니다.',
 'iPad Air 13':'큰 화면에서 필기, 영상, 문서 작업을 원하는 고객에게 적합합니다.',
 'iPad Pro 11':'M5 기반의 휴대 가능한 프로 작업용 iPad입니다.',
 'iPad Pro 13':'M5와 대화면을 원하는 전문 작업 고객에게 적합합니다.',
 'iPad mini':'작고 가벼운 휴대성을 최우선으로 하는 고객에게 적합합니다.',
 'Apple Watch Series 12':'S11 칩과 새로운 건강 감지 시스템, 준비 상태 기능을 갖춘 최신 표준형 Apple Watch입니다.',
 'Apple Watch Series 11':'상시표시 화면과 건강 기능을 원하는 고객에게 적합합니다.',
 'Apple Watch SE 3':'기본 알림, 운동, 건강 관리와 가격을 중시하는 고객에게 적합합니다.',
 'Apple Watch Ultra 4':'최대 50시간 일반 사용과 최대 45시간 장시간 운동 추적을 지원하는 최신 Ultra입니다.',
 'AirPods 5':'ANC를 기본 탑재한 최신 오픈형 AirPods입니다.',
 'AirPods 5 (무선 충전)':'무선 충전과 스와이프 음량 조절, 더 긴 배터리를 더한 최신 AirPods 5 상위 모델입니다.',
 'AirPods 4':'편안한 오픈형 착용감과 기본 기능을 원하는 고객에게 적합합니다.',
 'AirPods 4(ANC)':'오픈형 착용감은 유지하면서 노이즈 캔슬링이 필요한 고객에게 적합합니다.',
 'AirPods Pro 3':'차음성, 강한 노이즈 캔슬링, 운동 활용을 중시하는 고객에게 적합합니다.',
 'AirPods Pro 2':'실리콘 이어팁 기반 ANC AirPods Pro 모델입니다.',
 'AirPods Max':'오버이어 착용감과 몰입형 청취를 원하는 고객에게 적합합니다.',
 'MacBook Neo':'가벼운 일상 작업과 합리적인 가격을 우선하는 고객에게 적합합니다.',
 'MacBook Air':'휴대성, 긴 사용 시간, 일상 및 업무 성능의 균형이 좋은 모델입니다.',
 'MacBook Pro':'고성능 작업, 영상 편집, 개발 등 전문 작업을 위한 모델입니다.',
 'iMac':'본체와 디스플레이가 결합된 깔끔한 데스크톱 환경에 적합합니다.',
 'Mac mini':'기존 모니터와 주변기기를 활용하는 소형 데스크톱입니다.',
 'Mac Studio':'고성능 데스크톱 작업 환경이 필요한 전문가용 모델입니다.'
}

chip_map={
 'iPhone 18 Pro':'A20 Pro','iPhone 18 Pro Max':'A20 Pro','iPhone 17e':'A19','iPhone 17':'A19','iPhone Air':'A19 Pro','iPhone 17 Pro':'A19 Pro','iPhone 17 Pro Max':'A19 Pro','iPhone 16e':'A18',
 'iPad Pro 11':'M5','iPad Pro 13':'M5','iPad Air 11':'M4','iPad Air 13':'M4','iPad A16':'A16','iPad mini':'A17 Pro',
 'Apple Watch Series 12':'S11','Apple Watch Series 11':'S10','Apple Watch SE 3':'S10','Apple Watch Ultra 4':'S11',
 'MacBook Neo':'A18 Pro','MacBook Air':'M5','MacBook Pro':'M5 / M5 Pro / M5 Max','iMac':'M4','Mac mini':'M4 / M4 Pro','Mac Studio':'M4 Max / M3 Ultra'
}

store={}

# iPhone (current September operating lineup)
for sn in [3,4,5,6]:
    data=ffill_table(rows(sn)[1:],[0,3,4,5,6])
    for r in data:
        fam=normalize_family(r[0])
        if not fam or len(r)<9 or not r[8]: continue
        chip=chip_map.get(fam,'')
        add_product(store,'iPhone',fam,{
            'chip':chip,'display':r[3], 'ram':r[4], 'storage':r[5], 'price':money(r[6]), 'color':r[7], 'modelCode':r[8]
        },asset_for(fam),descriptions.get(fam,''),source_urls['iPhone'])

# iPad
for sn in [9,10,11,12]:
    data=ffill_table(rows(sn)[2:],[0,3,4,5,9,10])
    for r in data:
        fam=normalize_family(r[0])
        if not fam: continue
        for conn,pc,cc in [('Wi-Fi',4,7),('Cellular',5,8)]:
            code=r[cc] if cc < len(r) else ''
            if code and code!='-':
                add_product(store,'iPad',fam,{
                    'chip':chip_map.get(fam,''),'storage':r[3], 'connectivity':conn, 'price':money(r[pc]), 'color':r[6], 'modelCode':code,
                    'pencil':r[9], 'keyboard':r[10]
                },asset_for(fam),descriptions.get(fam,''),source_urls['iPad'])

# Watch Series 12 aluminum/titanium (slides 14,15)
for sn in [14,15]:
    data=ffill_table(rows(sn)[2:],[0,2,3,5,6])
    for r in data:
        if normalize_family(r[0])!='Series 12': continue
        fam='Apple Watch Series 12'
        base={'chip':'S11','size':r[2],'material':r[3],'band':r[4],'caseColor':r[7],'bandColor':r[8]}
        if r[9] and r[9]!='-': add_product(store,'Apple Watch',fam,{**base,'connectivity':'GPS','price':money(r[5]),'modelCode':r[9]},asset_for(fam),descriptions[fam],source_urls['Apple Watch'])
        if r[10] and r[10]!='-': add_product(store,'Apple Watch',fam,{**base,'connectivity':'GPS + Cellular','price':money(r[6]),'modelCode':r[10]},asset_for(fam),descriptions[fam],source_urls['Apple Watch'])

# Watch Series 12 ceramic (different column order)
for r in ffill_table(rows(16)[2:],[0,2,3,5,6]):
    if normalize_family(r[0])!='Series 12': continue
    fam='Apple Watch Series 12'
    base={'chip':'S11','size':r[3],'material':r[2],'band':r[4],'caseColor':r[7],'bandColor':r[8]}
    if r[10] and r[10]!='-': add_product(store,'Apple Watch',fam,{**base,'connectivity':'GPS + Cellular','price':money(r[6]),'modelCode':r[10]},asset_for(fam),descriptions[fam],source_urls['Apple Watch'])

# Watch Series 11
for sn in [17,18]:
    for r in ffill_table(rows(sn)[2:],[0,2,3,5,6]):
        if normalize_family(r[0])!='Series 11': continue
        fam='Apple Watch Series 11'
        base={'chip':'S10','size':r[2],'material':r[3],'band':r[4],'caseColor':r[7],'bandColor':r[8]}
        if r[9] and r[9]!='-': add_product(store,'Apple Watch',fam,{**base,'connectivity':'GPS','price':money(r[5]),'modelCode':r[9]},asset_for(fam),descriptions[fam],source_urls['Apple Watch'])
        if r[10] and r[10]!='-': add_product(store,'Apple Watch',fam,{**base,'connectivity':'GPS + Cellular','price':money(r[6]),'modelCode':r[10]},asset_for(fam),descriptions[fam],source_urls['Apple Watch'])

# Watch SE 3
for r in ffill_table(rows(19)[2:],[0,2,3,5,6]):
    fam='Apple Watch SE 3'
    base={'chip':'S10','size':r[2],'material':r[3],'band':r[4],'caseColor':r[7],'bandColor':r[8]}
    if r[9] and r[9]!='-': add_product(store,'Apple Watch',fam,{**base,'connectivity':'GPS','price':money(r[5]),'modelCode':r[9]},asset_for('Apple Watch SE3') or asset_for(fam),descriptions[fam],source_urls['Apple Watch'])
    if r[10] and r[10]!='-': add_product(store,'Apple Watch',fam,{**base,'connectivity':'GPS + Cellular','price':money(r[6]),'modelCode':r[10]},asset_for('Apple Watch SE3') or asset_for(fam),descriptions[fam],source_urls['Apple Watch'])

# Watch Ultra 4
for r in ffill_table(rows(20)[2:],[0,2,3,5]):
    fam='Apple Watch Ultra 4'
    if len(r)>8 and r[8] and r[8]!='-':
        add_product(store,'Apple Watch',fam,{'chip':'S11','size':r[2],'material':r[3],'band':r[4],'connectivity':'GPS + Cellular','price':money(r[5]),'caseColor':r[6],'bandColor':r[7],'modelCode':r[8]},asset_for(fam),descriptions[fam],source_urls['Apple Watch'])

# AirPods
for r in ffill_table(rows(22)[1:],[0,4]):
    fam=normalize_family(r[0])
    if fam=='AirPods 5 (무선 충전)': pass
    elif fam.startswith('AirPods 5') and '무선 충전' in fam: fam='AirPods 5 (무선 충전)'
    if not fam or not r[3]: continue
    add_product(store,'AirPods',fam,{'color':r[2],'modelCode':r[3],'price':money(r[4]),'charging':r[5],'anc':'지원' if r[6]=='O' else '미지원','port':r[7]},asset_for(fam),descriptions.get(fam,''),source_urls['AirPods'])

# Mac
for r in ffill_table(rows(24)[1:],[0,2,4,5,6,7,10]):
    fam='iMac'
    add_product(store,'Mac',fam,{'chip':chip_map[fam],'display':r[2],'cpu':r[4],'gpu':r[5],'ram':r[6],'storage':r[7],'color':r[8],'modelCode':r[9],'price':money(r[10])},asset_for(fam),descriptions[fam],source_urls['Mac'])
for r in ffill_table(rows(25)[1:],[0,3,4,5,8]):
    fam='MacBook Neo'
    add_product(store,'Mac',fam,{'chip':chip_map[fam],'display':r[3],'ram':r[4],'storage':r[5],'color':re.sub(r'\s+','',r[6]),'modelCode':r[7],'price':money(r[8])},asset_for(fam),descriptions[fam],source_urls['Mac'])
for r in ffill_table(rows(26)[1:],[0,3,4,5,6,7,10]):
    fam='MacBook Air'
    add_product(store,'Mac',fam,{'chip':chip_map[fam],'display':r[3],'cpu':r[4],'gpu':r[5],'ram':r[6],'storage':r[7],'color':r[8],'modelCode':r[9],'price':money(r[10])},asset_for(fam),descriptions[fam],source_urls['Mac'])
for r in ffill_table(rows(27)[1:],[0,2,4,5,6,7,10]):
    fam='MacBook Pro'
    add_product(store,'Mac',fam,{'chip':'M5 Pro / M5 Max','display':r[2],'cpu':r[4],'gpu':r[5],'storage':r[6],'ram':r[7],'color':r[8],'modelCode':r[9],'price':money(r[10])},asset_for(fam),descriptions[fam],source_urls['Mac'])
for r in ffill_table(rows(28)[1:],[0,2,4,5,6,7,10]):
    fam='MacBook Pro'
    add_product(store,'Mac',fam,{'chip':'M5','display':r[2],'cpu':r[4],'gpu':r[5],'ram':r[6],'storage':r[7],'color':r[8],'modelCode':r[9],'price':money(r[10])},asset_for(fam),descriptions[fam],source_urls['Mac'])
for r in ffill_table(rows(29)[1:],[0,3,4,5,6,9]):
    fam='Mac mini'
    add_product(store,'Mac',fam,{'chip':chip_map[fam],'cpu':r[3],'gpu':r[4],'ram':r[5],'storage':r[6],'color':r[7],'modelCode':r[8],'price':money(r[9])},asset_for(fam),descriptions[fam],source_urls['Mac'])
for r in ffill_table(rows(30)[1:],[0,3,4,5,6,9]):
    fam='Mac Studio'
    add_product(store,'Mac',fam,{'chip':chip_map[fam],'cpu':r[3],'gpu':r[4],'ram':r[5],'storage':r[6],'color':r[7],'modelCode':r[8],'price':money(r[9])},asset_for(fam),descriptions[fam],source_urls['Mac'])

# Accessories — September deck
r32=rows(32)
model_targets=['iPhone 17','iPhone Air','iPhone 17 Pro','iPhone 17 Pro Max']
for r in ffill_table(r32[2:],[0,3]):
    fam=normalize_family(r[0])
    for idx,target in enumerate(model_targets,4):
        code=r[idx] if idx < len(r) else ''
        if code and code!='-':
            add_product(store,'Accessory',fam,{'type':'iPhone 케이스','compatible':target,'color':r[1],'modelCode':code,'price':money(r[3])},'',f'{target} 호환 케이스입니다.',source_urls['Accessory'])
for sn in [33,34]:
    for r in ffill_table(rows(sn)[1:],[0,1,2]):
        base=normalize_family(r[0])
        fam=f'{base} {r[1]}' if r[1] else f'{base} 케이스'
        add_product(store,'Accessory',fam,{'type':'iPhone 케이스','compatible':base,'color':r[4],'modelCode':r[5],'price':money(r[2])},'',f'{base} 호환 케이스입니다.',source_urls['Accessory'])
# Pencil / keyboards
for r in ffill_table(rows(35)[1:],[0,1,4,6,7]):
    group=r[0]; subtype=r[1]; code=r[3]
    if not code: continue
    if group=='펜슬': fam={'프로':'Apple Pencil Pro','1세대':'Apple Pencil 1세대','USB-C':'Apple Pencil USB-C'}.get(subtype,f'Apple Pencil {subtype}')
    else: fam=subtype or '매직키보드'
    add_product(store,'Accessory',fam,{'type':group,'color':r[5],'modelCode':code,'price':money(r[4]),'features':r[6],'compatible':r[7]},asset_for(fam) or asset_for('매직키보드'),'호환 모델을 확인한 뒤 함께 제안할 수 있는 액세서리입니다.',source_urls['Accessory'])
# folios
for r in ffill_table(rows(36,0)[2:],[0,2,3]):
    fam=normalize_family(r[0])
    for size,pc,cc in [('13인치',2,5),('11인치',3,6)]:
        if r[cc] and r[cc]!='-': add_product(store,'Accessory',fam,{'type':'iPad 케이스','size':size,'color':r[4],'modelCode':r[cc],'price':money(r[pc])},asset_for('스마트폴리오'),'iPad 호환 스마트 폴리오입니다.',source_urls['Accessory'])
for r in ffill_table(rows(36,1)[1:],[0,2]):
    add_product(store,'Accessory',normalize_family(r[0]),{'type':'iPad 케이스','color':r[3],'modelCode':r[4],'price':money(r[2])},asset_for('스마트폴리오'),'iPad mini 호환 스마트 폴리오입니다.',source_urls['Accessory'])
# watch bands
for sn in [37,38,39]:
    for r in ffill_table(rows(sn)[1:],[0,2,3,4,5]):
        if not r[6]: continue
        fam=r[3] or '워치밴드'
        add_product(store,'Accessory',fam,{'type':'Apple Watch 밴드','size':r[2],'color':r[5],'modelCode':r[6],'price':money(r[4])},asset_for('워치밴드'),'Apple Watch 호환 밴드입니다.',source_urls['Accessory'])
# generic accessories
for sn in [40,41,42]:
    for r in ffill_table(rows(sn)[1:],[0,4]):
        if not r[2]: continue
        group={'Mac Acc':'Mac 액세서리'}.get(r[0],r[0]); fam=r[3]
        add_product(store,'Accessory',fam,{'type':group,'modelCode':r[2],'price':money(r[4])},asset_for(group),'Apple 정품 액세서리입니다.',source_urls['Accessory'])

# AppleCare+ from iPhone slide 7
for r in rows(7)[1:]:
    if not r[2] or not r[3]: continue
    if 'AppleCare+' in r[2]:
        covered=re.sub(r'^AppleCare\+ for ','',r[2]).replace('ProMax','Pro Max').replace('17Pro','17 Pro').replace('18Pro','18 Pro')
        fam=f'AppleCare+ {covered}'
        add_product(store,'AppleCare+',fam,{'coveredModel':covered,'modelCode':r[3],'price':money(r[4])},asset_for('AppleCare+'),'대상 제품과 AppleCare+ 모델코드를 함께 확인할 수 있습니다.',source_urls['AppleCare+'])
    elif 'AC Service' in r[2]:
        covered=r[2].replace('AC Service for','').strip().replace(' / ',' ')
        fam=f'AC Service {covered}'
        add_product(store,'AppleCare+',fam,{'coveredModel':covered,'modelCode':r[3],'price':money(r[4])},asset_for('AppleCare+'),'운영표의 Apple Care Service 항목입니다.',source_urls['AppleCare+'])
# full AppleCare tables slide 44
for ti in [0,1]:
    for r in rows(44,ti)[1:]:
        if not r[0] or not r[1]: continue
        fam=f'AppleCare+ {r[0]}'
        add_product(store,'AppleCare+',fam,{'coveredModel':r[0],'modelCode':r[1],'price':money(r[2])},asset_for('AppleCare+'),'대상 제품과 AppleCare+ 모델코드를 함께 확인할 수 있습니다.',source_urls['AppleCare+'])

products=list(store.values())
# dedupe exact variants, calculate min price
for p in products:
    seen=set(); variants=[]
    for v in p['variants']:
        key=json.dumps(v,ensure_ascii=False,sort_keys=True)
        if key not in seen:
            seen.add(key); variants.append(v)
    p['variants']=variants
    prices=[v.get('price') for v in variants if isinstance(v.get('price'),int)]
    p['minPrice']=min(prices) if prices else None
    p['variantCount']=len(variants)
    if not p['description']: p['description']='운영 라인업의 옵션, 가격, 색상과 모델코드를 확인할 수 있습니다.'

# Latest marker / category rank for the UI
latest_rank={
 'iPhone':['iPhone 18 Pro','iPhone 18 Pro Max','iPhone 17','iPhone Air','iPhone 17e','iPhone 17 Pro','iPhone 17 Pro Max','iPhone 16e'],
 'iPad':['iPad Pro 11','iPad Pro 13','iPad Air 11','iPad Air 13','iPad mini','iPad A16'],
 'Apple Watch':['Apple Watch Series 12','Apple Watch Ultra 4','Apple Watch SE 3','Apple Watch Series 11'],
 'AirPods':['AirPods 5','AirPods 5 (무선 충전)','AirPods Pro 3','AirPods 4(ANC)','AirPods 4','AirPods Pro 2','AirPods Max'],
 'Mac':['MacBook Pro','MacBook Air','MacBook Neo','iMac','Mac mini','Mac Studio']
}
new_set={'iPhone 18 Pro','iPhone 18 Pro Max','Apple Watch Series 12','Apple Watch Ultra 4','AirPods 5','AirPods 5 (무선 충전)'}
for p in products:
    seq=latest_rank.get(p['category'],[])
    p['latestRank']=seq.index(p['family']) if p['family'] in seq else 999
    p['isLatest']=p['family'] in new_set

# AppleCare matching
care=[p for p in products if p['category']=='AppleCare+']
def canon(text):
    text=str(text).lower().replace('apple watch','watch').replace('series','s').replace('(anc)','')
    text=text.replace('pro max','promax')
    return re.sub(r'[^a-z0-9가-힣]','',text)
def generation_priority(text):
    t=str(text).upper()
    for gen,score in [('M5',60),('M4',50),('M3',40),('M2',30),('S12',25),('ULTRA 4',24),('SE 3',23),('S11',20),('ULTRA 3',19),('18 PRO',70)]:
        if gen in t: return score
    return 0
for p in products:
    if p['category']=='AppleCare+': continue
    pf=canon(p['family']); matches=[]
    for c in care:
        v=c['variants'][0]; covered=v.get('coveredModel',''); cm=canon(covered); ok=False
        if p['category']=='iPhone': ok=(cm==pf)
        elif p['category']=='AirPods':
            target=canon(p['family'].replace('(무선 충전)','').replace('(ANC)',''))
            ok=(cm==target or (target.startswith('airpods5') and cm=='airpods45'))
        elif p['category']=='Apple Watch':
            target={'Apple Watch SE 3':'Watch SE 3','Apple Watch Series 12':'Watch 12','Apple Watch Series 11':'Watch S11','Apple Watch Ultra 4':'Watch Ultra 4'}.get(p['family'],p['family'])
            ok=(cm==canon(target))
        elif p['category']=='iPad': ok=cm.startswith(pf)
        elif p['category']=='Mac':
            starts={'iMac':'imac','Mac mini':'macmini','MacBook Neo':'macbookneo','MacBook Air':'macbookair','MacBook Pro':'macbookpro'}.get(p['family'],'')
            ok=bool(starts and cm.startswith(starts))
        if ok: matches.append({'family':c['family'],'variant':v,'priority':generation_priority(covered)})
    if matches:
        matches.sort(key=lambda x:(-x['priority'],x['family']))
        for x in matches: x.pop('priority',None)
        p['appleCareOptions']=matches

# Validation flags
code_locations=defaultdict(list)
for p in products:
    for v in p['variants']:
        code=v.get('modelCode','')
        if code: code_locations[code].append(p['family'])
validation=[]
for p in products:
    for v in p['variants']:
        code=v.get('modelCode',''); warns=[]
        if code and len(code_locations[code])>1: warns.append('동일 모델코드가 운영표의 다른 항목에도 사용됨')
        if code and not re.match(r'^[A-Z0-9-]+/[A-Z]+$',code): warns.append('모델코드 표기 형식 확인 필요')
        if warns:
            v['warning']=' / '.join(warns); validation.append({'family':p['family'],'modelCode':code,'warning':v['warning']})

cat_order=['iPhone','iPad','Apple Watch','AirPods','Mac','Accessory','AppleCare+']
products.sort(key=lambda p:(cat_order.index(p['category']),p.get('latestRank',999),p['family']))
meta={'generatedAt':'2026-09-30','source':'13_2609)Apple 운영 라인업.pptx','productCount':len(products),'variantCount':sum(len(p['variants']) for p in products),'categoryCounts':{},'validationWarningCount':len(validation),'validationWarnings':validation}
for p in products: meta['categoryCounts'][p['category']]=meta['categoryCounts'].get(p['category'],0)+1

payload={'meta':meta,'products':products}
(ROOT/'data.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'data.js').write_text('window.APP_DATA = '+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
print(json.dumps(meta,ensure_ascii=False,indent=2))
print('new assets:', [x.name for x in ASSET.glob('*18*')]+[x.name for x in ASSET.glob('*series-12*')]+[x.name for x in ASSET.glob('*ultra-4*')]+[x.name for x in ASSET.glob('*airpods-5*')])
