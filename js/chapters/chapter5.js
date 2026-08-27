/* ============================================================
   chapter5.js — Chương 5: Sơn Tinh Thuỷ Tinh (7 màn)
   Đất diễn của hai luật địa hình: mặt nước chỉ thần nước đứng
   được (onEnv ao), đỉnh núi cho thần núi (onEnv nui).
   Sơn Tinh là Đức Thánh Tản — giọng trang trọng, không pha trò.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 5,
  name: "Chương 5 · Sơn Tinh Thuỷ Tinh",
  levels: [

  {type:"place", name:"Kén rể", cols:5, rows:3,
   scene:"@c5.kenre.scene",
   env:[{id:"cung",cells:[[0,0]]},{id:"nui",cells:[[4,0]]},{id:"ao",cells:[[4,1]]},{id:"cayda",cells:[[2,2]]},{id:"tre",cells:[[0,2]]}], blocked:[], mud:[],
   chars:["vua","minuong","sontinh","thuytinh"],
   cons:[{t:"adjEnv",c:"vua",e:"cung",txt:"Vua Hùng ngự trước điện"},
         {t:"adjChar",c:"minuong",target:"vua",txt:"Mị Nương đứng cạnh cha"},
         {t:"adjEnv",c:"sontinh",e:"nui",txt:"Sơn Tinh — chúa vùng non cao"},
         {t:"adjEnv",c:"thuytinh",e:"ao",txt:"Thuỷ Tinh — chúa miền nước thẳm"},
         {t:"notAdjChar",c:"sontinh",target:"thuytinh",txt:"Hai thần gườm nhau — KHÔNG đứng cạnh nhau"}],
   story:"@c5.kenre.story"},

  {type:"place", name:"Trổ tài", cols:5, rows:4,
   scene:"@c5.trotai.scene",
   env:[{id:"nui",cells:[[0,1]]},{id:"cung",cells:[[2,0]]},{id:"ao",cells:[[4,2],[4,3]]},{id:"tre",cells:[[0,3]]},{id:"cayda",cells:[[2,3]]},{id:"tangda",cells:[[4,0]]}], blocked:[], mud:[],
   chars:["sontinh","thuytinh","vua","minuong","linh"],
   cons:[{t:"onEnv",c:"sontinh",e:"nui",txt:"Sơn Tinh đứng trên núi"},
         {t:"onEnv",c:"thuytinh",e:"ao",txt:"Thuỷ Tinh đứng dưới nước"},
         {t:"adjEnv",c:"vua",e:"cung",txt:"Vua ngự trước điện xem tài"},
         {t:"behind",c:"minuong",target:"vua",txt:"Mị Nương nép sau lưng cha"},
         {t:"adjChar",c:"linh",target:"vua",txt:"Lính canh bên vua"}],
   story:"@c5.trotai.story"},

  {type:"matrix", name:"Sính lễ",
   scene:"@c5.sinhle.scene",
   rows:["sontinh","thuytinh","suga"], colsM:["rungnui","songbien","dongbang"],
   clues:[{t:"mIs", c:"sontinh", col:"rungnui", txt:"Sơn Tinh về ngay rừng núi — voi ngà, gà cựa, ngựa quý đều là sản vật của rừng!"},
          {t:"mNot",c:"thuytinh", col:"dongbang", txt:"Thuỷ Tinh không lên cạn lâu được — đành quanh quẩn sông biển"},
          {t:"mUniq",txt:"Mỗi vùng chỉ một người tìm"}],
   story:"@c5.sinhle.story"},

  {type:"place", name:"Rước dâu về núi", cols:5, rows:3,
   scene:"@c5.ruocdauvenui.scene",
   env:[{id:"cung",cells:[[0,0]]},{id:"nui",cells:[[4,0]]},{id:"tre",cells:[[1,0],[3,0]]},{id:"cayda",cells:[[0,2]]},{id:"tre",cells:[[2,2]]},{id:"tangda",cells:[[4,2]]}], blocked:[], mud:[],
   chars:["sontinh","voi","nguahong","ga","minuong","vua"],
   cons:[{t:"queue",cs:["sontinh","voi","nguahong","ga"],txt:"Đoàn nối đuôi: Sơn Tinh → voi → ngựa → gà"},
         {t:"adjChar",c:"minuong",target:"sontinh",txt:"Mị Nương lên kiệu theo chồng"},
         {t:"adjEnv",c:"vua",e:"cung",txt:"Vua Hùng đứng trước điện tiễn con gái"}],
   story:"@c5.ruocdauvenui.story"},

  {type:"place", name:"Thuỷ Tinh nổi giận", cols:5, rows:4,
   scene:"@c5.thuytinhnoigia.scene",
   env:[{id:"ao",cells:[[1,3],[2,3]]},{id:"nui",cells:[[2,1],[2,2]]},{id:"nha",cells:[[0,0]]},{id:"baico",cells:[[4,0]]},{id:"tangda",cells:[[0,3],[0,1]]},{id:"tre",cells:[[4,3]]},{id:"cayda",cells:[[4,2]]}], blocked:[], mud:[],
   chars:["thuytinh","sontinh","minuong","balao","trau"],
   cons:[{t:"onEnv",c:"thuytinh",e:"ao",txt:"Thuỷ Tinh dâng nước"},
         {t:"onEnv",c:"sontinh",e:"nui",txt:"Sơn Tinh dời núi lên cao"},
         {t:"onEnv",c:"minuong",e:"nui",txt:"Mị Nương lên núi cùng chồng"},
         {t:"adjEnv",c:"balao",e:"nha",txt:"Bà lão chạy về nhà tránh lũ"},
         {t:"adjEnv",c:"trau",e:"baico",txt:"Trâu dắt lên gò cỏ cao"}],
   story:"@c5.thuytinhnoigia.story"},

  {type:"place", name:"Nước dâng, núi dâng", cols:5, rows:4,
   scene:"@c5.nuocdangnuidan.scene",
   env:[{id:"nui",cells:[[1,1],[2,1]]},{id:"ao",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3]]}], blocked:[], mud:[],
   relic:{id:"vaytt",cell:[4,0]},
   chars:["sontinh","minuong","thuytinh"],
   cons:[{t:"onEnv",c:"sontinh",e:"nui",txt:"Sơn Tinh trấn trên đỉnh núi"},
         {t:"onEnv",c:"minuong",e:"nui",txt:"Mị Nương đứng vững trên đỉnh bên"},
         {t:"onEnv",c:"thuytinh",e:"ao",txt:"Thuỷ Tinh cưỡi sóng"},
         {t:"adjEnv",c:"thuytinh",e:"nui",txt:"…áp sát tận chân núi mà công!"}],
   story:"@c5.nuocdangnuidan.story"},

  /* ---- Điểm xuyết: vì sao năm nào cũng có lũ ---- */
  {type:"story", name:"Vì sao có mùa lũ",
   scene:"@c5.visaocomualu.scene",
   pieces:["nui","thuytinh","minuong","sontinh"],
   panels:[
     {label:"@c5.visaocomualu.p1.label", who:["vua"],
      cue:"@c5.visaocomualu.p1.cue",
      answer:"sontinh", after:"@c5.visaocomualu.p1.after"},
     {label:"@c5.visaocomualu.p2.label", who:["linh"],
      cue:"@c5.visaocomualu.p2.cue",
      answer:"minuong", after:"@c5.visaocomualu.p2.after"},
     {label:"@c5.visaocomualu.p3.label", who:["vua"],
      cue:"@c5.visaocomualu.p3.cue",
      answer:"thuytinh", after:"@c5.visaocomualu.p3.after"},
     {label:"@c5.visaocomualu.p4.label", who:["lang"],
      cue:"@c5.visaocomualu.p4.cue",
      answer:"nui", after:"@c5.visaocomualu.p4.after"}
   ],
   revealArt:"sontinh",
   reveal:"@c5.visaocomualu.reveal",
   story:"@c5.visaocomualu.story"},

  {type:"place", name:"Hẹn mùa nước sau", cols:4, rows:3,
   scene:"@c5.henmuanuocsau.scene",
   env:[{id:"nui",cells:[[0,0]]},{id:"ao",cells:[[3,1],[3,2]]}], blocked:[], mud:[],
   chars:["sontinh","minuong","thuytinh"],
   cons:[{t:"onEnv",c:"sontinh",e:"nui",txt:"Sơn Tinh trấn giữ núi Tản Viên"},
         {t:"adjEnv",c:"minuong",e:"nui",txt:"Mị Nương bên chồng dưới chân núi"},
         {t:"onEnv",c:"thuytinh",e:"ao",txt:"Thuỷ Tinh về thuỷ cung sâu thẳm"}],
   story:"@c5.henmuanuocsau.story"},

]});
