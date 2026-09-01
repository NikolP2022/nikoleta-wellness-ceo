(()=>{
  // Compatibility layer: the UI was using Greek display names for some
  // Supabase tables while the database uses the real lowercase table names.
  // Translate them centrally so ALL modules share the same cloud database.
  const real={
    'Ραντεβού':'appointments',
    'Συνεργάτες':'partners',
    'Προγράμματα':'programs',
    'Παραγγελίες':'orders',
    'Υπενθυμίσεις':'reminders',
    'Έγγραφα':'documents'
  };
  const original=window.supabase?.createClient;
  if(!original)return;
  window.supabase.createClient=function(...args){
    const client=original.apply(this,args);
    const from=client.from.bind(client);
    client.from=(name)=>from(real[name]||name);
    return client;
  };
})();
