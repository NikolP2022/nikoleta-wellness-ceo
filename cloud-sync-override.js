(()=>{
  const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
  const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
  const tables={
    clients:{table:'clients',map:{name:'name',phone:'phone',email:'email',address:'address',birth_date:'birth_date',notes:'notes',status:'status'}},
    appointments:{table:'appointments',map:{client_id:'client_id',title:'title',date:'appointment_date',start_time:'start_time',end_time:'end_time',type:'appointment_type',status:'status',notes:'notes',reminder_minutes:'reminder_minutes'}},
    partners:{table:'partners',map:{name:'name',phone:'phone',email:'email',business:'business',notes:'notes',status:'status'}},
    measurements:{table:'tanita_measurements',map:{client_id:'client_id',date:'measurement_date',weight:'weight',fat:'body_fat',muscle:'muscle_mass',water:'water_percent',bone:'bone_mass',visceral:'visceral_fat',calories:'calories',metabolic_age:'metabolic_age',fitness_score:'fitness_score',notes:'notes'}},
    programs:{table:'programs',map:{client_id:'client_id',title:'title',start_date:'start_date',end_date:'end_date',calories:'calories',protein:'protein',description:'description',notes:'notes',status:'status'}},
    followups:{table:'follow_ups',map:{client_id:'client_id',title:'title',date:'follow_up_date',time:'follow_up_time',status:'status',notes:'notes',reminder_minutes:'reminder_minutes'}},
    orders:{table:'orders',map:{client_id:'client_id',date:'order_date',product:'product_name',quantity:'quantity',unit_price:'unit_price',total:'total_amount',status:'status',notes:'notes'}},
    finance:{table:'finance_transactions',map:{type:'transaction_type',amount:'amount',date:'transaction_date',category:'category',description:'description',client_id:'client_id'}},
    tasks:{table:'planner_tasks',map:{title:'title',description:'description',date:'task_date',start_time:'start_time',end_time:'end_time',completed:'completed',reminder_minutes:'reminder_minutes',priority:'priority'}},
    reminders:{table:'reminders',map:{title:'title',date:'reminder_date',time:'reminder_time',reminder_minutes:'reminder_minutes',related_type:'related_type',related_id:'related_id',completed:'completed',notes:'notes'}},
    success:{table:'daily_success',map:{date:'success_date',task:'task',completed:'completed',notes:'notes'}},
    documents:{table:'documents',map:{title:'title',file_name:'file_name',file_path:'file_path',file_type:'file_type',file_size:'file_size',related_type:'related_type',related_id:'related_id'}}
  };
  const greekToEnglish={
    'όνομα':'name','τηλέφωνο':'phone','διεύθυνση':'address','σημειώσεις':'notes','κατάσταση':'status','Τίτλος':'title','Κατάσταση':'status','Σημειώσεις':'notes','Επιχείρηση':'business','Βάρος':'weight','Πρωτεΐνη':'protein','Περιγραφή':'description','θερμίδες':'calories','Ποσότητα':'quantity','Κατηγορία':'category','Περιγραφή':'description','Εργασία':'task','ολοκληρώθηκε':'completed','Προτεραιότητα':'priority'
  };
  const c=window.supabase?.createClient?.(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  if(!c)return;
  const badge=()=>document.querySelector('.sync-badge');
  const status=(text,cls)=>{const b=badge();if(b){b.className='sync-badge '+cls;b.textContent=text}};
  const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'null')??d}catch{return d}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const dbRow=(k,o,userId)=>{const out={id:o.id,user_id:userId};for(const [ui,dbk] of Object.entries(tables[k].map)){let v=o[ui];if(v===undefined)v=o[greekToEnglish[ui]];if(ui==='type'&&(v==='Έσοδο'||v==='income'))v='income';if(ui==='type'&&(v==='Έξοδο'||v==='expense'))v='expense';if(ui==='completed')v=!!v;if(['amount','quantity','unit_price','total','weight','fat','muscle','water','bone','visceral','calories','protein','metabolic_age','fitness_score','file_size','reminder_minutes'].includes(ui)&&v!==''&&v!=null)v=Number(v);out[dbk]=v===''?null:v}return out};
  const uiRow=(k,r)=>{const o={id:r.id};for(const [ui,dbk] of Object.entries(tables[k].map)){let v=r[dbk];if(ui==='type')v=v==='income'?'Έσοδο':v==='expense'?'Έξοδο':v;o[ui]=v}return o};
  let running=false;
  async function realSync(){
    if(running)return;
    const {data:session}=await c.auth.getSession();
    const u=session?.session?.user;
    if(!u){status('🔐 Απαιτείται σύνδεση','offline');return false}
    running=true;status('↻ Συγχρονισμός…','sync');
    try{
      const pending=read('nwceo_pending_final',[]);const failed=[];
      for(const op of pending){
        try{
          if(op.type==='upsert'){
            const {error}=await c.from(tables[op.k].table).upsert(dbRow(op.k,op.data,u.id),{onConflict:'id'});if(error)throw error;
          }else{
            const {error}=await c.from(tables[op.k].table).delete().eq('id',op.id).eq('user_id',u.id);if(error)throw error;
          }
        }catch(e){console.warn('sync operation failed',op,e);failed.push(op)}
      }
      write('nwceo_pending_final',failed);
      const state=read('nwceo_final_v1',{});
      for(const k of Object.keys(tables)){
        const {data,error}=await c.from(tables[k].table).select('*').eq('user_id',u.id).order('created_at',{ascending:false});
        if(error){console.warn('sync read failed',k,error);continue}
        state[k]=(data||[]).map(r=>uiRow(k,r));
      }
      write('nwceo_final_v1',state);
      status(failed.length?'⚠️ Μερικός συγχρονισμός':'☁️ Συγχρονισμένο',failed.length?'sync':'ok');
      if(typeof window.render==='function')window.render();
      return failed.length===0;
    }catch(e){console.warn('cloud sync failed',e);status('⚠️ Σφάλμα συγχρονισμού','offline');return false}
    finally{running=false}
  }
  window.sync=realSync;
  c.auth.onAuthStateChange(()=>setTimeout(realSync,250));
  window.addEventListener('online',()=>realSync());
  window.addEventListener('focus',()=>realSync());
  setTimeout(realSync,500);
})();
