"use strict";var we=Object.create;var O=Object.defineProperty;var xe=Object.getOwnPropertyDescriptor;var Re=Object.getOwnPropertyNames;var be=Object.getPrototypeOf,Ue=Object.prototype.hasOwnProperty;var Se=(r,e,s,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Re(e))!Ue.call(r,o)&&o!==s&&O(r,o,{get:()=>e[o],enumerable:!(t=xe(e,o))||t.enumerable});return r};var i=(r,e,s)=>(s=r!=null?we(be(r)):{},Se(e||!r||!r.__esModule?O(s,"default",{value:r,enumerable:!0}):s,r));var Pe=i(require("http")),E=i(require("express"));var A=i(require("dotenv"));A.default.config();var I=process.env.PORT||3e3,$=process.env.ROUNDS?+process.env.ROUNDS:10,Ce=process.env.ENCRYPT_PASSWORD??"ace_encrypt_password",Te=process.env.ENCRYPT_SALT??"salt",Ee=process.env.ENCRYPT_COST?+process.env.ENCRYPT_COST:5,Ie=process.env.ENCRYPT_LEGNTH?+process.env.ENCRYPT_LEGNTH:256,k=process.env.JWT_SECRET??"jwt secure secret 123";var w=i(require("consola")),D=require("chalk"),m=new D.Chalk({level:3}),p=(r,e,s)=>{switch(r){case"success":return w.default.success(` ${m.bgGreen.black.bold(e)} ${m.green(s)}`);case"error":return w.default.error(` ${m.bgRed.whiteBright.bold(e)} ${m.redBright(s)}`);case"warn":return w.default.warn(` ${m.bgYellow.whiteBright.bold(e)} ${m.yellowBright(s)}`);case"info":return w.default.info(` ${m.bgBlue.whiteBright.bold(e)} ${m.blueBright(s)}`)}};var he=i(require("http-errors"));var X=require("express");var j=i(require("http-errors"));var U=i(require("bcrypt"));var M=async r=>{let e=await U.default.genSalt($);return await U.default.hash(r,e)},Y=async(r,e)=>await U.default.compare(r,e);var S=require("@prisma/client"),q=new S.PrismaClient,v=q.user,l=q.post,je=q.$connect(),Fe=q.$disconnect(),C=S.Prisma.PrismaClientKnownRequestError,N=(r,e)=>{for(let s of e)delete r[s];return r};var a=(r,e)=>Promise.reject({status:r,message:e||"Internal Server Error"});var L=async r=>{try{return await v.findUnique({where:{id:r}})}catch(e){return a(500,e?.message)}},Z=async r=>{try{let{password:e,name:s,email:t}=r,o=await M(e),n={name:s,email:t,password:o};return await v.create({data:n})}catch(e){return e instanceof C&&e.code==="P2002"?a(409,"User already existed with that email"):a(500)}},K=async r=>{try{return await v.findUnique({where:{email:r}})}catch(e){if(p("error","findUserByEmail",e?.message),e)return a(500,"Db error")}};var B=i(require("jsonwebtoken"));var _=r=>B.default.sign(r,k),z=r=>{try{return{decoded:B.default.verify(r,k),expired:!1,valid:!0}}catch(e){return p("error","verify token",e?.message),{valid:!1,decoded:null,expired:e.message==="jwt expired"}}};var G=async(r,e,s)=>{let t=r.body;try{let o=N(await Z(t),["password"]),n=_({id:o.id,email:o.email});return e.status(201).json({meta:{status:201,message:"Successfully register user"},data:{user:o,token:n}})}catch(o){return s(o)}},Q=async(r,e,s)=>{try{let{email:t,password:o}=r.body,n=await K(t);if(!n)return s((0,j.default)(404,"User not found"));if(!await Y(o,n.password))return s((0,j.default)(401,"Invalid email or password"));let g=_({id:n.id,email:n.email});return e.status(200).json({meta:{status:200,message:"Successfully login"},data:{user:N(n,["password"]),token:g}})}catch(t){return s(t)}};var W=require("zod"),F=i(require("http-errors"));var P=r=>async(e,s,t)=>{try{return await r.parseAsync({body:e.body,query:e.query,params:e.params}),t()}catch(o){if(o instanceof W.ZodError){let n=o.issues.map(u=>u.message)[0];return t((0,F.default)(422,n))}return p("error","validator middleware",o?.message),t((0,F.default)(422))}};var c=require("zod"),J=(0,c.object)({body:(0,c.object)({name:(0,c.string)({required_error:"Name is required"}),email:(0,c.string)({required_error:"Email is required"}).email("Invalid email format"),password:(0,c.string)({required_error:"Password is required"})})}),V=(0,c.object)({body:(0,c.object)({email:(0,c.string)({required_error:"Email is required"}).email("Invalid email format"),password:(0,c.string)({required_error:"Password is required"})})});var H=(0,X.Router)();H.post("/register",P(J),G);H.post("/login",P(V),Q);var ee=H;var h=i(require("http-errors"));var re=async(r,e,s)=>{try{let t=r.headers.authorization;if(!t)return s((0,h.default)(401));let[o,n]=t.split(" ");if(o!=="Bearer")return s((0,h.default)(401,"Invalid token type"));let{decoded:u,valid:g,expired:x}=z(n);if(x)return s((0,h.default)(401,"Token expired"));if(!g)return s((0,h.default)(401,"Invalid token"));let{id:R}=u,b=await L(R);return b?(e.locals.user={id:b.id},s()):s((0,h.default)(401,"User not found"))}catch(t){return s(t)}};var fe=require("express");var te=async()=>{try{return await l.count()}catch(r){return a(500,r?.message)}},se=async({skip:r,take:e})=>{try{return await l.findMany({skip:r,take:e,include:{postBy:{select:{id:!0,name:!0}}}})}catch(s){return a(500,s?.message)}},oe=async r=>{try{return await l.findUnique({where:{id:r},include:{postBy:{select:{id:!0,name:!0}}}})}catch(e){return a(500,e?.message)}};var ne=async r=>{try{return await l.create({data:r})}catch(e){return p("error","createPost",e.message),a(500,e.message)}},ae=async r=>{let{postId:e,title:s,body:t}=r;try{return await l.update({where:{id:e},data:{title:s,body:t}})}catch(o){return a(500,o?.message)}},ie=async r=>{try{return await l.delete({where:{id:r}})}catch(e){return e instanceof C&&e.code==="P2025"?a(404,"Post not found"):a(500,"Db error")}};var T=i(require("http-errors")),ce=async(r,e,s)=>{try{let t=r.body,o=e.locals.user?.id,n={...t,userId:o},u=await ne(n);return e.status(200).json({meta:{status:200,message:"Successfully create new post"},data:{post:u}})}catch(t){return s(t)}},ue=async(r,e,s)=>{try{let t=r.query.pages?parseInt(r.query.pages):1;if(isNaN(t))return s((0,T.default)(422,"Pages should be number type"));let o,n=15;t<=1?o=0:o=(t-1)*n;let u=await se({skip:o,take:n});t=t++;let g=await te(),x=Math.ceil(g/n),R=t<x,b=R?t+1:null;return e.status(200).json({meta:{status:200,message:"Successfully create new post",total:g,totalPages:x,currentPages:t,hasNextPage:R,nextPage:b},data:{posts:u}})}catch(t){return s(t)}};var pe=async(r,e,s)=>{try{let t=r.params.id;if(!t)return s((0,T.default)(422,"Post id not found"));let o=await oe(t);return o?e.status(200).json({meta:{status:200,message:"Successfully get post"},data:{post:o}}):s((0,T.default)(404,"Post not found"))}catch(t){return s(t)}},de=async(r,e,s)=>{try{let t=r.params.id,o=e.locals.user?.id,n={postId:t,userId:o,...r.body},u=await ae(n);return e.status(202).json({meta:{status:202,message:"Successfully create new post"},data:{post:u}})}catch(t){return s(t)}},me=async(r,e,s)=>{try{let t=r.params.id,o=await ie(t);return e.status(200).json({meta:{status:200,message:"Successfully deleted post"},data:{post:{id:t}}})}catch(t){return s(t)}};var d=require("zod"),le=(0,d.object)({body:(0,d.object)({title:(0,d.string)({required_error:"Title is required"}),body:(0,d.string)({required_error:"Body is required"})})}),ye=(0,d.object)({body:(0,d.object)({title:(0,d.string)({required_error:"Title is required"}).optional(),body:(0,d.string)({required_error:"Body is required"}).optional()})});var y=(0,fe.Router)();y.get("/",ue);y.get("/user/:id");y.post("/",P(le),ce);y.get("/:id",pe);y.patch("/:id",P(ye),de);y.delete("/:id",me);var ge=y;var f=(0,E.default)();f.use(E.default.json());f.use(E.default.urlencoded({extended:!0}));f.use("/api/v1/users",ee);f.use("/api/v1/posts",re,ge);f.use((r,e,s)=>s((0,he.default)(404,"Your request was not found")));f.use((r,e,s,t)=>{let o=r.status??500,n=r.message??"Internal Server Error";return s.status(o).json({error:{status:o,message:n}})});var qe=Pe.default.createServer(f);qe.listen(I,()=>p("success","startup",`Server listening on ${I}`));
//# sourceMappingURL=app.js.map