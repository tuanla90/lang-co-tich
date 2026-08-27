/* ============================================================
   chapter3.js — Chương 3: Cây tre trăm đốt (7 màn)
   Phú ông + Bụt tái xuất. Luật mới: "khắc nhập" (chain — nhóm liền nhau).
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 3,
  name: "Chương 3 · Cây tre trăm đốt",
  levels: [

  {type:"place", name:"Anh Khoai ở đợ", cols:5, rows:4,
   scene:"@c3.anhkhoaiodo.scene",
   env:[{id:"baico",cells:[[4,1]]},{id:"tre",cells:[[0,0]]},{id:"nui",cells:[[4,3]]},{id:"nha",cells:[[0,2]]},{id:"cayda",cells:[[2,0]]},{id:"tangda",cells:[[2,3]]},{id:"dantrau",cells:[[4,0]]},{id:"thung",cells:[[2,2]]},{id:"bepenv",cells:[[0,3]]},{id:"caythi",cells:[[3,3]]},{id:"rom",cells:[[4,2]]}], blocked:[], mud:[],
   chars:["khoai","trau","congai","phuong"],
   cons:[{t:"adjEnv",c:"trau",e:"baico",txt:"Trâu gặm cỏ ngoài bãi"},
         {t:"adjChar",c:"khoai",target:"trau",txt:"Khoai chăn trâu"},
         {t:"adjEnv",c:"congai",e:"nha",txt:"Con gái phú ông đứng ở cửa nhà nhìn ra"},
         {t:"adjChar",c:"phuong",target:"congai",txt:"Phú ông đứng cạnh con gái"}],
   story:"@c3.anhkhoaiodo.story"},

  {type:"matrix", name:"Ba năm ở đợ",
   scene:"@c3.banamodo.scene",
   rows:["khoai","phuong","congai"], colsM:["ruongbun","nhatren","bep"],
   clues:[{t:"mIs", c:"khoai", col:"ruongbun", txt:"Khoai chẳng ngại bùn, quần quật ngoài ruộng"},
          {t:"mNot",c:"phuong",col:"bep", txt:"Phú ông chẳng bao giờ mó tay việc bếp"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một người"}],
   story:"@c3.banamodo.story"},

  {type:"place", name:"Bụt lại hiện lên", cols:4, rows:3,
   scene:"@c3.butlaihienlen.scene",
   env:[{id:"tre",cells:[[1,0],[3,1]]},{id:"nui",cells:[[0,1]]},{id:"tangda",cells:[[3,0]]},{id:"tre",cells:[[1,2]]}], blocked:[], mud:[],
   chars:["khoai","but"],
   cons:[{t:"adjEnv",c:"khoai",e:"tre",txt:"Khoai ngồi giữa rừng tre"},
         {t:"adjChar",c:"but",target:"khoai",txt:"Bụt hiện lên bên người đang khóc"}],
   story:"@c3.butlaihienlen.story"},

  {type:"place", name:"Khắc nhập!", cols:4, rows:4,
   scene:"@c3.khacnhap.scene",
   env:[{id:"tre",cells:[[0,0]]},{id:"nui",cells:[[2,1]]},{id:"tangda",cells:[[3,0]]},{id:"tre",cells:[[0,3]]}], blocked:[[1,3],[3,3]], mud:[],
   relic:{id:"dot100",cell:[2,3]},
   chars:["dot1","dot2","dot3","khoai"],
   cons:[{t:"line",cs:["dot1","dot2","dot3"],txt:"Khắc nhập! Gốc tre → đốt tre → ngọn tre nằm THẲNG một hàng"},
         {t:"adjChar",c:"khoai",target:"dot1",txt:"Khoai đứng bên đọc thần chú"},
         {t:"adjEnv",c:"khoai",e:"tre",txt:"Khoai đứng nép bên bụi tre"}],
   story:"@c3.khacnhap.story"},

  {type:"place", name:"Đám cỗ lật kèo", cols:5, rows:3,
   scene:"@c3.damcolatkeo.scene",
   env:[{id:"mamco",cells:[[2,1]]},{id:"cong",cells:[[0,1]]},{id:"dinh",cells:[[4,0]]},{id:"tre",cells:[[0,0]]},{id:"cayda",cells:[[2,2]]},{id:"tangda",cells:[[4,2]]},{id:"nha",cells:[[0,2]]}], blocked:[], mud:[],
   chars:["phuong","chure","congai","khoai"],
   cons:[{t:"adjEnv",c:"phuong",e:"mamco",txt:"Phú ông ngồi chủ tiệc"},
         {t:"adjEnv",c:"chure",e:"mamco",txt:"Công tử chễm chệ bên mâm cỗ"},
         {t:"adjChar",c:"congai",target:"phuong",txt:"Con gái bị cha giữ bên cạnh"},
         {t:"notAdjChar",c:"congai",target:"chure",txt:"Nàng né ông công tử hết cỡ"},
         {t:"adjEnv",c:"khoai",e:"cong",txt:"Khoai đứng ngoài cổng, sững người"}],
   story:"@c3.damcolatkeo.story"},

  {type:"place", name:"Dính cả chùm!", cols:5, rows:3,
   scene:"@c3.dinhcachum.scene",
   env:[{id:"cong",cells:[[0,1]]},{id:"dinh",cells:[[4,0]]},{id:"tre",cells:[[4,2]]},{id:"mamco",cells:[[2,0]]},{id:"tre",cells:[[1,2]]},{id:"tangda",cells:[[1,0]]},{id:"nha",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["dot1","dot2","dot3","phuong","chure","khoai"],
   cons:[{t:"line",cs:["dot1","dot2","dot3"],txt:"Cây tre vẫn THẲNG một cây: gốc tre → đốt tre → ngọn tre"},
         {t:"queue",cs:["dot3","phuong","chure"],txt:"Người dính nối đuôi từ ngọn tre: phú ông → công tử (người thì được vẹo!)"},
         {t:"adjEnv",c:"dot1",e:"mamco",txt:"Gốc tre dựng ngay bên mâm cỗ"},
         {t:"adjEnv",c:"khoai",e:"cong",txt:"Khoai đứng ngoài cổng đọc chú"}],
   story:"@c3.dinhcachum.story"},

  /* ---- Điểm xuyết: luật của hai câu thần chú ---- */
  {type:"story", name:"Nhập hay xuất?", reuse:true,
   scene:"@c3.nhaphayxuat.scene",
   pieces:["khacnhap","khacxuat"],
   panels:[
     {label:"@c3.nhaphayxuat.p1.label", who:["khoai"],
      cue:"@c3.nhaphayxuat.p1.cue",
      answer:"khacnhap", after:"@c3.nhaphayxuat.p1.after"},
     {label:"@c3.nhaphayxuat.p2.label", who:["khoai"],
      cue:"@c3.nhaphayxuat.p2.cue",
      answer:"khacxuat", after:"@c3.nhaphayxuat.p2.after"},
     {label:"@c3.nhaphayxuat.p3.label", who:["phuong","chure"],
      cue:"@c3.nhaphayxuat.p3.cue",
      answer:"khacnhap", after:"@c3.nhaphayxuat.p3.after"},
     {label:"@c3.nhaphayxuat.p4.label", who:["phuong"],
      cue:"@c3.nhaphayxuat.p4.cue",
      answer:"khacxuat", after:"@c3.nhaphayxuat.p4.after"}
   ],
   revealArt:"khoai",
   reveal:"@c3.nhaphayxuat.reveal",
   story:"@c3.nhaphayxuat.story"},

  {type:"place", name:"Đám cưới anh Khoai", cols:5, rows:3,
   scene:"@c3.damcuoianhkhoa.scene",
   env:[{id:"mamco",cells:[[2,1]]},{id:"dinh",cells:[[4,0]]},{id:"tre",cells:[[0,0]]},{id:"cayda",cells:[[4,2]]},{id:"tangda",cells:[[0,2]]},{id:"nha",cells:[[2,2]]}], blocked:[], mud:[],
   extras:[{c:"bom",cell:[4,1],note:"đánh hơi thấy mùi cỗ từ tận đầu làng"}],
   chars:["khoai","congai","but","trau","phuong"],
   cons:[{t:"queue",cs:["but","congai","khoai"],txt:"Bụt – cô dâu – chú rể đứng thành một hàng"},
         {t:"adjEnv",c:"khoai",e:"mamco",txt:"Chú rể mời cỗ"},
         {t:"adjEnv",c:"trau",e:"tre",txt:"Trâu đeo hoa buộc ở bụi tre"},
         {t:"adjEnv",c:"phuong",e:"mamco",txt:"Phú ông đãi cỗ — lần này thật lòng"}],
   story:"@c3.damcuoianhkhoa.story"},

]});
