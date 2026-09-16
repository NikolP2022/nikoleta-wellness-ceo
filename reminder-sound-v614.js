(()=>{'use strict';
const SUPABASE_URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
const SUPABASE_KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
let audioCtx=null,lastPlayed=new Set();
function unlockSound(){try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume()}catch(e){console.warn('Sound unlock failed',e)}}
document.addEventListener('click',unlockSound,{capture:true,once:false});
document.addEventListener('keydown',unlockSound,{capture:true,once:false});
function beep(){try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();const now=audioCtx.currentTime;for(let i=0;i<3;i++){const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=i===1?880:660;g.gain.setValueAtTime(.0001,now+i*.28);g.gain.exponentialRampToValueAtTime(.32,now+i*.28+.03);g.gain.exponentialRampToValueAtTime(.0001,now+i*.28+.22);o.connect(g);g.connect(audioCtx.destination);o.start(now+i*.28);o.stop(now+i*.28+.24)}}catch(e){console.warn('Reminder sound failed',e)}}
async function check(){try{const sb=window.supabase?.createClient?.(SUPABASE_URL,SUPABASE_KEY);if(!sb)return;const s=(await sb.auth.getSession()).data.session;if(!s?.user)return;const now=new Date().toISOString();const r=await sb.from('scheduled_notifications').select('id,title,body,notify_at,sent').eq('user_id',s.user.id).eq('sent',false).lte('notify_at',now).order('notify_at',{ascending:true}).limit(20);if(r.error)return;for(const n of (r.data||[])){if(lastPlayed.has(n.id))continue;lastPlayed.add(n.id);beep();if('Notification'in window&&Notification.permission==='granted')new Notification(n.title||'Nikoleta Wellness CEO',{body:n.body||'Έχεις μια υπενθύμιση.',requireInteraction:true});await sb.from('scheduled_notifications').update({sent:true,sent_at:new Date().toISOString()}).eq('id',n.id).eq('user_id',s.user.id)}}catch(e){console.warn('Reminder sound check',e)}}
setTimeout(()=>{unlockSound();check();setInterval(check,5000)},1500);
})();
