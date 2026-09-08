(()=>{
'use strict';
if(window.__NWCEO_SB_BRIDGE212)return;window.__NWCEO_SB_BRIDGE212=1;
if(!window.supabase?.createClient)return;
const original=window.supabase.createClient.bind(window.supabase);
window.supabase.createClient=(...args)=>{const client=original(...args);window.__NWCEO_DB=client;return client};
})();
