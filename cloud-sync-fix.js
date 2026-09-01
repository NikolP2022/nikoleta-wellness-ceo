(()=>{
  const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
  const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
  const c=window.supabase?.createClient?.(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  if(!c)return;
  let timer=0;
  const refresh=()=>{clearTimeout(timer);timer=setTimeout(async()=>{try{if(typeof window.loadSession==='function')await window.loadSession();else if(typeof window.render==='function')window.render()}catch(e){console.warn('cloud refresh',e)}},300)};
  const tables=['clients','appointments','partners','tanita_measurements','programs','follow_ups','orders','finance_transactions','planner_tasks','reminders','daily_success','documents'];
  tables.forEach(table=>c.channel('nwceo-live-'+table).on('postgres_changes',{event:'*',schema:'public',table},refresh).subscribe());
  c.auth.onAuthStateChange(()=>refresh());
  window.addEventListener('focus',refresh);
})();
