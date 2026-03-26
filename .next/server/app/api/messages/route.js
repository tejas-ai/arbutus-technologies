(()=>{var e={};e.id=434,e.ids=[434],e.modules={7550:e=>{"use strict";e.exports=require("better-sqlite3")},846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},9021:e=>{"use strict";e.exports=require("fs")},3873:e=>{"use strict";e.exports=require("path")},7918:(e,s,t)=>{"use strict";t.r(s),t.d(s,{patchFetch:()=>m,routeModule:()=>p,serverHooks:()=>l,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>E});var r={};t.r(r),t.d(r,{POST:()=>T});var n=t(2706),a=t(8203),o=t(5994),i=t(9187),u=t(2545);let c=new Map;async function T(e){let s=e.headers.get("x-forwarded-for")||"anonymous",t=Date.now(),r=c.get(s);if(r){if(t-r.lastRequest<6e4){if(r.count>=3)return i.NextResponse.json({success:!1,error:"Too many requests. Please try again later."},{status:429});r.count+=1}else r.count=1,r.lastRequest=t}else c.set(s,{count:1,lastRequest:t});try{let t=await e.json(),{name:r,email:n,company:a,content:o,message:c,subject:T,type:p,_hp:d}=t,E=o||c,l=T||p||a||"General Inquiry";if(d)return console.warn("Honeypot triggered from IP:",s),i.NextResponse.json({success:!0,message:"Thank you for your submission."});if(!r||!n||!E)return console.error("Validation failed: Missing required fields",{receivedBody:t,inferred:{name:r,email:n,finalContent:E}}),i.NextResponse.json({success:!1,error:"Missing required fields."},{status:400});if(r.length>100||n.length>254||a&&a.length>100||o.length>2e3)return i.NextResponse.json({success:!1,error:"Input exceeds maximum length."},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n))return i.NextResponse.json({success:!1,error:"Invalid email format."},{status:400});let m=e=>e.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]||e),g=m(r),N=m(n),R=m(l),x=m(E);return u.A.prepare(`
            INSERT INTO messages (name, email, subject, message, timestamp, status)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, 'new')
        `).run(g,N,R,x),i.NextResponse.json({success:!0,message:"Inquiry received and secured"})}catch(e){return console.error("Database error saving inquiry:",e),i.NextResponse.json({success:!1,error:"Internal Server Error"},{status:500})}}let p=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/messages/route",pathname:"/api/messages",filename:"route",bundlePath:"app/api/messages/route"},resolvedPagePath:"D:\\Arbutus\\app\\api\\messages\\route.ts",nextConfigOutput:"",userland:r}),{workAsyncStorage:d,workUnitAsyncStorage:E,serverHooks:l}=p;function m(){return(0,o.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:E})}},6487:()=>{},8335:()=>{},2545:(e,s,t)=>{"use strict";t.d(s,{A:()=>p});var r=t(7550),n=t.n(r),a=t(3873),o=t.n(a),i=t(9021),u=t.n(i);let c=o().join(process.cwd(),"data","database.sqlite");u().existsSync(o().join(process.cwd(),"data"))||u().mkdirSync(o().join(process.cwd(),"data"));let T=new(n())(c);T.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price TEXT,
        category TEXT,
        description TEXT,
        status TEXT DEFAULT 'active',
        image TEXT
    );

    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'new'
    );

    CREATE TABLE IF NOT EXISTS site_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL
    );
`);let p=T}};var s=require("../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[638,452],()=>t(7918));module.exports=r})();