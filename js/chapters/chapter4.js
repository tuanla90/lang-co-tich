/* ============================================================
   chapter4.js, Chương 4: Thánh Gióng (7 màn)
   Dàn hoàng gia đầy đủ (vua, sứ giả, 2 lính). Tre ngà chương 1
   được trả nghĩa: "ai nhổ nổi cả bụi thì khoẻ như thần".
   Giọng chương: trang trọng, ấm, không pha trò với bậc Thánh.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 4,
  name: "Chương 4 · Thánh Gióng",
  levels: [

  {type:"place", name:"Vết chân lạ", cols:4, rows:3,
   scene:"@c4.vetchanla.scene",
   env:[{id:"vetchan",cells:[[1,1]]},{id:"baico",cells:[[3,0]]},{id:"tre",cells:[[0,2]]}], blocked:[], mud:[],
   chars:["me"],
   cons:[{t:"onEnv",c:"me",e:"vetchan",txt:"Bà ướm chân vào vết chân lạ"}],
   story:"@c4.vetchanla.story"},

  {type:"matrix", name:"Giặc đến!",
   scene:"@c4.giacden.scene",
   rows:["vua","linh","suga"], colsM:["cungvua","bienai","langpd"],
   clues:[{t:"mIs", c:"linh", col:"bienai", txt:"Lính đã ra hết biên ải chặn giặc"},
          {t:"mNot",c:"suga", col:"cungvua", txt:"Sứ giả không ở lại cung, vua sai đi khắp nơi tìm người tài"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một người"}],
   story:"@c4.giacden.story"},

  {type:"place", name:"Tiếng nói đầu tiên", cols:4, rows:3,
   scene:"@c4.tiengnoidautie.scene",
   env:[{id:"nha",cells:[[0,0]]},{id:"tre",cells:[[3,2]]},{id:"cayda",cells:[[3,0]]}], blocked:[], mud:[],
   chars:["giong","suga","me"],
   cons:[{t:"adjEnv",c:"giong",e:"nha",txt:"Gióng ngồi dậy bên hiên nhà"},
         {t:"adjChar",c:"suga",target:"giong",txt:"Sứ giả vào tận nơi nghe lời cậu bé"},
         {t:"adjChar",c:"me",target:"giong",txt:"Mẹ đứng bên, mừng rơi nước mắt"}],
   story:"@c4.tiengnoidautie.story"},

  {type:"place", name:"Cả làng góp gạo", cols:5, rows:4,
   scene:"@c4.calanggopgao.scene",
   env:[{id:"noicom",cells:[[2,1],[2,2]]},{id:"bepenv",cells:[[0,1]]},{id:"tre",cells:[[4,0]]},{id:"cayda",cells:[[0,3]]},{id:"tangda",cells:[[4,3]]}], blocked:[], mud:[],
   chars:["giong","me","balao","trau"],
   cons:[{t:"adjEnv",c:"giong",e:"noicom",txt:"Gióng ngồi ăn, hết nồi này đến nồi khác"},
         {t:"adjEnv",c:"me",e:"bepenv",txt:"Mẹ thổi cơm bên bếp"},
         {t:"adjChar",c:"balao",target:"me",txt:"Bà lão sang giúp mẹ Gióng"},
         {t:"behind",c:"trau",target:"giong",txt:"Trâu đứng sau lưng Gióng"}],
   story:"@c4.calanggopgao.story"},

  /* ---- Điểm xuyết: Gióng lớn lên như thế nào ---- */
  {type:"story", name:"Gióng lớn lên",
   scene:"@c4.gionglonlen.scene",
   pieces:["giongts","giong","suga","vetchan"],
   panels:[
     {label:"@c4.gionglonlen.p1.label", who:["me"],
      cue:"@c4.gionglonlen.p1.cue",
      answer:"vetchan", after:"@c4.gionglonlen.p1.after"},
     {label:"@c4.gionglonlen.p2.label", who:["me"],
      cue:"@c4.gionglonlen.p2.cue",
      answer:"giong", after:"@c4.gionglonlen.p2.after"},
     {label:"@c4.gionglonlen.p3.label", who:["giac1"],
      cue:"@c4.gionglonlen.p3.cue",
      answer:"suga", after:"@c4.gionglonlen.p3.after"},
     {label:"@c4.gionglonlen.p4.label", who:["lang"],
      cue:"@c4.gionglonlen.p4.cue",
      answer:"giongts", after:"@c4.gionglonlen.p4.after"}
   ],
   revealArt:"nguasat",
   reveal:"@c4.gionglonlen.reveal",
   story:"@c4.gionglonlen.story"},

  {type:"place", name:"Ra trận", cols:5, rows:4,
   scene:"@c4.ratran.scene",
   env:[{id:"cong",cells:[[0,1]]},{id:"tre",cells:[[4,0]]},{id:"nui",cells:[[4,3]]},{id:"tangda",cells:[[2,0]]},{id:"cayda",cells:[[0,3]]},{id:"baico",cells:[[2,3]]},{id:"nha",cells:[[0,0]]},{id:"dinh",cells:[[4,1]]}], blocked:[], mud:[],
   chars:["giac1","giac2","giongts","nguasat"],
   cons:[{t:"queue",cs:["giac1","giac2"],txt:"Hai tên giặc bám sát nhau"},
         {t:"adjEnv",c:"giac1",e:"cong",txt:"Giặc tràn tới cổng làng"},
         {t:"adjChar",c:"giongts",target:"giac1",txt:"Tráng sĩ chặn ngay trước mặt giặc"},
         {t:"adjChar",c:"nguasat",target:"giongts",txt:"Ngựa sắt kề bên tráng sĩ"},
         {t:"adjEnv",c:"nguasat",e:"cong",txt:"Ngựa sắt phi tới cổng làng"}],
   story:"@c4.ratran.story"},

  {type:"place", name:"Nhổ tre ngà", cols:4, rows:3,
   scene:"@c4.nhotrenga.scene",
   env:[{id:"tre",cells:[[1,1]]},{id:"nui",cells:[[3,0]]},{id:"tangda",cells:[[0,0]]},{id:"baico",cells:[[3,2]]},{id:"cayda",cells:[[1,0]]}], blocked:[], mud:[],
   relic:{id:"roisat",cell:[0,0]},
   chars:["giongts","nguasat","giac1","giac2"],
   cons:[{t:"onEnv",c:"giongts",e:"tre",txt:"Tráng sĩ nhổ cả bụi tre ngà"},
         {t:"adjEnv",c:"nguasat",e:"tre",txt:"Ngựa sắt đứng ngay bên"},
         {t:"queue",cs:["giac1","giac2"],txt:"Giặc giẫm đạp nhau tháo chạy nối đuôi"},
         {t:"adjEnv",c:"giac2",e:"nui",txt:"Tên chạy sau đã tới chân núi"}],
   story:"@c4.nhotrenga.story"},

  {type:"place", name:"Về trời", cols:5, rows:3,
   scene:"@c4.vetroi.scene",
   env:[{id:"nui",cells:[[4,0]]},{id:"dinh",cells:[[0,1]]},{id:"tre",cells:[[2,2]]}], blocked:[], mud:[],
   chars:["giongts","nguasat","vua","linh"],
   cons:[{t:"onEnv",c:"giongts",e:"nui",txt:"Tráng sĩ lên đỉnh núi Sóc"},
         {t:"adjEnv",c:"nguasat",e:"nui",txt:"Ngựa sắt theo chủ đến chân núi"},
         {t:"adjEnv",c:"vua",e:"dinh",txt:"Vua lập đền thờ, phong Phù Đổng Thiên Vương"},
         {t:"adjChar",c:"linh",target:"vua",txt:"Lính hộ giá nhà vua"}],
   story:"@c4.vetroi.story"},

]});
