(()=>{
  const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
  const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
  const c=window.supabase?.createClient?.(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  if(!c)return;
  const sync=()=>{try{if(typeof window.sync==='function')window.sync()}catch(e){console.warn('cloud sync',e)}};
  const tables=['clients','appointments','partners','tanita_measurements','programs','follow_ups','orders','finance_transactions','planner_tasks','reminders','daily_success','documents'];
  tables.forEach(table=>c.channel('nwceo-live-'+table).on('postgres_changes',{event:'*',schema:'public',table},()=>setTimeout(sync,150)).subscribe());
  c.auth.onAuthStateChange(()=>setTimeout(sync,150));
  window.addEventListener('focus',sync);
})();
