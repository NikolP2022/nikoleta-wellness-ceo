(()=>{
  const real={'Ραντεβού':'appointments','Συνεργάτες':'partners','Προγράμματα':'programs','Παραγγελίες':'orders','Υπενθυμίσεις':'reminders','Έγγραφα':'documents'};
  const maps={appointments:{date:'appointment_date',type:'appointment_type'},clients:{},partners:{},measurements:{date:'measurement_date',weight:'weight',fat:'body_fat',muscle:'muscle_mass',water:'water_percent',bone:'bone_mass',visceral:'visceral_fat'},programs:{},followups:{date:'follow_up_date',time:'follow_up_time'},orders:{date:'order_date',product:'product_name',quantity:'quantity',total:'total_amount'},finance:{type:'transaction_type',amount:'amount',date:'transaction_date'},tasks:{date:'task_date'},reminders:{date:'reminder_date',time:'reminder_time'},success:{date:'success_date'},documents:{}};
  const tableKey=t=>({appointments:'appointments',partners:'partners',programs:'programs',orders:'orders',reminders:'reminders',documents:'documents',clients:'clients',tanita_measurements:'measurements',follow_ups:'followups',finance_transactions:'finance',planner_tasks:'tasks',daily_success:'success'}[t]||t);
  const reverse=m=>Object.fromEntries(Object.entries(m).map(([a,b])=>[b,a]));
  const wrap=(builder,table)=>new Proxy(builder,{get(target,prop){
    if(prop==='then')return(resolve,reject)=>target.then(res=>{if(res&&Array.isArray(res.data))res.data=res.data.map(x=>rowMap(table,x));else if(res&&res.data)res.data=rowMap(table,res.data);return resolve?resolve(res):res},reject);
    const val=Reflect.get(target,prop,target);if(typeof val!=='function')return val;
    return(...args)=>{let a=args;if(prop==='insert'||prop==='upsert'||prop==='update'){const m=maps[tableKey(table)]||{},conv=v=>Array.isArray(v)?v.map(x=>toDb(m,x)):v&&typeof v==='object'?toDb(m,v):v;a=[conv(args[0]),...args.slice(1)];}const r=val.apply(target,a);return r&&typeof r==='object'?wrap(r,table):r;};
  }});
  const toDb=(m,o)=>{const y={...o};for(const [ui,dbk] of Object.entries(m))if(ui in y){y[dbk]=y[ui];delete y[ui];}return y;};
  const rowMap=(table,row)=>{if(!row||typeof row!=='object')return row;const y={...row},m=maps[tableKey(table)]||{};for(const [dbk,ui] of Object.entries(reverse(m)))if(dbk in y){y[ui]=y[dbk];delete y[dbk];}return y;};
  const original=window.supabase?.createClient;if(!original)return;
  window.supabase.createClient=function(...args){const c=original.apply(this,args),from=c.from.bind(c);c.from=(name)=>wrap(from(real[name]||name),real[name]||name);return c;};
})();
