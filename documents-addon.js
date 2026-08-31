const DOC_BUCKETS=['documents','pdfs','files'];
async function loadStoragePdfs(){
  if(!window.supabase)return;
  const client=window.supabase.createClient('https://vbkuvexyqehmpeeejqbh.supabase.co','sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk');
  const box=document.querySelector('#app .cards'); if(!box)return;
  const found=[];
  for(const bucket of DOC_BUCKETS){
    try{
      const {data,error}=await client.storage.from(bucket).list('',{limit:100,offset:0,sortBy:{column:'name',order:'desc'}});
      if(!error&&Array.isArray(data)) for(const f of data) if(f.id!==null&&/\.pdf$/i.test(f.name)) found.push({bucket,path:f.name,name:f.name,size:f.metadata?.size||0});
    }catch(e){}
  }
  if(!found.length)return;
  const existing=[...box.querySelectorAll('[data-storage-pdf]')].map(x=>x.dataset.storagePdf);
  for(const f of found){
    const key=f.bucket+'/'+f.path;if(existing.includes(key))continue;
    const article=document.createElement('article');article.className='card';article.innerHTML=`<div><small>PDF ΣΤΟ SUPABASE</small><strong>${esc(f.name)}</strong></div><div><small>ΜΕΓΕΘΟΣ</small><strong>${f.size?Math.round(f.size/1024)+' KB':'—'}</strong></div><div class="doc-actions"><button class="small" data-storage-pdf="${esc(key)}">👁️ Άνοιγμα PDF</button></div>`;box.prepend(article);
  }
}
document.addEventListener('click',async e=>{
  const nav=e.target.closest('[data-view="documents"]');
  if(nav)setTimeout(loadStoragePdfs,400);
  const b=e.target.closest('[data-storage-pdf]');
  if(b){const [bucket,...rest]=b.dataset.storagePdf.split('/');const path=rest.join('/');const c=window.supabase.createClient('https://vbkuvexyqehmpeeejqbh.supabase.co','sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk');const {data,error}=await c.storage.from(bucket).createSignedUrl(path,3600);if(data?.signedUrl)window.open(data.signedUrl,'_blank');else alert('Δεν ήταν δυνατή η δημιουργία συνδέσμου για το PDF.');}
});
