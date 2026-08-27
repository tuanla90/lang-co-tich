/* ============================================================
   chapter7.js — Chương 7: Mai An Tiêm (7 màn)
   Sự tích quả dưa hấu — chương của TỰ LỰC: "của cho là của nợ".
   Đảo hoang = bàn cờ viền nước; điểm nhấn: quả dưa khắc tên
   TRÔI TRÊN NƯỚC (onEnv ao) — gửi thư theo sóng.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 7,
  name: "Chương 7 · Mai An Tiêm",
  levels: [

  {type:"place", name:"Của cho là của nợ", cols:5, rows:3,
   scene:"@c7.cuacholacuano.scene",
   env:[{id:"cung",cells:[[0,0]]},{id:"nui",cells:[[4,0]]},{id:"tre",cells:[[4,2]]}], blocked:[], mud:[],
   chars:["vua","antiem","linh"],
   cons:[{t:"adjEnv",c:"vua",e:"cung",txt:"Vua ngự trước điện, mặt hướng vào trong"},
         {t:"behind",c:"antiem",target:"vua",txt:"Vua ngoảnh mặt — An Tiêm đứng sau lưng mà tâu"},
         {t:"adjChar",c:"linh",target:"vua",txt:"Lính hộ giá"}],
   story:"@c7.cuacholacuano.story"},

  {type:"place", name:"Đảo hoang", cols:5, rows:4,
   scene:"@c7.daohoang.scene",
   env:[{id:"leu",cells:[[1,1]]},{id:"tangda",cells:[[3,0]]},{id:"ao",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[4,0],[4,1],[4,2]]},{id:"tre",cells:[[0,0]]},{id:"cayda",cells:[[2,0]]}], blocked:[], mud:[],
   chars:["antiem","voat","beat"],
   cons:[{t:"adjEnv",c:"antiem",e:"leu",txt:"An Tiêm dựng lều tranh"},
         {t:"adjChar",c:"voat",target:"antiem",txt:"Vợ chàng nhóm lửa bên cạnh"},
         {t:"behind",c:"beat",target:"antiem",txt:"Bé An nép sau lưng cha"}],
   story:"@c7.daohoang.story"},

  {type:"matrix", name:"Tay làm hàm nhai",
   scene:"@c7.taylamhamnhai.scene",
   rows:["antiem","voat","beat"], colsM:["baida","rungcay","suoi"],
   clues:[{t:"mIs", c:"antiem", col:"baida", txt:"An Tiêm ra bãi đá mò ngao bắt ốc"},
          {t:"mNot",c:"beat", col:"rungcay", txt:"Bé còn nhỏ, không được vào rừng một mình"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một người"}],
   story:"@c7.taylamhamnhai.story"},

  {type:"place", name:"Chim lạ thả hạt", cols:4, rows:3,
   scene:"@c7.chimlathahat.scene",
   env:[{id:"tangda",cells:[[3,0]]},{id:"leu",cells:[[0,1]]},{id:"ao",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["chimtrang","hatden","antiem"],
   cons:[{t:"onEnv",c:"chimtrang",e:"tangda",txt:"Chim trắng đậu trên mỏm đá"},
         {t:"adjEnv",c:"hatden",e:"tangda",txt:"Hạt lạ rơi ngay dưới chân mỏm đá"},
         {t:"adjChar",c:"antiem",target:"hatden",txt:"An Tiêm khẽ nhặt hạt lạ"}],
   story:"@c7.chimlathahat.story"},

  {type:"place", name:"Ruộng dưa", cols:5, rows:4,
   scene:"@c7.ruongdua.scene",
   env:[{id:"leu",cells:[[0,0]]},{id:"ao",cells:[[4,3]]},{id:"tre",cells:[[0,3]]},{id:"tangda",cells:[[2,0]]},{id:"cayda",cells:[[4,0]]},{id:"nui",cells:[[2,3]]},{id:"baico",cells:[[0,2]]}], blocked:[], mud:[],
   relic:{id:"hatdua",cell:[0,3]},
   chars:["dua1","dua2","dua3","antiem","voat"],
   cons:[{t:"line",cs:["dua1","dua2","dua3"],txt:"Dây dưa bò THẲNG một luống — quả nối quả"},
         {t:"adjEnv",c:"dua1",e:"leu",txt:"Gốc dây dưa ngay cạnh lều"},
         {t:"adjChar",c:"antiem",target:"dua2",txt:"An Tiêm vun giữa luống"},
         {t:"adjEnv",c:"voat",e:"ao",txt:"Vợ chàng gánh nước từ bờ lên tưới"}],
   story:"@c7.ruongdua.story"},

  {type:"place", name:"Thư theo sóng", cols:5, rows:4,
   scene:"@c7.thutheosong.scene",
   env:[{id:"leu",cells:[[0,0]]},{id:"tangda",cells:[[3,1]]},{id:"ao",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3]]},{id:"tre",cells:[[0,1]]},{id:"cayda",cells:[[2,0]]}], blocked:[], mud:[],
   chars:["antiem","duathu","voat"],
   cons:[{t:"adjEnv",c:"antiem",e:"ao",txt:"An Tiêm đứng sát mép sóng"},
         {t:"onEnv",c:"duathu",e:"ao",txt:"Quả dưa khắc tên TRÔI trên mặt nước!"},
         {t:"adjEnv",c:"duathu",e:"tangda",txt:"…trôi vướng lại ở mỏm đá"},
         {t:"adjChar",c:"voat",target:"antiem",txt:"Vợ chàng thả thêm quả nữa"}],
   story:"@c7.thutheosong.story"},

  /* ---- Điểm xuyết: một hạt nhỏ đưa cả nhà về ---- */
  {type:"story", name:"Từ một hạt đen",
   scene:"@c7.tumothatden.scene",
   pieces:["duathu","hatden","thuyen","dua1"],
   panels:[
     {label:"@c7.tumothatden.p1.label", who:["chimtrang"],
      cue:"@c7.tumothatden.p1.cue",
      answer:"hatden", after:"@c7.tumothatden.p1.after"},
     {label:"@c7.tumothatden.p2.label", who:["voat"],
      cue:"@c7.tumothatden.p2.cue",
      answer:"dua1", after:"@c7.tumothatden.p2.after"},
     {label:"@c7.tumothatden.p3.label", who:["antiem"],
      cue:"@c7.tumothatden.p3.cue",
      answer:"duathu", after:"@c7.tumothatden.p3.after"},
     {label:"@c7.tumothatden.p4.label", who:["linh"],
      cue:"@c7.tumothatden.p4.cue",
      answer:"thuyen", after:"@c7.tumothatden.p4.after"}
   ],
   revealArt:"antiem",
   reveal:"@c7.tumothatden.reveal",
   story:"@c7.tumothatden.story"},

  {type:"place", name:"Vua đón về", cols:5, rows:4,
   scene:"@c7.vuadonve.scene",
   env:[{id:"thuyen",cells:[[4,2]]},{id:"leu",cells:[[0,0]]},
        {id:"ao",cells:[[4,0],[4,1],[2,3],[3,3],[4,3]]}], blocked:[], mud:[],
   chars:["vua","antiem","voat","beat","linh"],
   cons:[{t:"adjEnv",c:"vua",e:"thuyen",txt:"Vua bước xuống bến"},
         {t:"adjChar",c:"antiem",target:"vua",txt:"An Tiêm ra đón vua"},
         {t:"adjChar",c:"voat",target:"antiem",txt:"Vợ chàng theo sau"},
         {t:"adjEnv",c:"beat",e:"leu",txt:"Bé An còn đứng nép bên lều"},
         {t:"onEnv",c:"linh",e:"thuyen",txt:"Lính đứng trên thuyền"}],
   story:"@c7.vuadonve.story"},

]});
