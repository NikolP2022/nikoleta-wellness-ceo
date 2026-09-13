(()=>{'use strict';
const S=window.supabase;if(!S||!S.createClient)return;
const original=S.createClient.bind(S);S.createClient=(...args)=>{const c=original(...args);window.NWDB=c;return c};
})();