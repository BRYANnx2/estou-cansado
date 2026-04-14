import { useState, useEffect } from "react";

const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');`;

const C = {
  bg:"#07070A", dark:"#0D0D11", card:"#111116", border:"#1F1F25",
  gold:"#C9A84C", goldL:"#E8D5A3", goldD:"#9A7830", goldXL:"#F5EDD0",
  white:"#F8F6F2", gray:"#7A7A85", grayD:"#2A2A30",
  green:"#27AE60", red:"#C0392B",
};
const fmt = v => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const uid  = () => Date.now().toString(36)+Math.random().toString(36).slice(2,6);

const S = {
  async get(k){try{const r=await window.storage.get("lps:"+k);return r?JSON.parse(r.value):null;}catch{return null;}},
  async set(k,v){try{await window.storage.set("lps:"+k,JSON.stringify(v));}catch{}},
};

const IP = [
  {id:1,name:"Boné Snapback Premium Black",price:129.90,oldPrice:159.90,category:"bonés",stock:12,badge:"MAIS VENDIDO",image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85",desc:"Snapback premium estruturado, bordado LINE exclusivo. Fechamento metálico ajustável. 100% algodão escovado."},
  {id:2,name:"Boné Dad Hat Vintage Washed",price:99.90,oldPrice:null,category:"bonés",stock:8,badge:"NOVO",image:"https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=85",desc:"Dad hat com lavagem stone washed especial. Perfil baixo relaxado, regulagem velcro premium."},
  {id:3,name:"Camiseta Oversized Street",price:149.90,oldPrice:179.90,category:"camisetas",stock:25,badge:"DESTAQUE",image:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",desc:"100% algodão penteado fio 30.1, 200g/m². Modelagem oversized com costura reforçada."},
  {id:4,name:"Camiseta Premium Básica",price:79.90,oldPrice:null,category:"camisetas",stock:40,badge:null,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85",desc:"Essencial premium em algodão 190g/m². Gola dupla em ribana. Disponível em 8 cores."},
  {id:5,name:"Óculos SPY Eyewear Classic",price:289.90,oldPrice:350.00,category:"óculos",stock:9,badge:"PREMIUM",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=85",desc:"Óculos SPY Eyewear original importado. Proteção UV400. Lente espelhada premium."},
  {id:6,name:"Óculos Esportivo Street",price:199.90,oldPrice:null,category:"óculos",stock:6,badge:null,image:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=85",desc:"Design aerodinâmico com armação leve. UV400. Ideal para uso casual e esportivo."},
  {id:7,name:"Tênis Casual Street Low",price:399.90,oldPrice:479.90,category:"tênis",stock:11,badge:"OFERTA",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",desc:"Tênis casual streetwear com solado em borracha natural. Couro sintético premium."},
  {id:8,name:"Tênis Urban Runner",price:449.90,oldPrice:null,category:"tênis",stock:7,badge:"NOVO",image:"https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=85",desc:"Amortecimento EVA de alta performance. Cabedal mesh respirável. Solado antiderrapante."},
  {id:9,name:"Perfume Masculino Gold",price:219.90,oldPrice:279.90,category:"perfumes",stock:14,badge:"DESTAQUE",image:"https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=85",desc:"Fragrância amadeirada com notas de sândalo, baunilha e almíscar. 100ml EDP."},
  {id:10,name:"Perfume Night Premium",price:189.90,oldPrice:null,category:"perfumes",stock:10,badge:null,image:"https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=85",desc:"Fragrância intensa para o fim do dia. Notas de especiarias e madeira negra. 75ml EDP."},
  {id:11,name:"Kit 6 Meias Premium",price:69.90,oldPrice:89.90,category:"meias",stock:50,badge:"OFERTA",image:"https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&q=85",desc:"Kit com 6 pares em algodão premium com elastano. Anti-odor e antibolhas."},
  {id:12,name:"Chinelo Street Slide",price:89.90,oldPrice:119.90,category:"chinelos",stock:22,badge:"NOVO",image:"https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=85",desc:"Slide premium com tira ergonômica. Solado anatômico em EVA. Acabamento premium."},
];

const IC = [
  {id:1,code:"LINE10",type:"percent",value:10,active:true,uses:0,maxUses:100,desc:"10% de desconto geral"},
  {id:2,code:"FRETEGRATIS",type:"shipping",value:0,active:true,uses:0,maxUses:50,desc:"Frete grátis"},
  {id:3,code:"PROMO20",type:"fixed",value:20,active:false,uses:0,maxUses:20,desc:"R$ 20 de desconto"},
];

const IS = {
  name:"LINE PREMIUM STORE",tagline:"Casual · Street · Perfumaria",
  about:"A LINE é referência em streetwear premium em Itapira-SP. Produtos 100% originais com o melhor custo-benefício da região.",
  heroImg:"https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&q=80",
  heroTitle:"ESTILO QUE\nDEFINE VOCÊ",heroSub:"Produtos 100% Originais · Itapira-SP",
  whatsapp:"(19) 99999-9999",instagram:"@linepremiumstore",
  address:"Rua João de Moraes, 258 · Centro · Itapira-SP",
  freeShipMin:200,freeShipActive:true,pixDiscount:true,pixPct:5,
  marquee:["🧢 REFERÊNCIA EM BONÉS EM ITAPIRA-SP","⚡ PIX COM 5% DE DESCONTO","🚚 FRETE GRÁTIS ACIMA DE R$ 200","✅ PRODUTOS 100% ORIGINAIS","📍 RUA JOÃO DE MORAES, 258 - CENTRO","👟 CASUAL · STREET · PERFUMARIA","🕶️ ÓCULOS SPY ORIGINAIS","🎁 TROCA EM ATÉ 30 DIAS"],
};

const PAY = {
  pix:{label:"PIX",icon:"⚡",sub:"Aprovação instantânea"},
  mercadoPago:{label:"Mercado Pago",icon:"💙",sub:"Cartão, boleto ou saldo MP"},
  nubank:{label:"Nubank",icon:"💜",sub:"Cartão Nubank"},
  cartaoCredito:{label:"Cartão de Crédito",icon:"💳",sub:"Até 12x sem juros"},
  boleto:{label:"Boleto Bancário",icon:"📄",sub:"Vence em 3 dias úteis"},
};

const CATS = ["todos","bonés","camisetas","óculos","tênis","perfumes","meias","chinelos"];

const LPLogo = ({size=44})=>(
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0}}>
    <circle cx="50" cy="50" r="48" fill={C.bg} stroke={C.gold} strokeWidth="1.8"/>
    <polygon points="28,45 34,28 43,40 50,23 57,40 66,28 72,45" fill={C.gold}/>
    <rect x="28" y="45" width="44" height="5" rx="1" fill={C.gold}/>
    <circle cx="28" cy="45" r="2.8" fill={C.goldXL}/>
    <circle cx="50" cy="23" r="2.8" fill={C.goldXL}/>
    <circle cx="72" cy="45" r="2.8" fill={C.goldXL}/>
    <text x="50" y="82" textAnchor="middle" fontFamily="Georgia,serif" fontSize="23" fontWeight="bold" fill={C.goldXL} letterSpacing="5">LP</text>
  </svg>
);

const Marquee = ({items})=>{
  const list=[...items,...items,...items];
  return(
    <div style={{background:C.gold,overflow:"hidden",height:34,display:"flex",alignItems:"center"}}>
      <div style={{display:"flex",animation:"mqScroll 32s linear infinite",whiteSpace:"nowrap",willChange:"transform"}}>
        {list.map((t,i)=>(
          <span key={i} style={{padding:"0 24px",fontSize:10,fontWeight:700,letterSpacing:2,color:C.bg,flexShrink:0}}>
            {t}<span style={{marginLeft:8,opacity:.5}}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const CSS = `
${GFONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:${C.bg};color:${C.white};-webkit-font-smoothing:antialiased;overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${C.dark}}::-webkit-scrollbar-thumb{background:${C.goldD};border-radius:2px}
::selection{background:${C.gold};color:${C.bg}}
button,input,select,textarea{font-family:'Plus Jakarta Sans',sans-serif}
@keyframes mqScroll{0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}}
@keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes sr{from{transform:translateX(110%)}to{transform:translateX(0)}}
.fu{animation:fu .5s cubic-bezier(.16,1,.3,1) both}
.fi{animation:fi .35s ease both}
.sr{animation:sr .3s cubic-bezier(.16,1,.3,1)}
.serif{font-family:'Cormorant Garamond',serif}
.btn{cursor:pointer;border:none;font-family:'Plus Jakarta Sans',sans-serif;transition:all .18s;border-radius:2px;font-weight:600;letter-spacing:.8px}
.btn-g{background:${C.gold};color:${C.bg};padding:13px 28px;font-size:13px}
.btn-g:hover{background:${C.goldD};transform:translateY(-1px)}
.btn-g:active{transform:translateY(0)}
.btn-o{background:transparent;color:${C.white};border:1px solid ${C.gold};padding:12px 26px;font-size:13px}
.btn-o:hover{background:${C.gold};color:${C.bg}}
.inp{width:100%;padding:11px 13px;background:${C.dark};border:1px solid ${C.border};border-radius:2px;color:${C.white};font-size:14px;outline:none;transition:border-color .2s}
.inp:focus{border-color:${C.gold}}
.inp.err{border-color:${C.red}}
.lbl{display:block;color:${C.gray};font-size:11px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;margin-bottom:5px}
.card{background:${C.card};border:1px solid ${C.border};border-radius:3px}
.pi{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.16,1,.3,1)}
.pw:hover .pi{transform:scale(1.06)}
.pw:hover .po{opacity:1}
.po{position:absolute;inset:0;background:rgba(0,0,0,.52);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s}
.ab{display:flex;align-items:center;gap:10px;padding:11px 18px;background:transparent;border:none;width:100%;text-align:left;font-size:13px;font-weight:500;cursor:pointer;border-left:3px solid transparent;transition:all .15s;color:#777}
.ab.on{background:${C.dark};color:${C.gold};border-left-color:${C.gold}}
.ab:not(.on):hover{background:rgba(255,255,255,.03);color:${C.white}}
.tog{width:42px;height:23px;border-radius:12px;cursor:pointer;position:relative;transition:background .2s;flex-shrink:0}
.tth{position:absolute;width:17px;height:17px;border-radius:50%;background:#fff;top:3px;transition:left .2s}
.st{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,4vw,38px);font-weight:300;letter-spacing:3px;text-transform:uppercase;line-height:1}
.gl::after{content:'';display:block;width:34px;height:1.5px;background:${C.gold};margin-top:9px}
@media(max-width:768px){
  .hm{display:none!important}.mf{width:100%!important}.mc{flex-direction:column!important}
  .pg{grid-template-columns:repeat(2,1fr)!important;gap:1px!important}
  .cg{grid-template-columns:1fr!important}.al{flex-direction:column!important}
  .as{width:100%!important;flex-direction:row!important;overflow-x:auto!important}
  .ht{font-size:clamp(36px,10vw,68px)!important}
  .tg{grid-template-columns:repeat(2,1fr)!important}
  .fg{grid-template-columns:1fr!important;gap:24px!important}
}
@media(max-width:480px){.pg{grid-template-columns:repeat(2,1fr)!important}.cb{gap:4px!important}.cbt{padding:6px 10px!important;font-size:10px!important}}
`;

export default function App(){
  const [ready,setReady]   = useState(false);
  const [prods,setProds]   = useState(IP);
  const [coupons,setCoupons]= useState(IC);
  const [settings,setSettings]= useState(IS);
  const [payMeth,setPayMeth]= useState({pix:true,mercadoPago:true,nubank:false,cartaoCredito:true,boleto:false});
  const [orders,setOrders] = useState([]);
  const [customers,setCustomers]= useState([]);
  const [cart,setCart]     = useState([]);
  const [page,setPage]     = useState("store");
  const [cartOpen,setCartOpen]= useState(false);
  const [modal,setModal]   = useState(null);
  const [filter,setFilter] = useState("todos");
  const [adminAuth,setAdminAuth]= useState(false);
  const [adminPwd,setAdminPwd]= useState("");
  const [pwdErr,setPwdErr] = useState(false);
  const [aTab,setATab]     = useState("dashboard");
  const [editProd,setEditProd]= useState(null);
  const [newProd,setNewProd]= useState({name:"",price:"",oldPrice:"",category:"bonés",stock:"",image:"",desc:"",badge:""});
  const [editCoupon,setEditCoupon]= useState(null);
  const [newCoupon,setNewCoupon]= useState({code:"",type:"percent",value:"",active:true,maxUses:100,desc:""});
  const [step,setStep]     = useState(1);
  const [form,setForm]     = useState({name:"",email:"",phone:"",cpf:"",cep:"",street:"",num:"",comp:"",city:"",state:"",payment:""});
  const [ferr,setFerr]     = useState({});
  const [couponInput,setCouponInput]= useState("");
  const [couponApplied,setCouponApplied]= useState(null);
  const [couponErr,setCouponErr]= useState("");
  const [heroV,setHeroV]   = useState(false);

  useEffect(()=>{
    (async()=>{
      const [p,c,st,pm,ord,cust]=await Promise.all([S.get("prods"),S.get("coupons"),S.get("settings"),S.get("payments"),S.get("orders"),S.get("customers")]);
      if(p)setProds(p); if(c)setCoupons(c);
      if(st)setSettings(prev=>({...prev,...st}));
      if(pm)setPayMeth(prev=>({...prev,...pm}));
      if(ord)setOrders(ord); if(cust)setCustomers(cust);
      setReady(true); setTimeout(()=>setHeroV(true),100);
    })();
  },[]);
  useEffect(()=>{if(ready)S.set("prods",prods);},[prods,ready]);
  useEffect(()=>{if(ready)S.set("coupons",coupons);},[coupons,ready]);
  useEffect(()=>{if(ready)S.set("settings",settings);},[settings,ready]);
  useEffect(()=>{if(ready)S.set("payments",payMeth);},[payMeth,ready]);
  useEffect(()=>{if(ready)S.set("orders",orders);},[orders,ready]);
  useEffect(()=>{if(ready)S.set("customers",customers);},[customers,ready]);

  const addCart=(p)=>{setCart(prev=>{const ex=prev.find(i=>i.id===p.id);return ex?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1}];});setCartOpen(true);setModal(null);};
  const updQty=(id,qty)=>qty<1?setCart(c=>c.filter(i=>i.id!==id)):setCart(c=>c.map(i=>i.id===id?{...i,qty}:i));
  const remItem=(id)=>setCart(c=>c.filter(i=>i.id!==id));
  const cartQty=cart.reduce((s,i)=>s+i.qty,0);
  const cartSub=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const shipping=(settings.freeShipActive&&cartSub>=settings.freeShipMin)||couponApplied?.type==="shipping"?0:18.90;
  const pixDisc=(settings.pixDiscount&&form.payment==="pix")?cartSub*(settings.pixPct/100):0;
  const couponDisc=couponApplied?.type==="percent"?cartSub*(couponApplied.value/100):couponApplied?.type==="fixed"?couponApplied.value:0;
  const cartTotal=Math.max(0,cartSub+shipping-pixDisc-couponDisc);
  const activePay=Object.entries(payMeth).filter(([,v])=>v);
  const filtered=filter==="todos"?prods:prods.filter(p=>p.category===filter);

  const applyCoupon=()=>{
    const c=coupons.find(x=>x.code===couponInput.toUpperCase()&&x.active);
    if(!c){setCouponErr("Cupom inválido ou expirado.");return;}
    if(c.maxUses&&c.uses>=c.maxUses){setCouponErr("Limite de uso atingido.");return;}
    setCouponApplied(c);setCouponErr("");setCouponInput("");
  };

  const saveProd=()=>{
    const p=editProd||newProd;
    if(!p.name||!p.price)return;
    if(editProd)setProds(prev=>prev.map(x=>x.id===editProd.id?{...p,id:x.id,price:parseFloat(p.price),oldPrice:p.oldPrice?parseFloat(p.oldPrice):null,stock:parseInt(p.stock)||0}:x));
    else{setProds(prev=>[...prev,{...p,id:Date.now(),price:parseFloat(p.price),oldPrice:p.oldPrice?parseFloat(p.oldPrice):null,stock:parseInt(p.stock)||0}]);setNewProd({name:"",price:"",oldPrice:"",category:"bonés",stock:"",image:"",desc:"",badge:""});}
    setEditProd(null);setATab("produtos");
  };

  const saveCoupon=()=>{
    const c=editCoupon||newCoupon;
    if(!c.code)return;
    const clean={...c,code:c.code.toUpperCase(),value:parseFloat(c.value)||0,maxUses:parseInt(c.maxUses)||999,uses:c.uses||0};
    if(editCoupon)setCoupons(prev=>prev.map(x=>x.id===editCoupon.id?{...clean,id:x.id}:x));
    else{setCoupons(prev=>[...prev,{...clean,id:Date.now()}]);setNewCoupon({code:"",type:"percent",value:"",active:true,maxUses:100,desc:""});}
    setEditCoupon(null);setATab("cupons");
  };

  const validate=(s)=>{
    const e={};
    if(s===1){if(!form.name.trim())e.name="Obrigatório";if(!form.email.includes("@"))e.email="Inválido";if(form.phone.replace(/\D/g,"").length<10)e.phone="Inválido";}
    if(s===2){if(form.cep.replace(/\D/g,"").length<8)e.cep="CEP inválido";if(!form.street)e.street="Obrigatório";if(!form.num)e.num="Obrigatório";if(!form.city)e.city="Obrigatório";}
    if(s===3){if(!form.payment)e.payment="Selecione um método";}
    setFerr(e);return!Object.keys(e).length;
  };
  const nextStep=()=>{if(validate(step))setStep(s=>s+1);};
  const finalize=()=>{
    if(!validate(3))return;
    const order={id:uid(),date:new Date().toISOString(),customer:{name:form.name,email:form.email,phone:form.phone,address:`${form.street},${form.num}${form.comp?` - ${form.comp}`:""} - ${form.city}/${form.state}`},items:[...cart],total:cartTotal,payment:form.payment,coupon:couponApplied?.code||null,status:"Aguardando pagamento"};
    setOrders(prev=>[order,...prev]);
    const ex=customers.find(c=>c.email===form.email);
    if(!ex)setCustomers(prev=>[...prev,{id:uid(),name:form.name,email:form.email,phone:form.phone,city:form.city,state:form.state,orders:1,total:cartTotal,since:new Date().toLocaleDateString("pt-BR")}]);
    else setCustomers(prev=>prev.map(c=>c.email===form.email?{...c,orders:c.orders+1,total:c.total+cartTotal}:c));
    if(couponApplied)setCoupons(prev=>prev.map(c=>c.id===couponApplied.id?{...c,uses:c.uses+1}:c));
    setPage("success");
  };

  const Fi=(k,placeholder,type="text",col="auto",label="")=>(
    <div style={{gridColumn:col}}>
      {label&&<label className="lbl">{label}</label>}
      <input type={type} value={form[k]} placeholder={placeholder} className={`inp${ferr[k]?" err":""}`}
        onChange={e=>{setForm(p=>({...p,[k]:e.target.value}));setFerr(p=>({...p,[k]:""}));}}/>
      {ferr[k]&&<div style={{color:C.red,fontSize:11,marginTop:3}}>{ferr[k]}</div>}
    </div>
  );

  // ════ ADMIN ════
  if(page==="admin"){
    if(!adminAuth)return(
      <div style={{background:"#04040A",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <style>{CSS}</style>
        <div className="fu card" style={{padding:"42px 34px",width:"min(360px,100%)",textAlign:"center"}}>
          <LPLogo size={56}/><div className="serif" style={{fontSize:20,letterSpacing:4,color:C.white,margin:"14px 0 3px"}}>ADMIN</div>
          <div style={{color:C.gray,fontSize:12,letterSpacing:1,marginBottom:26}}>LINE PREMIUM STORE</div>
          <input type="password" placeholder="Senha" value={adminPwd} onChange={e=>{setAdminPwd(e.target.value);setPwdErr(false);}}
            onKeyDown={e=>e.key==="Enter"&&(adminPwd==="admin123"?(setAdminAuth(true),setPwdErr(false)):setPwdErr(true))}
            className={`inp${pwdErr?" err":""}`} style={{marginBottom:10,textAlign:"center",letterSpacing:6}}/>
          {pwdErr&&<div style={{color:C.red,fontSize:12,marginBottom:10}}>Senha incorreta</div>}
          <button className="btn btn-g" style={{width:"100%",padding:14}} onClick={()=>adminPwd==="admin123"?(setAdminAuth(true),setPwdErr(false)):setPwdErr(true)}>ENTRAR</button>
          <button onClick={()=>setPage("store")} style={{marginTop:12,background:"none",border:"none",color:C.gray,fontSize:12,cursor:"pointer"}}>← Voltar à loja</button>
          <div style={{color:"#333",fontSize:10,marginTop:14}}>admin123</div>
        </div>
      </div>
    );

    const pf=editProd||newProd; const sp=editProd?setEditProd:setNewProd;
    const cf=editCoupon||newCoupon; const sc=editCoupon?setEditCoupon:setNewCoupon;
    const TABS=[{id:"dashboard",i:"📊",l:"Dashboard"},{id:"produtos",i:"📦",l:"Produtos"},{id:"add",i:"➕",l:editProd?"Editar":"Novo Produto"},{id:"pedidos",i:"🛍",l:"Pedidos"},{id:"clientes",i:"👥",l:"Clientes"},{id:"cupons",i:"🎫",l:"Cupons"},{id:"pagamentos",i:"💳",l:"Pagamentos"},{id:"config",i:"⚙️",l:"Configurações"}];

    return(
      <div className="al" style={{display:"flex",minHeight:"100vh",background:"#04040A"}}>
        <style>{CSS}</style>
        <aside className="as" style={{width:220,background:C.dark,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",flexShrink:0}}>
          <div style={{padding:"18px 14px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:8}}>
            <LPLogo size={34}/><div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:2,color:C.gold}}>LINE</div><div style={{color:"#444",fontSize:9,letterSpacing:1}}>ADMIN</div></div>
          </div>
          <nav style={{flex:1,paddingTop:4,overflowY:"auto"}}>
            {TABS.map(t=><button key={t.id} className={`ab${aTab===t.id?" on":""}`} onClick={()=>{setATab(t.id);if(t.id!=="add")setEditProd(null);if(t.id!=="cupons"&&t.id!=="add")setEditCoupon(null);}}><span style={{fontSize:13}}>{t.i}</span><span>{t.l}</span></button>)}
          </nav>
          <div style={{padding:"12px 14px",borderTop:`1px solid ${C.border}`}}>
            <div style={{color:C.green,fontSize:10,marginBottom:8}}>● LOJA ONLINE</div>
            <button onClick={()=>setPage("store")} style={{background:"none",border:"none",color:"#555",fontSize:11,display:"block",marginBottom:5,cursor:"pointer"}}>← Ver loja</button>
            <button onClick={()=>{setAdminAuth(false);setAdminPwd("");}} style={{background:"none",border:"none",color:C.red,fontSize:11,cursor:"pointer"}}>Sair</button>
          </div>
        </aside>
        <main style={{flex:1,overflowY:"auto",padding:"26px 22px"}}>

          {aTab==="dashboard"&&(
            <div className="fi">
              <h2 style={{color:C.white,fontSize:17,fontWeight:700,marginBottom:18}}>Dashboard</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10,marginBottom:24}}>
                {[{l:"Produtos",v:prods.length,i:"📦",cl:C.gold},{l:"Pedidos",v:orders.length,i:"🛍",cl:C.green},{l:"Clientes",v:customers.length,i:"👥",cl:"#60A5FA"},{l:"Cupons Ativos",v:coupons.filter(c=>c.active).length,i:"🎫",cl:"#C084FC"},{l:"Em Estoque",v:prods.reduce((s,p)=>s+p.stock,0),i:"📊",cl:C.goldL},{l:"Faturamento",v:fmt(orders.reduce((s,o)=>s+o.total,0)),i:"💰",cl:C.green}]
                .map((m,i)=>(
                  <div key={i} className="card" style={{padding:"14px 12px"}}>
                    <div style={{fontSize:18,marginBottom:7}}>{m.i}</div>
                    <div style={{color:C.gray,fontSize:10,fontWeight:600,letterSpacing:.5,marginBottom:3}}>{m.l}</div>
                    <div style={{color:m.cl,fontWeight:700,fontSize:typeof m.v==="string"?13:20}}>{m.v}</div>
                  </div>
                ))}
              </div>
              {orders.length>0&&(<><h3 style={{color:C.white,fontSize:14,fontWeight:600,marginBottom:10}}>Últimos pedidos</h3>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {orders.slice(0,5).map(o=>(
                  <div key={o.id} className="card" style={{padding:"11px 13px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                    <div><div style={{color:C.white,fontSize:13,fontWeight:600}}>{o.customer.name}</div><div style={{color:C.gray,fontSize:11}}>{new Date(o.date).toLocaleDateString("pt-BR")} · {o.items.length} item(s)</div></div>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <span style={{color:C.gold,fontWeight:700,fontSize:13}}>{fmt(o.total)}</span>
                      <span style={{background:"#0a1a0a",color:C.green,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:2}}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div></>)}
            </div>
          )}

          {aTab==="produtos"&&(
            <div className="fi">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:10}}>
                <div><h2 style={{color:C.white,fontSize:17,fontWeight:700}}>Produtos</h2><div style={{color:C.gray,fontSize:12,marginTop:2}}>{prods.length} itens · {prods.reduce((s,p)=>s+p.stock,0)} un. estoque</div></div>
                <button className="btn btn-g" onClick={()=>{setEditProd(null);setATab("add");}} style={{padding:"9px 16px",fontSize:12}}>+ Novo</button>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {prods.map(p=>(
                  <div key={p.id} className="card" style={{padding:"11px 13px",display:"flex",alignItems:"center",gap:11}}>
                    <img src={p.image} alt={p.name} style={{width:50,height:50,objectFit:"cover",borderRadius:2,background:C.border,flexShrink:0}} onError={e=>e.target.style.display="none"}/>
                    <div style={{flex:1,minWidth:0}}><div style={{color:C.white,fontWeight:600,fontSize:13,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div><div style={{color:C.gray,fontSize:11,marginTop:2}}>{p.category} · {p.stock>0?`${p.stock} un.`:<span style={{color:C.red}}>Esgotado</span>}{p.badge&&<span style={{marginLeft:6,background:"#1a1506",color:C.gold,fontSize:9,fontWeight:700,padding:"1px 5px"}}>{p.badge}</span>}</div></div>
                    <div style={{textAlign:"right",flexShrink:0}}><div style={{color:C.gold,fontWeight:700,fontSize:13}}>{fmt(p.price)}</div>{p.oldPrice&&<div style={{color:"#555",fontSize:11,textDecoration:"line-through"}}>{fmt(p.oldPrice)}</div>}</div>
                    <div style={{display:"flex",gap:5,flexShrink:0}}>
                      <button onClick={()=>{setEditProd({...p,oldPrice:p.oldPrice||""});setATab("add");}} style={{padding:"5px 10px",background:"transparent",border:`1px solid ${C.border}`,color:C.white,borderRadius:2,fontSize:11,cursor:"pointer"}}>Editar</button>
                      <button onClick={()=>setProds(prev=>prev.filter(x=>x.id!==p.id))} style={{padding:"5px 8px",background:"transparent",border:`1px solid #2a1515`,color:C.red,borderRadius:2,fontSize:11,cursor:"pointer"}}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aTab==="add"&&(
            <div className="fi" style={{maxWidth:560}}>
              <h2 style={{color:C.white,fontSize:17,fontWeight:700,marginBottom:18}}>{editProd?"Editar Produto":"Novo Produto"}</h2>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[{k:"name",l:"Nome",col:"1/-1"},{k:"price",l:"Preço (R$)",t:"number"},{k:"oldPrice",l:"Preço original"},{k:"stock",l:"Estoque",t:"number"},{k:"badge",l:"Badge"},{k:"image",l:"URL imagem",col:"1/-1"}].map(f=>(
                  <div key={f.k} style={{gridColumn:f.col||"auto"}}><label className="lbl">{f.l}</label><input type={f.t||"text"} value={pf[f.k]||""} onChange={e=>sp(prev=>({...prev,[f.k]:e.target.value}))} className="inp"/></div>
                ))}
                <div style={{gridColumn:"1/-1"}}><label className="lbl">Categoria</label><select value={pf.category} onChange={e=>sp(prev=>({...prev,category:e.target.value}))} className="inp">{CATS.filter(c=>c!=="todos").map(c=><option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}</select></div>
                <div style={{gridColumn:"1/-1"}}><label className="lbl">Descrição</label><textarea value={pf.desc||""} onChange={e=>sp(prev=>({...prev,desc:e.target.value}))} rows={3} className="inp" style={{resize:"vertical"}}/></div>
              </div>
              {pf.image&&<img src={pf.image} alt="" style={{width:80,height:80,objectFit:"cover",borderRadius:2,border:`1px solid ${C.border}`,marginTop:12}} onError={e=>e.target.style.display="none"}/>}
              <div style={{display:"flex",gap:7,marginTop:18}}>
                <button className="btn btn-g" onClick={saveProd} style={{flex:1,padding:13,fontSize:13}}>{editProd?"SALVAR":"ADICIONAR"}</button>
                <button onClick={()=>{setEditProd(null);setATab("produtos");}} style={{padding:"13px 14px",background:"transparent",border:`1px solid ${C.border}`,color:C.gray,borderRadius:2,cursor:"pointer",fontSize:13}}>Cancelar</button>
              </div>
            </div>
          )}

          {aTab==="pedidos"&&(
            <div className="fi">
              <h2 style={{color:C.white,fontSize:17,fontWeight:700,marginBottom:18}}>Pedidos ({orders.length})</h2>
              {orders.length===0?<div style={{color:C.gray,padding:24,textAlign:"center"}}>Nenhum pedido ainda</div>:(
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {orders.map(o=>(
                    <div key={o.id} className="card" style={{padding:"13px 15px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:8}}>
                        <div><div style={{color:C.white,fontWeight:600,fontSize:13}}>{o.customer.name}</div><div style={{color:C.gray,fontSize:11}}>{o.customer.email} · {new Date(o.date).toLocaleDateString("pt-BR")}</div></div>
                        <div style={{textAlign:"right"}}><div style={{color:C.gold,fontWeight:700,fontSize:14}}>{fmt(o.total)}</div><div style={{color:C.green,fontSize:10}}>{o.status}</div></div>
                      </div>
                      <div style={{color:C.gray,fontSize:11,borderTop:`1px solid ${C.border}`,paddingTop:7}}>{o.items.map(i=>`${i.name} ×${i.qty}`).join(" · ")}{o.coupon&&<span style={{color:C.gold}}> · Cupom: {o.coupon}</span>}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {aTab==="clientes"&&(
            <div className="fi">
              <h2 style={{color:C.white,fontSize:17,fontWeight:700,marginBottom:18}}>Clientes ({customers.length})</h2>
              {customers.length===0?<div style={{color:C.gray,padding:24,textAlign:"center"}}>Nenhum cliente cadastrado</div>:(
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {customers.map(c=>(
                    <div key={c.id} className="card" style={{padding:"13px 15px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                      <div><div style={{color:C.white,fontWeight:600,fontSize:13}}>{c.name}</div><div style={{color:C.gray,fontSize:11,marginTop:2}}>{c.email} · {c.phone}</div><div style={{color:C.gray,fontSize:10,marginTop:1}}>{c.city&&`${c.city}/${c.state} · `}Desde {c.since}</div></div>
                      <div style={{textAlign:"right"}}><div style={{color:C.gold,fontWeight:700,fontSize:14}}>{fmt(c.total)}</div><div style={{color:C.gray,fontSize:11}}>{c.orders} pedido(s)</div></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {aTab==="cupons"&&(
            <div className="fi">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:10}}>
                <h2 style={{color:C.white,fontSize:17,fontWeight:700}}>Cupons de Desconto</h2>
                <button className="btn btn-g" onClick={()=>{setEditCoupon(null);setNewCoupon({code:"",type:"percent",value:"",active:true,maxUses:100,desc:""}); }} style={{padding:"8px 14px",fontSize:12}}>+ Criar</button>
              </div>
              <div className="card" style={{padding:18,marginBottom:16}}>
                <div style={{color:C.goldL,fontSize:12,fontWeight:600,marginBottom:12}}>{editCoupon?"Editar Cupom":"Criar Cupom"}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {[{k:"code",l:"Código"},{k:"value",l:"Valor",t:"number"},{k:"maxUses",l:"Máx. usos",t:"number"},{k:"desc",l:"Descrição",col:"1/-1"}].map(f=>(
                    <div key={f.k} style={{gridColumn:f.col||"auto"}}><label className="lbl">{f.l}</label><input type={f.t||"text"} value={cf[f.k]||""} onChange={e=>sc(prev=>({...prev,[f.k]:e.target.value}))} className="inp" style={f.k==="code"?{textTransform:"uppercase"}:{}}/></div>
                  ))}
                  <div><label className="lbl">Tipo</label><select value={cf.type} onChange={e=>sc(prev=>({...prev,type:e.target.value}))} className="inp"><option value="percent">Porcentagem (%)</option><option value="fixed">Valor fixo (R$)</option><option value="shipping">Frete grátis</option></select></div>
                  <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:14}}><label className="lbl" style={{margin:0}}>Ativo</label><div className="tog" style={{background:cf.active?C.gold:C.grayD}} onClick={()=>sc(prev=>({...prev,active:!prev.active}))}><div className="tth" style={{left:cf.active?22:3}}/></div></div>
                </div>
                <div style={{display:"flex",gap:7,marginTop:12}}>
                  <button className="btn btn-g" onClick={saveCoupon} style={{padding:"9px 18px",fontSize:12}}>{editCoupon?"SALVAR":"CRIAR"}</button>
                  {editCoupon&&<button onClick={()=>setEditCoupon(null)} style={{padding:"9px 12px",background:"transparent",border:`1px solid ${C.border}`,color:C.gray,borderRadius:2,cursor:"pointer",fontSize:12}}>Cancelar</button>}
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {coupons.map(c=>(
                  <div key={c.id} className="card" style={{padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,opacity:c.active?1:.5}}>
                    <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:7}}><span style={{color:C.gold,fontWeight:800,fontSize:14,letterSpacing:1}}>{c.code}</span><span style={{background:c.active?"#0a1a0a":"#1a1010",color:c.active?C.green:C.red,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:2}}>{c.active?"ATIVO":"INATIVO"}</span></div><div style={{color:C.gray,fontSize:11,marginTop:3}}>{c.type==="percent"?`${c.value}%`:c.type==="fixed"?fmt(c.value):"Frete grátis"} · {c.uses}/{c.maxUses} usos{c.desc&&` · ${c.desc}`}</div></div>
                    <div style={{display:"flex",gap:5,alignItems:"center"}}>
                      <div className="tog" style={{background:c.active?C.gold:C.grayD}} onClick={()=>setCoupons(prev=>prev.map(x=>x.id===c.id?{...x,active:!x.active}:x))}><div className="tth" style={{left:c.active?22:3}}/></div>
                      <button onClick={()=>setEditCoupon({...c})} style={{padding:"4px 9px",background:"transparent",border:`1px solid ${C.border}`,color:C.white,borderRadius:2,fontSize:11,cursor:"pointer"}}>Editar</button>
                      <button onClick={()=>setCoupons(prev=>prev.filter(x=>x.id!==c.id))} style={{padding:"4px 7px",background:"transparent",border:`1px solid #2a1515`,color:C.red,borderRadius:2,fontSize:11,cursor:"pointer"}}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aTab==="pagamentos"&&(
            <div className="fi" style={{maxWidth:500}}>
              <h2 style={{color:C.white,fontSize:17,fontWeight:700,marginBottom:16}}>Formas de Pagamento</h2>
              {Object.entries(PAY).map(([k,info])=>(
                <div key={k} className="card" style={{padding:"13px 15px",marginBottom:7,display:"flex",alignItems:"center",gap:11}}>
                  <span style={{fontSize:19}}>{info.icon}</span>
                  <div style={{flex:1}}><div style={{color:C.white,fontSize:13,fontWeight:600}}>{info.label}</div><div style={{color:C.gray,fontSize:11}}>{info.sub}</div></div>
                  <div className="tog" style={{background:payMeth[k]?C.gold:C.grayD}} onClick={()=>setPayMeth(prev=>({...prev,[k]:!prev[k]}))}>
                    <div className="tth" style={{left:payMeth[k]?22:3}}/>
                  </div>
                </div>
              ))}
              <div className="card" style={{padding:"13px 15px",marginTop:7}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><div style={{color:C.white,fontSize:13,fontWeight:600}}>Desconto PIX ({settings.pixPct}%)</div><div style={{color:C.gray,fontSize:11}}>Desconto automático no PIX</div></div>
                  <div className="tog" style={{background:settings.pixDiscount?C.gold:C.grayD}} onClick={()=>setSettings(prev=>({...prev,pixDiscount:!prev.pixDiscount}))}>
                    <div className="tth" style={{left:settings.pixDiscount?22:3}}/>
                  </div>
                </div>
              </div>
            </div>
          )}

          {aTab==="config"&&(
            <div className="fi" style={{maxWidth:600}}>
              <h2 style={{color:C.white,fontSize:17,fontWeight:700,marginBottom:18}}>Configurações da Loja</h2>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[{k:"name",l:"Nome da loja",col:"1/-1"},{k:"tagline",l:"Tagline",col:"1/-1"},{k:"heroTitle",l:"Título do hero",col:"1/-1"},{k:"heroSub",l:"Subtítulo do hero",col:"1/-1"},{k:"heroImg",l:"URL imagem hero",col:"1/-1"},{k:"about",l:"Texto sobre a loja",col:"1/-1"},{k:"whatsapp",l:"WhatsApp"},{k:"instagram",l:"Instagram"},{k:"address",l:"Endereço",col:"1/-1"}].map(f=>(
                  <div key={f.k} style={{gridColumn:f.col||"auto"}}><label className="lbl">{f.l}</label>
                    {f.k==="about"||f.k==="heroTitle"?<textarea value={settings[f.k]||""} onChange={e=>setSettings(prev=>({...prev,[f.k]:e.target.value}))} rows={2} className="inp" style={{resize:"vertical"}}/>:<input value={settings[f.k]||""} onChange={e=>setSettings(prev=>({...prev,[f.k]:e.target.value}))} className="inp"/>}
                  </div>
                ))}
                <div><label className="lbl">Frete grátis mín. (R$)</label><input type="number" value={settings.freeShipMin} onChange={e=>setSettings(prev=>({...prev,freeShipMin:parseFloat(e.target.value)||0}))} className="inp"/></div>
                <div><label className="lbl">Desconto PIX (%)</label><input type="number" value={settings.pixPct} onChange={e=>setSettings(prev=>({...prev,pixPct:parseFloat(e.target.value)||0}))} className="inp"/></div>
                <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:12}}><label className="lbl" style={{margin:0}}>Frete grátis ativo</label><div className="tog" style={{background:settings.freeShipActive?C.gold:C.grayD}} onClick={()=>setSettings(prev=>({...prev,freeShipActive:!prev.freeShipActive}))}><div className="tth" style={{left:settings.freeShipActive?22:3}}/></div></div>
              </div>
              <div style={{marginTop:14}}><label className="lbl">Faixa de anúncios (um por linha)</label><textarea value={(settings.marquee||[]).join("\n")} onChange={e=>setSettings(prev=>({...prev,marquee:e.target.value.split("\n").filter(Boolean)}))} rows={6} className="inp" style={{resize:"vertical"}}/></div>
              <div style={{marginTop:16,color:C.green,fontSize:13}}>✓ Alterações salvas automaticamente</div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ════ SUCCESS ════
  if(page==="success")return(
    <div style={{background:C.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{CSS}</style>
      <div className="fu" style={{textAlign:"center",maxWidth:460,width:"100%"}}>
        <div style={{width:68,height:68,border:`1.5px solid ${C.gold}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 22px",fontSize:26,color:C.gold}}>✓</div>
        <div className="serif" style={{fontSize:"clamp(26px,6vw,38px)",letterSpacing:4,color:C.white,marginBottom:8}}>PEDIDO CONFIRMADO</div>
        <p style={{color:C.gray,fontSize:14,marginBottom:4}}>Obrigado, <strong style={{color:C.white}}>{form.name.split(" ")[0]}</strong>!</p>
        <p style={{color:C.gray,fontSize:13,marginBottom:24}}>Confirmação enviada para <span style={{color:C.goldL}}>{form.email}</span></p>
        <div className="card" style={{padding:18,marginBottom:24,textAlign:"left"}}>
          {cart.map(i=><div key={i.id} style={{display:"flex",justifyContent:"space-between",color:C.gray,fontSize:13,marginBottom:7}}><span>{i.name} <span style={{color:"#444"}}>×{i.qty}</span></span><span style={{color:C.white}}>{fmt(i.price*i.qty)}</span></div>)}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:9,marginTop:5,display:"flex",justifyContent:"space-between",color:C.gold,fontWeight:700,fontSize:15}}><span>Total</span><span>{fmt(cartTotal)}</span></div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn btn-g" onClick={()=>{setCart([]);setPage("store");setStep(1);setCouponApplied(null);setForm({name:"",email:"",phone:"",cpf:"",cep:"",street:"",num:"",comp:"",city:"",state:"",payment:""});}}>CONTINUAR COMPRANDO</button>
          <a href={`https://wa.me/${(settings.whatsapp||"").replace(/\D/g,"")}`} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",padding:"12px 20px",border:`1px solid ${C.green}`,color:C.green,borderRadius:2,fontSize:13,fontWeight:600,textDecoration:"none"}}>💬 WHATSAPP</a>
        </div>
      </div>
    </div>
  );

  // ════ CHECKOUT ════
  if(page==="checkout")return(
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'Plus Jakarta Sans',sans-serif",color:C.white}}>
      <style>{CSS}</style>
      <header style={{background:C.dark,borderBottom:`1px solid ${C.border}`,padding:"0 20px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer"}} onClick={()=>setPage("store")}><LPLogo size={32}/><span className="serif" style={{fontSize:15,letterSpacing:3,color:C.gold}}>LINE</span></div>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          {["Dados","Entrega","Pagamento"].map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:4}}>
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <div style={{width:20,height:20,borderRadius:"50%",border:`1px solid ${step>i+1||step===i+1?C.gold:"#333"}`,background:step>i+1?C.gold:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:step>i+1?C.bg:step===i+1?C.gold:"#555"}}>{step>i+1?"✓":i+1}</div>
                <span style={{fontSize:11,color:step===i+1?C.white:"#444",fontWeight:step===i+1?600:400}} className="hm">{s}</span>
              </div>
              {i<2&&<div style={{width:16,height:1,background:"#222"}}/>}
            </div>
          ))}
        </div>
        <button onClick={()=>setPage("store")} style={{background:"none",border:"none",color:C.gray,fontSize:12,cursor:"pointer"}}>← Voltar</button>
      </header>
      <div className="cg" style={{maxWidth:920,margin:"0 auto",padding:"22px 14px",display:"grid",gridTemplateColumns:"1fr 290px",gap:18}}>
        <div>
          {step===1&&(<div className="fu card" style={{padding:"22px 18px"}}>
            <h3 style={{fontSize:15,fontWeight:700,marginBottom:16}}>Seus dados</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
              {Fi("name","João Silva","text","1/-1","Nome completo")}
              {Fi("email","joao@email.com","email","auto","E-mail")}
              {Fi("cpf","000.000.000-00","text","auto","CPF")}
              {Fi("phone","(19) 99999-9999","tel","1/-1","WhatsApp")}
            </div>
            <button className="btn btn-g" onClick={nextStep} style={{width:"100%",padding:13,marginTop:16,fontSize:13}}>CONTINUAR →</button>
          </div>)}
          {step===2&&(<div className="fu card" style={{padding:"22px 18px"}}>
            <h3 style={{fontSize:15,fontWeight:700,marginBottom:16}}>Endereço de entrega</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
              {Fi("cep","00000-000","text","auto","CEP")}
              <div/>
              {Fi("street","Rua das Flores","text","1/-1","Rua / Avenida")}
              {Fi("num","123","text","auto","Número")}
              {Fi("comp","Apto 21","text","auto","Complemento")}
              {Fi("city","Itapira","text","auto","Cidade")}
              <div><label className="lbl">Estado</label><select value={form.state} onChange={e=>setForm(p=>({...p,state:e.target.value}))} className="inp"><option value="">UF</option>{["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(s=><option key={s}>{s}</option>)}</select></div>
            </div>
            {settings.freeShipActive&&<div style={{background:C.dark,border:`1px solid ${C.border}`,borderRadius:2,padding:"10px 13px",marginTop:12,fontSize:12,color:C.gray}}>🚚 {cartSub>=settings.freeShipMin?<span style={{color:C.green}}>✓ Frete grátis!</span>:<span>Faltam <strong style={{color:C.white}}>{fmt(settings.freeShipMin-cartSub)}</strong> para frete grátis</span>}</div>}
            <div style={{display:"flex",gap:7,marginTop:16}}>
              <button onClick={()=>setStep(1)} style={{padding:"12px 14px",background:"transparent",border:`1px solid ${C.border}`,color:C.gray,borderRadius:2,cursor:"pointer",fontSize:13}}>← Voltar</button>
              <button className="btn btn-g" onClick={nextStep} style={{flex:1,padding:12,fontSize:13}}>CONTINUAR →</button>
            </div>
          </div>)}
          {step===3&&(<div className="fu card" style={{padding:"22px 18px"}}>
            <h3 style={{fontSize:15,fontWeight:700,marginBottom:16}}>Pagamento</h3>
            {activePay.length===0?<div style={{color:C.gray,padding:18,textAlign:"center"}}>Nenhum método ativo</div>:(
              <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
                {activePay.map(([k])=>{
                  const info=PAY[k]; const sel=form.payment===k;
                  return(<div key={k} onClick={()=>{setForm(p=>({...p,payment:k}));setFerr(p=>({...p,payment:""}));}}
                    style={{background:sel?"#13110A":C.dark,border:`1px solid ${sel?C.gold:C.border}`,borderRadius:2,padding:"12px 13px",cursor:"pointer",display:"flex",alignItems:"center",gap:11,transition:"all .15s"}}>
                    <span style={{fontSize:19}}>{info.icon}</span>
                    <div style={{flex:1}}><div style={{color:C.white,fontSize:13,fontWeight:600}}>{info.label}</div><div style={{color:C.gray,fontSize:11}}>{info.sub}</div></div>
                    {k==="pix"&&settings.pixDiscount&&<span style={{background:"#0a1a0a",color:C.green,fontSize:9,fontWeight:700,padding:"2px 6px"}}>-{settings.pixPct}%</span>}
                    {sel&&<div style={{width:15,height:15,borderRadius:"50%",background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:C.bg,fontWeight:900}}>✓</div>}
                  </div>);
                })}
              </div>
            )}
            {ferr.payment&&<div style={{color:C.red,fontSize:11,marginBottom:8}}>{ferr.payment}</div>}
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14,marginBottom:14}}>
              <label className="lbl">Cupom de desconto</label>
              {couponApplied?(
                <div style={{display:"flex",alignItems:"center",gap:8,padding:"9px 11px",background:"#0a1a0a",border:`1px solid #1a3a1a`,borderRadius:2}}>
                  <span style={{color:C.green,fontSize:13,fontWeight:700,flex:1}}>✓ {couponApplied.code}</span>
                  <button onClick={()=>{setCouponApplied(null);setCouponErr("");}} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:11}}>Remover</button>
                </div>
              ):(
                <div style={{display:"flex",gap:5}}>
                  <input value={couponInput} onChange={e=>{setCouponInput(e.target.value.toUpperCase());setCouponErr("");}} placeholder="CÓDIGO DO CUPOM" className="inp" style={{flex:1,letterSpacing:2,fontSize:13}} onKeyDown={e=>e.key==="Enter"&&applyCoupon()}/>
                  <button className="btn btn-o" onClick={applyCoupon} style={{padding:"10px 14px",fontSize:12}}>APLICAR</button>
                </div>
              )}
              {couponErr&&<div style={{color:C.red,fontSize:11,marginTop:4}}>{couponErr}</div>}
            </div>
            <div style={{background:C.dark,border:`1px solid ${C.border}`,borderRadius:2,padding:"10px 13px",marginBottom:14,display:"flex",gap:14,fontSize:11,color:C.gray,flexWrap:"wrap"}}>
              <span>🔒 SSL Seguro</span><span>🛡️ Dados protegidos</span><span>✅ 30 dias de garantia</span>
            </div>
            <div style={{display:"flex",gap:7}}>
              <button onClick={()=>setStep(2)} style={{padding:"12px 14px",background:"transparent",border:`1px solid ${C.border}`,color:C.gray,borderRadius:2,cursor:"pointer",fontSize:13}}>← Voltar</button>
              <button className="btn btn-g" onClick={finalize} style={{flex:1,padding:12,fontSize:13}}>FINALIZAR PEDIDO</button>
            </div>
          </div>)}
        </div>
        <div className="card" style={{padding:18,height:"fit-content",position:"sticky",top:14}}>
          <div style={{color:C.gray,fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Resumo</div>
          {cart.map(i=>(
            <div key={i.id} style={{display:"flex",gap:9,marginBottom:11,paddingBottom:11,borderBottom:`1px solid ${C.border}`}}>
              <div style={{position:"relative",flexShrink:0}}><img src={i.image} alt={i.name} style={{width:46,height:46,objectFit:"cover",borderRadius:2}}/><div style={{position:"absolute",top:-5,right:-5,background:C.gold,color:C.bg,width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800}}>{i.qty}</div></div>
              <div style={{flex:1,minWidth:0}}><div style={{color:C.white,fontSize:12,fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{i.name}</div><div style={{color:C.gold,fontSize:13,fontWeight:700,marginTop:2}}>{fmt(i.price)}</div></div>
            </div>
          ))}
          <div style={{fontSize:13,color:C.gray}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span>Subtotal</span><span style={{color:C.white}}>{fmt(cartSub)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span>Frete</span><span style={{color:shipping===0?C.green:C.white}}>{shipping===0?"GRÁTIS":fmt(shipping)}</span></div>
            {pixDisc>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:C.green}}>PIX -{settings.pixPct}%</span><span style={{color:C.green}}>-{fmt(pixDisc)}</span></div>}
            {couponDisc>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:C.green}}>Cupom</span><span style={{color:C.green}}>-{fmt(couponDisc)}</span></div>}
            <div style={{display:"flex",justifyContent:"space-between",marginTop:9,paddingTop:9,borderTop:`1px solid ${C.border}`,fontWeight:700,fontSize:15}}><span style={{color:C.white}}>Total</span><span style={{color:C.gold}}>{fmt(cartTotal)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );

  // ════ STORE ════
  return(
    <div style={{background:C.bg,minHeight:"100vh",color:C.white,overflowX:"hidden"}}>
      <style>{CSS}</style>
      <Marquee items={settings.marquee||IS.marquee}/>
      <header style={{position:"sticky",top:0,zIndex:200,background:"#07070Aef",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 18px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
          <div onClick={()=>{setPage("store");setFilter("todos");}} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
            <LPLogo size={38}/>
            <div><div className="serif" style={{fontSize:17,fontWeight:500,letterSpacing:4,color:C.white,lineHeight:1}}>LINE</div><div style={{fontSize:8,letterSpacing:3,color:C.gold,fontWeight:600}}>PREMIUM STORE</div></div>
          </div>
          <nav className="cb" style={{display:"flex",gap:3,overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",flex:1,maxWidth:660,justifyContent:"center"}}>
            {CATS.map(c=>(
              <button key={c} className="cbt" onClick={()=>{setFilter(c);document.getElementById("prods")?.scrollIntoView({behavior:"smooth"});}}
                style={{padding:"7px 13px",borderRadius:2,border:"none",background:filter===c?C.gold:"transparent",color:filter===c?C.bg:C.gray,fontSize:11,fontWeight:filter===c?700:400,whiteSpace:"nowrap",transition:"all .15s",flexShrink:0,cursor:"pointer",letterSpacing:.3}}>
                {c==="todos"?"Todos":c.charAt(0).toUpperCase()+c.slice(1)}
              </button>
            ))}
          </nav>
          <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
            <button onClick={()=>setPage("admin")} style={{background:"none",border:`1px solid ${C.border}`,color:"#444",padding:"5px 9px",borderRadius:2,fontSize:9,letterSpacing:1,cursor:"pointer"}} className="hm">ADMIN</button>
            <button onClick={()=>setCartOpen(true)} style={{position:"relative",background:C.gold,border:"none",color:C.bg,width:40,height:40,borderRadius:2,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,cursor:"pointer",transition:"background .2s",flexShrink:0}}
              onMouseEnter={e=>e.currentTarget.style.background=C.goldD} onMouseLeave={e=>e.currentTarget.style.background=C.gold}>
              🛒
              {cartQty>0&&<span style={{position:"absolute",top:-7,right:-7,background:C.bg,color:C.gold,border:`1px solid ${C.gold}`,width:18,height:18,borderRadius:"50%",fontSize:9,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>{cartQty}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{position:"relative",height:"88vh",minHeight:480,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`url('${settings.heroImg||IS.heroImg}')`,backgroundSize:"cover",backgroundPosition:"center",filter:"brightness(.22)"}}/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom,transparent 55%,${C.bg} 100%)`}}/>
        <div style={{position:"relative",textAlign:"center",padding:"0 20px",opacity:heroV?1:0,transform:heroV?"translateY(0)":"translateY(26px)",transition:"opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)"}}>
          <div style={{fontSize:9,letterSpacing:6,color:C.gold,fontWeight:700,marginBottom:16}}>COLEÇÃO PREMIUM · ITAPIRA-SP</div>
          <h1 className="ht serif" style={{fontSize:"clamp(40px,9vw,86px)",fontWeight:300,letterSpacing:5,lineHeight:.9,marginBottom:18,whiteSpace:"pre-line"}}>
            {(settings.heroTitle||IS.heroTitle).replace("\\n","\n")}
          </h1>
          <p style={{color:"#aaa",fontSize:13,letterSpacing:2,marginBottom:32}}>{settings.heroSub||IS.heroSub}</p>
          <div style={{display:"flex",gap:11,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn btn-g" onClick={()=>document.getElementById("prods")?.scrollIntoView({behavior:"smooth"})} style={{padding:"13px 32px",letterSpacing:1.5,fontSize:12}}>VER COLEÇÃO</button>
            <a href={`https://wa.me/${(settings.whatsapp||"").replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="btn btn-o" style={{padding:"12px 24px",letterSpacing:1.5,fontSize:12,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:5}}>💬 WHATSAPP</a>
          </div>
        </div>
        <div style={{position:"absolute",bottom:26,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:5,opacity:.4}}>
          <div style={{width:1,height:32,background:C.gold}}/><div style={{fontSize:8,letterSpacing:4,color:C.gold}}>SCROLL</div>
        </div>
      </section>

      {/* TRUST */}
      <div style={{background:C.dark,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div className="tg" style={{maxWidth:1280,margin:"0 auto",padding:"16px 18px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
          {[{i:"🚚",t:"Frete Grátis",s:`Acima de ${fmt(settings.freeShipMin||200)}`},{i:"🔒",t:"Compra Segura",s:"Dados criptografados"},{i:"↩️",t:"Troca 30 dias",s:"Sem burocracia"},{i:"⭐",t:"100% Originais",s:"Garantia total"}].map((b,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:9}}>
              <span style={{fontSize:16,flexShrink:0}}>{b.i}</span>
              <div><div style={{color:C.white,fontSize:11,fontWeight:600}}>{b.t}</div><div style={{color:C.gray,fontSize:10}}>{b.s}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <section id="prods" style={{maxWidth:1280,margin:"0 auto",padding:"48px 14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28,flexWrap:"wrap",gap:10}}>
          <div><h2 className="st gl">{filter==="todos"?"TODA A COLEÇÃO":filter.toUpperCase()}</h2><p style={{color:C.gray,fontSize:12,marginTop:11}}>{filtered.length} produto{filtered.length!==1?"s":""}</p></div>
        </div>
        <div className="pg" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))",gap:1,border:`1px solid ${C.border}`}}>
          {filtered.map((p,i)=>(
            <div key={p.id} className="pw fu" style={{background:C.bg,cursor:"pointer",animationDelay:`${i*0.04}s`,position:"relative",borderRight:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}
              onClick={()=>setModal(p)}>
              <div style={{height:"clamp(180px,30vw,295px)",overflow:"hidden",position:"relative",background:"#111"}}>
                <img src={p.image} alt={p.name} className="pi"/>
                <div className="po"><div style={{background:C.gold,color:C.bg,padding:"8px 18px",fontSize:10,fontWeight:800,letterSpacing:2,borderRadius:2}}>VER PRODUTO</div></div>
                {p.badge&&<div style={{position:"absolute",top:11,left:11,background:p.badge.includes("ÚLT")||p.badge.includes("OFER")?C.red:C.gold,color:p.badge.includes("ÚLT")||p.badge.includes("OFER")?C.white:C.bg,fontSize:9,fontWeight:800,padding:"3px 8px",letterSpacing:1}}>{p.badge}</div>}
                {p.stock===0&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.72)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:C.white,fontSize:12,fontWeight:700,letterSpacing:3}}>ESGOTADO</span></div>}
              </div>
              <div style={{padding:"13px 13px 17px"}}>
                <div style={{color:"#444",fontSize:9,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>{p.category}</div>
                <div style={{color:C.white,fontWeight:600,fontSize:13,marginBottom:7,lineHeight:1.3}}>{p.name}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div><span style={{color:C.gold,fontWeight:700,fontSize:16}}>{fmt(p.price)}</span>{p.oldPrice&&<span style={{color:"#444",fontSize:11,textDecoration:"line-through",marginLeft:6}}>{fmt(p.oldPrice)}</span>}</div>
                  {p.oldPrice&&<span style={{background:"#16130a",color:C.gold,fontSize:9,fontWeight:800,padding:"2px 5px"}}>-{Math.round((1-p.price/p.oldPrice)*100)}%</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <div style={{background:C.dark,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"48px 18px",textAlign:"center"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:9,letterSpacing:6,color:C.gold,marginBottom:9}}>SOBRE NÓS</div>
        <h2 className="st" style={{maxWidth:520,margin:"0 auto 14px"}}>QUALIDADE QUE VOCÊ SENTE</h2>
        <p style={{color:C.gray,fontSize:13,maxWidth:440,margin:"0 auto 20px",lineHeight:1.8}}>{settings.about||IS.about}</p>
        <div style={{color:C.gray,fontSize:12}}>📍 {settings.address||IS.address}</div>
      </div>

      {/* REVIEWS */}
      <section style={{maxWidth:1280,margin:"0 auto",padding:"48px 14px"}}>
        <h2 className="st gl" style={{marginBottom:28,textAlign:"center"}}>QUEM COMPROU, APROVOU</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:10}}>
          {[{n:"Gustavo M.",t:"Qualidade absurda, chegou antes do prazo. O boné é incrível, bordado perfeito.",r:5,c:"Itapira-SP"},{n:"Rafaela T.",t:"Os óculos SPY são originais mesmo, veio com nota fiscal. Super confiável!",r:5,c:"Campinas-SP"},{n:"Bruno A.",t:"Melhor loja da região. Variedade enorme, atendimento top e entrega rápida.",r:5,c:"Mogi Mirim-SP"}].map((r,i)=>(
            <div key={i} className="card" style={{padding:"18px 16px"}}>
              <div style={{color:C.gold,fontSize:12,letterSpacing:2,marginBottom:8}}>{"★".repeat(r.r)}</div>
              <p style={{color:"#bbb",fontSize:13,lineHeight:1.7,marginBottom:12}}>"{r.t}"</p>
              <div style={{color:C.white,fontWeight:600,fontSize:12}}>{r.n}</div>
              <div style={{color:C.gray,fontSize:11}}>{r.c}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#030305",borderTop:`1px solid ${C.border}`,padding:"40px 18px 22px"}}>
        <div className="fg" style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:28,marginBottom:28,paddingBottom:28,borderBottom:`1px solid ${C.border}`}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}><LPLogo size={40}/><div><div className="serif" style={{fontSize:20,letterSpacing:4,color:C.white}}>LINE</div><div style={{fontSize:8,letterSpacing:3,color:C.gold}}>PREMIUM STORE</div></div></div>
            <p style={{color:C.gray,fontSize:12,lineHeight:1.7,maxWidth:260,marginBottom:11}}>{settings.tagline||IS.tagline}</p>
            <div style={{color:C.gray,fontSize:11}}>📱 {settings.whatsapp} · {settings.instagram}</div>
          </div>
          <div>
            <div style={{fontSize:9,letterSpacing:2,color:C.gold,fontWeight:700,marginBottom:12}}>PRODUTOS</div>
            {CATS.filter(c=>c!=="todos").map(c=><div key={c} onClick={()=>{setFilter(c);window.scrollTo({top:0,behavior:"smooth"});}} style={{color:C.gray,fontSize:12,marginBottom:7,cursor:"pointer"}}>{c.charAt(0).toUpperCase()+c.slice(1)}</div>)}
          </div>
          <div>
            <div style={{fontSize:9,letterSpacing:2,color:C.gold,fontWeight:700,marginBottom:12}}>PAGAMENTOS</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:16}}>{activePay.map(([k])=><div key={k} style={{background:C.grayD,padding:"3px 8px",borderRadius:2,fontSize:10,color:"#888"}}>{PAY[k].label}</div>)}</div>
            <div style={{fontSize:9,letterSpacing:2,color:C.gold,fontWeight:700,marginBottom:8}}>ENDEREÇO</div>
            <div style={{color:C.gray,fontSize:11,lineHeight:1.7}}>{settings.address||IS.address}</div>
          </div>
        </div>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,fontSize:10,color:"#333"}}>
          <span>© 2025 LINE PREMIUM STORE · Todos os direitos reservados</span><span>🔒 Compra 100% Segura · SSL</span>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      {modal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:14}} onClick={()=>setModal(null)}>
          <div className="fi" style={{background:C.card,borderRadius:3,overflow:"hidden",maxWidth:700,width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",border:`1px solid ${C.border}`,maxHeight:"90vh"}} onClick={e=>e.stopPropagation()}>
            <div style={{minHeight:280,position:"relative",overflow:"hidden",background:"#111"}}>
              <img src={modal.image} alt={modal.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
              {modal.badge&&<div style={{position:"absolute",top:12,left:12,background:C.gold,color:C.bg,fontSize:9,fontWeight:800,padding:"3px 8px",letterSpacing:1}}>{modal.badge}</div>}
            </div>
            <div style={{padding:"26px 22px",display:"flex",flexDirection:"column",overflowY:"auto"}}>
              <button onClick={()=>setModal(null)} style={{alignSelf:"flex-end",background:"none",border:"none",color:"#555",fontSize:18,marginBottom:12,cursor:"pointer"}}>✕</button>
              <div style={{color:"#444",fontSize:9,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>{modal.category}</div>
              <h2 className="serif" style={{fontSize:22,fontWeight:400,lineHeight:1.2,marginBottom:10,color:C.white}}>{modal.name}</h2>
              <div style={{display:"flex",alignItems:"baseline",gap:9,marginBottom:12}}>
                <span style={{color:C.gold,fontWeight:700,fontSize:22}}>{fmt(modal.price)}</span>
                {modal.oldPrice&&<span style={{color:"#444",fontSize:14,textDecoration:"line-through"}}>{fmt(modal.oldPrice)}</span>}
              </div>
              <p style={{color:"#888",fontSize:13,lineHeight:1.7,marginBottom:14,flex:1}}>{modal.desc}</p>
              <div style={{color:modal.stock>10?C.green:modal.stock>0?C.gold:C.red,fontSize:11,fontWeight:600,marginBottom:16}}>
                {modal.stock>10?`✓ ${modal.stock} em estoque`:modal.stock>0?`⚠ ${modal.stock} restantes`:"✗ Esgotado"}
              </div>
              <button className="btn btn-g" onClick={()=>addCart(modal)} disabled={modal.stock===0}
                style={{padding:13,fontSize:12,letterSpacing:1,opacity:modal.stock===0?.4:1,cursor:modal.stock===0?"not-allowed":"pointer"}}>
                {modal.stock===0?"ESGOTADO":"ADICIONAR AO CARRINHO"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART */}
      {cartOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:400,display:"flex"}}>
          <div style={{flex:1,background:"rgba(0,0,0,.65)",backdropFilter:"blur(3px)"}} onClick={()=>setCartOpen(false)}/>
          <div className="sr" style={{width:"min(390px,100vw)",background:C.dark,borderLeft:`1px solid ${C.border}`,display:"flex",flexDirection:"column"}}>
            <div style={{padding:"16px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div className="serif" style={{fontSize:18,letterSpacing:3}}>CARRINHO</div><div style={{color:C.gray,fontSize:10,marginTop:1}}>{cartQty} item{cartQty!==1?"s":""}</div></div>
              <button onClick={()=>setCartOpen(false)} style={{background:"none",border:"none",color:"#666",fontSize:18,cursor:"pointer"}}>✕</button>
            </div>
            {settings.freeShipActive&&cartSub>0&&cartSub<settings.freeShipMin&&(
              <div style={{padding:"9px 18px",background:"#111",borderBottom:`1px solid ${C.border}`}}>
                <div style={{fontSize:11,color:C.gray,marginBottom:4}}>Faltam <strong style={{color:C.goldL}}>{fmt(settings.freeShipMin-cartSub)}</strong> para frete grátis</div>
                <div style={{background:C.border,height:3,borderRadius:2}}><div style={{background:C.gold,height:3,borderRadius:2,width:`${Math.min((cartSub/settings.freeShipMin)*100,100)}%`,transition:"width .4s"}}/></div>
              </div>
            )}
            {settings.freeShipActive&&cartSub>=settings.freeShipMin&&cartSub>0&&<div style={{padding:"8px 18px",background:"#081208",borderBottom:`1px solid #1a3a1a`,fontSize:11,color:C.green}}>✓ Frete grátis liberado!</div>}
            <div style={{flex:1,overflowY:"auto",padding:"13px 18px"}}>
              {cart.length===0?(
                <div style={{textAlign:"center",padding:"56px 0"}}>
                  <div style={{fontSize:36,marginBottom:10,opacity:.2}}>🛒</div>
                  <div style={{color:C.gray,fontSize:13}}>Carrinho vazio</div>
                  <button className="btn btn-o" onClick={()=>setCartOpen(false)} style={{marginTop:16,padding:"9px 20px",fontSize:12}}>VER PRODUTOS</button>
                </div>
              ):cart.map(item=>(
                <div key={item.id} style={{display:"flex",gap:11,marginBottom:14,paddingBottom:14,borderBottom:`1px solid ${C.border}`}}>
                  <img src={item.image} alt={item.name} style={{width:66,height:66,objectFit:"cover",borderRadius:2,flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:C.white,fontSize:12,fontWeight:600,lineHeight:1.3,marginBottom:4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.name}</div>
                    <div style={{color:C.gold,fontWeight:700,fontSize:13,marginBottom:7}}>{fmt(item.price)}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <button onClick={()=>updQty(item.id,item.qty-1)} style={{width:24,height:24,background:C.grayD,border:`1px solid ${C.border}`,color:C.white,borderRadius:2,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{color:C.white,fontWeight:700,minWidth:18,textAlign:"center",fontSize:13}}>{item.qty}</span>
                      <button onClick={()=>updQty(item.id,item.qty+1)} style={{width:24,height:24,background:C.grayD,border:`1px solid ${C.border}`,color:C.white,borderRadius:2,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                      <button onClick={()=>remItem(item.id)} style={{marginLeft:"auto",background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:15}}>🗑</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length>0&&(
              <div style={{padding:"16px 18px",borderTop:`1px solid ${C.border}`,background:C.bg}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:12,color:C.gray}}><span>Subtotal</span><span style={{color:C.white}}>{fmt(cartSub)}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:13,fontSize:12,color:C.gray}}><span>Frete</span><span style={{color:shipping===0?C.green:C.white}}>{shipping===0?"GRÁTIS":fmt(shipping)}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,fontWeight:700}}><span style={{color:C.white,fontSize:14}}>Total</span><span style={{color:C.gold,fontSize:18}}>{fmt(cartSub+shipping)}</span></div>
                <button className="btn btn-g" onClick={()=>{setCartOpen(false);setPage("checkout");}} style={{width:"100%",padding:13,fontSize:12,letterSpacing:1.5}}>FINALIZAR COMPRA →</button>
                <button onClick={()=>setCartOpen(false)} style={{width:"100%",background:"none",border:"none",color:C.gray,fontSize:10,padding:"9px 0",letterSpacing:1,cursor:"pointer"}}>CONTINUAR COMPRANDO</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
