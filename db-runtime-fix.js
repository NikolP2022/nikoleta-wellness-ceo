(()=>{
  // app-final.js creates its Supabase client before db-table-fix.js can wrap createClient.
  // Patch that already-created client so UI writes/read use the real cloud table names.
  const db=window.__nw_db || null;
  if(!db) return;
  const aliases={'Ραντεβού':'appointments','Συνεργάτες':'partners','Προγράμματα':'programs','Παραγγελίες':'orders','Υπενθυμίσεις':'reminders','Έγγραφα':'documents'};
  const fieldMaps={
    appointments:{'Τίτλος':'title','Κατάσταση':'status','Σημειώσεις':'notes'},
    partners:{'όνομα':'name','τηλέφωνο':'phone','Επιχείρηση':'business','Σημειώσεις':'notes','Κατάσταση':'status'},
    measurements:{'Βάρος':'weight','θερμίδες':'calories','Σημειώσεις':'notes'},
    programs:{'Τίτλος':'title','θερμίδες':'calories','Πρωτεΐνη':'protein','Περιγραφή':'description','Σημειώσεις':'notes','Κατάσταση':'status'},
    orders:{'Ποσότητα':'quantity','Κατάσταση':'status'},
    finance_transactions:{'Ποσό':'amount','Κατηγορία':'category','Περιγραφή':'description'},
    planner_tasks:{'Τίτλος':'title','Περιγραφή':'description','ολοκληρώθηκε':'completed','Προτεραιότητα':'priority'},
    reminders:{'Τίτλος':'title','ολοκληρώθηκε':'completed','Σημειώσεις':'notes'},
    daily_success:{'Εργασία':'task','ολοκληρώθηκε':'completed','Σημειώσεις':'notes'},
    documents:{'Τίτλος':'title'}
  };
  const original=db.from.bind(db);
  const convert=(obj,map)=>{if(!obj||typeof obj!=='object')return obj;const out={...obj};for(const [ui,dbk] of Object.entries(map||{})){if(Object.prototype.hasOwnProperty.call(out,ui)&&!Object.prototype.hasOwnProperty.call(out,dbk)){out[dbk]=out[ui];delete out[ui]}}return out};
  db.from=(name)=>{const table=aliases[name]||name;const b=original(table);return new Proxy(b,{get(t,p){if(p==='then')return t.then.bind(t);const v=t[p];if(typeof v!=='function')return v;return(...args)=>{if(['insert','upsert','update'].includes(p)&&args[0]){const m=fieldMaps[table];args[0]=Array.isArray(args[0])?args[0].map(x=>convert(x,m)):convert(args[0],m)}return v.apply(t,args)}}})};
})();
