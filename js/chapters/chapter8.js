/* ============================================================
   chapter8.js, Chương 8: Chú Cuội (7 màn)
   Trả món nợ lore treo từ chương 1: "cây đa đầu làng, hình như
   có ai ngồi vắt vẻo trên đó…" Chính là Cuội, và cây đa chính
   là cây thuốc quý chàng trồng. Khép vòng tròn mùa 1.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 8,
  name: "Chương 8 · Chú Cuội",
  levels: [

  {type:"place", name:"Hổ và lá thần", cols:4, rows:3,
   scene:"@c8.hovalathan.scene",
   env:[{id:"tre",cells:[[0,1]]},{id:"caythuoc",cells:[[3,1]]},{id:"nui",cells:[[3,0]]}], blocked:[], mud:[],
   chars:["cuoi","ho","hocon"],
   cons:[{t:"hideIn",c:"cuoi",e:"tre",txt:"Cuội nấp trong bụi tre, nín thở"},
         {t:"adjEnv",c:"ho",e:"caythuoc",txt:"Hổ mẹ hái lá cây thuốc"},
         {t:"adjChar",c:"hocon",target:"ho",txt:"Hổ con nằm bên mẹ"}],
   story:"@c8.hovalathan.story"},

  {type:"place", name:"Lá thần cứu người", cols:4, rows:3,
   scene:"@c8.lathancuunguoi.scene",
   env:[{id:"ao",cells:[[0,1],[0,2]]},{id:"caythuoc",cells:[[3,0]]},{id:"tre",cells:[[3,2]]},{id:"tangda",cells:[[1,0]]},{id:"cayda",cells:[[2,2]]}], blocked:[], mud:[],
   chars:["cogai","cuoi","cho"],
   cons:[{t:"adjEnv",c:"cogai",e:"ao",txt:"Cô gái vừa được vớt lên, nằm bên bờ ao"},
         {t:"adjChar",c:"cuoi",target:"cogai",txt:"Cuội đắp lá thần cứu người"},
         {t:"adjEnv",c:"cho",e:"caythuoc",txt:"Chó vàng nằm canh gốc cây thuốc"}],
   story:"@c8.lathancuunguoi.story"},

  {type:"matrix", name:"Lời dặn",
   scene:"@c8.loidan.scene",
   rows:["cuoi","vocuoi","cho"], colsM:["giengp","caythuocp","boao"],
   clues:[{t:"mIs", c:"cuoi", col:"giengp", txt:"Cuội chỉ gánh nước GIẾNG trong vắt về tưới cây"},
          {t:"mNot",c:"cho", col:"boao", txt:"Chó vàng ghét nước, chẳng bao giờ ra bờ ao, nó nằm giữ gốc cây"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một người"}],
   story:"@c8.loidan.story"},

  {type:"place", name:"Nói dối như Cuội", cols:4, rows:3,
   scene:"@c8.noidoinhucuoi.scene",
   env:[{id:"ao",cells:[[0,0]]},{id:"cayda",cells:[[2,0]]},{id:"tre",cells:[[0,2]]}], blocked:[], mud:[],
   chars:["cuoi","vocuoi"],
   cons:[{t:"onEnv",c:"cuoi",e:"cayda",txt:"Cuội bảo: “tôi GHÉT trèo cây nhất trần đời!” Ngược đấy: chàng ngồi vắt vẻo cả ngày"},
         {t:"notAdjEnv",c:"cuoi",e:"ao",txt:"Cuội bảo: “tôi mê đứng sát mép ao lắm!” Đừng tin!"},
         {t:"adjChar",c:"vocuoi",target:"cuoi",txt:"Cuội bảo: “vợ tôi chẳng thèm đứng gần tôi”, lại ngược nốt!"}],
   story:"@c8.noidoinhucuoi.story"},

  {type:"place", name:"Tưới nhầm!", cols:5, rows:4,
   scene:"@c8.tuoinham.scene",
   env:[{id:"caythuoc",cells:[[2,1]]},{id:"nha",cells:[[0,0]]},{id:"tre",cells:[[4,0],[4,1]]},{id:"cayda",cells:[[0,3]]},{id:"tangda",cells:[[4,3]]}], blocked:[], mud:[[1,1],[1,2]],
   chars:["cuoi","vocuoi","cho"],
   cons:[{t:"adjEnv",c:"cuoi",e:"tre",txt:"Cuội đốn củi tận rừng xa"},
         {t:"notAdjEnv",c:"cuoi",e:"caythuoc",txt:"…không kịp cản rồi!"},
         {t:"adjEnv",c:"vocuoi",e:"caythuoc",txt:"Vợ Cuội xách xô nước đục ra tưới cây"},
         {t:"behind",c:"cho",target:"vocuoi",txt:"Chó vàng sủa cuống quýt sau lưng"}],
   story:"@c8.tuoinham.story"},

  {type:"place", name:"Níu rễ cây", cols:4, rows:4,
   scene:"@c8.niurecay.scene",
   env:[{id:"caythuoc",cells:[[1,1]]},{id:"nha",cells:[[3,3]]},{id:"tre",cells:[[0,0]]},{id:"tangda",cells:[[3,0]]}], blocked:[], mud:[],
   chars:["cuoi","vocuoi","cho"],
   cons:[{t:"onEnv",c:"cuoi",e:"caythuoc",txt:"Cuội níu chặt rễ, cây kéo cả người lên!"},
         {t:"adjEnv",c:"vocuoi",e:"nha",txt:"Vợ đứng ở cửa nhà nhìn theo"},
         {t:"adjChar",c:"cho",target:"vocuoi",txt:"Con chó vàng nép bên chân"}],
   story:"@c8.niurecay.story"},

  /* ---- Điểm xuyết: vì sao chú Cuội lại ngồi trên cung trăng ---- */
  {type:"story", name:"Vì sao Cuội lên trăng",
   scene:"@c8.visaocuoilentr.scene",
   pieces:["vocuoi","caythuoc","cayda","cuoi"],
   panels:[
     {label:"@c8.visaocuoilentr.p1.label", who:["hocon"],
      cue:"@c8.visaocuoilentr.p1.cue",
      answer:"caythuoc", after:"@c8.visaocuoilentr.p1.after"},
     {label:"@c8.visaocuoilentr.p2.label", who:["cogai"],
      cue:"@c8.visaocuoilentr.p2.cue",
      answer:"cuoi", after:"@c8.visaocuoilentr.p2.after"},
     {label:"@c8.visaocuoilentr.p3.label", who:["cho"],
      cue:"@c8.visaocuoilentr.p3.cue",
      answer:"vocuoi", after:"@c8.visaocuoilentr.p3.after"},
     {label:"@c8.visaocuoilentr.p4.label", who:["vocuoi"],
      cue:"@c8.visaocuoilentr.p4.cue",
      answer:"cayda", after:"@c8.visaocuoilentr.p4.after"}
   ],
   revealArt:"cuoi",
   reveal:"@c8.visaocuoilentr.reveal",
   story:"@c8.visaocuoilentr.story"},

  {type:"place", name:"Cung trăng", cols:4, rows:3,
   scene:"@c8.cungtrang.scene",
   env:[{id:"cayda",cells:[[1,1]]},{id:"tangda",cells:[[3,2]]}], blocked:[], mud:[],
   extras:[{c:"chihang",cell:[3,0],note:"Chị Hằng sang chào người hàng xóm mới"}],
   relic:{id:"lathuoc",cell:[0,2]},
   chars:["cuoi"],
   cons:[{t:"onEnv",c:"cuoi",e:"cayda",txt:"Chú Cuội ngồi gốc cây đa…"}],
   story:"@c8.cungtrang.story"},

]});
