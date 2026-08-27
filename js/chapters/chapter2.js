/* ============================================================
   chapter2.js — Chương 2: Thằng Bờm (7 màn)
   Mỗi câu đồng dao = một màn. Mở đầu nối từ chiếc mo cau chương 1.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 2,
  name: "Chương 2 · Thằng Bờm",
  levels: [

  {type:"place", name:"Chiếc mo cau", cols:4, rows:3,
   scene:"@c2.chiecmocau.scene",
   env:[{id:"baico",cells:[[0,0]]},{id:"mocau",cells:[[2,1]]},{id:"tre",cells:[[3,0]]}], blocked:[], mud:[],
   chars:["bom","trau"],
   cons:[{t:"adjEnv",c:"trau",e:"baico",txt:"Trâu gặm cỏ bên bãi"},
         {t:"adjChar",c:"bom",target:"trau",txt:"Bờm trông trâu"},
         {t:"adjEnv",c:"bom",e:"mocau",txt:"Bờm nhặt chiếc mo cau"}],
   story:"@c2.chiecmocau.story"},

  {type:"place", name:"Ba bò chín trâu", cols:4, rows:4,
   scene:"@c2.babochintrau.scene",
   env:[{id:"dantrau",cells:[[3,0],[3,1]]},{id:"tre",cells:[[0,3]]}], blocked:[], mud:[[2,0],[2,1]],
   chars:["bom","phuong"],
   cons:[{t:"adjEnv",c:"phuong",e:"dantrau",txt:"Phú ông đứng khoe đàn trâu bò"},
         {t:"adjChar",c:"phuong",target:"bom",txt:"Phú ông sán lại gạ Bờm"},
         {t:"notAdjEnv",c:"bom",e:"dantrau",txt:"Bờm rằng: Bờm chẳng lấy trâu!"}],
   story:"@c2.babochintrau.story"},

  {type:"place", name:"Ao sâu cá mè", cols:4, rows:4,
   scene:"@c2.aosaucame.scene",
   env:[{id:"ao",cells:[[0,2],[0,3]]},{id:"tre",cells:[[3,0]]},{id:"nui",cells:[[3,3]]},{id:"cayda",cells:[[0,0]]},{id:"tangda",cells:[[2,3]]}], blocked:[], mud:[],
   chars:["bom","phuong","came"],
   cons:[{t:"onEnv",c:"came",e:"ao",txt:"Thả cá mè xuống ao"},
         {t:"adjEnv",c:"phuong",e:"ao",txt:"Phú ông đứng bên mép ao"},
         {t:"adjChar",c:"phuong",target:"bom",txt:"Phú ông gạ Bờm"},
         {t:"notAdjEnv",c:"bom",e:"ao",txt:"Bờm rằng: Bờm chẳng lấy mè!"}],
   story:"@c2.aosaucame.story"},

  {type:"matrix", name:"Phiên chợ",
   scene:"@c2.phiencho.scene",
   rows:["bom","phuong","trau"], colsM:["chuongtrau","hangxoi","hangnuoc"],
   clues:[{t:"mIs", c:"bom", col:"hangxoi", txt:"Bờm đứng ì trước hàng xôi, hít lấy hít để"},
          {t:"mNot",c:"phuong",col:"chuongtrau",txt:"Phú ông sợ bùn bẩn áo gấm, không lại gần chuồng trâu"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một… nhân vật"}],
   story:"@c2.phiencho.story"},

  {type:"place", name:"Một bè gỗ lim", cols:5, rows:4,
   scene:"@c2.motbegolim.scene",
   env:[{id:"ao",cells:[[0,3],[1,3],[3,3],[4,3]]},{id:"begolim",cells:[[2,3]]},{id:"baico",cells:[[4,0]]},{id:"nui",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["bom","phuong","trau"],
   cons:[{t:"onEnv",c:"phuong",e:"begolim",txt:"Phú ông đứng trên bè khoe gỗ"},
         {t:"adjEnv",c:"trau",e:"baico",txt:"Trâu gặm cỏ trên bờ"},
         {t:"adjChar",c:"bom",target:"trau",txt:"Bờm giữ trâu"},
         {t:"notAdjEnv",c:"bom",e:"ao",txt:"Bờm rằng: Bờm chẳng lấy lim!"}],
   story:"@c2.motbegolim.story"},

  {type:"place", name:"Con chim đồi mồi", cols:4, rows:3,
   scene:"@c2.conchimdoimoi.scene",
   env:[{id:"cayda",cells:[[2,0],[3,0]]},{id:"tre",cells:[[0,2]]},{id:"tangda",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["bom","phuong","chimdm"],
   cons:[{t:"onEnv",c:"chimdm",e:"cayda",txt:"Chim đồi mồi đậu trên cây đa"},
         {t:"adjEnv",c:"phuong",e:"cayda",txt:"Phú ông đứng dưới gốc khoe chim"},
         {t:"adjChar",c:"phuong",target:"bom",txt:"Phú ông gạ Bờm"},
         {t:"notAdjEnv",c:"bom",e:"cayda",txt:"Bờm rằng: Bờm chẳng lấy mồi!"}],
   story:"@c2.conchimdoimoi.story"},

  /* ---- Điểm xuyết: vì sao Bờm chê tất ---- */
  {type:"story", name:"Bờm chẳng lấy gì", 
   scene:"@c2.bomchanglaygi.scene",
   pieces:["chimdm","begolim","trau","came"],
   panels:[
     {label:"@c2.bomchanglaygi.p1.label", who:["phuong"],
      cue:"@c2.bomchanglaygi.p1.cue",
      answer:"trau", after:"@c2.bomchanglaygi.p1.after"},
     {label:"@c2.bomchanglaygi.p2.label", who:["phuong"],
      cue:"@c2.bomchanglaygi.p2.cue",
      answer:"came", after:"@c2.bomchanglaygi.p2.after"},
     {label:"@c2.bomchanglaygi.p3.label", who:["phuong"],
      cue:"@c2.bomchanglaygi.p3.cue",
      answer:"begolim", after:"@c2.bomchanglaygi.p3.after"},
     {label:"@c2.bomchanglaygi.p4.label", who:["phuong"],
      cue:"@c2.bomchanglaygi.p4.cue",
      answer:"chimdm", after:"@c2.bomchanglaygi.p4.after"}
   ],
   revealArt:"namxoi",
   reveal:"@c2.bomchanglaygi.reveal",
   story:"@c2.bomchanglaygi.story"},

  {type:"place", name:"Nắm xôi", cols:4, rows:3,
   scene:"@c2.namxoi.scene",
   env:[{id:"namxoi",cells:[[2,1]]},{id:"dinh",cells:[[3,0]]},{id:"tre",cells:[[0,0]]},{id:"cayda",cells:[[0,2]]}], blocked:[], mud:[],
   relic:{id:"quatmo",cell:[3,2]},
   chars:["bom","phuong","trau"],
   cons:[{t:"adjEnv",c:"phuong",e:"namxoi",txt:"Phú ông chìa nắm xôi ra"},
         {t:"adjEnv",c:"bom",e:"namxoi",txt:"Bờm sán lại — thơm quá!"},
         {t:"behind",c:"trau",target:"bom",txt:"Trâu đứng sau lưng Bờm"}],
   story:"@c2.namxoi.story"},

]});
