(()=>{
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co',KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const client=window.supabase?.createClient(URL,KEY); if(!client)return;
const tables={clients:'clients',appointments:'Ραντεβού',partners:'Συνεργάτες',measurements:'tanita_measurements',programs:'Προγράμματα',followups:'follow_ups',orders:'Παραγγελίες',finance:'finance_transactions',tasks:'planner_tasks',reminders:'Υπενθυμίσεις',success:'daily_success',documents:'Έγγραφα'};
const localKey='nwceo_final_v1';
client.auth.onAuthStateChange(async(event,session)=>{
 if(!session?.user || !['SIGNED_IN','INITIAL_SESSION'].includes(event))return;
 const flag='nwceo_cloud_migrated_'+session.user.id;
 if(localStorage.getItem(flag))return;
 try{
  const local=JSON.parse(localStorage.getItem(localKey)||'null'); if(!local)return;
  for(const [k,table] of Object.entries(tables)){
   const rows=(local[k]||[]).filter(x=>x&&x.id).map(x=>({...x,user_id:session.user.id}));
   if(rows.length) await client.from(table).upsert(rows,{onConflict:'id'});
  }
  localStorage.setItem(flag,'1');
 }catch(e){console.warn('Local migration:',e)}
});
})();
