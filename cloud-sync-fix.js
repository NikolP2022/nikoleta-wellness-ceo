(()=>{
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const DB=window.supabase?.createClient(URL,KEY); if(!DB)return;
const LS='nwceo_final_v1', SNAP='nwceo_cloud_snapshot_v1';
const keys=['clients','appointments','partners','measurements','programs','followups','orders','finance','tasks','reminders','success','documents'];
const cfg={
clients:{table:'clients',map:{name:'όνομα',phone:'τηλέφωνο',email:'email',address:'διεύθυνση',birth_date:'birth_date',notes:'σημειώσεις',status:'κατάσταση'}},
appointments:{table:'Ραντεβού',map:{client_id:'client_id',title:'Τίτλος',date:'appointment_date',start_time:'start_time',end_time:'end_time',type:'appointment_type',status:'Κατάσταση',notes:'Σημειώσεις',reminder_minutes:'reminder_minutes'}},
partners:{table:'Συνεργάτες',map:{name:'όνομα',phone:'τηλέφωνο',email:'email',business:'Επιχείρηση',notes:'Σημειώσεις',status:'Κατάσταση'}},
measurements:{table:'tanita_measurements',map:{client_id:'client_id',date:'measurement_date',weight:'Βάρος',fat:'body_fat',muscle:'muscle_mass',water:'water_percent',bone:'bone_mass',visceral:'visceral_fat',calories:'θερμίδες',metabolic_age:'metabolic_age',fitness_score:'fitness_score',notes:'Σημειώσεις'}},
programs:{table:'Προγράμματα',map:{client_id:'client_id',title:'Τίτλος',start_date:'start_date',end_date:'end_date',calories:'θερμίδες',protein:'Πρωτεΐνη',description:'Περιγραφή',notes:'Σημειώσεις',status:'Κατάσταση'}},
followups:{table:'follow_ups',map:{client_id:'client_id',title:'Τίτλος',date:'follow_up_date',time:'follow_up_time',status:'Κατάσταση',notes:'Σημειώσεις',reminder_minutes:'reminder_minutes'}},
orders:{table:'Παραγγελίες',map:{client_id:'client_id',date:'order_date',product:'product_name',quantity:'Ποσότητα',unit_price:'unit_price',total:'total_amount',status:'Κατάσταση',notes:'Σημειώσεις'}},
finance:{table:'finance_transactions',map:{type:'transaction_type',amount:'Ποσό',date:'transaction_date',category:'Κατηγορία',description:'Περιγραφή',client_id:'client_id'}},
tasks:{table:'planner_tasks',map:{title:'Τίτλος',description:'Περιγραφή',date:'task_date',start_time:'start_time',end_time:'end_time',completed:'ολοκληρώθηκε',reminder_minutes:'reminder_minutes',priority:'Προτεραιότητα'}},
reminders:{table:'Υπενθυμίσεις',map:{title:'Τίτλος',date:'reminder_date',time:'reminder_time',reminder_minutes:'reminder_minutes',related_type:'related_type',related_id:'related_id',completed:'ολοκληρώθηκε',notes:'Σημειώσεις'}},
success:{table:'daily_success',map:{date:'success_date',task:'Εργασία',completed:'ολοκληρώθηκε',notes:'Σημειώσεις'}},
documents:{table:'Έγγραφα',map:{title:'Τίτλος',file_name:'file_name',file_path:'file_path',file_type:'file_type',file_size:'file_size',related_type:'related_type',related_id:'related_id'}}};
const read=()=>{try{return JSON.parse(localStorage.getItem(LS)||'{}')}catch{return {}}};
const write=s=>localStorage.setItem(LS,JSON.stringify(s));
const clean=v=>v===undefined?'':v;
function toDb(k,o,uid){const c=cfg[k],r={id:o.id,user_id:uid};for(const [a,b] of Object.entries(c.map)){let v=clean(o[a]);if(['amount','quantity','unit_price','total','weight','fat','muscle','water','bone','visceral','calories','protein','metabolic_age','fitness_score','file_size','reminder_minutes'].includes(a))v=v===''?null:Number(v);if(a==='completed')v=!!v;r[b]=v===''?null:v}return r}
function fromDb(k,r){const o={id:r.id};for(const [a,b] of Object.entries(cfg[k].map)){o[a]=r[b]??''}if(k==='clients')o.name=o.name||r.name||r.όνομα||'';if(k==='appointments'){o.date=o.date||r.appointment_date||'';o.start_time=o.start_time||r.start_time||'';o.end_time=o.end_time||r.end_time||'';o.title=o.title||r.Τίτλος||'Ραντεβού'}return o}
function sig(x){return JSON.stringify(x)}
async function sync(){if(!navigator.onLine)return;const {data:sd}=await DB.auth.getSession();const uid=sd?.session?.user?.id;if(!uid)return;let state=read(), snapshot={};let remoteChanged=false;
for(const k of keys){const c=cfg[k];try{
 const {data,error}=await DB.from(c.table).select('*').eq('user_id',uid);
 if(error||!Array.isArray(data))continue;
 const remote=data.map(r=>fromDb(k,r));
 const local=Array.isArray(state[k])?state[k]:[];
 const lm=new Map(local.map(x=>[x.id,x])); const rm=new Map(remote.map(x=>[x.id,x]));
 const merged=[]; for(const x of remote)merged.push(x); for(const x of local)if(!rm.has(x.id))merged.push(x);
 const before=sig(local), after=sig(merged); if(before!==after){state[k]=merged;remoteChanged=true}
 snapshot[k]=merged;
 // Push every local record that is missing or newer on this device.
 for(const x of local){const rr=rm.get(x.id);if(!rr||sig(x)!==sig(rr)){const {error:e}=await DB.from(c.table).upsert(toDb(k,x,uid),{onConflict:'id'});if(e)console.warn('sync',k,e.message)}}
 }catch(e){console.warn('sync',k,e?.message||e)} }
write(state);localStorage.setItem(SNAP,JSON.stringify(snapshot));
if(remoteChanged&&!document.querySelector('.modal')){try{location.reload()}catch{}}
const b=document.querySelector('.sync-badge');if(b){b.className='sync-badge ok';b.textContent='☁️ Συγχρονισμένο'}
}
let timer=null;async function start(){clearInterval(timer);await sync();timer=setInterval(sync,5000)}
DB.auth.onAuthStateChange((event,session)=>{if(session?.user){setTimeout(start,250)}else clearInterval(timer)});
window.addEventListener('online',()=>setTimeout(start,500));
if(navigator.onLine)start();
})();
