(()=>{'use strict';
const KEY='nw_ceo_appointments_local';
const pad=n=>String(n).padStart(2,'0');
const toMin=v=>{const m=String(v||'').match(/^(\d{1,2}):(\d{2})/);return m?Number(m[1])*60+Number(m[2]):null};
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
function check(e){
  const form=e.target;
  if(!form || !form.matches('.ap277Box form')) return;
  const date=form.appointment_date?.value;
  const start=toMin(form.start_time?.value);
  const endRaw=form.end_time?.value;
  const end=endRaw?toMin(endRaw):null;
  if(!date||start===null)return;
  if(end!==null&&end<=start){e.preventDefault();e.stopImmediatePropagation();alert('⚠️ Η ώρα λήξης πρέπει να είναι μετά την ώρα έναρξης.');return;}
  const editingId=form.closest('.ap277Box')?.dataset?.appointmentId||null;
  const rows=load();
  const conflict=rows.find(x=>{
    if(editingId&&String(x.id)===String(editingId))return false;
    if(x.appointment_date!==date)return false;
    const xs=toMin(x.start_time); if(xs===null)return false;
    const xe=x.end_time?toMin(x.end_time):xs+1;
    const ne=end===null?start+1:end;
    return start<xe && xs<ne;
  });
  if(conflict){
    e.preventDefault();e.stopImmediatePropagation();
    const when=conflict.end_time?`${conflict.start_time}–${conflict.end_time}`:conflict.start_time;
    alert(`🚫 ΔΙΠΛΟ ΡΑΝΤΕΒΟΥ\n\nΥπάρχει ήδη ραντεβού την ίδια ημέρα στις ${when}.\n\nΤο νέο ραντεβού δεν αποθηκεύτηκε.`);
  }
}
document.addEventListener('submit',check,true);
})();