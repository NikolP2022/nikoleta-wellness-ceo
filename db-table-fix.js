(()=>{
  // Compatibility layer: the UI uses Greek display keys while Supabase uses
  // stable English table/column names. Translate both directions so every
  // module reads/writes the SAME cloud rows.
  const schemas={
    clients:{table:'clients',fields:{name:'όνομα',phone:'τηλέφωνο',email:'email',address:'διεύθυνση',birth_date:'birth_date',notes:'σημειώσεις',status:'κατάσταση'}},
    appointments:{table:'appointments',fields:{client_id:'client_id',title:'Τίτλος',date:'appointment_date',start_time:'start_time',end_time:'end_time',type:'appointment_type',status:'Κατάσταση',notes:'Σημειώσεις',reminder_minutes:'reminder_minutes'}},
    partners:{table:'partners',fields:{name:'όνομα',phone:'τηλέφωνο',email:'email',business:'Επιχείρηση',notes:'Σημειώσεις',status:'Κατάσταση'}},
    measurements:{table:'tanita_measurements',fields:{client_id:'client_id',date:'measurement_date',weight:'Βάρος',fat:'body_fat',muscle:'muscle_mass',water:'water_percent',bone:'bone_mass',visceral:'visceral_fat',calories:'θερμίδες',metabolic_age:'metabolic_age',fitness_score:'fitness_score',notes:'Σημειώσεις'}},
    programs:{table:'programs',fields:{client_id:'client_id',title:'Τίτλος',start_date:'start_date',end_date:'end_date',calories:'θερμίδες',protein:'Πρωτεΐνη',description:'Περιγραφή',notes:'Σημειώσεις',status:'Κατάσταση'}},
    followups:{table:'follow_ups',fields:{client_id:'client_id',title:'Τίτλος',date:'follow_up_date',time:'follow_up_time',status:'Κατάσταση',notes:'Σημειώσεις',reminder_minutes:'reminder_minutes'}},
    orders:{table:'orders',fields:{client_id:'client_id',date:'order_date',product:'product_name',quantity:'Ποσότητα',unit_price:'unit_price',total:'total_amount',status:'Κατάσταση',notes:'Σημειώσεις'}},
    finance:{table:'finance_transactions',fields:{type:'transaction_type',amount:'Ποσό',date:'transaction_date',category:'Κατηγορία',description:'Περιγραφή',client_id:'client_id'}},
    tasks:{table:'planner_tasks',fields:{title:'Τίτλος',description:'Περιγραφή',date:'task_date',start_time:'start_time',end_time:'end_time',completed:'ολοκληρώθηκε',reminder_minutes:'reminder_minutes',priority:'Προτεραιότητα'}},
    reminders:{table:'reminders',fields:{title:'Τίτλος',date:'reminder_date',time:'reminder_time',reminder_minutes:'reminder_minutes',related_type:'related_type',related_id:'related_id',completed:'ολοκληρώθηκε',notes:'Σημειώσεις'}},
    success:{table:'daily_success',fields:{date:'success_date',task:'Εργασία',completed:'ολοκληρώθηκε',notes:'Σημειώσεις'}},
    documents:{table:'documents',fields:{title:'Τίτλος',file_name:'file_name',file_path:'file_path',file_type:'file_type',file_size:'file_size',related_type:'related_type',related_id:'related_id'}}
  };
  const tableMap={};
  const inputMap={};
  const outputMap={};
  Object.values(schemas).forEach(s=>{
    tableMap[s.table]=s.table;
    Object.entries(s.fields).forEach(([dbKey,uiKey])=>{
      inputMap[uiKey]=dbKey;
      outputMap[s.table]=outputMap[s.table]||{};
      outputMap[s.table][dbKey]=uiKey;
    });
  });
  const wrap=(builder,table)=>new Proxy(builder,{get(target,prop,receiver){
    if(prop==='then'){
      return (resolve,reject)=>target.then(result=>{
        if(result?.data&&Array.isArray(result.data))result.data=result.data.map(row=>{
          const m=outputMap[table]||{};const out={...row};for(const [dbKey,uiKey] of Object.entries(m))if(Object.prototype.hasOwnProperty.call(row,dbKey))out[uiKey]=row[dbKey];return out;
        });
        else if(result?.data&&typeof result.data==='object'){
          const m=outputMap[table]||{};const row=result.data;const out={...row};for(const [dbKey,uiKey] of Object.entries(m))if(Object.prototype.hasOwnProperty.call(row,dbKey))out[uiKey]=row[dbKey];result.data=out;
        }
        return resolve?.(result);
      },reject);
    }
    const value=target[prop];
    if(typeof value!=='function')return Reflect.get(target,prop,receiver);
    return (...args)=>{
      if((prop==='upsert'||prop==='insert'||prop==='update')&&args[0]){
        const convert=o=>{if(!o||typeof o!=='object')return o;const out={...o};const m=outputMap[table]||{};for(const [dbKey,uiKey] of Object.entries(m))if(Object.prototype.hasOwnProperty.call(out,uiKey)&&!Object.prototype.hasOwnProperty.call(out,dbKey)){out[dbKey]=out[uiKey];delete out[uiKey]}return out};
        args[0]=Array.isArray(args[0])?args[0].map(convert):convert(args[0]);
      }
      const next=value.apply(target,args);
      return next&&typeof next==='object'&&typeof next.then==='function'?wrap(next,table):next;
    };
  }});
  const original=window.supabase?.createClient;
  if(!original)return;
  window.supabase.createClient=function(...args){
    const client=original.apply(this,args);
    const from=client.from.bind(client);
    client.from=(name)=>wrap(from(tableMap[name]||name),tableMap[name]||name);
    return client;
  };
})();
