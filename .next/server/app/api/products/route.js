(()=>{var e={};e.id=146,e.ids=[146],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},7462:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.d(t,{A:()=>d});var a=r(28855),i=r(33873),o=r.n(i),c=r(29021),n=r.n(c),T=e([a]);a=(T.then?(await T)():T)[0];let u=process.env.TURSO_DATABASE_URL||`file:${o().join(process.cwd(),"data","database.sqlite")}`,p=process.env.TURSO_AUTH_TOKEN;if(u.startsWith("file:")){let e=o().join(process.cwd(),"data");n().existsSync(e)||n().mkdirSync(e,{recursive:!0})}let E=(0,a.createClient)({url:u,authToken:p});(async()=>{try{await E.batch([`CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price TEXT,
                category TEXT,
                description TEXT,
                status TEXT DEFAULT 'active',
                images TEXT DEFAULT '[]'
            );`,`CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT,
                message TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                status TEXT DEFAULT 'new'
            );`,`CREATE TABLE IF NOT EXISTS site_content (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                key TEXT UNIQUE NOT NULL,
                content TEXT NOT NULL
            );`],"write"),console.log("Database initialized successfully.")}catch(e){console.error("Database initialization failed:",e)}})();let d=E;s()}catch(e){s(e)}})},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},17615:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.r(t),r.d(t,{GET:()=>c});var a=r(32190),i=r(7462),o=e([i]);async function c(){try{let e=(await i.A.execute("SELECT * FROM products ORDER BY id ASC")).rows.map(e=>({...e,images:JSON.parse(e.images||"[]")}));return a.NextResponse.json({success:!0,products:e})}catch(e){return console.error("DB error:",e),a.NextResponse.json({success:!1,error:"Failed to fetch products"},{status:500})}}i=(o.then?(await o)():o)[0],s()}catch(e){s(e)}})},28855:e=>{"use strict";e.exports=import("@libsql/client")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},40910:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.r(t),r.d(t,{patchFetch:()=>T,routeModule:()=>u,serverHooks:()=>d,workAsyncStorage:()=>p,workUnitAsyncStorage:()=>E});var a=r(96559),i=r(48088),o=r(37719),c=r(17615),n=e([c]);c=(n.then?(await n)():n)[0];let u=new a.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/products/route",pathname:"/api/products",filename:"route",bundlePath:"app/api/products/route"},resolvedPagePath:"D:\\Arbutus\\app\\api\\products\\route.ts",nextConfigOutput:"",userland:c}),{workAsyncStorage:p,workUnitAsyncStorage:E,serverHooks:d}=u;function T(){return(0,o.patchFetch)({workAsyncStorage:p,workUnitAsyncStorage:E})}s()}catch(e){s(e)}})},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[828,580],()=>r(40910));module.exports=s})();