(()=>{
const real={'Ραντεβού':'appointments','Συνεργάτες':'partners','Προγράμματα':'programs','Παραγγελίες':'orders','Υπενθυμίσεις':'reminders','Έγγραφα':'documents'};
const maps={
appointments:{client_id:'client_id','Τίτλος':'title',date:'appointment_date',start_time:'start_time',end_time:'end_time',type:'appointment_type','Κατάσταση':'status','Σημειώσεις':'notes',reminder_minutes:'reminder_minutes'},
clients:{'όνομα':'name','τηλέφωνο':'phone',email:'email','διεύθυνση':'address',birth_date:'birth_date','σημειώσεις':'notes','κατάσταση':'status'},
partners:{'όνομα':'name','τηλέφωνο':'phone',email:'email','Επιχείρηση':'business','Σημειώσεις':'notes','Κατάσταση':'status'},
measurements:{client_id:'client_id',date:'measurement_date','Βάρος':'weight',fat:'body_fat',muscle:'muscle_mass',water:'water_percent',bone:'bone_mass',visceral:'visceral_fat','θερμίδες':'calories',metabolic_age:'metabolic_age',fitness_score:'fitness_score','Σημειώσεις':'notes'},
programs:{client_id:'client_id','Τίτλος':'title',start_date:'start_date',end_date:'end_date','θερμίδες':'calories','Πρωτεΐνη':'protein','Περιγραφή':'description','Σημειώσεις':'notes','Κατάσταση':'status'},
followups:{client_id:'client_id','Τίτλος':'title',date:'follow_up_date',time:'follow_up_time','Κατάσταση':'status','Σημειώσεις':'notes',reminder_minutes:'reminder_minutes'},
orders:{client_id:'client_id',date:'order_date',product:'product_name','Ποσότητα':'quantity',unit_price:'unit_price',total:'total_amount','Κατάσταση':'status','Σημειώσεις':'notes'},
finance:{type:'transaction_type',amount:'amount',date:'transaction_date','Κατηγορία':'category','Περιγραφή':'description',client_id:'client_id'},
tasks:{title:'title','Περιγραφή':'description',date:'task_date',start_time:'start_time',end_time:'end_time','ολοκληρώθηκε':'completed',reminder_minutes:'reminder_minutes','Προτεραιότητα':'priority'},
reminders:{'Τίτλος':'title',date:'reminder_date',time:'reminder_time',reminder_minutes:'reminder_minutes',related_type:'related_type',related_id:'related_id','ολοκληρώθηκε':'completed','Σημειώσεις':'notes'},
success:{date:'success_date','Εργασία':'task','ολοκληρώθηκε':'completed','Σημειώσεις':'notes'},
documents:{'Τίτλος':'title',file_name:'file_name',file_path:'file_path',file_type:'file_type',file_size:'file_size',related_type:'related_type',related_id:'related_id'}
};
const tableKey=t=>({appointments:'appointments',partners:'partners',programs:'programs',orders:'orders',reminders:'reminders',documents:'documents',clients:'clients',tanita_measurements:'measurements',follow_ups:'followups',finance_transactions:'finance',planner_tasks:'tasks',daily_success:'success'}[t]||t);
const toDb=(m,o)=>{const y={...o};for(const [ui,dbk] of Object.entries(m))if(ui in y){y[dbk]=y[ui];delete y[ui]}return y;};
const fromDb=(m,row)=>{if(!row||typeof row!=='object')return row;const y={...row};for(const [ui,dbk] of Object.entries(m))if(dbk in y){y[ui]=y[dbk];delete y[dbk]}return y;};
const wrap=(builder,table)=>new Proxy(builder,{get(target,prop){
if(prop==='then')return(resolve,reject)=>target.then(res=>{if(res&&Array.isArray(res.data))res.data=res.data.map(x=>fromDb(maps[tableKey(table)]||{},x));else if(res&&res.data)res.data=fromDb(maps[tableKey(table)]||{},res.data);return resolve?resolve(res):res},reject);
const val=Reflect.get(target,prop,target);if(typeof val!=='function')return val;
return(...args)=>{let a=args;if(prop==='insert'||prop==='upsert'||prop==='update'){const m=maps[tableKey(table)]||{};a=[Array.isArray(args[0])?args[0].map(x=>toDb(m,x)):toDb(m,args[0]),...args.slice(1)];}const r=val.apply(target,a);return r&&typeof r==='object'?wrap(r,table):r;};
}});
const original=window.supabase?.createClient;if(!original)return;
window.supabase.createClient=function(...args){const c=original.apply(this,args),from=c.from.bind(c);c.from=(name)=>wrap(from(real[name]||name),real[name]||name);return c;};
})();
