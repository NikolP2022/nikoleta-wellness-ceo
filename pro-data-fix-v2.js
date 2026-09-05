(() => {
  const originalInsert=window.insert;
  window.insert=async function(table,key,obj){
    if(table==='appointments'){
      obj={title:obj.title||obj.client||'Ραντεβού',appointment_date:obj.date,start_time:obj.time||null,end_time:null,appointment_type:obj.type||'Ραντεβού',status:'scheduled',notes:obj.notes||'',reminder_minutes:30,client_name:obj.client||null};
      return originalInsert('appointments','appointments',obj);
    }
    if(table==='tanita_measurements'){
      const c=(window.state?.clients||[]).find(x=>String(x.name||'').trim().toLowerCase()===String(obj.clientName||'').trim().toLowerCase());
      const map={measurement_date:obj.date,client_id:c?.id||null,weight:obj.weight?Number(obj.weight):null,body_fat:obj.fat?Number(obj.fat):null,muscle_mass:obj.muscle?Number(obj.muscle):null,water_percent:obj.water?Number(obj.water):null,visceral_fat:obj.visceral?Number(obj.visceral):null};
      Object.keys(map).forEach(k=>map[k]===null||map[k]===undefined||map[k]===''?delete map[k]:0);
      return originalInsert('tanita_measurements','measurements',map);
    }
    return originalInsert(table,key,obj);
  };
  const originalLoad=window.loadCloud;
  window.loadCloud=async function(){
    await originalLoad();
    if(!window.cloud||!window.supa||!window.userId)return;
    for(const [key,table] of [['appointments','appointments'],['partners','partners'],['measurements','tanita_measurements']]){
      try{const {data,error}=await window.supa.from(table).select('*').eq('user_id',window.userId).order('created_at',{ascending:false});if(!error)window.state[key]=data||[]}catch(e){console.warn('extra cloud load',table,e)}
    }
    if(window.saveLocal)window.saveLocal();
  };
})();
